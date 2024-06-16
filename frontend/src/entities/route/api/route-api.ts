import { baseApi } from "@/shared/api";
import { ROUTE_TAG } from "@/shared/api/tags";
import { TValhallaPoint } from "@/shared/model/types";

export const routeApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getRouteByPlacesIds: build.query({
      query: ({
        placesIds,
        profile = "car",
        exclude,
      }: {
        placesIds: number[];
        profile?: "foot" | "car";
        exclude?: TValhallaPoint[];
      }) => ({
        url: `/valhalla/routing/routes?places_ids=${placesIds.join(
          ","
        )}&steps=true&overview=full&alternatives=true&response=simplified&profile=${profile}${
          exclude && exclude.length ? "&exclude=" + JSON.stringify(exclude) : ""
        }`,
        method: "GET",
      }),
      providesTags: [ROUTE_TAG],
    }),
  }),
});

export const { useGetRouteByPlacesIdsQuery } = routeApi;
