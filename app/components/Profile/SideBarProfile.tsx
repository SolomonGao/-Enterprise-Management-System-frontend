'use client'
import Image from 'next/image';
import React, { FC } from 'react'
import avatarDefault from "../../../public/avatar.png";
import { RiLockPasswordLine } from 'react-icons/ri';
import { AiOutlineLogout } from 'react-icons/ai';
import { FaUserEdit } from "react-icons/fa";
import { GrUserManager } from "react-icons/gr";
import Link from 'next/link';


type Props = {
    user: any;
    active: number;
    avatar: string | null;
    setActive: (active: number) => void;
    logoutHandler: any;

}

const SideBarProfile: FC<Props> = ({ user, active, avatar, setActive, logoutHandler }: Props) => {

    return (
        <div className='w-full'>
            <div className={`w-full flex items-center px-3 py-4 cursor-pointer ${active === 1 ? "bg-black dark:bg-slate-800" : "bg-transparent"}`}
                onClick={() => setActive(1)}
            >
                <Image
                    src={user.avatar || avatar ? user.avatar.url : avatarDefault}
                    alt=""
                    width={20}
                    height={20}
                    className={`w-[20px] h-[20px] 800px:w-[30px] 800px:h-[30px] cursor-pointer rounded-full ${active === 1 ? "text-white" : ""}`} />
                <h5 className={`pl-2 800px:block hidden font-Poppins text-black dark:text-white ${active === 1 ? "text-white" : ""}`}>
                    我的信息
                </h5>
            </div>

            <div className={`w-full flex items-center px-3 py-4 cursor-pointer ${active === 2 ? "bg-black dark:bg-slate-800" : "bg-transparent"}`}
                onClick={() => setActive(2)}
            >
                <RiLockPasswordLine size={20} className={`dark:text-white text-black ${active === 2 ? "text-white" : ""}`}/>
                <h5 className={`pl-2 800px:block hidden font-Poppins text-black dark:text-white ${active === 2 ? "text-white" : ""}`}>
                    更改密码
                </h5>
            </div>

            <div className={`w-full flex items-center px-3 py-4 cursor-pointer ${active === 3 ? "bg-black dark:bg-slate-800" : "bg-transparent"}`}
                onClick={() => setActive(3)}
            >
                <FaUserEdit size={20} className={`dark:text-white text-black ${active === 3 ? "text-white" : ""}`}/>
                <h5 className={`pl-2 800px:block hidden font-Poppins text-black dark:text-white ${active === 3 ? "text-white" : ""}`}>
                    更改他人权限
                </h5>
            </div>

            {user.role === "管理" && (
                <Link className={`w-full flex items-center px-3 py-4 cursor-pointer ${active === 4 ? "bg-black dark:bg-slate-800" : "bg-transparent"}`}
               href={"/admin"}
            >
                <GrUserManager size={20} className={`dark:text-white text-black ${active === 4 ? "text-white" : ""}`}/>
                <h5 className={`pl-2 800px:block hidden font-Poppins text-black dark:text-white ${active === 4 ? "text-white" : ""}`}>
                    管理页面
                </h5>
            </Link>
            )}

            <div className={`w-full flex items-center px-3 py-4 cursor-pointer ${active === 5 ? "bg-black dark:bg-slate-800" : "bg-transparent"}`}
                onClick={() => logoutHandler()}
            >
                <AiOutlineLogout size={20} className={`dark:text-white text-black ${active === 5 ? "text-white" : ""}`}/>
                <h5 className={`pl-2 800px:block hidden font-Poppins text-black dark:text-white ${active ===5 ? "text-white" : ""}`}>
                    登出设备
                </h5>
            </div>


        </div>
    )
}

export default SideBarProfile