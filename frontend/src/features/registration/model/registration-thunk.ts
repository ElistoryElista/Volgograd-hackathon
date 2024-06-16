import { sessionApi } from "@/entities/session";
import { createAsyncThunk } from "@reduxjs/toolkit";

type Params = {
  phone: string;
  username: string;
  password: string;
  email: string;
  name: string;
  date_birth: Date;
};

export const registrationThunk = createAsyncThunk<
  void | Error,
  Params,
  { state: RootState }
>("auth/registration", async (body: Params, { dispatch }) => {
  try {
    await dispatch(sessionApi.endpoints.registration.initiate(body)).unwrap();
  } catch (error) {
    if (error && typeof error === "string") throw new Error(error);
    throw new Error("Непредвиденная ошибка");
  }
});
