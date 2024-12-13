'use client'
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userLoggedIn, userLoggedOut } from "../auth/authSlice";
import toast from "react-hot-toast";

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_SERVER_URI,
    }),
    endpoints: (builder) => ({
        // access token
        refreshToken: builder.query({
            query: (data) => ({
                url: "user/refresh-token",
                method:"GET",
                credentials: "include" as const,
            }),
        }),
        loadUser: builder.query({
            query: ({}) => {
                const params = new URLSearchParams();
                let clientId = "";
                if (typeof window !== "undefined") {
                    clientId = localStorage.getItem("clientId") || "";
                }
                if (clientId)  params.append("clientId", clientId);
                return {
                    url: `user/me?${params.toString()}`,
                    method: "GET",
                    credentials: "include" as const,
                };
            },
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;
                    if (result.data.user) {
                        dispatch(
                            userLoggedIn({
                                token: result.data.accessToken,
                                user: result.data.user,
                            })
                        );
                    } 
                    else {
                        dispatch(
                            userLoggedOut()
                        );
                    }
                    
                } catch (error) {
                    console.log(error);
                    dispatch(userLoggedOut());
                    toast.error("登录信息已过期，请重新登录");
                }
            },
        })
    }),

})

export const {useRefreshTokenQuery, useLoadUserQuery} = apiSlice

