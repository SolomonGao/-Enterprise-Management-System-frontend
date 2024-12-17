import { ThemeSwitcher } from "@/app/utils/ThemeSwitcher";
import { useEffect, useState } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";

type Props = {
  title: string,
};

const DashboardHeader = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(false);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (window.scrollY > 80) {
  //       setActive(true);
  //     } else {
  //       setActive(false);
  //     }
  //   };

  //   window.addEventListener("scroll", handleScroll);

  //   // 清理事件监听器，防止内存泄漏
  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, []); // 空依赖数组，确保只在组件挂载和卸载时执行


  const notifications = [
    { id: 1, text: "Notification 1: You have a new message" },
    { id: 2, text: "Notification 2: Your task is due soon" },
  ];

  return (
    <div className={`${active
      ? "w-full dark:bg-opacity-50 dark:bg-gradient-to-b dark:from-gray-900 dark:to-black fixed top-0 left-0 w-full h-[80px] z-[10] border-b dark:border-[#ffffff1c] shadow-xl transition duration-500"
      : "w-full border-b dark:border-[#ffffff1c] h-[80px] z-[10] dark:shadow"
      }`}>
      <div className='w-full m-auto py-2 h-full'>
        <div className='w-full h-[80px] flex items-center justify-between p-3'>
          <div className="ml-6 text-[30px] font-Poppins font-[500] text-black dark:text-white">
            {props.title}
          </div>
          <div className="absolute right-10 cursor-pointer m-5">
          <ThemeSwitcher />
          </div>
          <div className="8">
            {/* Notification Icon */}
            <div
              className="right-4 relative cursor-pointer m-2"
              onClick={() => setOpen(!open)}
            > 
              <IoMdNotificationsOutline className="text-2xl cursor-pointer dark:text-white text-black" />
              <span className="absolute -top-2 -right-2 bg-[#3ccbae] rounded-full w-[20px] h-[20px] text-[12px] flex items-center justify-center text-white">
                {notifications.length}
              </span>
            </div>

            {/* Notification Popup */}
            {open && (
              <div className="absolute top-[50px] right-[8px] bg-white dark:bg-gray-800 shadow-lg rounded-md w-72 p-4 z-50">
                <h3 className="font-semibold text-gray-800 dark:text-white mb-3">
                  Notifications
                </h3>
                <ul className="space-y-2">
                  {notifications.map((notification) => (
                    <li
                      key={notification.id}
                      className="p-2 bg-gray-100 dark:bg-gray-700 rounded-md text-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    >
                      {notification.text}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
