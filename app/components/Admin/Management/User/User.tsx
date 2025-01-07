import React, { useState } from 'react'
import HeaderBar from '../Material/HeadBarMaterial'

type Props = {}

const User = (props: Props) => {
  const [active, setActive] = useState(1);


  return (
    <div>
      <div className='w-full p-5'>
        <div>
          <HeaderBar
            active={active}
            setActive={setActive} />
        </div>
        <div>
          {
            active === 1 &&(
              <div></div>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default User