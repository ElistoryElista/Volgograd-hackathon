import { baseApi } from "@/shared/api";

export const filesApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    fileUpload: build.mutation({
      query: (formData) => ({
        url: `/upload`,
        method: "POST",
        body: formData,
      }),
    }),
  }),
});

export const { useFileUploadMutation } = filesApi;
