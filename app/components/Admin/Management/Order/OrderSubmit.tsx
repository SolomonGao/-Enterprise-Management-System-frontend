import Pagination from '@/app/components/Pagination/Pagination';
import { useAddOrderMutation } from '@/redux/features/order/orderApi';
import { useGetMaterialsByProductQuery } from '@/redux/features/product/productApi';
import { Button } from '@mui/material';
import React, { FC, useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import ImageModal from '../../ImageModal';
import { useLogger } from '@/hooks/useLogger';

interface ErrorResponse {
    data?: { message: string };
    message?: string;
}

type UsedProducts = {
    id: string;
    quantity: number;
    drawing_no_id: string;
};

type Props = {
    setActive: (active: number) => void;
    preButton: () => void;
    orderInfo: any;
    selectedProductsId: UsedProducts[];
    setOrderInfo: (orderInfo: any) => void;
    setSelectedProductsId: (selectedProductsId: UsedProducts[]) => void;
    refetch: () => void;
}

const ProductSubmit: FC<Props> = (props: Props) => {

    const [errors, setErrors] = useState("");
    const [addOrder, { isSuccess, error }] = useAddOrderMutation();
    const [selectedProduct, setSelectedProduct] = useState<UsedProducts | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [isProductLoading, setIsProductLoading] = useState(false); // 新增 loading 状态
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const { logAction } = useLogger();

    const { data, isSuccess: getMatSucc, error: getMatErr } = useGetMaterialsByProductQuery(
        {
            idProduct: selectedProduct?.id || "",
            page: currentPage,
        },
        { skip: !selectedProduct?.id }
    );

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

      useEffect(() => {
        if (getMatSucc && data) {
          setIsProductLoading(false); // 数据加载完成，取消加载状态
        }
      }, [getMatSucc, data]);

    // 在组件渲染后打印 orderInfo
    useEffect(() => {
        if (isSuccess) {
            toast.success('订单添加成功');

            props.setOrderInfo({
                comments: "",
                customer: "",
                address: "",
                phoneNumber: "",
                deadline: "",
                price: 0,
            });

            props.setSelectedProductsId([]);
            props.setActive(0);
            props.refetch();

        }
        if (error) {
            if ("data" in error) {
                const errorData = error as ErrorResponse;
                toast.error(errorData.data!.message);
            }
        }
    }, [isSuccess, error]);

    const viewProductDetails = (product: UsedProducts) => {
        setSelectedProduct(null); // 重置 selectedProduct
        setIsProductLoading(true); // 设置加载状态为 true
        setCurrentPage(1);
        setSelectedProduct(product); // 设置当前选中的产品

    };

    // 图片模态框
    const openImageModal = (imageUrl: string) => {
        setSelectedImage(imageUrl);
    };

    const handleAdd = async () => {
        try {
            await addOrder({ 
                order: props.orderInfo, 
                selectedProductsId: { products: props.selectedProductsId } 
            }).unwrap();

            // 添加日志记录
            await logAction({
                action: 'CREATE',
                targetType: 'ORDER',
                targetId: props.orderInfo._id || 'new_order',
                details: `创建新订单：客户 ${props.orderInfo.customer}, 总价 ${props.orderInfo.price}`,
                oldData: null,
                newData: {
                    order: props.orderInfo,
                    products: props.selectedProductsId
                }
            });

            props.setOrderInfo({
                comments: "",
                customer: "",
                address: "",
                phoneNumber: "",
                deadline: "",
                price: 0,
            });

            props.setSelectedProductsId([]);
            props.setActive(0);
            props.refetch();

        } catch (error: unknown) {
            // 记录错误日志
            await logAction({
                action: 'CREATE',
                targetType: 'ORDER',
                targetId: 'new_order',
                details: '创建订单失败',
                oldData: null,
                newData: {
                    error,
                    orderInfo: props.orderInfo,
                    products: props.selectedProductsId
                }
            });

            if (typeof error === 'object' && error !== null && 'data' in error) {
                const errorData = error as ErrorResponse;
                toast.error(errorData.data?.message || '未知错误');
            }
        }
    }
    return (
        <div className='w-[90%] m-auto'>
            <div>
                <table className="min-w-full table-auto border-separate border-spacing-2 border border-gray-300 dark:border-gray-600 rounded-lg">
                    <thead className="bg-gray-100 dark:bg-gray-700 text-left">
                        <th className="px-4 py-2 text-gray-800 dark:text-gray-300 font-medium hidden md:table-cell">产品名称</th>
                        <th className="px-4 py-2 text-gray-800 dark:text-gray-300 font-medium hidden md:table-cell">订购数量</th>
                        <th className="px-4 py-2 text-gray-800 dark:text-gray-300 font-medium hidden md:table-cell">图纸号</th>
                        <th className="px-4 py-2 text-gray-800 dark:text-gray-300 font-medium hidden md:table-cell">材料信息</th>
                    </thead>
                    <tbody>
                        {
                            props.selectedProductsId.map((product) => (
                                <tr key={product.id} className="border-t border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <td className="px-4 py-2 text-gray-800 dark:text-gray-300 font-medium hidden md:table-cell">{product.id}</td>
                                    <td className="px-4 py-2 text-gray-800 dark:text-gray-300 font-medium hidden md:table-cell">{product.quantity}</td>
                                    <td className="px-4 py-2 text-gray-800 dark:text-gray-300 font-medium hidden md:table-cell">{product.drawing_no_id}</td>
                                    <td className="px-4 py-2 text-gray-800 dark:text-gray-300 font-medium hidden md:table-cell">
                                        <button
                                            onClick={() => viewProductDetails(product)}
                                            className="text-white bg-blue-500 hover:bg-blue-600 p-2 rounded-full focus:outline-none"
                                        >
                                            查看详情
                                        </button>
                                    </td>
                                    {/* <td className="px-4 py-2 text-gray-800 dark:text-gray-300">
                                    {renderMaterials(product.id)}
                                </td> */}
                                </tr>
                            ))
                        }
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
                    onClick={handleAdd}
                    sx={{ mt: 2, width: "180px", height: "40px" }}
                >
                    添加
                </Button>
            </div>
            {/* 产品详情模态框 */}
            {selectedProduct && (
                <div className="fixed inset-0 w-full bg-black bg-opacity-50 flex items-center justify-center backdrop-blur-sm z-50">
                    <div className="bg-white dark:bg-gray-800 p-8 rounded-lg max-w-[1300px] w-full max-h-[90vh] overflow-auto shadow-xl relative">
                        <button
                            onClick={() => setSelectedProduct(null)}
                            className="absolute top-4 right-4 text-white text-xl bg-black bg-opacity-50 p-2 rounded-full"
                        >
                            ✕
                        </button>
                        <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">
                            {selectedProduct.id}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300">图号ID: {selectedProduct.drawing_no_id}</p>

                        {/* 相关材料表格 */}
                        {isProductLoading ? (
                            <div className="text-black dark:text-white">加载中...</div>
                        ) : getMatSucc && data && (
                            <div className="mt-6">
                                <h4 className="text-xl font-semibold text-gray-800 dark:text-white">相关材料</h4>
                                <div className="mt-4 overflow-x-auto"> {/* 添加水平滚动 */}
                                    <table className="min-w-full table-auto border-separate border-spacing-2 border border-gray-300 dark:border-gray-600 rounded-lg">
                                        <thead className="bg-gray-100 dark:bg-gray-700 text-left">
                                            <tr>
                                                <th className="px-4 py-2 text-gray-800 dark:text-gray-300 font-medium">零配件名称</th>
                                                <th className="px-4 py-2 text-gray-800 dark:text-gray-300 font-medium">零配件图号</th>
                                                <th className="px-4 py-2 text-gray-800 dark:text-gray-300 font-medium">规格</th>
                                                <th className="px-4 py-2 text-gray-800 dark:text-gray-300 font-medium">需要数量</th>
                                                <th className="px-4 py-2 text-gray-800 dark:text-gray-300 font-medium">剩余数量</th>
                                                <th className="px-4 py-2 text-gray-800 dark:text-gray-300 font-medium">图纸</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {data.data.map((material: any) => (
                                                <tr key={material.leaf_materials_drawing_no} className="border-t border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                                                    <td className="px-4 py-2 text-gray-700 dark:text-gray-200">{material.leafMaterial.name}</td>
                                                    <td className="px-4 py-2 text-gray-700 dark:text-gray-200">{material.leaf_materials_drawing_no}</td>
                                                    <td className="px-4 py-2 text-gray-700 dark:text-gray-200">{material.leafMaterial.specification}</td>
                                                    <td className="px-4 py-2 text-gray-700 dark:text-gray-200">{material.material_counts} * {selectedProduct.quantity} = {material.material_counts * selectedProduct.quantity}</td>
                                                    <td className="px-4 py-2 text-gray-700 dark:text-gray-200">{material.leafMaterial.counts}</td>
                                                    <td
                                                        className="px-4 py-2 text-gray-700 dark:text-gray-200 cursor-pointer"
                                                        onClick={() => openImageModal(material.leafMaterial.drawing_no_secure_url)}
                                                    >
                                                        {material.leafMaterial.drawing_no_secure_url ? "查看图纸" : "/"}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                {/* 分页组件 */}
                                {data?.totalPages > 0 && (
                                    <div className="mt-5">
                                        <Pagination
                                            totalPages={data.totalPages}
                                            currentPage={currentPage}
                                            onPageChange={handlePageChange}
                                        />
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            )}
            {/* 图片模态框 */}
            <ImageModal imageUrl={selectedImage} onClose={() => setSelectedImage(null)} />
        </div>
    )
}

export default ProductSubmit