'use client'
import React, { FC, useEffect, useState } from 'react'
import SideBarProfile from "./SideBarProfile";
import { useLogoutMutation } from '@/redux/features/auth/authApi';
import toast from 'react-hot-toast';
import ProfileInfo from "./ProfileInfo";
import ChangePassword from "./ChangePassword"


type Props = {
    user: any;
}



const Profile: FC<Props> = ({ user }: Props) => {
    const [scroll, setScroll] = useState(false);
    const [avatar, setAvatar] = useState(null);
    const [loggedout, setLoggedout] = useState(false);
    const [logout, { isSuccess, error }] = useLogoutMutation();
    const [active, setActive] = useState(1);



    const logoutHandler = async () => {
        await logout({}).unwrap();
        toast.success("登出成功");
    }

    useEffect(() => {
        if (isSuccess) {
            setLoggedout(true);
        }

        if (error) {
            if ("data" in error) {
                const errorData = error as any;
                toast.error(errorData.data.message);
            } else {
                console.log('An error occured: ', error);
            }
        }
    }, [isSuccess, error])

    useEffect(() => {
        // 在组件挂载时添加事件监听
        const handleScroll = () => {
            if (window.scrollY > 80) {
                setScroll(true);
            } else {
                setScroll(false);
            }
        };

        if (typeof window !== "undefined") {
            window.addEventListener("scroll", handleScroll);
        }

        // 在组件卸载时移除事件监听
        return () => {
            if (typeof window !== "undefined") {
                window.removeEventListener("scroll", handleScroll);
            }
        };
    }, []);


    return (
        <div className='w-[85%] min-h-screen flex mx-auto'>
            <div className={`w-[60px] 800px:w-[310px] h-[450px] dark:bg-slate-900 bg-opacity-90 border bg-white border-[#fffff16] dark:border-[#ffffff1d] rounded-[5px] dark:shadow-sm shawdow-xl mt-[80px] mb-[80px] sticky ${scroll ? "top-[120px]" : "top-[30px]"
                } left-[30px]`}>
                <SideBarProfile
                    user={user}
                    active={active}
                    avatar={avatar}
                    setActive={setActive}
                    logoutHandler={logoutHandler}
                />
            </div>
            {
                active === 1 && (
                    <div className='w-full h-full bg-transparent mt-[50px] '>
                        <ProfileInfo
                            user={user}
                            avatar={avatar}
                        />
                    </div>
                )
            }
            {
                active === 2 && (
                    <div className='w-full h-full bg-transparent mt-[80px]'>
                        <ChangePassword
                            active={active}
                            user={user}
                        />
                    </div>
                )
            }
            {/* {
                active === 3 && (
                    <div className='w-full h-full bg-transparent mt-[80px]'>
                        <SignUp
                            active={active}
                            user={user}
                        />
                    </div>
                )
            } */}
        </div>
    )
}

export default Profile