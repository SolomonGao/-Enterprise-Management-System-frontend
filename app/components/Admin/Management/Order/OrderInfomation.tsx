import { style } from '@/app/styles/style';
import React, { FC, useState } from 'react'


type Props = {
    orderInfo: any;
    setorderInfo: (orderInfo: any) => void;
    active: number;
    setActive: (active: number) => void;
};

const OrderInfomation: FC<Props> = (props: Props) => {

    const handleSubmit = (e: any) => {
        e.preventDefault();
        props.setActive(props.active + 1);
    }
    return (
        <div className='w-[90%] m-auto '>
            <form onSubmit={handleSubmit} >
                <div className='mb-2'>
                    <label htmlFor="" className={`${style.label}`}>
                        订单名称
                    </label>
                    <input
                        type="name"
                        name=""
                        required
                        value={props.orderInfo.order_name}
                        onChange={(e) =>
                            props.setorderInfo({ ...props.orderInfo, order_name: e.target.value })
                        }
                        id='name'
                        placeholder='订单名称'
                        className={`
                        ${style.input}`}
                        onInvalid={(e) =>
                            (e.target as HTMLInputElement).setCustomValidity('请输入订单名称')
                        }
                        onInput={(e) =>
                            (e.target as HTMLInputElement).setCustomValidity('') // 清除错误信息
                        }
                    />
                </div>
                <div className='mb-2'>
                    <label htmlFor="" className={`${style.label}`}>
                        联系人
                    </label>
                    <input
                        type="name"
                        name=""
                        required
                        value={props.orderInfo.contact}
                        onChange={(e) =>
                            props.setorderInfo({ ...props.orderInfo, contact: e.target.value })
                        }
                        id='contact'
                        placeholder='联系人'
                        className={`
                        ${style.input}`}
                        onInvalid={(e) =>
                            (e.target as HTMLInputElement).setCustomValidity('请输入联系人')
                        }
                        onInput={(e) =>
                            (e.target as HTMLInputElement).setCustomValidity('') // 清除错误信息
                        }
                    />
                </div>
                <div className='w-full flex items-center justify-end'>
                    <input
                        type='submit'
                        value="下一步"
                        className='w-full 800px:w-[180px] h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer' />
                </div>

                {/* <div className='mb-5'>
                    <label htmlFor="" className={`${style.label}`}>
                        产品型号
                    </label>
                    <textarea
                        name=""
                        id=''
                        cols={30}
                        rows={10}
                        placeholder='产品型号'
                        className={`
                        ${style.input} !h-min`}
                        value={props.orderInfo}
                        onChange={(e) =>
                            props.setorderInfo({ ...props.orderInfo, description: e.target.value })
                        }
                    />
                </div> */}
                <br/>
            </form>

        </div>
    )
}

export default OrderInfomation