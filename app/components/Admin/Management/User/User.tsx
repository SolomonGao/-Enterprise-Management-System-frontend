import React, { useState } from 'react'
import HeaderBar from '../Headbar'

type Props = {}

const User = (props: Props) => {
  const [active, setActive] = useState(1);


  return (
    <div>
      <div className='w-full p-5'>
        <div>
          <HeaderBar
            active={active}
            setActive={setActive}
            navItems={{
              items: [
                { id: 1, label: '主页' },
                { id: 2, label: '添加' },
                { id: 3, label: '监控' },
              ]
            }}
          />
        </div>
        <div>
          {
            active === 1 && (
              <div></div>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default User