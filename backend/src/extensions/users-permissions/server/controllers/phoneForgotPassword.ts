import validation from "./validation/auth";
import utils from "@strapi/utils";
import phoneVerificationProvider from "../utils/phoneVerificationProvider";
import { getService } from "../services";

const { validatePhoneForgotPasswordBody } = validation;
const { sanitize } = utils;
const { ApplicationError } = utils.errors;
const { flashcall } = phoneVerificationProvider;

// const sanitizeUser = (user, ctx) => {
//     const { auth } = ctx.state;
//     const userSchema = strapi.getModel('plugin::users-permissions.user');
  
//     return sanitize.contentAPI.output(user, userSchema, { auth });
// };

export default async (ctx) => {
    const { phone } = await validatePhoneForgotPasswordBody(ctx.request.body);

    // Find the user by phone.
    const user = await strapi
      .query('plugin::users-permissions.user')
      .findOne({ where: { phone } });

    try {
        if (!user || user.blocked) {
            throw new ApplicationError('No such user or user is blocked');
        }
        // Send an email to the user.
        const flashcallResponse = await flashcall({ 
            phone,
            publicKey: process.env.ZVONOK_PUBLIC_KEY,
            campaignId: process.env.ZVONOK_CAMPAIGN_ID, 
        });
        const { pincode, call_id } = flashcallResponse.data.data;
        console.log('phoneForgotPassword.flashcall.call_id', call_id);
        console.log('phoneForgotPassword.flashcall.pincode', pincode);

        await getService('user').edit(user.id, { resetPasswordPincode: pincode });

        ctx.send({ ok: true });
    } catch (error) {
        console.log(error.message);
        throw new ApplicationError('Failed to send code or something else');
    }
}

