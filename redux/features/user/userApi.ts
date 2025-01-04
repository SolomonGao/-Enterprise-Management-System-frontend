import { verify } from "crypto";
import { apiSlice } from "../api/apiSlice";

export const userApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        updateAvatar: builder.mutation({
            query: (avatar) => ({
                url: "user/update-profile-picture",
                method: "PUT",
                body: { avatar },
                credentials: "include" as const,
            })
        }),
        getAllUsers: builder.query({
            query: (params) => ({
                url: `user/all-users?${new URLSearchParams(params).toString()}`,// 对应后端路由 /users
                method: "GET",
                credentials: "include" as const,
            }),
        }),
        updateUserRole: builder.mutation({
            query: ({ userId, newRole }) => ({
                url: "user/update-user-role",
                method: "PUT",
                body: { userId, newRole },
                credentials: "include" as const,
            })
        }),
        editProfile: builder.mutation({
            query: ({ name, email, role }) => ({
                url: "user/edit-profile",
                method: "PUT",
                body: { name, email, role },
                credentials: "include" as const,
            })
        }),
        changePassword: builder.mutation({
            query: ({ currentPassword, newPassword }) => ({
                url: "user/change-password",
                method: "PUT",
                body: { currentPassword, newPassword },
                credentials: "include" as const,
            })
        }),
        verifyResetPasswordToken: builder.query({
            query: ({token, email}) => ({
                url: `user/verify-reset-password-token?token=${token}&email=${email}`,
                method: "GET",
                credentials: "include" as const,
            }),
        }),
    })
})

export const { useUpdateAvatarMutation, useGetAllUsersQuery, useUpdateUserRoleMutation, useEditProfileMutation, useChangePasswordMutation, useLazyVerifyResetPasswordTokenQuery } = userApi;