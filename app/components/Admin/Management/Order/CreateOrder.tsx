'use client'
import React, { FC, useState } from 'react'
import OrderInfomation from './OrderInfomation';
import ProductSelect from './ProductSelect';
import OrderSubmit from './OrderSubmit';
import OrderType from './OrderType';

type Product = {
    id: string;
    quantity: number;
    drawing_no_id: string;
}

type Props = {
    setAdded: (added: boolean) => void;
    refetch: () => void;
}

const CreateOrder: FC<Props> = (props: Props) => {
    const [selectedProductsId, setselectedProductsId] = useState<Product[]>([])
    const [active, setActive] = useState(0);
    const [orderInfo, setOrderInfo] = useState({
        comments: "",
        customer: "",
        address: "",
        phoneNumber: "",
        deadline: "",
        price: 0
    })
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [orderType, setOrderType] = useState<'product' | 'material'>('product');

    const preButton = () => {
        setActive(active - 1);
    }

    const nextButton = () => {
        console.log(orderInfo.price)
        setActive(active + 1);
    }

    const submitOrder = async () => {
        try {
            setIsLoading(true);
            await submitOrder();
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className='p-6 min-h-screen bg-white dark:bg-gray-900 rounded-lg shadow-lg'>
            <div>
                {
                    active === 0 && (
                        <div>
                            <div className="dark:text-white text-black mb-2">
                                <p className="text-lg font-semibold tracking-wide uppercase dark:text-gray-200 text-gray-800 border-b-2 dark:border-gray-300 border-gray-600 pb-1">
                                    订单类型
                                </p>
                            </div>
                            <div className='w-[100%] m-auto block mt-5'>
                                <OrderType
                                    active={active}
                                    setActive={setActive}
                                    nextButton={nextButton}
                                    setOrderType={setOrderType}
                                />
                            </div>
                        </div>
                    )
                }
                {
                    active === 1 && (
                        <div>
                            <div className="dark:text-white text-black mb-2">
                                <p className="text-lg font-semibold tracking-wide uppercase dark:text-gray-200 text-gray-800 border-b-2 dark:border-gray-300 border-gray-600 pb-1">
                                    产品信息
                                </p>
                            </div>
                            <div className='w-[100%] m-auto block mt-5'>
                                <OrderInfomation
                                    orderInfo={orderInfo}
                                    setOrderInfo={setOrderInfo}
                                    active={active}
                                    setActive={setActive}
                                    nextButton={nextButton} 
                                    preButton={preButton}
                                />
                            </div>
                        </div>
                    )
                }
                {
                    active === 2 && (
                        <div>
                            <div className="dark:text-white text-black mb-2">
                                <p className="text-lg font-semibold tracking-wide uppercase dark:text-gray-200 text-gray-800 border-b-2 dark:border-gray-300 border-gray-600 pb-1">
                                    产品选择
                                </p>
                            </div>
                            <div className='w-[90%] m-auto block'>
                                <ProductSelect selectedProductsId={selectedProductsId} setselectedProductsId={setselectedProductsId} nextButton={nextButton} preButton={preButton} />
                            </div>
                        </div>
                    )
                }
                {
                    active === 3 && (
                        <div>
                            <div className="dark:text-white text-black mb-2">
                                <p className="text-lg font-semibold tracking-wide uppercase dark:text-gray-200 text-gray-800 border-b-2 dark:border-gray-300 border-gray-600 pb-1">
                                    产品预览
                                </p>
                            </div>
                            <div className='w-[90%] m-auto block mt-5'>
                                <OrderSubmit preButton={preButton} setActive={setActive} orderInfo={orderInfo} selectedProductsId={selectedProductsId} setSelectedProductsId={setselectedProductsId} setOrderInfo={setOrderInfo} refetch={props.refetch} />
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default CreateOrder