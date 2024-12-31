import { useAddOrderMutation } from '@/redux/features/order/orderApi';
import { Button } from '@mui/material';
import React, { FC, useEffect, useState } from 'react'
import toast from 'react-hot-toast';

type UsedProducts = {
    id: string;
    quantity: number;
};

type Props = {
    setActive: (active: number) => void;
    preButton: () => void;
    orderInfo: any;
    selectedProductsId: UsedProducts[];
}

const ProductSubmit: FC<Props> = (props: Props) => {

    const [errors, setErrors] = useState("");
    const [addOrder, {isSuccess, error}] = useAddOrderMutation();

    // 在组件渲染后打印 orderInfo
    useEffect(() => {
        if (isSuccess) {
            toast.success('订单添加成功');
        }
        if (error) {
            if ("data" in error) {
                const errorMessage = error.data || "订单添加失败";
                toast.error(errorMessage.message);
            }
        }
    }, [isSuccess, error]);

        // 在组件渲染后打印 orderInfo

    const handleAdd = async () => {
        addOrder({ order: props.orderInfo, selectedProductsId:{products: props.selectedProductsId} }).unwrap();
    }
    return (
        <div className='w-[90%] m-auto'>
            <div>
                <span></span>
            </div>
            <div className='w-full flex-col 800px:flex-row flex items-center justify-between'>
                <div
                    className='w-full 800px:w-[180px] h-[40px] bg-[#37a39a] flex items-center justify-center text-center text-[#fff] rounded mt-8 cursor-pointer'
                    onClick={() => props.preButton()}
                >
                    上一步
                </div>
                <Button
                    fullWidth
                    variant="contained"
                    onClick={handleAdd}
                    sx={{ mt: 2 }}
                >
                    添加
                </Button>
            </div>
        </div>
    )
}

export default ProductSubmit