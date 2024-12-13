import { style } from '@/app/styles/style';
import React, { FC, useState } from 'react'

type Props = {
    productInfo: any;
    setProductInfo: (productInfo: any) => void;
    active: number;
    setActive: (active: number) => void;
};

const ProductInfomation: FC<Props> = (props: Props) => {
    const [dragging, setDragging] = useState(false)

    const handleSubmit = (e: any) => {
        e.preventDefault();
        props.setActive(props.active + 1);
    }
    return (
        <div className='w-[90%] m-auto mt-24'>
            <form onSubmit={handleSubmit} >
                <div className='mb-2'>
                    <label htmlFor="" className={`${style.label}`}>
                        产品名称
                    </label>
                    <input
                        type="name"
                        name=""
                        required
                        value={props.productInfo.name}
                        onChange={(e: any) =>
                            props.setProductInfo({ ...props.productInfo, name: e.target.value })
                        }
                        id='name'
                        placeholder='产品名称'
                        className={`
                        ${style.input}`}
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
                        onChange={(e: any) =>
                            props.setProductInfo({ ...props.productInfo, idProduct: e.target.value })
                        }
                        id='model'
                        placeholder='产品型号'
                        className={`
                        ${style.input}`}
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
                        onChange={(e: any) =>
                            props.setProductInfo({ ...props.productInfo, manufacturer: e.target.value })
                        }
                        id='manufacturer'
                        placeholder='生产厂家'
                        className={`
                        ${style.input}`}
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
                        onChange={(e: any) =>
                            props.setProductInfo({ ...props.productInfo, pumpModel: e.target.value })
                        }
                        id='pumpModel'
                        placeholder='泵型号'
                        className={`
                        ${style.input}`}
                    />
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
                        onChange={(e: any) =>
                            props.setProductInfo({ ...props.productInfo, description: e.target.value })
                        }
                    />
                </div> */}
            </form>

        </div>
    )
}

export default ProductInfomation