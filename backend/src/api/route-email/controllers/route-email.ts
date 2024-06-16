import validation from "./validation";
import emailService from "../../../libs/email/nodemailer";

const { validateSendEmailFromPresentationBody } = validation;

async function sendMail(userEmail: string, userRouteAsString: string) {
  let sender: string = process.env.EMAIL_SERVICE_USERNAME;
  let html: string | undefined;
  let subject: string = 'Путешествие в Волгоград';

  html = `
      Ваш выбор достопримечательностей и интересных мест точно сделает ваше путешествие незабываемым! 
      <br>
      Мы рады сообщить, что ваш персональный маршрут теперь сохранен и доступен для повторного посещения по ссылке ниже.
      <br>
      <a href="${userRouteAsString}">Нажмите здесь чтобы открыть свой маршрут</a>
  `

  return emailService.sendEmail({
      from: sender,
      to: userEmail,
      subject,
      html,
  });
}

export default {
  sendEmail: async (ctx, next) => {
    const { email, route } = await validateSendEmailFromPresentationBody(ctx.request.body);
    console.log("email", email)
    // TODO. add EmailNotifications here instead of sendEmail
    // @ts-ignore
    sendMail(email, route)
      .then((value) => {
        console.log(`Success, userEmail: ${email}`)
      })
      .catch((error) => {
        console.log(`
        Error: ${error}
        userEmail: ${email}
        route: ${route}
        `)
      })

    return {
      message: "ok"
    }
  }
};
