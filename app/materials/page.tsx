'use client'
import React, { FC, useState } from 'react'
import { useSelector } from 'react-redux';
import Header from '../components/Header';
import Protected from '../hooks/useProtected';
import Heading from '../utils/Heading';
import Material from '../components/Material/Material'

type Props = {}

const MaterialPage:FC<Props> = (props: Props) => {
    const [open, setOpen] = useState(false);
    const [activeItem, setActiveItem] = useState(6);
    const [route, setRoute] = useState("Login");
    const { user } = useSelector((state: any) => state.auth);
  
    return (
      <div>
        <Protected>
          <Heading
            title={`order page`}
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
        <Material />
      </div>
    )
}

export default MaterialPage