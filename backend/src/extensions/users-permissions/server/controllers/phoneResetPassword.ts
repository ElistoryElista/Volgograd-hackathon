import validation, { TConfirmPhoneResetPasswordSchema } from "./validation/auth";
import utils from "@strapi/utils";
import { getService } from "../services";

const { ApplicationError } = utils.errors;
const { validatePhoneResetPasswordBody } = validation;
const { sanitize } = utils;

const sanitizeUser = (user, ctx) => {
    const { auth } = ctx.state;
    const userSchema = strapi.getModel('plugin::users-permissions.user');
  
    return sanitize.contentAPI.output(user, userSchema, { auth });
};

export default async (ctx) => {
    const { newPassword, phone, pincode }: TConfirmPhoneResetPasswordSchema = await validatePhoneResetPasswordBody(
        ctx.request.body
    );

    const user = await strapi
        .query('plugin::users-permissions.user')
        .findOne({ where: { phone, resetPasswordPincode: pincode } });

    if (!user || user.blocked) {
        throw new ApplicationError('No such user or user is blocked');
    }

    const updatedUser = await getService('user').edit(user.id, {
        resetPasswordPincode: null,
        password: newPassword,
    });

    // Update the user.
    ctx.send({
        jwt: getService('jwt').issue({ id: updatedUser.id }),
        user: await sanitizeUser(updatedUser, ctx),
    });
}