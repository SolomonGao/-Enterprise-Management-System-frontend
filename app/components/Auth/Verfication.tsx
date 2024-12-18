"use client"
import { style } from '../../styles/style';
import React, { FC, useEffect, useRef, useState } from 'react';
import toast from "react-hot-toast";
import { VscWorkspaceTrusted } from 'react-icons/vsc';
import {useActivationMutation  } from "../../../redux/features/auth/authApi";
import { useSelector } from 'react-redux';


type Props = {
    submitted: boolean;
    setSubmitted(submitted: boolean): void;
}
type VerfiNumber = {
    "0": string;
    "1": string;
    "2": string;
    "3": string;
}

const Verification: FC<Props> = (props: Props) => {

    const { token } = useSelector((state: any) => state.auth);

    const [invaliError, setInvalidError] = useState<boolean>(false);

    const [activation, {isSuccess, error, data}] = useActivationMutation();

    const inputRefs = [
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
    ];

    useEffect(() => {
        if (isSuccess) {
            toast.success("Account activated successfully");
            props.setSubmitted(false);
        }

        if (error) {
            if ("data" in error) {
                const errorData = error as any;
                toast.error(errorData.data.message);  
            } else {
                console.log('An error occured: ', error);
            }
            setInvalidError(true)
        }
    }, [isSuccess, error]);

    const [verfyNumber, setVerfyNumber] = useState<VerfiNumber>({ 0: "", 1: "", 2: "", 3: "" });

    const verificationHandler = async () => {
        const verificationNumber = Object.values(verfyNumber).join("");

        if (verificationNumber.length !== 4) {
            setInvalidError(true);
            return;
        }

        await activation({
            activation_token: token,
            activation_code: verificationNumber,
        });
    }

    const handleInputChange = (index: number, value: string) => {
        setInvalidError(false);
        
        const newVerifyNumber = { ...verfyNumber, [index]: value }
        setVerfyNumber(newVerifyNumber)

        if (value === "" && index > 0) {
            inputRefs[index - 1].current?.focus();
        } else if (value.length === 1 && index < 3) {
            inputRefs[index + 1].current?.focus()
        }
    }



    return (
        <div className='w-full'>
            <h1 className={`${style.title}`}>
                验证你的邮箱
            </h1>
            <br />
            <div className='w-full flex items-center justify-center mt-2'>
                <div className='w-[80px] h-[80px] rounded-full bg-[#497DF2] flex items-center justify-center'>
                    <VscWorkspaceTrusted size={40} />
                </div>
            </div>
            <br />
            <br />
            <div className='m-auto flex items-center justify-center'>
                {Object.keys(verfyNumber).map((key, index) => (
                    <input type='text'
                        key={key}
                        ref={inputRefs[index]}
                        className={`w-[65px] h-[65px] bg-transparent border-[3px] rounded-[10px] flex ml-5 items-center text-black dark:text-white justify-center text-[18px] font-Poppins outline-none text-center ${invaliError
                                ? "shake border-red-500"
                                : "dark:border-white border-[#0000004a]"
                            }`}
                        placeholder=''
                        maxLength={1}
                        value={verfyNumber[key as keyof VerfiNumber]}
                        onChange={(e) => {
                            const value = e.target.value;

                            if (/^\d$/.test(value) || value === "") {
                                handleInputChange(index, value);
                            }
                        }}
                        onKeyDown={(e) => {
                            if (
                                !/[0-9]/.test(e.key) &&
                                e.key !== "Backspace" &&
                                e.key !== "ArrowLeft" &&
                                e.key !== "ArrowRight"
                            ) {
                                e.preventDefault();
                            }
                        }}
                    />
                ))}
            </div>
            <br />
            <br />
            <div className="w-full flex justify-center">
                <button
                    className={`${style.button}`}
                    onClick={verificationHandler}>
                    验证令牌
                </button>
            </div>
            <br />
        </div>
    )
}

export default Verification;