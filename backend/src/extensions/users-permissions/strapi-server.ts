
import { Plugin } from "@strapi/strapi";
import server from "./server";

export default (plugin) => {
    // controllers
    plugin.controllers.auth.register = server.controllers.register;
    plugin.controllers.auth.callback = server.controllers.login;
    plugin.controllers.auth.confirmPhone = server.controllers.phoneConfirmation;


    plugin.controllers.auth.phoneForgotPassword = server.controllers.phoneForgotPassword;
    plugin.controllers.auth.phoneResetPassword = server.controllers.phoneResetPassword;

    // routing
    const strapiRoutes = plugin.routes["content-api"].routes;
    const customRoutes = server.routes;

    plugin.routes["content-api"].routes = [...strapiRoutes, ...customRoutes];

    return plugin;
};