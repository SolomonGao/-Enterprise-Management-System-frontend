import React, { useState } from 'react'
import ProductInfomation from "./ProductInfomation"
import MaterialSelect from './MaterialSelect'
import ProductDrawingNo from './ProductDrawingNo'
import ProductSubmit from './ProductSubmit'

type UsedMaterial = {
    id: string;
    quantity: number;
};

type Props = {
    setAdded: (added: boolean) => void;
}

const CreateProduct = (props: Props) => {
    const [selectedMaterialsId, setSelectedMaterialsId] = useState<UsedMaterial[]>([])
    const [active, setActive] = useState(0);
    const [productInfo, setProductInfo] = useState({
        idProduct: "",
        modelName: "",
        pumpModel: "",
        drawingNoId: "",
        manufacturer: "",
    })

    const [selectedImage, setSelectedImage] = useState<{ file: string | null; fileType: string }>({
        file: null, // 默认值为空
        fileType: '', // 默认文件类型为空字符串
    });

    const preButton = () => {
        setActive(active - 1);
    }

    const nextButton = () => {
        setActive(active + 1);
    }
    return (
        <div className='p-6 min-h-screen bg-white dark:bg-gray-900 rounded-lg shadow-lg'>
            <div>
                {
                    active === 0 && (
                        <div>
                            <div className="dark:text-white text-black mb-2">
                                <p className="text-lg font-semibold tracking-wide uppercase dark:text-gray-200 text-gray-800 border-b-2 dark:border-gray-300 border-gray-600 pb-1">
                                    产品信息
                                </p>
                            </div>
                            <div className='w-[100%] m-auto block mt-5'>
                                <ProductInfomation
                                    productInfo={productInfo}
                                    setProductInfo={setProductInfo}
                                    active={active}
                                    setActive={setActive}
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
                                    图纸信息
                                </p>
                            </div>
                            <div className='w-[100%] m-auto block mt-5'>
                                <ProductDrawingNo selectedImage={selectedImage} setSelectedImage={setSelectedImage} preButton={preButton} nextButton={nextButton} productInfo={productInfo}
                                    setProductInfo={setProductInfo} />
                            </div>
                        </div>
                    )
                }
                {
                    active === 2 && (
                        <div>
                            <div className="dark:text-white text-black mb-2">
                                <p className="text-lg font-semibold tracking-wide uppercase dark:text-gray-200 text-gray-800 border-b-2 dark:border-gray-300 border-gray-600 pb-1">
                                    零配件选择
                                </p>
                            </div>
                            <div className='w-[90%] m-auto block'>
                                <MaterialSelect selectedMaterialsId={selectedMaterialsId} setSelectedMaterialsId={setSelectedMaterialsId} nextButton={nextButton} preButton={preButton} />
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
                                <ProductSubmit
                                    preButton={preButton}
                                    setActive={setActive}
                                    productInfo={productInfo}
                                    selectedMaterialsId={selectedMaterialsId}
                                    selectedImage={selectedImage}
                                    setProductInfo={setProductInfo}
                                    setSelectedImage={setSelectedImage}
                                    setSelectedMaterialsId={setSelectedMaterialsId}
                                />
                            </div>
                        </div>
                    )
                }
            </div>

        </div>
    )
}

export default CreateProduct