import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

interface Props {
  allowedRoles: string[];
  children: ReactNode;
}

const RequireRole: React.FC<Props> = ({ allowedRoles, children }) => {
  const router = useRouter();
  const { user } = useSelector((state: any) => state.auth);
  const isAllowed = allowedRoles.includes(user.role);

  if (isAllowed) {
    return children;
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 max-w-lg text-center">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">
          您没有权限使用此功能
        </h2>
        <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
          该功能需要您的职位为：{" "}
          <span className="text-gray-900 dark:text-gray-200">
            {allowedRoles.join(", ")}
          </span>
        </p>
        <button
          onClick={() => router.push("/")}
          className="mt-6 px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300"
        >
          返回主页
        </button>
      </div>
    </div>
  );
};

export default RequireRole;
