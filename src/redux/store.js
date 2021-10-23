import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import phonebookReducer from "./phonebook/contacts-reducer";
import authorizationReducer from "./authorization/auth-reducer";
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

const authPersistConfig = {
  key: "authorization",
  storage,
  whitelist: ["token"],
};

const contactsPersistConfig = {
  key: "contacts",
  storage,
  blacklist: ["filter"],
};
export const store = configureStore({
  reducer: {
    authorization: persistReducer(authPersistConfig, authorizationReducer),
    contacts: persistReducer(contactsPersistConfig, phonebookReducer),
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
    logger,
  ],
  devTools: process.env.NODE_ENV === "development",
});

export const persistor = persistStore(store);
