"use client"
import Link from "next/link"
import React, { FC, useEffect, useState } from "react"
import NavItems from "../utils/NavItems";
import { ThemeSwitcher } from "../utils/ThemeSwitcher";
import { HiOutlineMenuAlt4, HiOutlineUserCircle } from "react-icons/hi"
import CustomModal from "../utils/CustomModal";
import Login from "./Auth/Login";
import Verification from "./Auth/Verfication";
import { FaTimes } from "react-icons/fa";
import { useSelector } from "react-redux";
import Image from "next/image";
import avatar from "../../public/avatar.png";
import ResetPassword from "./Auth/ResetPassword";
import SignUp from "./Auth/SignUp";
import PostResetPassword from "./Auth/PostResetPassword";

type Props = {
    open: boolean;
    setOpen: (open: boolean) => void;
    activeItem: number;
    route: string;
    setRoute: (route: string) => void;
}

const Header: FC<Props> = ({ activeItem, setOpen, route, open, setRoute }) => {

    const [active, setActive] = useState(false);
    const [openSiderbar, setOpenSiderbar] = useState(false);
    const { user } = useSelector((state: any) => state.auth);


    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 80) {
                setActive(true);
            } else {
                setActive(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        // 清理事件监听器，防止内存泄漏
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []); // 空依赖数组，确保只在组件挂载和卸载时执行



    // if (typeof window !== "undefined") {
    //     window.addEventListener("scroll", () => {
    //         if (window.scrollY > 80) {
    //             setActive(true);
    //         } else {
    //             setActive(false);
    //         }
    //     })
    // }

    const handleClose = (e: any) => {
        if (e.target.id === "screen") {
            setOpenSiderbar(false);
        }
    }

    const handleSidebarClose = () => {
        setOpenSiderbar(false);
    }

    return (
        <div className="w-full relative">
            <div
                className={`${active
                    ? "dark:bg-opacity-50 dark:bg-gradient-to-b dark:from-gray-900 dark:to-black bg-gradient-to-b from-white to-white  fixed top-0 left-0 w-full h-[80px] z-[10] border-b dark:border-[#ffffff1c] shadow-xl transition duration-500"
                    : "w-full border-b dark:border-[#ffffff1c] h-[80px] z-[10] dark:shadow"
                    }`}>
                <div className='w-[95%] 800px:w-[92%] m-auto py-2 h-full'>
                    <div className='w-full h-[80px] flex items-center justify-between p-3'>
                        <div>
                            <Link href={"/"} className={`text-[25px] font-Poppins font-[500] text-black dark:text-white`}>
                                成都南方石化密封件有限公司
                            </Link>
                        </div>
                        <div className="flex items-center">
                            <NavItems
                                activeItem={activeItem}
                                isMobile={false} />
                            <ThemeSwitcher />
                            {/* {only for mobile} */}
                            <div className='800px:hidden'>
                                <HiOutlineMenuAlt4
                                    size={25}
                                    className="cursor-pointer dark:text-white text-black"
                                    onClick={() => setOpenSiderbar(true)}
                                />
                            </div>
                            {
                                user ? (
                                    <>
                                        <Link href={"/profile"}>
                                            <Image
                                                src={user.avatar ? user.avatar.url : avatar}
                                                alt=""
                                                className='w-[30px] h-[30px] rounded-full items-center justify-center cursor-pointer'
                                                width={25}
                                                height={25}
                                                style={{ border: activeItem === 6 ? "2px solid #ffc107" : " " }}
                                            />
                                        </Link>
                                    </>
                                ) : (
                                    <HiOutlineUserCircle
                                        size={25}
                                        className=" hidden 800px:block cursor-pointer dark:text-white text-black"
                                        onClick={() => setOpen(true)}
                                    />
                                )
                            }

                        </div>
                    </div>
                </div>

                {/* mobile siderbar */}
                {
                    openSiderbar && (
                        <div
                            className="800px:hidden fixed w-full h-screen top-0 left-0 z-[99999] dark:bg-[unset] bg-[#00000024]"
                            onClick={handleClose}
                            id="screen"
                        >

                            <div className='w-[70%] fixed z-[999999999] h-screen bg-white dark:bg-slate-900 dark:bg-opacity-90 top-0 right-0'>
                                <div className='w-full text-center py-6'>
                                    <Link href={"/"} passHref>
                                        <span className={'text-[25px] font-Poppins font-[500] text-black dark:text-white'}>
                                            企业管理系统
                                        </span>
                                    </Link>
                                </div>
                                <div
                                    className='absolute top-2 right-2 text-gray-500 hover:text-black dark:hover:text-white cursor pointer'
                                    onClick={handleSidebarClose}
                                >
                                    <FaTimes size={20} />
                                </div>
                                {user ? (
                                    <>
                                        <Link href={"/profile"}>
                                            <Image
                                                src={user.avatar ? user.avatar.url : avatar}
                                                alt=""
                                                className='ml-10 w-[30px] h-[30px] rounded-full items-center justify-center cursor-pointer'
                                                width={25}
                                                height={25}
                                                style={{ border: activeItem === 6 ? "2px solid #ffc107" : " " }}
                                            />
                                        </Link>
                                    </>
                                ) : (<HiOutlineUserCircle
                                    size={25}
                                    className="cursor-pointer center text-black dark:text-white mx-10"
                                    onClick={() => setOpen(true)}
                                />)
                                }
                                <NavItems
                                    activeItem={activeItem}
                                    isMobile={true} />

                                <br />
                                <br />
                                <p className='text-[16px] px-2 ml-5 pl-5 text-black dark:text-white'>
                                    Copyright © 2024 Xing Gao ERP
                                </p>
                            </div>
                        </div>
                    )
                }
            </div>
            {
                route === "Login" && (
                    <>
                        {
                            open && (
                                <CustomModal
                                    open={open}
                                    setOpen={setOpen}
                                    setRoute={setRoute}
                                    activeItem={activeItem}
                                    component={Login}
                                />
                            )
                        }
                    </>
                )
            }

            {
                route === "Verification" && (
                    <>
                        {
                            open && (
                                <CustomModal
                                    open={open}
                                    setOpen={setOpen}
                                    setRoute={setRoute}
                                    activeItem={activeItem}
                                    component={Verification}
                                >


                                </CustomModal>
                            )
                        }
                    </>
                )
            }

{
                route === "Reset-Password" && (
                    <>
                        {
                            open && (
                                <CustomModal
                                    open={open}
                                    setOpen={setOpen}
                                    setRoute={setRoute}
                                    activeItem={activeItem}
                                    component={ResetPassword}
                                >
                                </CustomModal>
                            )
                        }
                    </>
                )
            }
            {
                route === "SignUp" && (
                    <>
                        {
                            open && (
                                <CustomModal
                                    open={open}
                                    setOpen={setOpen}
                                    setRoute={setRoute}
                                    activeItem={activeItem}
                                    component={SignUp}
                                />
                            )
                        }
                    </>
                )
            }
        </div>
    )
}

export default Header