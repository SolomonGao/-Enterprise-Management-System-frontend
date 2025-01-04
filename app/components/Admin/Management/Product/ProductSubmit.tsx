import { ErrorResponse } from '@/app/utils/types';
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
    setProductInfo: (productInfo: any) => void;
    setSelectedImage: (selectedImage: any) => void;
    setSelectedMaterialsId: (selectedMaterialsId: UsedMaterial[]) => void;
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
            if (error) {
                if ("data" in error) {
                    const errorData = error as ErrorResponse;
                    toast.error(errorData!.data!.message);
                }
            }
    }, [isSuccess, error]);

        // 在组件渲染后打印 productInfo
        useEffect(() => {
            if (linkSuccess) {
                toast.success('零配件已成功链接到该产品');

                props.setProductInfo({
                    idProduct: "",
                    modelName: "",
                    pumpModel: "",
                    drawingNoId: "",
                    manufacturer: "",
                })
                props.setSelectedImage({
                    file: null,
                    fileType: "",
                })
                props.setSelectedMaterialsId([]);
                props.setActive(0);
                
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
        await addProduct({ productInfo: props.productInfo, selectedImage: props.selectedImage }).unwrap();
    }

    const handleAdd2 = async () => {
        await productToMaterial({ idProduct: props.productInfo.idProduct, selectedMaterialsId: props.selectedMaterialsId }).unwrap();
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