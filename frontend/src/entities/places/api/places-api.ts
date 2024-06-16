import { baseApi } from "@/shared/api";
import { TQuery } from "../model/types";

export const placesApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllPlaces: build.query({
      query: ({
        fields = "",
        populate = "",
        filter = "",
        sort = "",
        page = 1,
        pageSize = 12,
      }: TQuery) => ({
        url: `/places?${populate}&${fields}&${filter}&pagination[page]=${page}&pagination[pageSize]=${pageSize}&${sort}`,
        method: "GET",
      }),
    }),
    getPlacesById: build.query({
      query: ({ id }: { id: number }) => ({
        url: `/places/${id}?populate=*`,
        method: "GET",
      }),
    }),
    getPlacesBySlug: build.query({
      query: ({ slug }: { slug: string }) => ({
        url: `/places?filters[$and][0][slug][$eq]=${slug}&populate=*`,
        method: "GET",
      }),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      transformResponse(res: { data: any[] }) {
        if (res?.data[0]) return { data: res?.data[0] };
      },
    }),
    getAllPlaceCategories: build.query({
      query: () => ({
        url: `/place-categories?populate=place_tags`,
        method: "GET",
      }),
    }),
    getPlaceCategoryBySlug: build.query({
      query: ({ slug }: { slug: string }) => ({
        url: `/place-categories?filters[$and][0][slug][$eq]=${slug}&populate=place_tags`,
        method: "GET",
      }),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      transformResponse(res: { data: any[] }) {
        if (res?.data[0]) return { data: res?.data[0] };
      },
    }),
  }),
});

export const {
  useGetAllPlacesQuery,
  useGetPlacesByIdQuery,
  useGetPlacesBySlugQuery,
  useGetPlaceCategoryBySlugQuery,
  useGetAllPlaceCategoriesQuery,
} = placesApi;
