import React, { useState } from 'react'
import HeaderBar from '../Headbar'
import RoleManager from '@/app/components/Profile/RoleManager';
import { useSelector } from 'react-redux';
import AddUser from './AddUser';

type Props = {}

const User = (props: Props) => {
  const [active, setActive] = useState(1);
  const { user } = useSelector((state: any) => state.auth);


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
                { id: 2, label: '添加用户' },
                { id: 3, label: '删除用户' },
              ]
            }}
          />
        </div>
        <div>
          {
            active === 1 && (
              <div className='w-full h-full bg-transparent'>
                <RoleManager
                  active={active}
                  user={user}
                />
              </div>
            )
          }

{
            active === 2 && (
              <div className='w-full h-full bg-transparent'>
                <AddUser
                  user={user}
                />
              </div>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default User