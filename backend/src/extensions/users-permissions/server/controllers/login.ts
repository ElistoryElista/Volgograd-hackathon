import { Strapi } from "@strapi/strapi";
import { Context, MyContext } from "koa";
import _ from "lodash";
import utils from "@strapi/utils";
import validation, { TLoginSchema } from "./validation/auth";
import { getService } from "../services";

const { validateLoginBody } = validation;
const { sanitize } = utils;
const { ApplicationError, ForbiddenError, ValidationError } = utils.errors;

const sanitizeUser = (user, ctx) => {
    const { auth } = ctx.state;
    const userSchema = strapi.getModel('plugin::users-permissions.user');
  
    return sanitize.contentAPI.output(user, userSchema, { auth });
};

const userService = getService('user');

export default async (ctx: MyContext) => {
    const provider = ctx.params.provider || 'local';
    try {
        const params = ctx.request.body as TLoginSchema;
    
        if (provider === 'local') {
            await validateLoginBody(params);
    
            const { phone } = params;
    
            // Check if the user exists.
            const user = await strapi.query('plugin::users-permissions.user').findOne({
                where: {
                    provider,
                    $or: [{ phone }],
                },
            });

            if (!user) {
                throw new ValidationError('Invalid identifier or password');
            }

            if (!user.password) {
                throw new ValidationError('Invalid identifier or password');
            }

            const validPassword = await getService('user').validatePassword(
                params.password,
                user.password
            );

            if (!validPassword) {
                throw new ValidationError('Invalid identifier or password');
            }

            if (user.blocked === true) {
                throw new ApplicationError('Your account has been blocked by an administrator');
            }

            return ctx.send({
                jwt: getService('jwt').issue({ id: user.id }),
                user: await sanitizeUser(user, ctx),
            });
        }
    } catch (error) {
        console.log('INSIDE AUTH LOGIN', error.message)
        throw error;
    }
}