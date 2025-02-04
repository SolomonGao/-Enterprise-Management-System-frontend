import { redirect } from "next/navigation";
import userAuth from "./userAuth";


// 👇 添加动态导出，禁用静态优化
export const dynamic = 'force-dynamic';
interface ProtectedProps{
    children: React.ReactNode;
}

const Protected = ({children}: ProtectedProps) => {
    const isAuthenticated = userAuth();
    console.log(isAuthenticated)

    return isAuthenticated ? children : redirect("/");
}

export default Protected