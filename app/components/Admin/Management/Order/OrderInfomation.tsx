import { style } from '@/app/styles/style';
import React, { FC, useState } from 'react'


type Props = {
    orderInfo: any;
    setorderInfo: (orderInfo: any) => void;
    active: number;
    setActive: (active: number) => void;
};

const OrderInfomation: FC<Props> = (props: Props) => {

    const today = new Date().toISOString().split('T')[0];

    const handleSubmit = (e: any) => {
        e.preventDefault();
        props.setActive(props.active + 1);
    }

    const handleInvalidDeadline = (e: any) => {
        const input = e.target as HTMLInputElement;
        if (input.value && input.value < today) {
            input.setCustomValidity('截止日期不能早于今天');
        } else {
            input.setCustomValidity('截止日期不能为空');
        }

    }
    return (
        <div className='w-[90%] m-auto '>
            <form onSubmit={handleSubmit} >
                <div className='mb-2'>
                    <label htmlFor="" className={`${style.label}`}>
                        客户名称
                    </label>
                    <input
                        type="name"
                        name=""
                        required
                        value={props.orderInfo.customer}
                        onChange={(e) =>
                            props.setorderInfo({ ...props.orderInfo, customer: e.target.value })
                        }
                        id='name'
                        placeholder='客户名称'
                        className={`
                        ${style.input}`}
                        onInvalid={(e) =>
                            (e.target as HTMLInputElement).setCustomValidity('请输入订单客户名称')
                        }
                        onInput={(e) =>
                            (e.target as HTMLInputElement).setCustomValidity('') // 清除错误信息
                        }
                    />
                </div>
                <div className='mb-2'>
                    <label htmlFor="" className={`${style.label}`}>
                        联系号码
                    </label>
                    <input
                        type="name"
                        name=""
                        required
                        value={props.orderInfo.phoneNumber}
                        onChange={(e) =>
                            props.setorderInfo({ ...props.orderInfo, phoneNumber: e.target.value })
                        }
                        id='phoneNumber'
                        placeholder='联系号码'
                        className={`
                        ${style.input}`}
                        onInvalid={(e) =>
                            (e.target as HTMLInputElement).setCustomValidity('请输入联系号码')
                        }
                        onInput={(e) =>
                            (e.target as HTMLInputElement).setCustomValidity('') // 清除错误信息
                        }
                    />
                </div>
                <div className='mb-2'>
                    <label htmlFor="" className={`${style.label}`}>
                        地址
                    </label>
                    <input
                        type="name"
                        name=""
                        required
                        value={props.orderInfo.address}
                        onChange={(e) =>
                            props.setorderInfo({ ...props.orderInfo, address: e.target.value })
                        }
                        id='address'
                        placeholder='地址'
                        className={`
                        ${style.input}`}
                        onInvalid={(e) =>
                            (e.target as HTMLInputElement).setCustomValidity('请输入地址')
                        }
                        onInput={(e) =>
                            (e.target as HTMLInputElement).setCustomValidity('') // 清除错误信息
                        }
                    />
                </div>
                <div className='mb-2'>
                    <label htmlFor="" className={`${style.label}`}>
                        备注
                    </label>
                    <input
                        type="name"
                        name=""
                        value={props.orderInfo.comments}
                        onChange={(e) =>
                            props.setorderInfo({ ...props.orderInfo, comments: e.target.value })
                        }
                        id='comments'
                        placeholder='备注'
                        className={`
                        ${style.input}`}
                    />
                </div>
                <div className='mb-2'>
                    <label htmlFor="deadline" className={`${style.label}`}>
                        截止日期
                    </label>
                    <input
                        type="date"
                        name="deadline"
                        required
                        value={props.orderInfo.deadline} // 确保值是一个 ISO 格式的日期字符串（例如 "2024-12-31"）
                        onChange={(e) =>
                            props.setorderInfo({ ...props.orderInfo, deadline: e.target.value })
                        }
                        id="deadline"
                        min={today}
                        className={`${style.input}`}
                        onInvalid={(e) => handleInvalidDeadline(e)
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
                <br />
            </form>

        </div>
    )
}

export default OrderInfomation