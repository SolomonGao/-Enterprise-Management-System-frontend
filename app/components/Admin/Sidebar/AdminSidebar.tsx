'use client';
import React, { FC, useEffect, useState } from 'react';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { FaHome, FaUsers, FaChalkboardTeacher, FaList, FaCogs, FaQuestion, FaUsersCog, FaDatabase, FaUserEdit } from 'react-icons/fa';
import Image from 'next/image';
import avatarDefault from '/public/avatar.png';
import { IconButton } from '@mui/material';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { useTheme } from 'next-themes';
import { ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material';
import { TiUserAdd, TiUserDelete } from 'react-icons/ti';
import { SiElementor } from 'react-icons/si';
import { RiAlignItemLeftFill } from 'react-icons/ri';
import { useLogoutMutation } from '@/redux/features/auth/authApi';
import { toast } from 'react-hot-toast';
import { BiLogOut } from 'react-icons/bi';
import { MdOutlineManageHistory } from "react-icons/md";

type Props = {
    className?: string;
    defaultCollapsed?: boolean;
}

const AdminSidebar: FC<Props> = (props: Props) => {
  const { user } = useSelector((state: any) => state.auth);
  // const { logout, setLougout } = useState(false);
  const { theme, setTheme } = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(props.defaultCollapsed || false);
  const [logout] = useLogoutMutation();

  // const logoutHandler = () => {
  //   setLougout(true);
  // }

  const handleResize = () => {
    if (window.innerWidth < 1500) {
      setIsCollapsed(true);
    } else {
      setIsCollapsed(false);
    }
  };

  useEffect(() => {
    let resizeTimer: NodeJS.Timeout;
    
    const debouncedResize = () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(handleResize, 100);
    };

    handleResize(); // 初始化
    window.addEventListener("resize", debouncedResize);
    
    return () => {
        window.removeEventListener("resize", debouncedResize);
        clearTimeout(resizeTimer);
    };
  }, []);

  useEffect(() => {
    // 监听主题变化，强制重新渲染样式
    const body = document.querySelector('body');
    if (theme === 'dark') {
        body?.classList.add('dark');
    } else {
        body?.classList.remove('dark');
    }
  }, [theme]);

  const sidebarStyles = {
    root: {
      color: theme === "dark" ? "#eeeeee" : "#455A64",
      border: 'none',
      borderRadius: '16px',
      minHeight: '100vh',
      overflow: 'hidden',
      padding: 0,
      margin: 0,
      minWidth: isCollapsed ? "50px" : "250px",
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
      transition: 'all 0.3s ease',  // 添加过渡效果
    },
    menu: {
      backgroundColor: theme === "dark" ? "#111827" : "white",
    },
    menuItem: {
      base: {
        backgroundColor: 'transparent',
        transition: 'all 0.2s ease',
      },
      hover: {
        backgroundColor: theme === "dark" ? "#335B8C" : "#111827",
        color: theme === "dark" ? "#000000" : "#ffffff",
        fontWeight: "bold",
      }
    }
  };

  const handleLogout = async () => {
    try {
      await logout({});
      toast.success('登出成功');
      window.location.href = '/';  // 重定向到首页
    } catch (error) {
      console.log('登出错误:', error);
      toast.error('登出失败');
    }
  };

  return (
    <Sidebar 
      collapsed={isCollapsed} 
      backgroundColor={theme === "dark" ? "#111827" : "white"}
      rootStyles={sidebarStyles.root}
    >
      <Menu 
        className='bg-white dark:bg-[#111827]'
        menuItemStyles={{
          button: ({ level }) => ({
            ...sidebarStyles.menuItem.base,
            ...(level === 0 && {
              height: '50px',
            }),
            ...(level === 1 && {
              height: '60px',
              backgroundColor: theme === "dark" ? "#111827" : "white",
            }),
            "&:hover": sidebarStyles.menuItem.hover,
          }),
        }}
      >
        {/* Profile Section */}
        <div className="flex flex-col items-center bg-white dark:bg-[#111827]">
          <Link href={"/profile"}>
            <Image
              src={user.avatar?.url || avatarDefault}
              alt={`${user.name}'s avatar`}
              className='rounded-full items-center justify-center cursor-pointer mt-12 border-2 border-[#ffc107]'
              width={70}
              height={70}
              onError={(e) => {
                  e.currentTarget.src = avatarDefault.src;
              }}
            />
          </Link>
          <h3 className="mt-2 text-lg font-bold text-teal-400">{!isCollapsed ? user.name : "..."}</h3>
          <p className="text-m dark:text-white text-black mt-2"> {user.role} </p>
        </div>

        {/* Menu */}

        <MenuItem
          onClick={() => setIsCollapsed(!isCollapsed)}
          icon={isCollapsed ? <ArrowForwardIos className={`${isHovered ? 'text-white dark:text-black' : 'text-black dark:text-white'}`} /> : undefined}
          onMouseOver={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {!isCollapsed && (

            <IconButton
              onClick={() => setIsCollapsed(!isCollapsed)}
              onMouseOver={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className='absolute inline-block'>
              <ArrowBackIosNew className={`${isHovered ? 'text-white dark:text-black' : 'text-black dark:text-white'}`} />
            </IconButton>
          )}
        </MenuItem>
        {/* Dashboard */}
        <Link href={"/"}>
          <MenuItem
            icon={<FaHome />}
            className="text-black dark:text-white transition-colors duration-200"
          >
            主页
          </MenuItem>
        </Link>
        {/* Data Section */}
        <SubMenu
          label="用户"
          icon={<FaUsers />}
          className="text-black dark:text-white"
        >
          <Link href={"/admin/user"}>
            <MenuItem
              icon={<FaUserEdit className='text-black dark:text-white' />}
            >
              用户管理
            </MenuItem>
          </Link>
        </SubMenu>

        <SubMenu
          label="生产管理"
          icon={<RiAlignItemLeftFill />}
          className="text-black dark:text-white"
        >
          <Link href={"/admin/order"}>
            <MenuItem
              icon={<SiElementor />}
              className="text-black dark:text-white"
            >
              订单管理
            </MenuItem>
          </Link>

          <Link href={"/admin/product"}>
            <MenuItem
              icon={<SiElementor />}
              className="text-black dark:text-white"
            >
              产品组装管理
            </MenuItem>
          </Link>

          <Link href={"/admin/material"}>
            <MenuItem
              icon={<SiElementor />}
              className="text-black dark:text-white"
            >
              零配件管理
            </MenuItem>
          </Link>

          <Link href={"/admin/purchasing"}>
            <MenuItem
              icon={<SiElementor />}
              className="text-black dark:text-white"
            >
              零件采购
            </MenuItem>
          </Link>
        </SubMenu>

        {/* Content Section */}
        <SubMenu
          label="数据"
          icon={<FaDatabase />}
          className="text-black dark:text-white"
        >
          <Link href={"/admin/log"}>
            <MenuItem
              icon={<MdOutlineManageHistory />}
              className="text-black dark:text-white"
            >
              操作日志
            </MenuItem>
          </Link>
          <MenuItem
            icon={<FaList />}
            className="text-black dark:text-white"
          >
            数据分析
          </MenuItem>
        </SubMenu>

        {/* Customization Section */}
        <SubMenu
          label="自定义"
          icon={<FaCogs />}
          className="text-black dark:text-white"
        >
          <MenuItem
            icon={<FaCogs />}
            className="text-black dark:text-white"
          >
            Hero
          </MenuItem>
          <MenuItem
            icon={<FaQuestion />}
            className="text-black dark:text-white"
          >
            FAQ
          </MenuItem>
          <MenuItem
            icon={<FaList />}
            className="text-black dark:text-white"
          >
            Categories
          </MenuItem>
        </SubMenu>

        {/* Controllers */}
        <MenuItem
          icon={<FaUsersCog />}
          className="text-black dark:text-white"
        >
          制作团队
        </MenuItem>

        {/* 在最后添加登出按钮 */}
        <MenuItem
          icon={<BiLogOut className="text-red-500" />}
          className="text-red-500 hover:bg-red-100 dark:hover:bg-red-900 mt-auto"
          onClick={handleLogout}
        >
          登出
        </MenuItem>
      </Menu>
    </Sidebar>
  );
};

export default AdminSidebar