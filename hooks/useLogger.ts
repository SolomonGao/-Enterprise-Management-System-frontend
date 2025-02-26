import { useCreateLogMutation } from '@/redux/features/log/logApi';
import { LogAction, LogTargetType } from '@/app/utils/types';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';

export const useLogger = () => {
    const [createLog] = useCreateLogMutation();
    const { user } = useSelector((state: any) => state.auth);

    const logAction = useCallback(async ({
        action,
        targetType,
        targetId,
        details,
        oldData,
        newData
    }: {
        action: LogAction;
        targetType: LogTargetType;
        targetId: string;
        details: string;
        oldData?: any;
        newData?: any;
    }) => {
        if (!user) {
            console.error('No user found for logging');
            return;
        }

        try {
            await createLog({
                action,
                targetType,
                targetId,
                details,
                oldData,
                newData,
                userId: user._id,
                username: user.name,
                role: user.role
            }).unwrap();
        } catch (error) {
            console.error('Failed to create log:', error);
        }
    }, [createLog, user]);

    return { logAction };
};