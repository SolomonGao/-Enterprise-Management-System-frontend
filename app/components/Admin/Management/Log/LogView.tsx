import React, { FC, useState } from 'react';
import { useGetLogsQuery } from '@/redux/features/log/logApi';
import { format } from 'date-fns';
import { Typography, Dialog, DialogTitle, DialogContent } from '@mui/material';
import Pagination from '@/app/components/Pagination/Pagination';
import { LogAction, LogTargetType } from '@/app/utils/types';

const LogView: FC = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedLog, setSelectedLog] = useState<any | null>(null);
    const [filters, setFilters] = useState({
        targetType: undefined as LogTargetType | undefined,
        startDate: '',
        endDate: '',
        limit: 10
    });

    const { data: logs, isLoading } = useGetLogsQuery({
        page: currentPage,
        ...filters
    });

    const getActionStyle = (action: LogAction) => {
        const styles = {
            CREATE: 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100',
            UPDATE: 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100',
            DELETE: 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100',
            READ: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100'
        };
        return `px-2 py-1 rounded-full text-sm ${styles[action] || styles.READ}`;
    };

    const getTypeStyle = (type: LogTargetType) => {
        const styles = {
            ORDER: 'bg-purple-100 text-purple-800 dark:bg-purple-800 dark:text-purple-100',
            PRODUCT: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100',
            MATERIAL: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-800 dark:text-indigo-100',
            PURCHASING: 'bg-pink-100 text-pink-800 dark:bg-pink-800 dark:text-pink-100',
            USER: 'bg-orange-100 text-orange-800 dark:bg-orange-800 dark:text-orange-100'
        };
        return `px-2 py-1 rounded-full text-sm ${styles[type] || styles.ORDER}`;
    };

    const handleViewDetails = (log: any) => {
        setSelectedLog(log);
    };

    const formatData = (data: any) => {
        if (!data) return '无';
        if (typeof data === 'object') {
            return JSON.stringify(data, null, 2);
        }
        return String(data);
    };

    return (
        <div className="p-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">系统日志</h2>
            
            <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <select
                    value={filters.targetType}
                    onChange={(e) => setFilters(prev => ({ ...prev, targetType: e.target.value as LogTargetType }))}
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                >
                    <option value="">所有类型</option>
                    <option value="ORDER">订单</option>
                    <option value="PRODUCT">产品</option>
                    <option value="MATERIAL">物料</option>
                    <option value="PURCHASING">采购</option>
                    <option value="USER">用户</option>
                </select>
                
                <input
                    type="date"
                    value={filters.startDate}
                    onChange={(e) => setFilters(prev => ({ ...prev, startDate: e.target.value }))}
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                />
                
                <input
                    type="date"
                    value={filters.endDate}
                    onChange={(e) => setFilters(prev => ({ ...prev, endDate: e.target.value }))}
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                />
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full table-auto border-separate border-spacing-2">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                            <th className="px-4 py-2 text-left text-gray-800 dark:text-white">时间</th>
                            <th className="px-4 py-2 text-left text-gray-800 dark:text-white">操作者</th>
                            <th className="px-4 py-2 text-left text-gray-800 dark:text-white">角色</th>
                            <th className="px-4 py-2 text-left text-gray-800 dark:text-white">操作</th>
                            <th className="px-4 py-2 text-left text-gray-800 dark:text-white">类型</th>
                            <th className="px-4 py-2 text-left text-gray-800 dark:text-white">详情</th>
                            <th className="px-4 py-2 text-left text-gray-800 dark:text-white">操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        {logs?.data.map((log) => (
                            <tr key={log._id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                                <td className="px-4 py-2 text-gray-800 dark:text-gray-200">
                                    {format(new Date(log.createdAt), 'yyyy-MM-dd HH:mm:ss')}
                                </td>
                                <td className="px-4 py-2 text-gray-800 dark:text-gray-200">{log.username}</td>
                                <td className="px-4 py-2 text-gray-800 dark:text-gray-200">{log.role}</td>
                                <td className="px-4 py-2">
                                    <span className={getActionStyle(log.action)}>
                                        {log.action === 'CREATE' ? '创建' :
                                         log.action === 'UPDATE' ? '更新' :
                                         log.action === 'DELETE' ? '删除' : '查看'}
                                    </span>
                                </td>
                                <td className="px-4 py-2">
                                    <span className={getTypeStyle(log.targetType)}>
                                        {log.targetType === 'ORDER' ? '订单' :
                                         log.targetType === 'PRODUCT' ? '产品' :
                                         log.targetType === 'MATERIAL' ? '物料' :
                                         log.targetType === 'PURCHASING' ? '采购' : '用户'}
                                    </span>
                                </td>
                                <td className="px-4 py-2 text-gray-800 dark:text-gray-200">{log.details}</td>
                                <td className="px-4 py-2">
                                    <button
                                        onClick={() => handleViewDetails(log)}
                                        className="px-3 py-1 bg-[#37a39a] hover:bg-[#2c827a] text-white rounded transition-all duration-300 text-sm"
                                    >
                                        查看详情
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* 详情对话框 */}
            <Dialog 
                open={!!selectedLog} 
                onClose={() => setSelectedLog(null)}
                maxWidth="md"
                fullWidth
                PaperProps={{
                    className: "bg-white dark:bg-gray-800"
                }}
            >
                <DialogTitle className="border-b dark:border-gray-700">
                    <span className="text-gray-800 dark:text-gray-200">操作详情</span>
                </DialogTitle>
                <DialogContent>
                    <div className="space-y-4 mt-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <h3 className="font-semibold mb-2 text-gray-800 dark:text-gray-200">原始数据</h3>
                                <pre className="bg-gray-50 dark:bg-gray-900 p-4 rounded overflow-auto max-h-96 text-gray-800 dark:text-gray-200 border dark:border-gray-700">
                                    {formatData(selectedLog?.oldData)}
                                </pre>
                            </div>
                            <div>
                                <h3 className="font-semibold mb-2 text-gray-800 dark:text-gray-200">更新后数据</h3>
                                <pre className="bg-gray-50 dark:bg-gray-900 p-4 rounded overflow-auto max-h-96 text-gray-800 dark:text-gray-200 border dark:border-gray-700">
                                    {formatData(selectedLog?.newData)}
                                </pre>
                            </div>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-2 text-gray-800 dark:text-gray-200">详细说明</h3>
                            <p className="text-gray-700 dark:text-gray-300">{selectedLog?.details}</p>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

            {logs && logs.totalPages > 1 && (
                <div className="mt-4">
                    <Pagination
                        totalPages={logs.totalPages}
                        currentPage={currentPage}
                        onPageChange={setCurrentPage}
                    />
                </div>
            )}

            {isLoading && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <Typography variant="h6" className="text-white">
                        加载中...
                    </Typography>
                </div>
            )}
        </div>
    );
};

export default LogView; 