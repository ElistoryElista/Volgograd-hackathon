export default {
  routes: [
    {
      method: "GET",
      path: "/valhalla/routing/routes",
      handler: "routing.getRoutes",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
