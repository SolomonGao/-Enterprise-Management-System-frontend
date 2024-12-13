'use client'
import React, { FC, useState } from 'react'
import Protected from '../hooks/useProtected';
import Header from '../components/Header';
import Heading from '../utils/Heading';
import { useSelector } from 'react-redux';
import Order from '../components/Order/Order'

type Props = {}

const orderPage: FC<Props> = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(6);
  const [route, setRoute] = useState("Login");
  const { user } = useSelector((state: any) => state.auth);

  return (
    <div>
      <Protected>
        <Heading
          title={`order orderPage`}
          description="test test"
          keywords="Programming, Mern, Redux"
        />
      </Protected>

      <Header
        open={open}
        setOpen={setOpen}
        activeItem={activeItem}
        setRoute={setRoute}
        route={route}
      />
      <div className=''>
        <Order user={user} />
      </div>
    </div>
  )
}

export default orderPage