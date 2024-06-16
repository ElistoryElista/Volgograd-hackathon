import { baseApi } from "@/shared/api";

export const supportServiceApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createSupportTicket: build.mutation({
      query: (data) => ({
        url: `/support-services`,
        method: "POST",
        body: { data },
      }),
    }),
  }),
});

export const { useCreateSupportTicketMutation } = supportServiceApi;
