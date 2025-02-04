'use client'
import React, { FC, useState } from 'react'
import Protected from '../hooks/useProtected';
import Header from '../components/Header';
import Heading from '../utils/Heading';
import Profile from '../components/Profile/Profile'
import { useSelector } from 'react-redux';


interface Props {}

const Page: FC<Props> = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(6);
  const [route, setRoute] = useState("Login");
  const {user} = useSelector((state: any) => state.auth);

  return (
    <div className=''>
      <Protected>
        <Heading
          title={`-${user.name} 用户中心-`}
          description="test test"
          keywords="Programming, Mern, Redux"
        />
        <Header
          open={open}
          setOpen={setOpen}
          activeItem={activeItem}
          setRoute={setRoute}
          route={route}
        />

        <Profile 
        user={user}
        >

        </Profile>
      </Protected>
    </div>
  )
}

export default Page;