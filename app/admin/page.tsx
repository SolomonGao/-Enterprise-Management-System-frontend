'use client';
import React, { FC } from 'react';
import AdminSidebar from '@/app/components/Admin/Sidebar/AdminSidebar';
import Heading from '@/app/utils/Heading';
import RequireRole from '@/app/hooks/RequireRole';
import DashBoardHero from '../components/Admin/DashBoardHero';


const Page: FC = () => {


  return (
    <RequireRole allowedRoles={["管理"]}>
      <div>
        <Heading
          title="主页"
          description="..."
          keywords="..."
        />

        <div className="flex flex-wrap mx-auto" >
          {/* 左侧部分：AdminSidebar */}
          <div className="w-[15%] flex">
            <AdminSidebar/>
          </div>
          <div className="w-[85%]">  
              <DashBoardHero
              />

            <div className='ml-10 min-h-screen'>

            </div>
          </div>
        </div>
      </div>
    </RequireRole>
  );
};

export default Page;