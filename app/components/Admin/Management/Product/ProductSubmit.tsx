import { useAddProductMutation, useProductToMaterialMutation } from '@/redux/features/product/productApi';
import { Button } from '@mui/material';
import React, { FC, useEffect, useState } from 'react'
import toast from 'react-hot-toast';

type UsedMaterial = {
    id: string;
    quantity: number;
};

type Props = {
    setActive: (active: number) => void;
    preButton: () => void;
    productInfo: any;
    selectedMaterialsId: UsedMaterial[];
    selectedImage: any;
}

const ProductSubmit: FC<Props> = (props: Props) => {
    const [addProduct, { isSuccess, error }] = useAddProductMutation();
    const [productToMaterial, {isSuccess: linkSuccess, error: linkError}] = useProductToMaterialMutation();
    const [errors, setErrors] = useState("");

    // 在组件渲染后打印 productInfo
    useEffect(() => {
        if (isSuccess) {
            toast.success('产品添加成功');
        }
        if (error) {
            if ("data" in error) {
                const errorMessage = error.data || "产品添加失败";
                toast.error(errorMessage.message);
            }
        }
    }, [isSuccess, error]);

        // 在组件渲染后打印 productInfo
        useEffect(() => {
            if (linkSuccess) {
                toast.success('零配件已成功链接到该产品');
            }
            if (linkError) {
                if ("data" in linkError) {
                    const linkErrorMessage = linkError.data || "产品添加失败";
                    toast.error(linkErrorMessage.message);
                    setErrors(linkErrorMessage.errors);
                }
            }
        }, [linkSuccess, linkError]);

    const handleAdd = async () => {
        addProduct({ productInfo: props.productInfo, selectedImage: props.selectedImage });
    }

    const handleAdd2 = async () => {
        productToMaterial({ idProduct: props.productInfo.idProduct, selectedMaterialsId: props.selectedMaterialsId });
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

                <Button
                    fullWidth
                    variant="contained"
                    onClick={handleAdd2}
                    sx={{ mt: 2 }}
                >
                    添加
                </Button>
            </div>
        </div>
    )
}

export default ProductSubmit