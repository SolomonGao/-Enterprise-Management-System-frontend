'use client'

import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { apiSlice } from "./features/api/apiSlice";
import authSlice from "./features/auth/authSlice";
import storage from "redux-persist/lib/storage"; // 使用 localStorage
import { persistStore, persistReducer } from "redux-persist";


// 持久化配置
const persistConfig = {
    key: "root",
    storage,
    whitelist: ["auth"], // 只持久化 auth 状态
  };

  const rootReducer = combineReducers({
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSlice,
  });
  

  const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    devTools: false,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: ["persist/REGISTER"], // 忽略 redux-persist 的 REGISTER action
            ignoredPaths: ["register"], // 忽略包含非序列化值的路径
          },
    }).concat(apiSlice.middleware)
})

export const persistor = persistStore(store);

// call the resrsh token every page load
const initializeApp = async () => {
    try {
        await store.dispatch(apiSlice.endpoints.refreshToken.initiate({}, { forceRefetch: true }));
        await store.dispatch(apiSlice.endpoints.loadUser.initiate({}, { forceRefetch: true }));
    } catch (error) {
        console.error("Failed to initialize app:", error);
    }

}

initializeApp();