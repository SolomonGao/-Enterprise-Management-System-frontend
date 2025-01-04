'use client'
import { apiSlice } from "../api/apiSlice";

import { userLoggedIn, userLoggedOut, userRegistration } from "./authSlice";

type RegistrationResponse = {
    message: string;
    activationToken: string;
}

type RegistrationData = {
    name: string;
    email: string;
    password: string;
};

// type ActivationData = {
//     activation_token: string;
//     activation_code: string;
// };

// type ActivationResponse = {
//     message: string;
// };

export const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        //endpoint
        register: builder.mutation<RegistrationResponse, RegistrationData>({
            query: (data) => ({
                url: "user/registration",
                method: "POST",
                body: data,
                credentials: "include" as const,
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;
                    dispatch(
                        userRegistration({
                            token: result.data.activationToken,
                        })
                    );
                } catch (error) {
                    console.log(error);
                }
            }
        }),
        activation: builder.mutation({
            query: ({ activation_token, activation_code }) => ({
                url: "user/activation",
                method: "POST",
                body: {
                    activation_token,
                    activation_code
                },
            }),
        }),
        login: builder.mutation({
            query: ({ email, password, clientId }) => ({
                url: "user/login",
                method: "POST",
                body: {
                    email,
                    password,
                    clientId,
                },
                credentials: "include" as const,
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;
                    dispatch(
                        userLoggedIn({
                            token: result.data.accessToken,
                            user: result.data.user,
                            clientId: result.data.clientId
                        })
                    )
                } catch (error) {
                    console.log(error);
                }
            }
        }),
        logout: builder.mutation({
            query: () => ({
                url: "user/logout",
                method: "GET",
                credentials: "include" as const
            }),
            async onQueryStarted(arg, { dispatch}) {
                try {
                    localStorage.clear();
                    dispatch(
                        userLoggedOut()
                    )
                } catch (error) {
                    console.log(error);
                }
            }
        }),
        resetPassword: builder.mutation({
            query: ({email}) => ({
                url: "user/reset-password",
                method: "POST",
                body: {email},
                credentials: "include" as const
            }),
        }),
        postResetPassword:  builder.mutation({
            query: ({token, password}) => ({
                url: `user/post-reset-password/?token=${new URLSearchParams(token).toString()}`,
                method: "POST",
                body: {password},
                credentials: "include" as const
            }),
        }),
    })
})

export const { useActivationMutation, useRegisterMutation, useLoginMutation, useLogoutMutation, useResetPasswordMutation, usePostResetPasswordMutation } = authApi;