import { baseApi } from "@/shared/api";

export const incidentApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getIncidents: build.query({
      query: () => ({
        url: `/incidents`,
        method: "GET",
      }),
    }),
    createIncident: build.mutation({
      query: (data) => ({
        url: `/incidents`,
        method: "POST",
        body: { data },
      }),
    }),
  }),
});

export const { useGetIncidentsQuery, useCreateIncidentMutation } = incidentApi;
