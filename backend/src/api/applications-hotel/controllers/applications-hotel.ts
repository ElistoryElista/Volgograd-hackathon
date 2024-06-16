/**
 * applications-hotel controller
 */
import EmailNotifications from "../../../libs/email/Notifications/notifications";

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::applications-hotel.applications-hotel', ({ strapi }) => ({
    async create(ctx) {
        // ctx.request.body validation is here
        const response = await super.create(ctx);

        // @ts-ignore
        const body = ctx.request.body.data;

        try {
            const hotel = await strapi.entityService.findOne('api::place.place', body.place_id);
            
            await EmailNotifications.sendEmail<"hotel">("hotel", {
                ...body,
                reciever: hotel.email
            });

            return response;
        } catch (error) {
            console.log('=============================')
            console.log(error)
            console.log('=============================')
        }
    }
}));
