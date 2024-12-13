"use client"
import react, { FC, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { style } from "../../styles/style";
import { useResetPasswordMutation } from "@/redux/features/auth/authApi";
import toast from "react-hot-toast";


type Props = {
    setRoute: (route: string) => void;
    setOpen: (open: boolean) => void;
}

const schema = Yup.object().shape({
    email: Yup.string().email("邮箱错误").required("请输入你的邮箱"),
})

const ForgetPassword: FC<Props> = (props: Props) => {

    const [ResetPassword, {isSuccess, error}] = useResetPasswordMutation();

    useEffect(() => {
        if (isSuccess) {
            toast.success("重置密码的邮件已经成功发送到您的邮箱");
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
        initialValues: {email: ""},
        validationSchema: schema,
        onSubmit: async ({email}) => {
            await ResetPassword({email}).unwrap();
        }
    })

    const { errors, touched, values, handleChange, handleSubmit } = formik;

    return (
        <div className="w-full">
            <h1 className={`${style.title}`}>
                重置密码
            </h1>

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
                    className={`${errors.email && touched.email && "border-red-500"}
            ${style.input}`}
                />
                {errors.email && touched.email && (
                    <span className="text-red-500 pt-2 block">{errors.email}</span>
                )}
                <div>
                    <div className="w-full mt-5">
                        <input
                            type="submit"
                            value="验证邮箱"
                            className={`${style.button}`}
                        />
                    </div>
                    <br />
                    <h5 className="text-center pt-4 font-Poppins text-[14px] text-black dark:text-white">
                        前往
                    <span className="text-[#2190ff] pl-1 cursor-pointer" onClick={() => props.setRoute("Login")}> 登录</span>
                    </h5>
                </div>
            </form>
            <br />
        </div>
    )
}

export default ForgetPassword;