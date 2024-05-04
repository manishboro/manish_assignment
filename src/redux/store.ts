import { configureStore } from "@reduxjs/toolkit";

import jobListingsReducer from "./jobListings/jobListings.slice";

export const store = configureStore({
  reducer: { jobListingsReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
