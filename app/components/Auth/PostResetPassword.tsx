"use client";
import React, { FC, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { style } from "../../styles/style";
import { usePostResetPasswordMutation } from "@/redux/features/auth/authApi";
import toast from "react-hot-toast";

type Props = {
    token: string;
    setRoute: (route: string) => void;
    setIsPasswordInputVisible: (visible: boolean) => void;
};

const schema = Yup.object().shape({
    password: Yup.string()
        .min(6, "密码至少为6位")
        .required("请输入您的新密码"),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "两次输入的密码不一致")
        .required("请再次确认您的密码"),
});

const ResetPassword: FC<Props> = (props: Props) => {
    const [postResetPassword, { isSuccess, error }] = usePostResetPasswordMutation();

    useEffect(() => {
        if (isSuccess) {
            toast.success("密码重置成功，请重新登录");
            props.setIsPasswordInputVisible(false);
            props.setRoute("Login");

        }

        if (error) {
            if ("data" in error) {
                const errorData = error as any;
                toast.error(errorData.data.message || "密码重置失败，请稍后重试！");
            } else {
                console.log("An error occurred:", error);
            }
        }
    }, [isSuccess, error, props]);

    const formik = useFormik({
        initialValues: { password: "", confirmPassword: "" },
        validationSchema: schema,
        onSubmit: async (values) => {
            if (!props.token) {
                toast.error("重置令牌无效或已过期！");
                return;
            }
            const token = props.token;
            try {
                await postResetPassword({ token, password: values.password }).unwrap();
            } catch (err) {
                console.error("Error resetting password:", err);
            }
        },
    });

    const { errors, touched, values, handleChange, handleSubmit } = formik;

    return (
        <div className="w-full">
            <form onSubmit={handleSubmit}>
                <label className={`${style.label}`} htmlFor="password">
                    输入您的新密码
                </label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    value={values.password}
                    onChange={handleChange}
                    placeholder="新密码"
                    className={`${errors.password && touched.password && "border-red-500"} ${style.input}`}
                />
                {errors.password && touched.password && (
                    <span className="text-red-500 pt-2 block">{errors.password}</span>
                )}

                <label className={`${style.label}`} htmlFor="confirmPassword">
                    确认您的新密码
                </label>
                <input
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    value={values.confirmPassword}
                    onChange={handleChange}
                    placeholder="确认新密码"
                    className={`${errors.confirmPassword && touched.confirmPassword && "border-red-500"} ${style.input}`}
                />
                {errors.confirmPassword && touched.confirmPassword && (
                    <span className="text-red-500 pt-2 block">{errors.confirmPassword}</span>
                )}

                <div className="w-full mt-5">
                    <input
                        type="submit"
                        value="重置密码"
                        className={`${style.button}`}
                    />
                </div>
            </form>
        </div>
    );
};

export default ResetPassword;
