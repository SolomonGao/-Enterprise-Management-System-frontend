'use client'
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import avatarDefault from '../../../public/avatar.png';
import { AiOutlineCamera } from 'react-icons/ai';
import { style } from "../../../app/styles/style"
import { useEditProfileMutation, useUpdateAvatarMutation } from '../../../redux/features/user/userApi';
import { useLoadUserQuery } from '@/redux/features/api/apiSlice';
import toast from 'react-hot-toast';
import { useLogoutMutation } from '@/redux/features/auth/authApi';

type Props = {
    user: any;
    avatar: string | null;
};

const ProfileInfo: React.FC<Props> = ({ user, avatar }) => {
    const [name, setName] = useState(user.name);
    const [updateAvatar, { isSuccess, error }] = useUpdateAvatarMutation();
    const [loadUser, setLoadUser] = useState(false);
    const { } = useLoadUserQuery(undefined, { skip: loadUser ? false : true })
    const [role, setRole] = useState(user.role)

    const [editProfile, { isSuccess: success, error: updateError }] = useEditProfileMutation();
    const [logout, {isSuccess: logoutSuccess, error: logoutError}] = useLogoutMutation();

    const [isUploading, setIsUploading] = useState(false);

    const imageHandler = async (e: any) => {
        const fileReader = new FileReader();

        setIsUploading(true);

        fileReader.onload = () => {
            if (fileReader.readyState === 2) {
                const avatar = fileReader.result;
                updateAvatar(
                    avatar
                )
            }
        };
        fileReader.readAsDataURL(e.target.files[0]);
    }

    const logoutHandler = async () => {
        await logout({}).unwrap();
    }

    useEffect(() => {
        if (isSuccess || success) {
            setIsUploading(false);
            setLoadUser(true);
            toast.success("更改用户信息成功, 请重新登录");
            logoutHandler();
            
        }
        if (error || updateError) {
            console.log(error);
            setIsUploading(false);
            toast.success("更改用户信息失败");
        } 

    }, [isSuccess, error, success, updateError])


    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (name != "") {
            await editProfile({
                email: user.email,
                name: name,
                role: role
            })
        }
    }

    return (
        <div className="w-full flex-column justify-center items-center">
            <div className="relative w-[150px] m-auto">
                <Image
                    src={user.avatar || avatar ? user.avatar.url || avatar : avatarDefault}
                    alt="Avatar"
                    width={120}
                    height={120}
                    className="m-auto w-[120px] h-[120px] cursor-pointer border-[2px] border-[#fffff16] dark:border-[#ffffff1d] rounded-[5px] dark:shadow-sm shawdow-xl rounded-full"
                />
                <input
                    id="avatar"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={imageHandler}
                />
                <label
                    htmlFor="avatar">
                    <div className="absolute bottom-0 right-2 m-2 w-[30px] h-[30px] dark:bg-slate-900 bg-white rounded-full flex items-center justify-center cursor-pointer">
                        <AiOutlineCamera size={20} className='z-10 dark:text-white text-black' /></div>
                </label>
                {/* 显示上传中 */}
                {isUploading && (
                    <div className="absolute inset-0 flex justify-center items-center bg-opacity-50 bg-gray-700 rounded-full">
                        <span className="text-black dark:text-white text-sm">uploading...</span>
                    </div>)}
            </div>
            <br />
            <br />
            <div className='w-full pl-6 800px:pl-10'>
                <form onSubmit={handleSubmit}>
                    <div className='800px:w-[50%] m-auto block pd-4'>
                        <div className='w-[100%]'>
                            <label className='block text-black dark:text-white'> 姓名</label>
                            <input
                                type='text'
                                className={`${style.input} !w-[95%] dark:text-white dark:bg-slate-800`}
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div className='w-[100%] pt-2'>
                            <label className='block text-black dark:text-white'> 邮箱地址</label>
                            <input
                                type='text'
                                readOnly
                                className={`${style.input} !w-[95%] dark:text-white dark:bg-slate-800`}
                                required
                                value={user?.email}
                            />
                        </div>

                        <div className='w-[100%] pt-2'>
                            <label className='block text-black dark:text-white'> 职位</label>
                            <select
                                className={`${style.input} !w-[95%] dark:text-white dark:bg-slate-800`}
                                onChange={(e) => setRole(e.target.value)}
                                value={role}
                                disabled={user.role !== "管理"} 
                                >
                                <option value={"员工"}>员工</option>
                                <option value={"管理"}>管理</option>
                            </select>

                        </div>
                        <br/>
                        <br/>
                        <div className="w-full">
                            <input
                                className={`${style.button}`}
                                required
                                defaultValue="更新"
                                type='Submit'
                            />
                        </div>
                    </div>
                </form>
            </div>
        </div>

    );
};

export default ProfileInfo;
