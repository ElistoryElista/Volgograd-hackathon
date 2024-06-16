declare global {
  declare type RootState = import("../src/app/app-store").RootState;
  declare type AppDispatch = import("../src/app/app-store").AppDispatch;
}

export {};
