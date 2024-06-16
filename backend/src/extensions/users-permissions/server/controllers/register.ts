import { Strapi } from "@strapi/strapi";
import { Context } from "koa";
import _ from "lodash";
import { concat, compact, isArray } from "lodash/fp";
import utils, { contentTypes } from "@strapi/utils";
import validation from "./validation/auth";
import phoneVerificationProvider from "../utils/phoneVerificationProvider";
import { getService } from "../services";

const { validateRegisterBody } = validation;
const { sanitize } = utils;
const { ApplicationError } = utils.errors;
const { getNonWritableAttributes } = contentTypes;
const { flashcall } = phoneVerificationProvider;

const sanitizeUser = (user, ctx) => {
    const { auth } = ctx.state;
    const userSchema = strapi.getModel('plugin::users-permissions.user');
  
    return sanitize.contentAPI.output(user, userSchema, { auth });
};

const userService = getService('user');
  
export default async (ctx) => {
    const pluginStore = await strapi.store({ type: 'plugin', name: 'users-permissions' });

    const settings = await pluginStore.get({ key: 'advanced' });

    // @ts-ignore
    if (!settings.allow_register) {
      throw new ApplicationError('Register action is currently disabled');
    }

    // @ts-ignore
    const { register } = strapi.config.get('plugin.users-permissions');
    const alwaysAllowedKeys = ['username', 'password', 'phone', 'email'];
    const userModel = strapi.contentTypes['plugin::users-permissions.user'];
    const { attributes } = userModel;

    const nonWritable = getNonWritableAttributes(userModel);

    const allowedKeys = compact(
      concat(
        alwaysAllowedKeys,
        isArray(register?.allowedFields)
          ? // Note that we do not filter allowedFields in case a user explicitly chooses to allow a private or otherwise omitted field on registration
            register.allowedFields // if null or undefined, compact will remove it
          : // to prevent breaking changes, if allowedFields is not set in config, we only remove private and known dangerous user schema fields
            // TODO V5: allowedFields defaults to [] when undefined and remove this case
            Object.keys(attributes).filter(
              (key) =>
                !nonWritable.includes(key) &&
                // @ts-ignore
                !attributes[key].private &&
                ![
                  // many of these are included in nonWritable, but we'll list them again to be safe and since we're removing this code in v5 anyway
                  // Strapi user schema fields
                  'confirmed',
                  'blocked',
                  'confirmationToken',
                  'resetPasswordToken',
                  'provider',
                  'id',
                  'role',
                  // other Strapi fields that might be added
                  'createdAt',
                  'updatedAt',
                  'createdBy',
                  'updatedBy',
                  'publishedAt', // d&p
                  'strapi_reviewWorkflows_stage', // review workflows
                ].includes(key)
            )
      )
    );

    const params = {
      ..._.pick(ctx.request.body, allowedKeys),
      provider: 'local',
    };

    
    await validateRegisterBody(params);
    
    const role = await strapi
      .query('plugin::users-permissions.role')
      // @ts-ignore
      .findOne({ where: { type: settings.default_role } });

    if (!role) {
      throw new ApplicationError('Impossible to find the default role');
    }

    // @ts-ignore
    const { email, phone, username, provider } = params;

    const identifierFilter = {
      $or: [
        { email: email?.toLowerCase() },
        { username: email?.toLowerCase() },
        { username },
        { email: username },
      ],
    };

    

    const conflictingUserCount = await strapi.query('plugin::users-permissions.user').count({
      where: { ...identifierFilter, provider },
    });

    // Case. Пользователь существует
    if (conflictingUserCount > 0) {
        const user = await strapi.query('plugin::users-permissions.user').findOne({
            where: {
              provider,
              $or: [{ phone }, { username }],
            },
        });

        if(user.blocked) {
            // Send verification code
            try {
              const flashcallResponse = await flashcall({ 
                phone,
                publicKey: process.env.ZVONOK_PUBLIC_KEY,
                campaignId: process.env.ZVONOK_CAMPAIGN_ID, 
              });
              console.log('flashcallResponse.data', flashcallResponse.data);
              const { pincode } = flashcallResponse.data.data;

              await userService.edit(user.id, { pincode });

              return ctx.send({
                  status: "ok",
                  message: "pincode has been sent if user.blocked"
              });
            } catch (error) {
              console.log(error)
            }
        } else {
            throw new ApplicationError('Email or Username or Phone are already taken');
        }
    }

    // @ts-ignore
    if (settings.unique_email) {
      const conflictingUserCount = await strapi.query('plugin::users-permissions.user').count({
        where: { ...identifierFilter },
      });

      if (conflictingUserCount > 0) {
        throw new ApplicationError('Email or Username are already taken');
      }
    }

    const newUser = {
        ...params,
        role: role.id,
        email: email.toLowerCase(),
        username,
        // @ts-ignore
        confirmed: !settings.email_confirmation,
        blocked: true,
    };

    try {
        const user = await getService('user').add(newUser);

        // Send verification code
        const flashcallResponse = await flashcall({ 
            phone,
            publicKey: process.env.ZVONOK_PUBLIC_KEY,
            campaignId: process.env.ZVONOK_CAMPAIGN_ID, 
        });
        console.log('flashcallResponse.data try catch', flashcallResponse.data);
        const { pincode } = flashcallResponse.data.data;

        await userService.edit(user.id, { pincode });

        return ctx.send({
            status: "ok",
            message: "pincode has been sent"
        });
    } catch (err) {
        throw new ApplicationError(err.message);
    }

    //////////////////////////////
}
