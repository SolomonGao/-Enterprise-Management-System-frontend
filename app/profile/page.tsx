'use client'
import React, { FC, useState } from 'react'
import Header from '../components/Header';
import Heading from '../utils/Heading';
import Profile from '../components/Profile/Profile'
import { useSelector } from 'react-redux';
import { redirect } from 'next/navigation';



interface Props { }

const Page: FC<Props> = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(6);
  const [route, setRoute] = useState("Login");
  const { user } = useSelector((state: any) => state.auth);

  return (
    <div className=''>
      <Heading
        title={`${user.name} 用户中心-`}
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
    </div>
  )
}

export default Page;