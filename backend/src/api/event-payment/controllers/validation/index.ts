import { yup, validateYupSchema } from "@strapi/utils";
import { IPaymentMethodType } from "@a2seven/yoo-checkout";
import * as Yup from "yup";

const createPaymentSchema = yup.object({
    event_id: yup.number().required(),
    seats_ids: yup.array().of(yup.number()).required(),
    user_id: yup.number().required(),
    schedule_id: yup.number().required(),
    payment_payload: yup.object().shape({
        payment_method_type: yup.mixed<IPaymentMethodType>().oneOf(['bank_card']),
        return_url: yup.string().required(),
    }),
    persons_count: yup.number().min(1).max(5).required(),
});

function validateCreatePaymentBody(data: any) {
    return createPaymentSchema.validate(data, { abortEarly: true })
}

export default {
    validateCreatePaymentBody,
}
