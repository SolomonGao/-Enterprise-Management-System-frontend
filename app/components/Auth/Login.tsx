"use client"
import react, { FC, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { style } from "../../styles/style";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from 'uuid';


type Props = {
    setRoute: (route: string) => void;
    setOpen: (open: boolean) => void;
}

const schema = Yup.object().shape({
    email: Yup.string().email("邮箱错误").required("请输入你的邮箱"),
    password: Yup.string().required("请输入你的密码").min(6)
})

const Login: FC<Props> = (props: Props) => {

    const [show, setShow] = useState(false);

    const [login, { isSuccess, error }] = useLoginMutation();

    const savedClientId = localStorage.getItem("clientId") || uuidv4();
    localStorage.setItem("clientId", savedClientId);

    useEffect(() => {
        if (isSuccess) {
            toast.success("登陆成功");
            props.setOpen(false);
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
        initialValues: { email: "", password: "" },
        validationSchema: schema,
        onSubmit: async ({ email, password }) => {
            const clientId = localStorage.getItem("clientId")
            await login({ email, password, clientId }).unwrap();
        }
    })

    const { errors, touched, values, handleChange, handleSubmit } = formik;

    return (
        <div className="w-full">
            <h1 className={`${style.title}`}>
                登录系统
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
                <div className="w-full mt-5 relative mb-1">
                    <label
                        className={`${style.label}`}
                        htmlFor="password">
                        输入您的密码
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
                {errors.password && touched.password && (
                    <span className="text-red-500 pt-2 block">{errors.password}</span>
                )}
                <div>
                    <div className="w-full mt-5">
                        <input
                            type="submit"
                            value="登录"
                            className={`${style.button}`}
                        />
                    </div>
                    <br />
                    <h5 className="text-center pt-4 font-Poppins text-[14px] text-black dark:text-white">

                        <span className="text-[#2190ff] pl-1 cursor-pointer" onClick={() => props.setRoute("Reset-Password")}> 忘记密码？</span>
                    </h5>
                </div>
            </form>
            <br />
        </div>
    )
}

export default Login;