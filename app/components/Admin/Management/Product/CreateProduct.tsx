import React, { useState } from 'react'
import ProductInfomation from "./ProductInfomation"
import ProductSteps from "./ProductSteps"
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

                <div className='w-[80%] mt-[30px] sm:p-2 md:p-4'>
                    <ProductSteps active={active} setActive={setActive} />
                </div>
                {
                    active === 0 && (
                        <ProductInfomation
                            productInfo={productInfo}
                            setProductInfo={setProductInfo}
                            active={active}
                            setActive={setActive}

                        />
                    )
                }
                {
                    active === 1 && (
                        <div>
                            <ProductDrawingNo selectedImage={selectedImage} setSelectedImage={setSelectedImage} preButton={preButton} nextButton={nextButton} productInfo={productInfo}
                                setProductInfo={setProductInfo} />
                        </div>
                    )
                }
                {
                    active === 2 && (
                        <div>
                            <div className='w-[80%] m-auto block'>
                                <MaterialSelect selectedMaterialsId={selectedMaterialsId} setSelectedMaterialsId={setSelectedMaterialsId} nextButton={nextButton} preButton={preButton} />
                            </div>
                        </div>
                    )
                }

{
                    active === 3 && (
                        <div>
                            <div className='w-[80%] m-auto block'>
                                <ProductSubmit preButton={preButton} setActive={setActive} productInfo={productInfo} selectedMaterialsId={selectedMaterialsId} selectedImage={selectedImage} />
                            </div>
                        </div>
                    )
                }
            </div>

        </div>
    )
}

export default CreateProduct