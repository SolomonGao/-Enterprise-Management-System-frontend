import React, { FC } from "react";
import { IoMdCheckmark } from "react-icons/io";

type Props = {
    active: number;
    setActive: (active: number) => void;
};

const ProductSteps: FC<Props> = (props: Props) => {
    const steps = ["产品信息", "产品图纸", "产品零配件", "产品预览"];

    return (
        <div className="flex items-center w-full">
            {steps.map((step: string, index: number) => (
                <div key={index} className="flex items-center">
                    {/* 步骤点 */}
                    <div
                        className={`w-[35px] h-[35px] rounded-full flex items-center justify-center ${props.active + 1 > index ? "bg-blue-500" : "bg-[#384766]"
                            } relative`}
                    >
                        <IoMdCheckmark />
                    </div>

                    {/* 步骤名称 */}
                    <h5
                        className={`ml-1 mr-1 ${props.active === index ? "dark:text-white text-black" : "dark:text-white text-black"
                            } text-[16px]`}
                    >
                        {step}
                    </h5>

                    {/* 连接线 */}
                    {index !== steps.length - 1 && (
                        <div
                            className={`h-1 mr-1 w-[30px] ${props.active + 1 > index ? "bg-blue-500" : "bg-[#384766]"
                                }`}
                        />
                    )}
                </div>
            ))}
        </div>
    );
};

export default ProductSteps;
