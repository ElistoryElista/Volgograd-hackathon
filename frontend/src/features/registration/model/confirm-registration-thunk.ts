import { sessionApi } from "@/entities/session";
import { createAsyncThunk } from "@reduxjs/toolkit";

type Params = {
  phone: string;
  pincode: string;
};

export const confirmRegistrationThunk = createAsyncThunk<
  void | Error,
  Params,
  { state: RootState }
>("auth/confirm-registration", async (body: Params, { dispatch }) => {
  try {
    await dispatch(
      sessionApi.endpoints.confirmRegistration.initiate(body)
    ).unwrap();
  } catch (error) {
    if (error && typeof error === "string") throw new Error(error);
    throw new Error("Непредвиденная ошибка");
  }
});
