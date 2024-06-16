import { baseApi } from "@/shared/api";

export const readyRoutesApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllReadyRoutes: build.query({
      query: ({
        populate = "",
        filters = "",
      }: {
        populate?: string;
        filters: string;
      }) => ({
        url: `/ready-routes?${populate}&${filters}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllReadyRoutesQuery } = readyRoutesApi;
