'use client';
import React, { FC } from 'react';
import AdminSidebar from '@/app/components/Admin/Sidebar/AdminSidebar';
import Heading from '@/app/utils/Heading';
import RequireRole from '@/app/hooks/RequireRole';
import DashboardHeader from '@/app/components/Admin/DashboardHeader';
import Order from '../../components/Admin/Management/Order/Order';


type Props = {
  children?: React.ReactNode;
}

const Page: FC<Props> = () => {

  return (
    <RequireRole allowedRoles={["管理"]}>
      <div>
        <Heading
          title="订单管理"
          description="..."
          keywords="..."
        />

        <div className="flex flex-wrap mx-auto" >
          {/* 左侧部分：AdminSidebar */}
          <div className="w-[15%] flex">
            <AdminSidebar />
          </div>
          <div className="w-[85%]">
            <div>
              <DashboardHeader
                title="订单管理"
              />
            </div>
            <div className='ml-10 min-h-screen'>
              <Order
              />
            </div>
          </div>
        </div>
      </div>
    </RequireRole>
  );
};

export default Page