"use client"
import React from 'react'
import Link from 'next/link'


export const navItemsData = [
    {
        name: "主页",
        url: "/",
    },
    {
        name: "订单",
        url: "/orders",
    },
    {
        name: "产品",
        url: "/products",
    },
    {
        name: "零配件",
        url: "/materials",
    },
    {
        name: "管理",
        url: "/admin",
    },
]

type Props = {
    activeItem: number;
    isMobile: boolean;
}

const NavItems: React.FC<Props> = ({ activeItem, isMobile }) => {
    return (
        <>
            <div className='hidden 800px:flex'>
                {
                    navItemsData && navItemsData.map((i, index) => (
                        <Link href={`${i.url}`} key={index} passHref>
                            <span
                                className={`${activeItem === index
                                    ? "dark:text-[#ffc107] text-[#ffc107]"
                                    : "dark:text-white text-black"
                                    } text-[18px] px-6 font-Poppins font-[400]`}
                            >
                                {i.name}
                            </span>
                        </Link>
                    ))
                }
            </div>
            {
                isMobile && (
                    <div className='800px:hidden mt-5 ml-5 flex flex-col space-y-6'>
                        {
                            navItemsData && navItemsData.map((i, index) => (
                                <Link href={`${i.url}`} key={index} passHref>
                                    <span
                                        className={`${activeItem === index
                                            ? "dark:text-[#ffc107] text-[#ffc107]"
                                            : "dark:text-white text-black"
                                            } text-[18px] px-6 font-Poppins font-[400]`}
                                    >
                                        {i.name}
                                    </span>
                                </Link>
                            ))
                        }
                    </div>
                )
            }
        </>
    )
}

export default NavItems