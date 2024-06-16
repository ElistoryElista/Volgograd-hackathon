import { yup } from "@strapi/utils";
import { InferType } from "yup";

export type TOverview = "false" | "full" | "simplified";
export type TResponse = "full" | "simplified";
export type TProfile = "foot" | "car";

function transformIntoNumberArray() {
    return yup.array()
    .transform(function(value, originalValue) {
        if (this.isType(value) && value !== null) {
            return value;
        }
        return originalValue ? originalValue.split(/[\s,]+/) : [];
    })
    .of(yup.number()).required();
}

const getRoutesSchema = yup.object({
    places_ids: transformIntoNumberArray(),
    steps: yup.boolean().default(false),
    overview: yup.mixed<TOverview>().oneOf(["false", "full", "simplified"]).default("simplified"),
    alternatives: yup.boolean().default(false),
    response: yup.mixed<TResponse>().oneOf(["full", "simplified"]).default("simplified"),
    profile: yup.mixed<TProfile>().oneOf(["foot", "car"]).default("car"),
    user_longitude: yup.number().min(-180).max(180),
    user_latitude: yup.number().min(-90).max(90),
});

// TODO add types for user_longitude, user_latitude when they are undefined

function validateGetRoutesParams(data: any) {
    return getRoutesSchema.validate(data, { abortEarly: true })
}

export default {
    validateGetRoutesParams,
}
