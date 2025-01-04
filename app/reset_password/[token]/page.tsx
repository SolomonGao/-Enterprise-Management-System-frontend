'use client'
import ResetPassword from "@/app/components/Auth/PostResetPassword";
import { Box } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";


export default function ResetPasswordPage() {
    const router = useRouter();

    const [token, setToken] = useState<string | null>(null); // 用来存储 token

    useEffect(() => {
        // 在客户端渲染时获取 token
        if (router.query.token) {
            setToken(router.query.token as string);  // 更新 token
        }
    }, [router.query.token]); // 依赖 router.query.token

     // 如果 token 还没有获取到，显示加载状态
     if (!token) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-800">
                <Box className="flex items-center justify-center w-[450px] bg-white dark:bg-slate-900 rounded-[8px] shadow p-4 outline-none">
                    正在加载...
                </Box>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-800">
            <Box className="flex items-center justify-center w-[450px] bg-white dark:bg-slate-900 rounded-[8px] shadow p-4 outline-none">
                <ResetPassword token={token} />
            </Box>
        </div>
    );
}

