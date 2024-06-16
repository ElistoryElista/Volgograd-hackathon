import { baseApi } from "@/shared/api";
import { SESSION_TAG, USER_TAG } from "@/shared/api/tags";

export const sessionApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation({
      query: (body) => ({
        url: `/auth/local`,
        method: "POST",
        body,
      }),
      invalidatesTags: [SESSION_TAG, USER_TAG],
      transformErrorResponse(baseQueryReturnValue) {
        if (baseQueryReturnValue.status === 400)
          return "Не верный логин или пароль";
      },
    }),
    registration: build.mutation({
      query: (body) => ({
        url: `/auth/local/register`,
        method: "POST",
        body,
      }),
      invalidatesTags: [SESSION_TAG, USER_TAG],
      transformErrorResponse(baseQueryReturnValue) {
        if (baseQueryReturnValue.status === 400)
          return "Пользователь с таким именем, почтой или телефоном уже существует";
      },
    }),
    confirmRegistration: build.mutation({
      query: (body) => ({
        url: `/auth/confirmation/phone`,
        method: "POST",
        body,
      }),
      invalidatesTags: [SESSION_TAG, USER_TAG],
      transformErrorResponse(baseQueryReturnValue) {
        if (baseQueryReturnValue.status === 400)
          return "Не верный код подтверждения";
      },
    }),
    resetPassword: build.mutation({
      query: (body) => ({
        url: `/auth/forgot-password/phone`,
        method: "POST",
        body,
      }),
      invalidatesTags: [SESSION_TAG, USER_TAG],
      transformErrorResponse(baseQueryReturnValue) {
        if (baseQueryReturnValue.status === 400)
          return "Не верно указан номер телефона";
      },
    }),
    confirmResetPassword: build.mutation({
      query: (body) => ({
        url: `/auth/reset-password/phone`,
        method: "POST",
        body,
      }),
      invalidatesTags: [SESSION_TAG, USER_TAG],
      transformErrorResponse(baseQueryReturnValue) {
        if (baseQueryReturnValue.status === 400)
          return "Не верный код подтверждения";
      },
    }),
  }),
});

export const { useLoginMutation } = sessionApi;
