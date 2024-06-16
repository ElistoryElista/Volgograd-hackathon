import { createSlice } from "@reduxjs/toolkit";
import { routeApi } from "../api/route-api";
import { TPlace, TValhallaPoint } from "@/shared/model/types";

type TRouteData = { distance: number | null; duration: number | null };

interface IRouteSliceState {
  methodMovement: "car" | "foot" | "wheelchair";
  carRouteData: TRouteData;
  wheelchairRouteData: TRouteData;
  footRouteData: TRouteData;
  startPosition: TValhallaPoint | null;
  userPosition: TValhallaPoint | null;
  isMobileSheet: boolean;
  localIncidentPoints: TValhallaPoint[];
  localTrip: TPlace[] | null;
}

const initialStates: IRouteSliceState = {
  methodMovement: "car",
  carRouteData: { distance: null, duration: null },
  wheelchairRouteData: { distance: null, duration: null },
  footRouteData: { distance: null, duration: null },
  startPosition: null,
  userPosition: null,
  isMobileSheet: false,
  localIncidentPoints: [],
  localTrip: JSON.parse(String(localStorage.getItem("localTrip"))),
};

export const routeSlice = createSlice({
  name: "route",
  initialState: initialStates,
  reducers: {
    changeMethodMovement: (state, { payload }) => {
      state.methodMovement = payload;
    },
    changeStartPosition: (
      state,
      { payload }: { payload: TValhallaPoint | null }
    ) => {
      state.startPosition = payload;
    },
    changeUserPosition: (
      state,
      { payload }: { payload: TValhallaPoint | null }
    ) => {
      state.userPosition = payload;
    },
    closeMobileSheet: (state) => {
      state.isMobileSheet = false;
    },
    openMobileSheet: (state) => {
      state.isMobileSheet = true;
    },
    addLocalIncidentPoint: (
      state,
      { payload }: { payload: TValhallaPoint }
    ) => {
      state.localIncidentPoints.push(payload);
    },
    changeLocalTrip: (state, { payload }) => {
      state.localTrip = payload;
      localStorage.setItem("localTrip", JSON.stringify(payload));
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      routeApi.endpoints.getRouteByPlacesIds.matchFulfilled,
      (state: IRouteSliceState, { payload }) => {
        if (payload.distance && payload.duration) {
          if (state.methodMovement === "car")
            state.carRouteData = {
              distance: payload.distance,
              duration: payload.duration,
            };
          else if (state.methodMovement === "foot")
            state.footRouteData = {
              distance: payload.distance,
              duration: payload.duration,
            };
          else if (state.methodMovement === "wheelchair")
            state.wheelchairRouteData = {
              distance: payload.distance,
              duration: payload.duration,
            };
        }
      }
    );
  },
});

export const selectMethodMovement = (state: RootState) =>
  state.route.methodMovement;
export const selectFootRouteData = (state: RootState) =>
  state.route.footRouteData;
export const selectCarRouteData = (state: RootState) =>
  state.route.carRouteData;
export const selectWheelchairRouteData = (state: RootState) =>
  state.route.wheelchairRouteData;
export const selectStartPosition = (state: RootState) =>
  state.route.startPosition;
export const selectUserPosition = (state: RootState) =>
  state.route.userPosition;
export const selectIsMobileSheet = (state: RootState) =>
  state.route.isMobileSheet;
export const selectLocalIncidentPoints = (state: RootState) =>
  state.route.localIncidentPoints;
export const selectLocalTrip = (state: RootState) => state.route.localTrip;

export const {
  changeMethodMovement,
  changeStartPosition,
  changeUserPosition,
  closeMobileSheet,
  openMobileSheet,
  addLocalIncidentPoint,
  changeLocalTrip,
} = routeSlice.actions;
