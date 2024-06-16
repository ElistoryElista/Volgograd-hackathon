import bcrypt from "bcryptjs";

export default {
    async add(values) {
        return strapi.entityService.create('plugin::users-permissions.user', {
            data: values,
            populate: ['role'],
        });
    },
    async edit(userId: number | string, params = {}) {
        return strapi.entityService.update('plugin::users-permissions.user', userId, {
          data: params,
          populate: ['role'],
        });
    },
    fetchAll(params) {
        return strapi.entityService.findMany('plugin::users-permissions.user', params);
    },
    validatePassword(password: string, hash: string): boolean {
        return bcrypt.compare(password, hash);
    },
}