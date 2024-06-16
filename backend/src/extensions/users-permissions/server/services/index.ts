import user from "./user";
import jwt from "./jwt";

const services = {
    user,
    jwt,
};

export const getService = (name) => {
    return services[name];
};

export default services;