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

type Props = {

}

const AdminSidebar: FC<Props> = (props: Props) => {
  const { user } = useSelector((state: any) => state.auth);
  const { logout, setLougout } = useState(false);
  const { theme, setTheme } = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const logoutHandler = () => {
    setLougout(true);
  }

  const handleResize = () => {
    if (window.innerWidth < 1500) {
      setIsCollapsed(true);
    } else {
      setIsCollapsed(false);
    }
  };

  // 在组件挂载和卸载时添加窗口监听事件
  useEffect(() => {
    handleResize(); // 初次渲染时检查宽度
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Sidebar collapsed={isCollapsed} backgroundColor={`${theme}` === "dark" ? "#111827" : "white"}
      rootStyles={{
        color: theme === "dark" ? "eee" : "#455A64",
        border: 'none',
        borderRadius: '16px',
        minHeight: '100vh',
        overflow: 'hidden',
        padding: 0,
        margin: 0,
        minWidth: isCollapsed ? "50px" : "250px",
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
      }}>
      <Menu className='bg-white dark:bg-[#111827]'
        menuItemStyles={{
          button: ({ level, active, disabled }) => {
            if (level === 0) {
              return {
                backgroundColor: active ? "#fff" : undefined,
                "&:hover": {
                  backgroundColor: theme === "dark" ? "#335B8C !important" : "#111827  !important",
                  color:  theme === "dark" ? "black !important" :  "white !important",
                  fontWeight: "bold !important",
                },
              };
            }
            if (level === 1) {
              return {
                backgroundColor: theme === "dark" ? "#111827" : "white",
                height: 60,
                "&:hover": {
                  backgroundColor: theme === "dark" ? "#335B8C !important" : "#111827  !important",
                  color:  theme === "dark" ? "black !important" :  "white !important",
                  fontWeight: "bold !important",
                },
              }
            }
          },
        }}>
        {/* Profile Section */}
        <div className="flex flex-col items-center bg-white dark:bg-[#111827]">
          <Image
            src={user.avatar ? user.avatar.url : avatarDefault}
            alt=""
            className='rounded-full items-center justify-center cursor-pointer mt-12'
            width={70}
            height={70}
            style={{ border: "2px solid #ffc107" }}

          />
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
            className={`text-black dark:text-white`}
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
          <MenuItem
            icon={<TiUserAdd className='text-black dark:text-white' />}
          >
            添加用户
          </MenuItem>

          <MenuItem
            icon={<FaUserEdit />}
            className="text-black dark:text-white"
          >
            更改用户
          </MenuItem>
          <MenuItem
            icon={<TiUserDelete />}
            className="text-black dark:text-white"
          >
            删除用户
          </MenuItem>
        </SubMenu>

        <SubMenu
          label="物资管理"
          icon={<RiAlignItemLeftFill />}
          className="text-black dark:text-white"
        >
          <Link href={"/admin/material"}>
            <MenuItem
              icon={<SiElementor />}
              className="text-black dark:text-white"
            >
              零配件管理
            </MenuItem>
          </Link>

          <Link href={"/admin/product"}>
            <MenuItem
              icon={<SiElementor />}
              className="text-black dark:text-white"
            >
              产品管理
            </MenuItem>
          </Link>

          <Link href={"/admin/order"}>
            <MenuItem
              icon={<SiElementor />}
              className="text-black dark:text-white"
            >
              订单管理
            </MenuItem>
          </Link>
        </SubMenu>

        {/* Content Section */}
        <SubMenu
          label="数据"
          icon={<FaDatabase />}
          className="text-black dark:text-white"
        >
          <MenuItem
            icon={<FaChalkboardTeacher />}
            className="text-black dark:text-white"
          >
            操作日志
          </MenuItem>
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
      </Menu>
    </Sidebar>
  );
};

export default AdminSidebar