'use client';
import RequireRole from '@/app/hooks/RequireRole';
import { useGetAllUsersQuery, useUpdateUserRoleMutation } from '@/redux/features/user/userApi';
import React, { FC, useEffect, useState } from 'react';
import Pagination from '../Pagination/Pagination';
import toast from 'react-hot-toast';
import { style } from '@/app/styles/style';

type Props = {
    active: number;
    user: any
}

const RoleManager: FC<Props> = (props: Props) => {

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const { data, error, isLoading, refetch } = useGetAllUsersQuery({ page: currentPage, limit: itemsPerPage, id: props.user._id });
    const [updateRole, { isLoading: isUpdating }] = useUpdateUserRoleMutation();
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleRoleChange = async (userId: string, newRole: string, username: string) => {
        try {
            await updateRole({ userId, newRole }).unwrap();  // 确保异步操作完成
            toast.success(`更新用户：${username}角色成功`)
            refetch();  // 更新角色后重新获取数据
        } catch (error) {
            const errorData = error as any;
            toast.error(errorData.data.message);
        }
    };
    useEffect(() => {
        refetch();
    }, [props.active]);

    return (
        <RequireRole allowedRoles={["管理"]}>
            <div className="px-4 py-6">
                {/* 用户列表 */}
                <div className="overflow-x-auto shadow-lg border rounded-lg bg-white dark:bg-gray-800 dark:border-gray-600">
                    <table className="min-w-full text-sm text-gray-700 dark:text-gray-300">
                        <thead className="bg-gray-200 dark:bg-gray-700">
                            <tr>
                                <th className={style.tableHead}>姓名</th>
                                <th className={style.tableHead}>邮箱</th>
                                <th className={style.tableHead}>职位</th>
                                <th className={style.tableHead}>更改职位</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.data?.map((user: any) => (
                                <tr key={user._id} className="border-t hover:bg-gray-50 dark:hover:bg-gray-700">
                                    <td className="px-6 py-3 border border-black dark:border-white">{user.name}</td>
                                    <td className="px-6 py-3 border border-black dark:border-white">{user.email}</td>
                                    <td className="px-6 py-3 border border-black dark:border-white">{user.role}</td>
                                    <td className="px-6 py-3 border border-black dark:border-white">
                                        <select
                                            value={user.role}
                                            onChange={(e) => handleRoleChange(user._id, e.target.value, user.name)}
                                            disabled={isUpdating} // 禁用下拉框，避免重复点击
                                            className={`px-4 py-2 border border-gray-600 dark:border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-blue-300 dark:hover:bg-gray-900 ${user.role === "员工"
                                                ? "bg-gray-100 dark:bg-gray-700" // 如果角色是员工，背景色为灰色
                                                : "bg-gray-100 dark:bg-gray-700" // 如果角色是管理，背景色为淡灰色
                                                }`}
                                        >
                                            <option
                                                value="员工"
                                                className="bg-gray-100 dark:bg-gray-700 text-black dark:text-white"
                                            >员工</option>
                                            <option
                                                value="管理"
                                                className="bg-gray-100 dark:bg-gray-700 text-black dark:text-white"
                                            >管理</option>
                                        </select>
                                    </td>
                                </tr>
                            ))}
                        </tbody>

                    </table>
                </div>
                <br />
                <br />
                {/* 分页组件 */}
                <Pagination
                    totalPages={data?.totalPages || 1} // 总页数由后端返回
                    currentPage={currentPage} // 当前页
                    onPageChange={handlePageChange} // 页码改变回调
                />
            </div>
        </RequireRole>
    );
};

export default RoleManager;
