import { USER_TRIPS, baseApi } from "@/shared/api";
import {
  FAVORITE_PLACES_TAG,
  ROUTE_TAG,
  TRIP_TAG,
  USER_TAG,
} from "@/shared/api";

export const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getUserInfo: build.query({
      query: () => ({
        url: `/users/me?populate=avatar`,
        method: "GET",
      }),
      providesTags: [USER_TAG],
    }),
    getAllUsers: build.query({
      query: (userId: number) => ({
        url: `/users?populate=avatar,trip_places&fields[0]=id&fields[1]=username&fields[2]=phone&fields[3]=is_show_companions&fields[4]=email&filters[is_show_companions][$eq]=true&filters[id][$ne]=${userId}`,
        method: "GET",
      }),
      providesTags: [USER_TAG],
    }),
    getUserSavedTrips: build.query({
      query: () => ({
        url: `/users/me?populate=trips&fields[0]=id`,
        method: "GET",
      }),
      providesTags: [USER_TRIPS],
    }),
    updateSavedTrips: build.mutation({
      query: ({
        id,
        trips,
      }: {
        id: number;
        trips: { place_ids: string; movement_method: string }[];
      }) => ({
        url: `/users/${id}`,
        method: "PUT",
        body: { trips },
      }),
      invalidatesTags: [USER_TRIPS],
    }),
    getFavoritePlaces: build.query({
      query: () => ({
        url: `/users/me?populate[favorite_places][populate]=images, preview_image, type.icon, working_hours, working_hours_weekends, icon`,
        method: "GET",
      }),
      providesTags: [FAVORITE_PLACES_TAG],
    }),
    updateFavoritePlaces: build.mutation({
      query: ({
        id,
        favorite_places,
      }: {
        id: number;
        favorite_places: number[];
      }) => ({
        url: `/users/${id}`,
        method: "PUT",
        body: { favorite_places },
      }),
      invalidatesTags: [FAVORITE_PLACES_TAG],
    }),
    getTripPlaces: build.query({
      query: () => ({
        url: `/users/me?populate[trip_places][populate]=images, preview_image, type.icon, working_hours, working_hours_weekends, icon`,
        method: "GET",
      }),
      providesTags: [TRIP_TAG],
    }),
    updateTripPlaces: build.mutation({
      query: ({ id, trip_places }: { id: number; trip_places: number[] }) => ({
        url: `/users/${id}`,
        method: "PUT",
        body: { trip_places },
      }),
      invalidatesTags: [TRIP_TAG, ROUTE_TAG],
    }),
    updateUsername: build.mutation({
      query: ({ newUsername, id }: { newUsername: string; id: number }) => ({
        url: `/users/${id}`,
        method: "PUT",
        body: { username: newUsername },
      }),
      invalidatesTags: [USER_TAG],
    }),
    updateEmail: build.mutation({
      query: ({ newEmail, id }: { newEmail: string; id: number }) => ({
        url: `/users/${id}`,
        method: "PUT",
        body: { email: newEmail },
      }),
      invalidatesTags: [USER_TAG],
    }),
    updatePhone: build.mutation({
      query: ({ newPhone, id }: { newPhone: string; id: number }) => ({
        url: `/users/${id}`,
        method: "PUT",
        body: { phone: newPhone },
      }),
      invalidatesTags: [USER_TAG],
    }),
    updateIsShowCompanions: build.mutation({
      query: ({ newState, id }: { newState: boolean; id: number }) => ({
        url: `/users/${id}`,
        method: "PUT",
        body: { is_show_companions: newState },
      }),
      invalidatesTags: [USER_TAG],
    }),
    updateIsVisuallyImpaired: build.mutation({
      query: ({ newState, id }: { newState: boolean; id: number }) => ({
        url: `/users/${id}`,
        method: "PUT",
        body: { isVisuallyImpaired: newState },
      }),
      invalidatesTags: [USER_TAG],
    }),
    updateIsHearingImpaired: build.mutation({
      query: ({ newState, id }: { newState: boolean; id: number }) => ({
        url: `/users/${id}`,
        method: "PUT",
        body: { isHearingImpaired: newState },
      }),
      invalidatesTags: [USER_TAG],
    }),
    updateIsRestrictedInMovement: build.mutation({
      query: ({ newState, id }: { newState: boolean; id: number }) => ({
        url: `/users/${id}`,
        method: "PUT",
        body: { isRestrictedInMovement: newState },
      }),
      invalidatesTags: [USER_TAG],
    }),
    deleteMyAccount: build.mutation({
      query: ({ id }: { id: number }) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [USER_TAG],
    }),
    updateAvatar: build.mutation({
      query: (formData) => ({
        url: `/upload`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: [USER_TAG],
    }),
  }),
});

export const {
  useGetUserInfoQuery,
  useGetFavoritePlacesQuery,
  useUpdateFavoritePlacesMutation,
  useUpdateUsernameMutation,
  useUpdateEmailMutation,
  useUpdatePhoneMutation,
  useUpdateAvatarMutation,
  useGetTripPlacesQuery,
  useUpdateTripPlacesMutation,
  useDeleteMyAccountMutation,
  useUpdateIsHearingImpairedMutation,
  useUpdateIsRestrictedInMovementMutation,
  useUpdateIsVisuallyImpairedMutation,
  useGetUserSavedTripsQuery,
  useUpdateSavedTripsMutation,
  useUpdateIsShowCompanionsMutation,
  useGetAllUsersQuery,
} = userApi;
