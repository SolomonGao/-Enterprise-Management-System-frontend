'use client';
import React, { useState } from 'react';
import AdminSidebar from '@/app/components/Admin/Sidebar/AdminSidebar';
import Heading from '@/app/utils/Heading';
import RequireRole from '@/app/hooks/RequireRole';
import DashboardHeader from '@/app/components/Admin/DashboardHeader';
import Material from '@/app/components/Admin/Management/Material/Material';




type Props = {}

const page = (props: Props) => {


  return (
    <RequireRole allowedRoles={["管理"]}>
      <div>
        <Heading
          title="零配件管理"
          description="..."
          keywords="..."
        />

        <div className="flex flex-wrap mx-auto">
          {/* 左侧部分：AdminSidebar */}
          <div className="w-[15%] flex">
            <AdminSidebar/>
          </div>
          <div className="w-[85%]">  
            <div>
              <DashboardHeader
                title="零配件管理"
              />
            </div>
            <div className='ml-10'>
              <Material
              />
            </div>
          </div>
        </div>
      </div>
    </RequireRole>
  );
};

export default page