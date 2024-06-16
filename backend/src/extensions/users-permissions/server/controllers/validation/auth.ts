import { yup, validateYupSchema } from "@strapi/utils";

const russianPhoneRegExp = /^8([0-9]){10}$/;

const registerSchema = yup.object({
    phone: yup.string().matches(russianPhoneRegExp, 'Номер должен начинаться с 8 и содержать 11 цифр').required(),
    username: yup.string().required(),
    password: yup.string().required(),
    email: yup.string().email().optional(),
});

const loginSchema = yup.object({
    phone: yup.string().matches(russianPhoneRegExp, 'Номер должен начинаться с 8 и содержать 11 цифр').required(),
    password: yup.string().required(),
});

const confirmPincodeSchema = yup.object({
    phone: yup.string().matches(russianPhoneRegExp, 'Номер должен начинаться с 8 и содержать 11 цифр').required(),
    pincode: yup.string().matches(/^[0-9]{4}$/, 'Должны быть 4 цифры').required(),
});

const confirmPhoneForgotPasswordSchema = yup.object({
    phone: yup.string().matches(russianPhoneRegExp, 'Номер должен начинаться с 8 и содержать 11 цифр').required(),
});

const confirmPhoneResetPasswordSchema = yup.object({
    newPassword: yup.string().required(),
    phone: yup.string().matches(russianPhoneRegExp, 'Номер должен начинаться с 8 и содержать 11 цифр').required(),
    pincode: yup.string().matches(/^[0-9]{4}$/, 'Должны быть 4 цифры').required(),
})
.noUnknown();




export type TConfirmPincodeSchema = yup.InferType<typeof confirmPincodeSchema>;

export type TConfirmPhoneResetPasswordSchema = yup.InferType<typeof confirmPhoneResetPasswordSchema>;

export type TLoginSchema = yup.InferType<typeof loginSchema>;

export default {
    validateRegisterBody: validateYupSchema(registerSchema),
    validateLoginBody: validateYupSchema(loginSchema),
    validatePincodeConfirmationBody: validateYupSchema(confirmPincodeSchema),
    validatePhoneForgotPasswordBody: validateYupSchema(confirmPhoneForgotPasswordSchema),
    validatePhoneResetPasswordBody: validateYupSchema(confirmPhoneResetPasswordSchema),
}
