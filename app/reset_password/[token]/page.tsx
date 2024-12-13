import ResetPassword from "@/app/components/Auth/PostResetPassword";
import { Box } from "@mui/material";

export default function ResetPasswordPage({ params }: { params: { token: string } }) {
    const { token } = params;
    console.log(token)

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-800">
            <Box className="flex items-center justify-center w-[450px] bg-white dark:bg-slate-900 rounded-[8px] shadow p-4 outline-none">
                <ResetPassword token={token} />
            </Box>
        </div>


    );
}
