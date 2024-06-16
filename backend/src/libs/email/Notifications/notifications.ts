import EmailService from "../nodemailer";
import Mail from "nodemailer/lib/mailer";
import ApplicationTourEmailStrategy from "./strategies/ApplicationTourEmailStrategy";
import ApplicationHotelEmailStrategy from "./strategies/ApplicationsHotelEmailStrategy";
import { EmailNotificationsMap, IApplicationHotelData, IApplicationTourData, IEmailNotifications, TEmailNotificationsData, TEmailReciever, TStrategy } from "./types";
import ApplicationExcursionEmailStrategy from "./strategies/ApplicationExcursionEmailStrategy";

export interface EmailTemplateCreator {
    buildEmailOptions(data: unknown): Mail.Options;
}

class EmailNotifications implements IEmailNotifications {
    private emailService: typeof EmailService;
    private strategies: EmailNotificationsMap;

    constructor() {
        this.emailService = EmailService;
        this.strategies = {
            tour: new ApplicationTourEmailStrategy(),
            hotel: new ApplicationHotelEmailStrategy(),
            excursion: new ApplicationExcursionEmailStrategy(),
            // Add more strategy instances for other receiver types
        };
    }
    async sendEmail<T extends keyof TEmailNotificationsData>(
        receiverType: T, 
        data: TEmailNotificationsData[T]
    ): Promise<void> {
        const strategy = this.strategies[receiverType];
    
        if (!strategy) {
            throw new Error('Invalid receiver type');
        }
    
        const mailOptions = strategy.buildEmailOptions(data);
    
        await this.emailService.sendEmail(mailOptions);
    }
}

export default new EmailNotifications();