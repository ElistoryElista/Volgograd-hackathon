import YouKassa from "../libs/youkassa";
import { IConfirmationType, ICreatePayment, IPaymentMethodType, Payment } from "@a2seven/yoo-checkout";
import { v4 as uuidv4 } from "uuid";
import validation from "./validation";
import utils from "@strapi/utils";
import emailService from "../../../libs/email/nodemailer";
import { GetValues } from "@strapi/types/dist/modules/entity-service";
import { GetNonPopulatableKeys } from "@strapi/types/dist/types/core/attributes";

const { yookassaClient } = YouKassa;
const { validateCreatePaymentBody } = validation;
const { ApplicationError, ValidationError } = utils.errors;

interface paymentPayload {
  amount: number;
  payment_method_type: IPaymentMethodType;
  confirmation: {
      type: IConfirmationType,
      return_url: string;
  };
}

interface ISendEmailInput {
  sender?: string;
  subject?: string;
  username: string;
  phone: string;
  email: string;
  paymentId: string;
}

function containsDuplicate(arr: number[]): boolean {
  const set = new Set();
  for (const item of arr) {
      if (set.has(item)) {
          return true;
      }
      set.add(item);
  }
  return false;
}

function findIntersection(haystack: number[], arr: number[]): number[] | undefined {
  const haystackSet = new Set(haystack);

  let intersectionArr: number[] = [];

  for(let elem of arr) {
    if(haystackSet.has(elem)) {
      intersectionArr.push(elem);
    }
  }

  return intersectionArr.length === 0 ? undefined : intersectionArr;
};

async function sendEmail(receiver: string, input: ISendEmailInput) {
  let sender: string = input?.sender || process.env.EMAIL_SERVICE_USERNAME;
  let html: string | undefined;
  let subject: string = input?.subject || 'Новая покупка билета';

  html = `
      Имя клиента: ${input.username};
      <br>
      Телефон клиента: ${input.phone};
      <br>
      Email клиента: ${input.email};
      <br>
      Id оплаты в Youkassa: ${input.paymentId};
      <br>
  `

  return emailService.sendEmail({
      from: sender,
      to: receiver,
      subject,
      html,
  });
}

type ticket = GetValues<"api::ticket.ticket", "seats" | GetNonPopulatableKeys<"api::ticket.ticket">>;

function checkIfTicketsAlreadyBooked(seatsIds: number[], tickets: ticket[]): [boolean, number[]] {
  for(let ticket of tickets) {
    const seats = ticket.seats;
    let bookedSeatsIds = [];

    for(let seat of seats) {
      bookedSeatsIds.push(seat.id);
    }

    const intersectionArr = findIntersection(seatsIds, bookedSeatsIds);

    if(intersectionArr) {
      return [true, intersectionArr];
    }
  }

  return [false, []];
}


function getPayload(params: paymentPayload) {
  const createPayload: ICreatePayment = {
      amount: {
          value: `${params.amount}`,
          currency: 'RUB'
      },
      payment_method_data: {
          type: `${params.payment_method_type}`
      },
      confirmation: {
          type: `${params.confirmation.type}`,
          return_url: `${params.confirmation.return_url}`
      },
      // receipt: {
      //     items: [{
      //         description: 'Мяч Спартак',
      //         amount: {
      //             value: `${params.amount}`,
      //             currency: 'RUB'
      //         },
      //         vat_code: 1,
      //         quantity: "1",
      //         payment_subject: "commodity",
      //         payment_mode: "full_prepayment"
      //     }],
      //     customer: {
      //         phone: "+79164556267",
      //         email: "am@muniev.ru",
      //     }
      // },
      capture: true,
  };

  return createPayload;
}

export default {
  createPayment: async (ctx, next) => {
    try {
      const { event_id, seats_ids, user_id, schedule_id, persons_count, payment_payload } = await validateCreatePaymentBody(ctx.request.body);
      const { payment_method_type, return_url } = payment_payload;
      const idempotenceKey = uuidv4();
      
      const event = await strapi.entityService.findOne('api::event.event', event_id, {
        fields: ["id", "email"],
        populate: {
          schedules: true
        }
      });
      // @ts-ignore
      const schedule = event.schedules.find(schedule => schedule.id === schedule_id);
      const totalPrice = schedule.price * persons_count;

      const createPayload = getPayload({
        payment_method_type,
        amount: totalPrice,
        confirmation: {
          type: "redirect",
          return_url,
        },
      });
      const payment = await yookassaClient.createPayment(createPayload, idempotenceKey);

      const hasDuplicates = containsDuplicate(seats_ids);

      if(hasDuplicates) {
        throw new ApplicationError('Нельзя купить одно место дважды');
      }

      const tickets = await strapi.entityService.findMany('api::ticket.ticket', {
        filters: {
          event: {
            id: event_id
          },
          schedule_id,
        },
        populate: {
          seats: true,
        }
      });
      
      const [isBooked, bookedSeats] = checkIfTicketsAlreadyBooked(seats_ids, tickets);

      if(isBooked) {
        throw new ApplicationError(`Нельзя купить эти места: ${bookedSeats.join(", ")}`);
      }

      const newTicket = await strapi.entityService.create('api::ticket.ticket', {
        data: {
          event: {
            id: event_id
          },
          seats: seats_ids,
          users_permissions_user: {
            id: user_id,
          },
          link_pay: payment.confirmation.confirmation_url,
          is_paid: false,
          is_used: false,
          total_price: totalPrice,
          schedule_id,
          persons_count,
        },
      });

      const user = await strapi
        .query('plugin::users-permissions.user')
        .findOne({ 
          select: ["email", "username", "phone"],
          where: { id: user_id } 
        });

      if (!user) {
          throw new ValidationError('No such user');
      }

      // TODO. add EmailNotifications here instead of sendEmail
      // @ts-ignore
      await sendEmail(event.email, {
        ...user,
        paymentId: payment.id
      });
      
      setTimeout(async () => {
        try {
            const paymentId = payment.id;
            if(!paymentId) {
                throw new Error("Ошибка при создании заказа")
            }
            
            const updatedPayment = await yookassaClient.getPayment(paymentId);

            if(updatedPayment.status === "succeeded") {
              await strapi.entityService.update('api::ticket.ticket', newTicket.id, {
                data: {
                  is_paid: true,
                }
              })
              console.log(`Ticket ID: ${newTicket.id} is paid. Client card details:`);
              console.table(updatedPayment.payment_method.card);
            } else {
              const admin = process.env.EMAIL_SERVICE_ADMIN_RECIEVER;
              // @ts-ignore
              await sendEmail(admin, {
                ...user,
                paymentId: payment.id,
                subject: "Пользователь не оплатил билет в течении 10 минут"
              });

              await strapi.entityService.delete('api::ticket.ticket', newTicket.id)
              console.log(`Removed ticket ID: ${newTicket.id} for Payment ID: ${updatedPayment.id}`);
            }
        } catch (error) {
            console.log("Error while sending success email",error);
        }
    }, 1000 * 60 * Number(process.env.CHECK_PAYMENT_STATUS_TIMEOUT)); // 15 minutes
      
    return {
      redirect_url: payment.confirmation.confirmation_url,
    };

    } catch (error: unknown) {
      const err = error as Error;
      if(err.name === 'ValidationError') {
        // @ts-ignore
        return ctx.badRequest(err.message, err.errors);
      }
      else {
        console.error(err);
        throw new ApplicationError(err.message);
      }
    }
  }
};
