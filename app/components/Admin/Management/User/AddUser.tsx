import { style } from '@/app/styles/style';
import { useAddUserMutation } from '@/redux/features/user/userApi';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

type Props = {
    user: any;
    setActive: (active: any) => void;
}

const AddUser = (props: Props) => {
    const [email, setEmail] = useState("");
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [isAdded, setIsAdded] = useState(false);
    const [addUser, { isSuccess, error, data }] = useAddUserMutation();
    const [invitationCode, setInvitationCode] = useState("");

    const nextButton = () => {
        setIsAdded(false);
        setInvitationCode("");
        setEmail("");
        props.setActive(1);
    }

    useEffect(() => {
        if (isSuccess) {
            toast.success("发送邀请码成功， 请使用以下邀请码来注册账号");
            setIsAdded(true);
            setInvitationCode(data.invitationCode);
        }
    })

    useEffect(() => {
        if (error) {
            if ("data" in error) {
                const errorData = error as any;
                toast.error(errorData.data.message);
            } else {
                console.log('检测到一个错误', error)
            }
        }
    }, [error]);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        await addUser({ email });

    }

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newEmail = e.target.value;
        setEmail(newEmail);

        // Regular expression for basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setIsEmailValid(emailRegex.test(newEmail));
    };

    return (
        <div className='p-6 min-h-screen bg-white dark:bg-gray-900 rounded-lg shadow-lg'>

            <div className="dark:text-white text-black mb-2">
                <p className="text-lg font-semibold tracking-wide uppercase dark:text-gray-200 text-gray-800 border-b-2 dark:border-gray-300 border-gray-600 pb-1">
                    添加用户
                </p>
            </div>

            <div className='w-[90%] m-auto '>
                <div className='w-[100%] m-auto block mt-5'>
                    {!isAdded && (
                        <form onSubmit={handleSubmit} >
                            <div className='mb-2'>
                                <label htmlFor="email" className={`${style.label}`}>
                                    邮箱
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    value={email}
                                    onChange={handleEmailChange}
                                    id='email'
                                    placeholder='请输入要添加用户的邮箱号码'
                                    className={`
                                                        ${style.input}
                                                        ${!isEmailValid ? 'border-red-500' : ''} // Add red border for invalid email
                                                      `}
                                    onInvalid={(e) =>
                                        (e.target as HTMLInputElement).setCustomValidity(
                                            '请输入有效的邮箱地址'
                                        )
                                    }
                                    onInput={(e) =>
                                        (e.target as HTMLInputElement).setCustomValidity('') // Clear error message
                                    }
                                />
                            </div>
                            <div className='w-full flex items-center justify-end'>
                                <input
                                    type='submit'
                                    value="确认"
                                    className='w-full 800px:w-[180px] h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer' />
                            </div>
                        </form>
                    )}
                    {isAdded && (
                        <div>
                            邀请用户{email}成功，请在注册页面填写{invitationCode}来完成注册。
                            <div className='w-full flex-col 800px:flex-row flex items-center justify-between'>
                                <div
                                    className='w-full 800px:w-[180px] h-[40px] bg-[#37a39a] flex items-center justify-center text-center text-[#fff] rounded mt-8 cursor-pointer'
                                    onClick={() => nextButton()} 
                                >
                                    完成
                                </div>
                            </div>
                        </div>

                    )}
                </div>
            </div>
        </div>
    )
}

export default AddUser