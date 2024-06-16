import { yup, validateYupSchema } from "@strapi/utils";
import { IPaymentMethodType } from "@a2seven/yoo-checkout";
import * as Yup from "yup";

const sendEmailSchema = yup.object({
    email: yup.string().email().required(),
    route: yup.string().required(),
});

function validateSendEmailFromPresentationBody(data: any) {
    return sendEmailSchema.validate(data, { abortEarly: true })
}

export default {
    validateSendEmailFromPresentationBody,
}
