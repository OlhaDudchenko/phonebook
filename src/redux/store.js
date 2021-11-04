import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import authReducer from "./authorization/authSlice";
import { axiosBaseQuery } from "./authorization/auth";
// import logger from "redux-logger";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { contactsApi } from "./phonebook/contacts";
import { authorizationApi } from "./authorization/auth";

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["token", "user"],
};

const contactsPersistConfig = {
  key: "contacts",
  storage,
  whitelist: ["queries", "mutations"],
};
export const store = configureStore({
  reducer: {
    [contactsApi.reducerPath]: persistReducer(
      contactsPersistConfig,
      contactsApi.reducer
    ),
    [authorizationApi.reducerPath]: authorizationApi.reducer,
    auth: persistReducer(authPersistConfig, authReducer),
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
    // logger,
    contactsApi.middleware,
    authorizationApi.middleware,
  ],
  devTools: process.env.NODE_ENV === "development",
});

store.subscribe(axiosBaseQuery);
setupListeners(store.dispatch);

export const persistor = persistStore(store);
