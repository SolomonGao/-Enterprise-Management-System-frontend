'use client'
import React, { FC, useState } from 'react'
import Heading from '../utils/Heading'
import AdminSidebar from "../components/Admin/Sidebar/AdminSidebar"
import RequireRole from '../hooks/RequireRole'
import DashboardHero from "../components/Admin/DashBoardHero"

type Props = {}

const adminPage: FC<Props> = (props: Props) => {
  return (
    <RequireRole allowedRoles={["管理"]}>
      <div>
        <Heading
          title="管理中心"
          description="..."
          keywords='...'
        >
        </Heading>
        <div className='flex'>
          <div className='1500px:w-[16%] w-1/5 flex'>
            <AdminSidebar
            />
            <div className='w-[85%] min-h-screen'>
              <DashboardHero />
            </div>
          </div>

        </div>
      </div>
    </RequireRole>
  )
}

export default adminPage