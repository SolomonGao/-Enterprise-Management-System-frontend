"use client";
import { FC, useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { style } from "../../styles/style";
import toast from "react-hot-toast";
import { useChangePasswordMutation } from "../../../redux/features/user/userApi"; // Assuming you have the mutation setup for password change
import { useLogoutMutation } from "@/redux/features/auth/authApi";
import { ErrorResponse } from "@/app/utils/types";

type Props = {
  active: number;
  user: any;
};

const schema = Yup.object().shape({
  currentPassword: Yup.string().required("请输入您的当前密码").min(6, "密码长度至少为6个字符"),
  newPassword: Yup.string().required("请输入新密码").min(6, "密码长度至少为6个字符"),
  confirmPassword: Yup.string().oneOf([Yup.ref('newPassword'), undefined], "确认密码必须与新密码匹配").required("请输入确认密码"),
});

const ChangePassword: FC<Props> = ({ active, user }) => {
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const [changePassword, { data, error, isSuccess }] = useChangePasswordMutation();
  const [logout, { }] = useLogoutMutation();

  const logoutHandler = async () => {
    await logout("");
  }

  useEffect(() => {
    if (isSuccess) {
      const message = data.message || "密码更改成功, 请重新登录";
      toast.success(message);
      setIsSubmitting(false);
      logoutHandler();

    }
    if (error) {
      if ("data" in error) {
        const errorData = error as ErrorResponse;
        toast.error(errorData.data!.message);
        setIsSubmitting(false);
      }

    }
  }, [isSuccess, error]);

  const formik = useFormik({
    initialValues: { currentPassword: "", newPassword: "", confirmPassword: "" },
    validationSchema: schema,
    onSubmit: async ({ currentPassword, newPassword }) => {
      setIsSubmitting(true);
      await changePassword({ currentPassword, newPassword });
    },
  });

  const { errors, touched, values, handleChange, handleSubmit } = formik;

  return (
    <div className="w-full max-w-md mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
      <h1 className={`${style.title} text-center`}>更改密码</h1>
      <form onSubmit={handleSubmit}>
        <div className="w-full mt-3 relative mb-1">
          <label htmlFor="currentPassword" className={style.label}>当前密码</label>
          <input
            type={!show ? "password" : "text"}
            name="currentPassword"
            value={values.currentPassword}
            onChange={handleChange}
            id="currentPassword"
            placeholder="当前密码"
            className={`${errors.currentPassword && touched.currentPassword && "border-red-500"} ${style.input}`}
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
                  {errors.currentPassword && touched.currentPassword && (
            <span className="text-red-500 pt-2 block">{errors.currentPassword}</span>
          )}

        <div className="w-full mt-3 relative mb-1">
          <label htmlFor="newPassword" className={style.label}>新密码</label>
          <input
            type={!show1 ? "password" : "text"}
            name="newPassword"
            value={values.newPassword}
            onChange={handleChange}
            id="newPassword"
            placeholder="新密码"
            className={`${errors.newPassword && touched.newPassword && "border-red-500"} ${style.input}`}
          />
          {!show1 ? (
            <AiOutlineEyeInvisible
              className="absolute bottom-3 right-2 z-1 cursor-pointer"
              size={20}
              onClick={() => setShow1(true)} />
          ) : (
            <AiOutlineEye
              className="absolute bottom-3 right-2 z-1 cursor-pointer"
              size={20}
              onClick={() => setShow1(false)} />
          )}
        </div>

        {errors.newPassword && touched.newPassword && (
            <span className="text-red-500 pt-2 block">{errors.newPassword}</span>
          )}

        <div className="w-full mt-3 relative mb-1">
          <label htmlFor="confirmPassword" className={style.label}>确认新密码</label>
          <input
            type={!show2 ? "password" : "text"}
            name="confirmPassword"
            value={values.confirmPassword}
            onChange={handleChange}
            id="confirmPassword"
            placeholder="确认新密码"
            className={`${errors.confirmPassword && touched.confirmPassword && "border-red-500"} ${style.input}`}
          />
          {!show2 ? (
            <AiOutlineEyeInvisible
              className="absolute bottom-3 right-2 z-1 cursor-pointer"
              size={20}
              onClick={() => setShow2(true)} />
          ) : (
            <AiOutlineEye
              className="absolute bottom-3 right-2 z-1 cursor-pointer"
              size={20}
              onClick={() => setShow2(false)} />
          )}
        </div>
        {errors.confirmPassword && touched.confirmPassword && (
            <span className="text-red-500 pt-2 block">{errors.confirmPassword}</span>
          )}

        {passwordError && <div className="text-red-500 text-sm mb-4">{passwordError}</div>}

        <div>
          <button
            type="submit"
            className={`mt-3 ${style.button} ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "提交中..." : "更改密码"}
          </button>
        </div>
        <br />
      </form>
    </div>
  );
};

export default ChangePassword;
