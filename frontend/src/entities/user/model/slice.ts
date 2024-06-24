import { TPlace, TTicket, TResImage } from "@/shared/model/types";
import { createSlice } from "@reduxjs/toolkit";
import { userApi } from "../api/user-api";

type TUserInfo = {
  id: number | null;
  avatar: TResImage | null;
  confirmPhone: string | null;
  phone: string | null;
  username: string | null;
  email: string | null;
  isVisuallyImpaired: boolean;
  isHearingImpaired: boolean | null;
  isRestrictedInMovement: boolean | null;
  date_birth: Date | null;
  is_show_companions: boolean | null;
};

interface IUserSliceState extends TUserInfo {
  tickets: TTicket[] | null;
  favoritePlaces: TPlace[] | null;
  trip: TPlace[] | null;
}

const initialState: IUserSliceState = {
  id: null,
  avatar: null,
  confirmPhone: null,
  phone: null,
  username: null,
  email: null,
  tickets: null,
  favoritePlaces: null,
  trip: null,
  isVisuallyImpaired:
    localStorage.getItem("isVisuallyImpaired") !== undefined
      ? JSON.parse(String(localStorage.getItem("isVisuallyImpaired")))
      : false,
  isHearingImpaired: null,
  isRestrictedInMovement: null,
  date_birth: null,
  is_show_companions: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    changePhoneUser: (state, { payload }) => {
      state.confirmPhone = payload;
    },
    changeVisuallyImpairedMode: (state) => {
      state.isVisuallyImpaired = !state.isVisuallyImpaired;
      localStorage.setItem(
        "isVisuallyImpaired",
        String(state.isVisuallyImpaired)
      );
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      userApi.endpoints.getUserInfo.matchFulfilled,
      (state: IUserSliceState, { payload }) => {
        state.id = payload.id;
        state.isVisuallyImpaired = payload.isVisuallyImpaired;
        state.isHearingImpaired = payload.isHearingImpaired;
        state.isRestrictedInMovement = payload.isRestrictedInMovement;
        state.is_show_companions = payload.is_show_companions;
        if (payload.avatar) {
          state.avatar = payload.avatar;
        }
        if (payload.phone) {
          state.phone = payload.phone;
        }
        if (payload.username) {
          state.username = payload.username;
        }
        if (payload.date_birth) {
          state.date_birth = payload.date_birth;
        }
        if (payload.email) {
          state.email = payload.email;
        }
      }
    );
  },
});

export const selectConfirmPhone = (state: RootState) => state.user.confirmPhone;
export const selectAvatar = (state: RootState) => state.user.avatar;
export const selectUsername = (state: RootState) => state.user.username;
export const selectEmail = (state: RootState) => state.user.email;
export const selectPhone = (state: RootState) => state.user.phone;
export const selectUserId = (state: RootState) => state.user.id;
export const selectUserTickets = (state: RootState) => state.user.tickets;
export const selectDateBirth = (state: RootState) => state.user.date_birth;
export const selectVisuallyImpairedMode = (state: RootState) =>
  state.user.isVisuallyImpaired;
export const selectHearingImpairedMode = (state: RootState) =>
  state.user.isHearingImpaired;
export const selectRestrictedInMovementMode = (state: RootState) =>
  state.user.isRestrictedInMovement;
export const selectIsShowCompanions = (state: RootState) =>
  state.user.is_show_companions;

export const { changeVisuallyImpairedMode, changePhoneUser } =
  userSlice.actions;
