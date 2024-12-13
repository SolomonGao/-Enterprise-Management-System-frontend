'use client'
import React, { FC } from 'react';
import DashboardHeader from "./DashboardHeader";
type Props = {}

const DashBoardHero:FC<Props> = (props: Props) => {
  return (
    <div>
        <DashboardHeader title='主页'/>
    </div>
  )
}

export default DashBoardHero