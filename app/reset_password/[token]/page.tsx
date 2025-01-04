import ResetPassword from "@/app/components/Auth/PostResetPassword";
import { Box } from "@mui/material";

// 在 app 目录中，Next.js 会自动为你提供动态路由参数
export default async function ResetPasswordPage({ params }: { params: { token: string } }) {
    const { token } = await params;  // 从params获取动态路由参数

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-800">
            <Box className="flex items-center justify-center w-[450px] bg-white dark:bg-slate-900 rounded-[8px] shadow p-4 outline-none">
                <ResetPassword token={token} />
            </Box>
        </div>
    );
}

// 确保你使用的是 Next.js 13 的新的动态路由方式
