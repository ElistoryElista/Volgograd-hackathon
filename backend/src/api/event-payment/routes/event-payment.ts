export default {
  routes: [
    {
     method: 'POST',
     path: '/event-payment',
     handler: 'event-payment.createPayment',
     config: {
       policies: [],
       middlewares: [],
     },
    },
  ],
};
