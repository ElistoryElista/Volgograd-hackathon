import { combineReducers } from "@reduxjs/toolkit";
import { userSlice, sessionSlice, routeSlice } from "@/entities";
import { baseApi } from "@/shared/api";

export const rootReducer = combineReducers({
  [sessionSlice.name]: sessionSlice.reducer,
  [userSlice.name]: userSlice.reducer,
  [routeSlice.name]: routeSlice.reducer,
  [baseApi.reducerPath]: baseApi.reducer,
});
