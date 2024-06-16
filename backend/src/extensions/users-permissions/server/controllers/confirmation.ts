import validation, { TConfirmPincodeSchema } from "./validation/auth";
import utils from "@strapi/utils";
import { getService } from "../services";

const { sanitize } = utils;
const { ValidationError } = utils.errors;
const { validatePincodeConfirmationBody } = validation;

const sanitizeUser = (user, ctx) => {
    const { auth } = ctx.state;
    const userSchema = strapi.getModel('plugin::users-permissions.user');
  
    return sanitize.contentAPI.output(user, userSchema, { auth });
};

export default async (ctx) => {
    const { pincode, phone }: TConfirmPincodeSchema = await validatePincodeConfirmationBody(ctx.request.body);

    const userService = getService('user');
    const jwtService = getService('jwt');

    // Проверяем что user ввел верный pincode
    const [user] = await userService.fetchAll({ filters: { pincode, phone } });

    if (!user) {
        throw new ValidationError('Invalid pincode or phone');
    }

    if(!user.blocked) {
        throw new ValidationError('User is already activated');
    }

    const updatedUser = await userService.edit(user.id, { blocked: false, pincode: null });

    ctx.send({
        jwt: jwtService.issue({ id: user.id }),
        user: await sanitizeUser(updatedUser, ctx),
    });
}