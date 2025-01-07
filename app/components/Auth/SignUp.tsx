"use client"
import { FC, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { style } from "../../styles/style";
import { useRegisterMutation } from "../../../redux/features/auth/authApi"
import toast from "react-hot-toast";
import Verification from "./Verfication";
import { Token } from "@mui/icons-material";

type Props = {
    setRoute: (route: string) => void;
    setOpen: (open: boolean) => void;
}

const schema = Yup.object().shape({
    name: Yup.string().required("请输入您的姓名").min(2, "名字必须是两位以上"),
    email: Yup.string().email("邮箱错误").required("请输入您的邮箱"),
    password: Yup.string().required("请输入邮箱").min(6),
    token: Yup.string().required("请输入邀请码"),
});


const SignUp: FC<Props> = (props: Props) => {
    const [show, setShow] = useState(false)
    const [register, { data, error, isSuccess }] = useRegisterMutation();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false)


    useEffect(() => {
        if (isSuccess) {
            const message = data.message || "注册成功";
            toast.success(message);
            setIsSubmitting(false);
            setSubmitted(true);
        }
        if (error) {
            if ("data" in error) {
                const errorData = error as any;
                toast.error(errorData.data.message);
            } else {
                console.log('An error occured: ', error);
            }
            setIsSubmitting(false);
        }
    }, [isSuccess, error])



    const formik = useFormik({
        initialValues: { name: "", email: "", password: "", token: "" },
        validationSchema: schema,
        onSubmit: async ({ name, email, password }) => {
            const data = {
                name, email, password, token
            };
            setIsSubmitting(true);
            await register(data);
        }
    });

    const { errors, touched, values, handleChange, handleSubmit } = formik;
    return (
        <div>
            {!submitted && (
                <div className="w-full">
                    <h1 className={`${style.title}`}>
                        账号创建
                    </h1>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label
                                className={`${style.label}`}
                                htmlFor="name">
                                请输入您的姓名
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={values.name}
                                onChange={handleChange}
                                id="name"
                                placeholder="JohnDoe"
                                className={`${errors.name && touched.name && "border-red-500"}
                ${style.input}`}
                            />
                            {errors.name && touched.name && (
                                <span className="text-red-500 pt-2 block">{errors.name}</span>
                            )}
                        </div>
                        <div className="mb-4">
                            <label
                                className={`${style.label}`}
                                htmlFor="email">
                                请输入你的邮箱
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
                        </div>


                        <div className="w-full mt-5 relative mb-4">
                            <div className="relative">
                                <label
                                    className={`${style.label}`}
                                    htmlFor="password">
                                    请输入你的密码
                                </label>
                                <input
                                    type={!show ? "password" : "text"}
                                    name="password"
                                    value={values.password}
                                    onChange={handleChange}
                                    id="password"
                                    placeholder="password!@%"
                                    className={`${errors.password && touched.password && "border-red-500"} ${style.input}`}
                                />
                                {!show ? (
                                    <AiOutlineEyeInvisible
                                        className="absolute bottom-3 right-2 z-1 cursor-pointer"
                                        size={20}
                                        onClick={() => setShow(true)} />
                                ) : (
                                    <AiOutlineEye
                                        className="absolute bottom-3 right-2 z-1 cursor-pointer"
                                        size={20}
                                        onClick={() => setShow(false)} />
                                )}
                            </div>
                            <div>
                                {errors.password && touched.password && (
                                    <span className="text-red-500 pt-2 block">{errors.password}</span>
                                )}
                            </div>
                        </div>

                        <div className="mb-4">
                            <label
                                className={`${style.label}`}
                                htmlFor="token">
                                请输入邀请码
                            </label>
                            <input
                                type="token"
                                name="token"
                                value={values.token}
                                onChange={handleChange}
                                id="token"
                                placeholder="token"
                                className={`${errors.token && touched.token && "border-red-500"}
                ${style.input}`}
                            />
                            {errors.token && touched.token && (
                                <span className="text-red-500 pt-2 block">{errors.token}</span>
                            )}
                        </div>
                        <div>
                            <div className="w-full mt-5">
                                <input
                                    type="submit"
                                    value={isSubmitting ? "注册中..." : "注册"}
                                    className={`${style.button} ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
                                    disabled={isSubmitting}
                                />
                            </div>
                            <br />
                            <h5 className="text-center pt-4 font-Poppins text-[14px] text-black dark:text-white">

                                <span className="text-[#2190ff] pl-1 cursor-pointer" onClick={() => props.setRoute("Login")}> 登录</span>
                            </h5>
                        </div>
                    </form>
                </div>
            )}
            {submitted && (
                <div>
                    <div className='w-full h-full bg-transparent'>
                        <Verification
                            submitted={submitted}
                            setSubmitted={setSubmitted}
                        />
                    </div>

                </div>
            )}
        </div>
    )
}

export default SignUp;