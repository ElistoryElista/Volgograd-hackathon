/**
 * applications-excursion controller
 */
import EmailNotifications from "../../../libs/email/Notifications/notifications";

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::applications-excursion.applications-excursion', ({ strapi }) => ({
    async create(ctx) {
        // ctx.request.body validation is here
        const response = await super.create(ctx);

        // @ts-ignore
        const body = ctx.request.body.data;

        try {
            const excursion = await strapi.entityService.findOne('api::excursion.excursion', body.excursion_id);
            
            await EmailNotifications.sendEmail<"excursion">("excursion", {
                ...body,
                reciever: excursion.email
            });

            return response;
        } catch (error) {
            console.log('=============================')
            console.log(error)
            console.log('=============================')
        }
    }
}));
