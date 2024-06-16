export default {
    routes: [
      {
       method: 'GET',
       path: '/osrm/tables',
       handler: 'table.getTables',
       config: {
         policies: [],
         middlewares: [],
       },
      },
    ],
  };
  