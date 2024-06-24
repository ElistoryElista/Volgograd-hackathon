import { baseApi } from "@/shared/api";
import { TQuery } from "../model/types";

export const excursionsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllExcursions: build.query({
      query: ({
        fields = "",
        populate = "",
        filter = "",
        page = 1,
        pageSize = 12,
      }: TQuery) => ({
        url: `/excursions?${populate}&${fields}&${filter}&pagination[page]=${page}&pagination[pageSize]=${pageSize}`,
        method: "GET",
      }),
    }),
    getExcursionById: build.query({
      query: ({ id }: { id: number }) => ({
        url: `/excursions/${id}?populate=*`,
        method: "GET",
      }),
    }),
    createApplicationExcursion: build.mutation({
      query: (data) => ({
        url: "/applications-excursions",
        method: "POST",
        body: data,
      }),
      transformErrorResponse(res) {
        if (res.status !== 200)
          return "Не удалось создать заявку на экскурсию, пожалуйста попробуйте позднее.";
      },
    }),
  }),
});

export const {
  useGetAllExcursionsQuery,
  useGetExcursionByIdQuery,
  useCreateApplicationExcursionMutation,
} = excursionsApi;
