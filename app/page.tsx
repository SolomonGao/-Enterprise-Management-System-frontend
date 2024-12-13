'use client'
import React, { FC, useState } from "react"
import Heading from "./utils/Heading";
import Header from "./components/Header"


interface Props {}

const Page: FC<Props> = (props) => {

  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const [route, setRoute] = useState("Login");


  return (
    <div>
      <Heading
      title="企业管理系统"
      description="测试"
      keywords="ERP,仓库，储存，订单咨询"/>

      <Header
      open={open}
      setOpen={setOpen}
      activeItem={activeItem}
      setRoute={setRoute}
      route={route} />

    </div>
  )
}


export default Page;