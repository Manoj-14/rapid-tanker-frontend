import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userSliceReducer from "./slices/userSlice";
import locationSliceReducer from "./slices/locationSlice";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";

const userPersistConfig = {
  key: "user",
  storage,
};

const locationPersistConfig = {
  key: "location",
  storage,
};

// const rootReducer = combineReducers({
//   user: userSliceReducer,
//   location: locationSliceReducer,
// });

const userPersistedReducer = persistReducer(
  userPersistConfig,
  userSliceReducer
);
const LocationPersistedReducer = persistReducer(
  locationPersistConfig,
  locationSliceReducer
);

// const persistedReducer = persistReducer(persistRootConfig, rootReducer);

export const store = configureStore({
  reducer: { user: userPersistedReducer, location: LocationPersistedReducer },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: true,
});

export const persistor = persistStore(store);
