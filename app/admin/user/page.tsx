'use client';
import React, { FC } from 'react';
import AdminSidebar from '@/app/components/Admin/Sidebar/AdminSidebar';
import Heading from '@/app/utils/Heading';
import RequireRole from '@/app/hooks/RequireRole';
import DashboardHeader from '@/app/components/Admin/DashboardHeader';
import User from '../../components/Admin/Management/User/User';


const Page: FC = () => {


  return (
    <RequireRole allowedRoles={["管理"]}>
      <div>
        <Heading
          title="用户管理"
          description="..."
          keywords="..."
        />

        <div className="flex flex-wrap mx-auto" >
          {/* 左侧部分：AdminSidebar */}
          <div className="w-[15%] flex">
            <AdminSidebar/>
          </div>
          <div className="w-[85%]">  
            <div>
              <DashboardHeader
                title="用户管理"
              />
            </div>
            <div className='ml-10 min-h-screen'>
              <User/>
            </div>
          </div>
        </div>
      </div>
    </RequireRole>
  );
};

export default Page;