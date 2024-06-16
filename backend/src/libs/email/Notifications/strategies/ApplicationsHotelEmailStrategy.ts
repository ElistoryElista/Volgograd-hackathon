import { EmailTemplateCreator } from "../notifications";
import { IApplicationHotelData } from "../types";

export default class ApplicationHotelEmailStrategy implements EmailTemplateCreator {
    buildEmailOptions(data: unknown) {
        const typedData = data as IApplicationHotelData;

        let html: string | undefined;

        html = `
            Имя клиента: ${typedData.name};
            <br>
            Телефон клиента: ${typedData.phone};
            <br>
            Email клиента: ${typedData.email};
            <br>
            Кол-во людей в группе: ${typedData.customers_count};
            <br>
        `

        return ({
            from: process.env.EMAIL_SERVICE_USERNAME,
            to: typedData.reciever,
            subject: 'Новое бронирование отеля',
            html,
        });
    }
}
