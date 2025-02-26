import { ErrorResponse } from '@/app/utils/types';
import { useAddProductMutation, useProductToMaterialMutation } from '@/redux/features/product/productApi';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
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
    const [showPreview, setShowPreview] = useState(false);
    
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

    const handlePreview = () => {
        setShowPreview(true);
    };

    const handleSubmit = async () => {
        setIsAdding(true);
        try {
            await handleAdd();
            setShowPreview(false);
        } catch (error) {
            setIsAdding(false);
        }
    };

    return (
        <div className='w-[90%] m-auto'>
            {/* 产品信息预览表格 */}
            <div className="overflow-x-auto">
                <table className="min-w-full table-auto border-separate border-spacing-2 border border-gray-300 dark:border-gray-600 rounded-lg">
                    <thead className="bg-gray-100 dark:bg-gray-700 text-left">
                        <tr>
                            <th className="px-4 py-2 text-gray-800 dark:text-gray-300 font-medium">字段</th>
                            <th className="px-4 py-2 text-gray-800 dark:text-gray-300 font-medium">内容</th>
                            <th className="px-4 py-2 text-gray-800 dark:text-gray-300 font-medium">字段</th>
                            <th className="px-4 py-2 text-gray-800 dark:text-gray-300 font-medium">内容</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td className="px-4 py-2 text-gray-800 dark:text-gray-300 font-medium">产品ID</td>
                            <td className="px-4 py-2 text-gray-800 dark:text-gray-300">{props.productInfo.idProduct}</td>
                            <td className="px-4 py-2 text-gray-800 dark:text-gray-300 font-medium">型号名称</td>
                            <td className="px-4 py-2 text-gray-800 dark:text-gray-300">{props.productInfo.modelName}</td>
                        </tr>
                        <tr className="hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td className="px-4 py-2 text-gray-800 dark:text-gray-300 font-medium">泵型</td>
                            <td className="px-4 py-2 text-gray-800 dark:text-gray-300">{props.productInfo.pumpModel}</td>
                            <td className="px-4 py-2 text-gray-800 dark:text-gray-300 font-medium">图号</td>
                            <td className="px-4 py-2 text-gray-800 dark:text-gray-300">{props.productInfo.drawingNoId}</td>
                        </tr>
                        <tr className="hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td className="px-4 py-2 text-gray-800 dark:text-gray-300 font-medium">制造商</td>
                            <td className="px-4 py-2 text-gray-800 dark:text-gray-300" colSpan={3}>{props.productInfo.manufacturer}</td>
                        </tr>
                    </tbody>
                </table>
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
                    onClick={handlePreview}
                    sx={{ mt: 2 }}
                >
                    预览
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

            {/* 预览对话框 */}
            <Dialog 
                open={showPreview} 
                onClose={() => setShowPreview(false)}
                maxWidth="md"
                fullWidth
            >
                <DialogTitle className="text-center text-xl font-bold text-gray-800 dark:text-white bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                    确认产品信息
                </DialogTitle>
                <DialogContent className="bg-white dark:bg-gray-800">
                    <div className="mt-4">
                        <table className="min-w-full table-auto border-separate border-spacing-2 border border-gray-300 dark:border-gray-600 rounded-lg">
                            <thead className="bg-gray-100 dark:bg-gray-700">
                                <tr>
                                    <th className="px-4 py-2 text-gray-800 dark:text-gray-300 font-medium">字段</th>
                                    <th className="px-4 py-2 text-gray-800 dark:text-gray-300 font-medium">内容</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <td className="px-4 py-2 text-gray-800 dark:text-gray-300 font-medium">产品ID</td>
                                    <td className="px-4 py-2 text-gray-800 dark:text-gray-300">{props.productInfo.idProduct}</td>
                                </tr>
                                <tr className="hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <td className="px-4 py-2 text-gray-800 dark:text-gray-300 font-medium">型号名称</td>
                                    <td className="px-4 py-2 text-gray-800 dark:text-gray-300">{props.productInfo.modelName}</td>
                                </tr>
                                <tr className="hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <td className="px-4 py-2 text-gray-800 dark:text-gray-300 font-medium">泵型</td>
                                    <td className="px-4 py-2 text-gray-800 dark:text-gray-300">{props.productInfo.pumpModel}</td>
                                </tr>
                                <tr className="hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <td className="px-4 py-2 text-gray-800 dark:text-gray-300 font-medium">图号</td>
                                    <td className="px-4 py-2 text-gray-800 dark:text-gray-300">{props.productInfo.drawingNoId}</td>
                                </tr>
                                <tr className="hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <td className="px-4 py-2 text-gray-800 dark:text-gray-300 font-medium">制造商</td>
                                    <td className="px-4 py-2 text-gray-800 dark:text-gray-300">{props.productInfo.manufacturer}</td>
                                </tr>
                            </tbody>
                        </table>

                        {props.selectedMaterialsId.length > 0 && (
                            <div className="mt-6">
                                <h4 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white">选择的零配件</h4>
                                <table className="min-w-full table-auto border-separate border-spacing-2 border border-gray-300 dark:border-gray-600 rounded-lg">
                                    <thead className="bg-gray-100 dark:bg-gray-700">
                                        <tr>
                                            <th className="px-4 py-2 text-gray-800 dark:text-gray-300 font-medium">零件ID</th>
                                            <th className="px-4 py-2 text-gray-800 dark:text-gray-300 font-medium">数量</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {props.selectedMaterialsId.map((material, index) => (
                                            <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-600">
                                                <td className="px-4 py-2 text-gray-800 dark:text-gray-300">{material.id}</td>
                                                <td className="px-4 py-2 text-gray-800 dark:text-gray-300">{material.quantity}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </DialogContent>
                <DialogActions className="bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4">
                    <Button 
                        onClick={() => setShowPreview(false)}
                        className="text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white"
                    >
                        取消
                    </Button>
                    <Button 
                        onClick={handleSubmit}
                        variant="contained"
                        disabled={isAdding}
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                        {isAdding ? '添加中...' : '确认添加'}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default ProductSubmit