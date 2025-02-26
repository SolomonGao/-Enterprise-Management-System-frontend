'use client'

import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { apiSlice } from "./features/api/apiSlice";
import authSlice from "./features/auth/authSlice";
import storage from "redux-persist/lib/storage"; // 使用 localStorage
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";

// 添加在文件开头
if (typeof process.env.NEXT_PUBLIC_SERVER_URI === 'undefined') {
    throw new Error('NEXT_PUBLIC_SERVER_URI is not defined');
}

// 定义 RootState 类型
export type RootState = ReturnType<typeof rootReducer>;

// 持久化配置
const persistConfig = {
    key: "root",
    storage,
    whitelist: ["auth"], // 只持久化 auth 状态
    blacklist: [apiSlice.reducerPath], // 避免持久化 API 状态
    version: 1,  // 添加版本控制
    // 添加迁移处理
    migrate: (state: any) => {
        return Promise.resolve(state);
    },
};

const rootReducer = combineReducers({
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
                ignoredPaths: ['register'],
                // 添加更多需要忽略的路径
                warnAfter: 128,
            },
            // 添加运行时检查
            immutableCheck: { warnAfter: 128 },
        }).concat(apiSlice.middleware),
})

export const persistor = persistStore(store);

// 定义 AppDispatch 类型
export type AppDispatch = typeof store.dispatch;

// call the resrsh token every page load
const initializeApp = async () => {
    try {
        if (!store.getState().auth.token) {
            await store.dispatch(
                apiSlice.endpoints.refreshToken.initiate({}, { forceRefetch: true })
            );
            await store.dispatch(
                apiSlice.endpoints.loadUser.initiate({}, { forceRefetch: true })
            );
        }
    } catch (error) {
        console.error("Failed to initialize app:", error);
    }
}

// 仅在客户端运行初始化
if (typeof window !== 'undefined') {
    initializeApp().catch(error => {
        console.error("App initialization failed:", error);
    });
}