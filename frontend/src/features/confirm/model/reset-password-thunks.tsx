import { sessionApi } from "@/entities/session";
import { changePhoneUser } from "@/entities/user";
import { createAsyncThunk } from "@reduxjs/toolkit";

type resetPasswordParams = {
  phone: string;
};

type confirmResetPasswordParams = {
  phone: string;
  newPassword: string;
  pincode: string;
};

export const resetPasswordThunk = createAsyncThunk<
  void,
  resetPasswordParams,
  { state: RootState }
>("auth/reset-password", async (body: resetPasswordParams, { dispatch }) => {
  try {
    await dispatch(sessionApi.endpoints.resetPassword.initiate(body)).unwrap();
    dispatch(changePhoneUser(body.phone));
  } catch (error) {
    if (error && typeof error === "string") throw new Error(error);
    throw new Error("Непредвиденная ошибка");
  }
});

export const confirmResetPasswordThunk = createAsyncThunk<
  void,
  confirmResetPasswordParams,
  { state: RootState }
>(
  "auth/confirm-reset-password",
  async (body: confirmResetPasswordParams, { dispatch }) => {
    try {
      await dispatch(
        sessionApi.endpoints.confirmResetPassword.initiate(body)
      ).unwrap();
    } catch (error) {
      if (error && typeof error === "string") throw new Error(error);
      throw new Error("Непредвиденная ошибка");
    }
  }
);
