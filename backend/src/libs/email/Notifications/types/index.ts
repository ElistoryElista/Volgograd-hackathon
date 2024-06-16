import ApplicationExcursionEmailStrategy from "../strategies/ApplicationExcursionEmailStrategy";
import ApplicationTourEmailStrategy from "../strategies/ApplicationTourEmailStrategy";
import ApplicationHotelEmailStrategy from "../strategies/ApplicationsHotelEmailStrategy";

export type TEmailReciever = "tour" | "hotel" | "excursion";

type TApplicationTourEmailStrategyInstance = InstanceType<typeof ApplicationTourEmailStrategy>;

type TApplicationHotelEmailStrategyInstance = InstanceType<typeof ApplicationHotelEmailStrategy>;

type TApplicationExcursionEmailStrategyInstance = InstanceType<typeof ApplicationExcursionEmailStrategy>;

export type TStrategy = TApplicationTourEmailStrategyInstance | TApplicationHotelEmailStrategyInstance | TApplicationExcursionEmailStrategyInstance;

type TSchedule = {
    id: number;
    date: string;
    time: string;
    price: number;
}

export interface IApplicationTourData {
    reciever: string;
    name: string;
    tour_id: number;
    phone: string;
    email: string;
    customers_count: number;
    schedule: TSchedule;
}

export interface IApplicationHotelData {
    reciever: string;
    name: string;
    place_id: number;
    phone: string;
    email: string;
    approximate_total_price: number;
    customers_count: number;   
    start_date: string;
    end_date: string;
    start_time: string;
    end_time: string;
}

export interface IApplicationExcursionData {
    reciever: string;
    name: string;
    place_id: number;
    phone: string;
    email: string;
    total_price: number;
    customers_count: number;   
    schedule: TSchedule;
}

// precise type
export type EmailNotificationsMap = {
    tour: TApplicationTourEmailStrategyInstance;
    hotel: TApplicationHotelEmailStrategyInstance;
    excursion: TApplicationExcursionEmailStrategyInstance;
}

// general type
// export type EmailNotificationsMap = {
//     [Key in TEmailReciever]: TStrategy;
// }

// TODO. Refactor. https://antman-does-software.com/typescripts-discriminated-unions-with-real-use-cases
// Use "Discriminated Union"

export type TEmailNotificationsData = {
    tour: IApplicationTourData;
    hotel: IApplicationHotelData;
    excursion: IApplicationExcursionData;
}
export interface IEmailNotifications{
    sendEmail<T extends keyof TEmailNotificationsData> (
        receiverType: T, 
        data: TEmailNotificationsData[T]
    ): Promise<void>;
}

// export interface IEmailNotifications{
//     sendEmail<T extends TEmailReciever> (
//         receiverType: T, 
//         data: T extends "tour" ? IApplicationTourData : 
//               T extends "hotel" ? IApplicationHotelData : unknown
//     ): Promise<void>;
// }