'use client'
import React, { useState } from 'react';
import HeaderBar from './HeadBarProduct';
import CreateProoduct from '../Product/CreateProduct'

type Props = {}

const Product = (props: Props) => {
    const [active, setActive] = useState(1);

  return (
    <div>
        <div className='w-full p-5'>
            <HeaderBar
            active={active}
            setActive={setActive}/>

            <div>
                {
                    active === 2 && (
                        <div>
                            <CreateProoduct/>
                             </div>
                    )
                }
            </div>
        </div>
    </div>
  )
}

export default Product