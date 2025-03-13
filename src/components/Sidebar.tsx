import React, { useState } from 'react';
import logo from '../assets/book-square.svg';
import overview from '../assets/category-2.svg';
import task from '../assets/book.svg';
import mentor from '../assets/user-octagon.svg';
import message from '../assets/message.svg';
import settings from '../assets/setting-2.svg';

interface SidebarItemProps {
  icon: string;
  label: string;
  active?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  icon,
  label,
  active = false,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`flex items-center px-2 py-3 pb-2 ${
        active ? 'bg-blue-600 text-white' : 'hover:bg-[#f5f5f7] w-full'
      } cursor-pointer rounded-lg`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center justify-center w-6 h-6">
        <img
          src={icon}
          alt={label}
          className={`transition-colors duration-300 ${
            isHovered ? 'filter brightness-0' : ''
          }`}
        />
      </div>
      <span
        className={`sidebar-label pl-2 transition-colors duration-300 ${
          isHovered ? 'text-[#141522]' : 'text-[#8E92BC]'
        }`}
      >
        {label}
      </span>
    </div>
  );
};

const CollapsibleSidebar: React.FC = () => {
  return (
    <div className="flex h-screen">
      <div className="w-[252px] flex flex-col gap-6 bg-[#FFFFFF] text-black h-full">
        <div className="p-3">
          <div className="flex flex-row gap-3 items-center pl-4">
            <img src={logo} className="w-[40px] h-[40px]" />
            <h2 className="text-[32px] font-semibold">DNX</h2>
          </div>
        </div>

        <div className="flex justify-center">
          <nav className="flex flex-col gap-[24px] w-[75%] items-start">
            <SidebarItem icon={overview} label="Overview" />
            <SidebarItem icon={task} label="Task" />
            <SidebarItem icon={mentor} label="Mentors" />
            <SidebarItem icon={message} label="Message" />
            <SidebarItem icon={settings} label="Settings" />
          </nav>
        </div>
      </div>
    </div>
  );
};

export default CollapsibleSidebar;
