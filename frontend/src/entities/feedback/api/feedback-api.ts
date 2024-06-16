import { baseApi } from "@/shared/api";

export const feedbackApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createFeedback: build.mutation({
      query: (data) => ({
        url: `/feedbacks`,
        method: "POST",
        body: { data },
      }),
    }),
  }),
});

export const { useCreateFeedbackMutation } = feedbackApi;
