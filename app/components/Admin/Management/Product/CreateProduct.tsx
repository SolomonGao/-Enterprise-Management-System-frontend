import React, { act, useState } from 'react'
import ProductInfomation from "./ProductInfomation"
import ProductSteps from "./ProductSteps"


type Props = {}

const CreateProduct = (props: Props) => {
    const [active, setActive] = useState(0);
    const [draingNo, setDrawingNo] = useState("");
    const [productInfo, setProductInfo] = useState({
        idProduct: "",
        modellName: "",
        pumpModel: "",
        drawingNoId: "",
        manufacturer: "",
    })

    return (
        <div className='w-full flex min-h-screen'>
            <div className='w-[80%]'>
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
            </div>
            <div className='w-[50%] mt-[30px] fixed p-4 bottom-[10%] left-[20%]'>
                <ProductSteps active={active} setActive={setActive} />
            </div>
        </div>
    )
}

export default CreateProduct