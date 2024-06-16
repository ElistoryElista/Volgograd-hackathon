export default {
  routes: [
    {
     method: 'POST',
     path: '/route-email',
     handler: 'route-email.sendEmail',
     config: {
       policies: [],
       middlewares: [],
     },
    },
  ],
};
