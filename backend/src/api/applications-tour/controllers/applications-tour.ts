/**
 * applications-tour controller
 */
import EmailNotifications from "../../../libs/email/Notifications/notifications";

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::applications-tour.applications-tour', ({ strapi }) => ({
    async create(ctx) {
        // ctx.request.body validation is here
        const response = await super.create(ctx);

        // @ts-ignore
        const body = ctx.request.body.data;

        try {
            const tour = await strapi.entityService.findOne('api::tour.tour', body.tour_id);
            
            await EmailNotifications.sendEmail<"tour">("tour", {
                ...body,
                reciever: tour.email,
            });

            return response;
        } catch (error) {
            console.log('=============================')
            console.log(error)
            console.log('=============================')
        }
    }
}));
