import ImageUpload from '@/app/components/ImageUpload'
import { style } from '@/app/styles/style';
import React, { FC } from 'react'

type Props = {
    selectedImage: any;
    setSelectedImage: (seletedImage: any) => void;
    preButton: () => void;
    nextButton: () => void;
    productInfo: any;
    setProductInfo: (productInfo: any) => void;
}

const ProductDrawingNo: FC<Props> = ({ selectedImage, setSelectedImage, preButton, nextButton, productInfo, setProductInfo }) => {
    return (
        <div className='w-[90%] m-auto block'>
            <div className='mb-2'>
                <label htmlFor="" className={`${style.label}`}>
                    生产图型号
                </label>
                <input
                    type="drawingNoId"
                    name=""
                    required
                    value={productInfo.drawingNoId}
                    onChange={(e) =>
                        setProductInfo({ ...productInfo, drawingNoId: e.target.value })
                    }
                    id='drawingNoId'
                    placeholder='生产图型号'
                    className={`
                                    ${style.input}`}
                />
            </div>
            <ImageUpload onImageUpload={(file, fileType) => setSelectedImage({ file, fileType })} small={false} selectedImage={selectedImage} />
            <div className='w-full flex-col 800px:flex-row flex items-center justify-between'>
                <div
                    className='w-full 800px:w-[180px] h-[40px] bg-[#37a39a] flex items-center justify-center text-center text-[#fff] rounded mt-8 cursor-pointer'
                    onClick={() => preButton()}
                >
                    上一步
                </div>
                <div
                    className='w-full 800px:w-[180px] h-[40px] bg-[#37a39a] flex items-center justify-center text-center text-[#fff] rounded mt-8 cursor-pointer'
                    onClick={() => nextButton()}
                >
                    下一步
                </div>
            </div>
        </div>
    )
}

export default ProductDrawingNo