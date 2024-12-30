import { style } from '@/app/styles/style';
import React, { FC, useState } from 'react'


type Props = {
    productInfo: any;
    setProductInfo: (productInfo: any) => void;
    active: number;
    setActive: (active: number) => void;
};

const ProductInfomation: FC<Props> = (props: Props) => {

    const handleSubmit = (e: any) => {
        e.preventDefault();
        props.setActive(props.active + 1);
    }
    return (
        <div className='w-[90%] m-auto '>
            <form onSubmit={handleSubmit} >
                <div className='mb-2'>
                    <label htmlFor="" className={`${style.label}`}>
                        产品名称
                    </label>
                    <input
                        type="name"
                        name=""
                        required
                        value={props.productInfo.modelName}
                        onChange={(e) =>
                            props.setProductInfo({ ...props.productInfo, modelName: e.target.value })
                        }
                        id='name'
                        placeholder='产品名称'
                        className={`
                        ${style.input}`}
                        onInvalid={(e) =>
                            (e.target as HTMLInputElement).setCustomValidity('请输入产品名称')
                        }
                        onInput={(e) =>
                            (e.target as HTMLInputElement).setCustomValidity('') // 清除错误信息
                        }
                    />
                </div>
                <div className='mb-2'>
                    <label htmlFor="" className={`${style.label}`}>
                        产品型号
                    </label>
                    <input
                        type="name"
                        name=""
                        required
                        value={props.productInfo.idProduct}
                        onChange={(e) =>
                            props.setProductInfo({ ...props.productInfo, idProduct: e.target.value })
                        }
                        id='model'
                        placeholder='产品型号'
                        className={`
                        ${style.input}`}
                        onInvalid={(e) =>
                            (e.target as HTMLInputElement).setCustomValidity('请输入产品型号')
                        }
                        onInput={(e) =>
                            (e.target as HTMLInputElement).setCustomValidity('') // 清除错误信息
                        }
                    />
                </div>
                <div className='mb-2'>
                    <label htmlFor="" className={`${style.label}`}>
                        生产厂家
                    </label>
                    <input
                        type="name"
                        name=""
                        required
                        value={props.productInfo.manufacturer}
                        onChange={(e) =>
                            props.setProductInfo({ ...props.productInfo, manufacturer: e.target.value })
                        }
                        id='manufacturer'
                        placeholder='生产厂家'
                        className={`
                        ${style.input}`}
                        onInvalid={(e) =>
                            (e.target as HTMLInputElement).setCustomValidity('请输入生产厂家')
                        }
                        onInput={(e) =>
                            (e.target as HTMLInputElement).setCustomValidity('') // 清除错误信息
                        }
                    />
                </div>
                <div className='mb-2'>
                    <label htmlFor="" className={`${style.label}`}>
                        泵型号
                    </label>
                    <input
                        type="name"
                        name=""
                        required
                        value={props.productInfo.pumpModel}
                        onChange={(e) =>
                            props.setProductInfo({ ...props.productInfo, pumpModel: e.target.value })
                        }
                        id='pumpModel'
                        placeholder='泵型号'
                        className={`
                        ${style.input}`}
                        onInvalid={(e) =>
                            (e.target as HTMLInputElement).setCustomValidity('请输入泵型号')
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
                        value={props.productInfo}
                        onChange={(e) =>
                            props.setProductInfo({ ...props.productInfo, description: e.target.value })
                        }
                    />
                </div> */}
                <br/>
            </form>

        </div>
    )
}

export default ProductInfomation