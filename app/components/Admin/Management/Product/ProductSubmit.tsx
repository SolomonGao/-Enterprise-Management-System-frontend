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
    setAdded: (added: boolean) => void;
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
    const [isAdding, setIsAdding] = useState(false); // 用于控制按钮禁用
    
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

                setIsAdding(false); // 添加成功后恢复按钮状态
                
            }
            if (linkError) {
                if ("data" in linkError) {
                    const errorData = linkError as ErrorResponse;
                    toast.error(errorData!.data!.message);
                    setErrors(errorData!.data!.message);
                    setIsAdding(false);
                }
            }
        }, [linkSuccess, linkError]);

    const handleAdd = async () => {
        setIsAdding(true); // 点击添加时禁用按钮
        await addProduct({ productInfo: props.productInfo, selectedImage: props.selectedImage }).unwrap();
        props.setAdded(true);
        
    }

    const handleAdd2 = async () => {
        if (isAdding === false) {
            toast.error("请先点击添加产品");
            return
        }
        await productToMaterial({ idProduct: props.productInfo.idProduct, selectedMaterialsId: props.selectedMaterialsId }).unwrap();
        props.setAdded(false);
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
                    添加产品
                </Button>

                <Button
                    fullWidth
                    variant="contained"
                    onClick={handleAdd2}
                    sx={{ mt: 2 }}
                >
                    链接产品
                </Button>
            </div>
        </div>
    )
}

export default ProductSubmit