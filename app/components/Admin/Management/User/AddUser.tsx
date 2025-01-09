import { style } from '@/app/styles/style';
import { set } from 'lodash';
import React, { useState } from 'react'

type Props = {
    user: any;
}

const AddUser = (props: Props) => {
    const [email, setEmail] = useState("");
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [isAdded, setIsAdded] = useState(false);

    const handleSubmit = (e: any) => {
        e.preventDefault();

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
                                value="完成"
                                className='w-full 800px:w-[180px] h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer' />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddUser