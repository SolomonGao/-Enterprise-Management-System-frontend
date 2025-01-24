'use client'

import DashboardHeader from '@/app/components/Admin/DashboardHeader';
import AdminSidebar from '@/app/components/Admin/Sidebar/AdminSidebar';
import RequireRole from '@/app/hooks/RequireRole';
import Heading from '@/app/utils/Heading';
import React, { FC } from 'react'
import Purchasing from '../../components/Admin/Management/Purchasing/Purchasing'
import { useSelector } from 'react-redux';


const Page: FC = () => {
    const {user} = useSelector((state: any) => state.auth);

    return (
        <RequireRole allowedRoles={["管理", "采购"]}>
            <div>
                <Heading
                    title="零配件采购管理"
                    description="..."
                    keywords="..."
                />

                <div className='flex flex-wrap mx-auto'>
                    <div className='w-[15%] flex'>
                        <AdminSidebar />
                    </div>

                    <div className='w-[85%]'>
                        <div>
                            <DashboardHeader
                                title='零配件采购管理'
                            />
                        </div>
                        <div className='ml-10 min--screen'>
                            <Purchasing />
                        </div>
                    </div>
                </div>
            </div>
        </RequireRole>
    )
}

export default Page;