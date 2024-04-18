import { configureStore } from "@reduxjs/toolkit";
import userSliceReducer from "./slices/userSlice";
import locationSliceReducer from "./slices/locationSlice";

const store = configureStore({
  reducer: { user: userSliceReducer, location: locationSliceReducer },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: true,
});

export default store;
