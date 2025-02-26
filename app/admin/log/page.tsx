'use client';
import React, { FC } from 'react';
import AdminSidebar from '@/app/components/Admin/Sidebar/AdminSidebar';
import Heading from '@/app/utils/Heading';
import RequireRole from '@/app/hooks/RequireRole';
import DashboardHeader from '@/app/components/Admin/DashboardHeader';
import LogView from '@/app/components/Admin/Management/Log/LogView';

const Page: FC = () => {


  return (
    <RequireRole allowedRoles={["管理"]}>
      <div>
        <Heading
          title="系统操作日志"
          description="..."
          keywords="..."
        />

        <div className="flex flex-wrap mx-auto">
          {/* 左侧部分：AdminSidebar */}
          <div className="w-[15%] flex">
            <AdminSidebar />
          </div>
          <div className="w-[85%]">
            <div>
              <DashboardHeader
                title="系统操作日志"
              />
            </div>
            <div className='ml-10 min-h-screen'>
              <LogView
              />
            </div>
          </div>
        </div>
      </div>
    </RequireRole>
  );
};

export default Page; 