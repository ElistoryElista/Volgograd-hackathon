// import validation from "./validation";
import utils from "@strapi/utils";

// const { validateCreatePaymentBody } = validation;
const { ApplicationError, ValidationError } = utils.errors;

/////////////////////////////////////////////////////

// Foot
// http://5.35.84.9:4000/route/v1/driving/46.3104,44.2707;46.3096,44.2839?steps=false

// Car
// http://5.35.84.9:5000/route/v1/driving/46.3104,44.2707;46.3096,44.2839?steps=false 

// Params
// 

/////////////////////////////////////////////////////

export default {
    getTables: async (ctx, next) => {
    try {
        console.log("ctx.request.query", ctx.request.query);
      
        return {
            status: "ok"
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
