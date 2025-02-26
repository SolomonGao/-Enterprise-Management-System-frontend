import { apiSlice } from '../api/apiSlice';
import { LogEntry, LogAction, LogTargetType } from '@/app/utils/types';

export const logApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createLog: builder.mutation<void, {
            action: LogAction;
            targetType: LogTargetType;
            targetId: string;
            details: string;
            oldData?: any;
            newData?: any;
            userId: string;
            username: string;
            role: string;
        }>({
            query: (logData) => ({
                url: '/log/create',
                method: 'POST',
                body: logData,
                credentials: 'include' as const,
            }),
        }),

        getLogs: builder.query<{
            data: LogEntry[];
            totalPages: number;
        }, {
            page?: number;
            limit?: number;
            targetType?: LogTargetType;
            startDate?: string;
            endDate?: string;
            userId?: string;
        }>({
            query: (params) => {
                const queryParams = new URLSearchParams();
                Object.entries(params).forEach(([key, value]) => {
                    if (value) queryParams.append(key, value.toString());
                });
                return {
                    url: `/log/get-logs?${queryParams.toString()}`,
                    method: 'GET',
                    credentials: 'include' as const,
                };
            },
        }),
    }),
});

export const {
    useCreateLogMutation,
    useGetLogsQuery,
} = logApi; 