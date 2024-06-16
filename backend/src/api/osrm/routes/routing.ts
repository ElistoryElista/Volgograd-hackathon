export default {
    routes: [
      {
       method: 'GET',
       path: '/osrm/routing/routes',
       handler: 'routing.getRoutes',
       config: {
         policies: [],
         middlewares: [],
       },
      },
    ],
  };
  