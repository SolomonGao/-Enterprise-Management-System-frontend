'use client';
import React, { FC } from 'react';

 type Item = {
    id: string,
    label: string,
 }
type NavItems = {
    items: Item[];
}

type Props = {
  active: number;
  setActive: (active: number) => void;
  navItems: NavItems;
};

const HeaderBar: FC<Props> = ({ active, setActive, navItems }) => {

  const navItems = [
    { id: 1, label: '主页' },
    { id: 2, label: '添加' },
    { id: 3, label: '监控' },
  ];

  return (
    <div className="w-full bg-white dark:bg-slate-800 dark:text-white text-black shadow-lg flex items-center justify-between border-3 px-6 py-2 relative">

      {/* 导航栏 */}
      <div className="flex items-center space-x-6">
        {navItems.map(item => (
          <button
            key={item.id}
            onClick={() => setActive(item.id)}
            className={`hover:text-teal-400 font-medium text-lg ${active === item.id ? "text-teal-400" : ""}`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default HeaderBar;
