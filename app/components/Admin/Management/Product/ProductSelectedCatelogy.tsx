import { style } from '@/app/styles/style';
import React, { FC, useState } from 'react'
import ImageModal from '../../ImageModal';


type Product = {
    idproduct: string;
    model_name: string;
    pump_model: string;
    drawing_no_id: string;
    drawing_no_secure_url: string;
};

type UsedProducts = {
    id: string;
    quantity: number;
};

type Props = {
    products: Product[];
    selectedProductsId: UsedProducts[];
    setselectedProductsId: (selectedProductsId: UsedProducts[] | ((prev: UsedProducts[]) => UsedProducts[])) => void;
}

const MaterialSelectedCatelogy: FC<Props> = ({ products, selectedProductsId, setselectedProductsId }) => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    // 图片模态框
    const openImageModal = (imageUrl: string) => {
        setSelectedImage(imageUrl);
    };

    const handleCheckboxChange = (id: string, checked: boolean) => {
        setselectedProductsId((prev: UsedProducts[]) => {
            if (checked) {
                const newSelected = prev.find((item) => item.id === id);
                if (newSelected) {
                    return prev;
                }
                return [...prev, { id, quantity: 1 }];
            } else {
                return prev.filter((item) => item.id !== id);
            }
        });
    };

    const handleQuantityChange = (id: string, quantity: number) => {
        setselectedProductsId((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, quantity } : item
            )
        );
    };

    return (
        <div className="overflow-x-auto shadow-lg border rounded-lg bg-white dark:bg-gray-800 dark:border-gray-600">
            <table className="min-w-full text-sm text-gray-700 dark:text-gray-300">
                <thead>
                    <tr className="bg-blue-300 dark:bg-gray-700">
                        <th className={style.tableHead}>选择</th>
                        <th className={style.tableHead}>产品名称</th>
                        <th className={style.tableHead}>图号ID</th>
                        <th className={style.tableHead}>泵型号</th>
                        <th className={style.tableHead}>数量</th>
                        <th className={style.tableHead}>图纸</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => {
                        const selectedItem = selectedProductsId.find(item => item.id === product.idproduct);
                        return (
                            <tr key={product.idproduct} className="border-t hover:bg-gray-50 dark:hover:bg-gray-700">
                                <td className="border border-black dark:border-white px-4 py-2 text-center">
                                    <input
                                        type="checkbox"
                                        checked={!!selectedItem}
                                        onChange={(e) => handleCheckboxChange(product.idproduct, e.target.checked)}
                                    />
                                </td>
                                <td className="border border-black dark:border-white px-4 py-2  text-center">{product.idproduct}</td>
                                <td className="border border-black dark:border-white px-4 py-2  text-center">{product.drawing_no_id}</td>
                                <td className="border border-black dark:border-white px-4 py-2  text-center">{product.pump_model}</td>
                                <td className="border border-black dark:border-white px-4 py-2  text-center">
                                    {selectedItem ? (
                                        <input
                                            type="number"
                                            min="0"
                                            inputMode="numeric"
                                            step="1"
                                            placeholder="数量"
                                            value={selectedItem.quantity || ""}
                                            onChange={(e) =>
                                                handleQuantityChange(product.idproduct, Number(e.target.value))
                                            }
                                            className="w-16 bg-white dark:bg-gray-800 appearance-none text-center"
                                            style={{ WebkitAppearance: 'none', MozAppearance: 'none' }} // 移除输入框默认上下箭头
                                        />
                                    ) : (
                                        "-"
                                    )}
                                </td>
                                <td
                                    className="px-4 py-2 text-gray-700 dark:text-gray-200 cursor-pointer"
                                    onClick={() => openImageModal(product.drawing_no_secure_url)}
                                >
                                    {product.drawing_no_secure_url ? "查看图纸" : "/"}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            {/* 图片模态框 */}
            <ImageModal imageUrl={selectedImage} onClose={() => setSelectedImage(null)} />
        </div>
    )
}

export default MaterialSelectedCatelogy