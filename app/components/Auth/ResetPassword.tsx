"use client"
import react, { FC, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { style } from "../../styles/style";
import { useResetPasswordMutation } from "@/redux/features/auth/authApi";
import toast from "react-hot-toast";
import { useLazyVerifyResetPasswordTokenQuery } from "@/redux/features/user/userApi";
import PostResetPassword from "./PostResetPassword";


type Props = {
    setRoute: (route: string) => void;
    setOpen: (open: boolean) => void;
}

const schema = Yup.object().shape({
    email: Yup.string().email("邮箱错误").required("请输入你的邮箱"),
})


const ForgetPassword: FC<Props> = (props: Props) => {

    const [ResetPassword, { isSuccess, error }] = useResetPasswordMutation();
    const [isEmailSent, setIsEmailSent] = useState(false);
    const [isTokenInputVisible, setIsTokenInputVisible] = useState(false);
    const [triggerVerify, { data, isSuccess: verifySuccess, error: verifyError }] = useLazyVerifyResetPasswordTokenQuery();
    const [isPasswordInputVisible, setIsPasswordInputVisible] = useState(false);
    const [token, setToken] = useState("");

    const handleBackLogin = () => {
        props.setRoute("Login");
        setIsEmailSent(false);
        setIsTokenInputVisible(false);
        setIsPasswordInputVisible(false);
    }

    useEffect(() => {
        if (verifySuccess) {
            toast.success("验证成功，请输入新密码");
            
            setIsEmailSent(false);
            setIsTokenInputVisible(false);
            setIsPasswordInputVisible(true);


        }

        if (verifyError) {
            if ("data" in verifyError) {
                const errorData = verifyError as any;
                toast.error(errorData.data.message);
            } else {
                console.log('An error occured: ', verifyError);
            }
        }
    }, [verifySuccess, verifyError]);

    useEffect(() => {
        if (isSuccess) {
            toast.success("重置密码的邮件已经成功发送到您的邮箱");
            setIsEmailSent(true);
            setIsTokenInputVisible(true);  // 显示 token 输入框
        }

        if (error) {
            if ("data" in error) {
                const errorData = error as any;
                toast.error(errorData.data.message);
            } else {
                console.log('An error occured: ', error);
            }
        }
    }, [isSuccess, error]);

    const formik = useFormik({
        initialValues: { email: "", token: "" },
        validationSchema: schema,
        onSubmit: async ({ email, token }) => {
            if (!isEmailSent) {
                // 邮箱验证
                await ResetPassword({ email }).unwrap();
            } else {
                // token 验证
                await triggerVerify({ email, token }).unwrap();
                setToken(token);
            }
        },
    });

    const { errors, touched, values, handleChange, handleSubmit } = formik;

    return (
        <div className="w-full">
            <h1 className={`${style.title}`}>
                重置密码
            </h1>

            {/* Email and Token Verification Section */}
            {!isPasswordInputVisible && !token ? (
                <form onSubmit={handleSubmit}>
                    <label
                        className={`${style.label}`}
                        htmlFor="email">
                        输入您的邮箱号
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        id="email"
                        placeholder="loginmail"
                        className={`${errors.email && touched.email && "border-red-500"} ${style.input}`}
                    />
                    {errors.email && touched.email && (
                        <span className="text-red-500 pt-2 block">{errors.email}</span>
                    )}
                    {isTokenInputVisible && (
                        <div className="mt-5">
                            <label className={`${style.label}`} htmlFor="token">
                                输入验证码
                            </label>
                            <input
                                type="text"
                                name="token"
                                value={values.token}
                                onChange={handleChange}
                                id="token"
                                placeholder="验证码"
                                className={`${errors.token && touched.token && "border-red-500"} ${style.input}`}
                            />
                            {errors.token && touched.token && (
                                <span className="text-red-500 pt-2 block">{errors.token}</span>
                            )}
                        </div>
                    )}

                    <div>
                        <div className="w-full mt-5">
                            <input
                                type="submit"
                                value={isEmailSent ? "验证验证码" : "验证邮箱"}
                                className={`${style.button}`}
                            />
                        </div>
                        <br />
                        <br />
                        <h5 className="text-center pt-4 font-Poppins text-[14px] text-black dark:text-white">
                            前往
                            <span className="text-[#2190ff] pl-1 cursor-pointer" onClick={handleBackLogin}> 登录</span>
                        </h5>
                    </div>
                </form>
            ) : (
                // If password input is visible, show ResetPassword component
                <PostResetPassword token={token!} setRoute={props.setRoute} setIsPasswordInputVisible={setIsPasswordInputVisible}/>
            )}
        </div>
    );
}

export default ForgetPassword;