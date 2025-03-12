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
  isExpanded: boolean;
  active?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  icon,
  label,
  isExpanded,
  active = false,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`flex items-center px-4 py-3 pb-2 ${
        active ? 'bg-blue-600 text-white' : 'hover:bg-[#f5f5f7]'
      } cursor-pointer rounded-lg px-2`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center justify-center w-6 h-6">
        <img
          src={icon}
          alt={label}
          className={`transition-colors duration-300 ${
            isHovered ? 'filter invert' : ''
          }`}
        />
      </div>
      <span
        className={`pl-2 transition-all duration-300 ${
          isExpanded ? 'opacity-100 w-auto' : 'opacity-0 w-0'
        } overflow-hidden whitespace-nowrap ${
          isHovered ? 'text-[#141522]' : 'text-[#8E92BC]'
        }`}
      >
        {label}
      </span>
    </div>
  );
};

const CollapsibleSidebar: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  return (
    <div className="flex h-screen">
      <div
        className={`transition-all duration-300 ease-in-out bg-[#FFFFFF] text-black h-full ${
          isExpanded ? 'w-64' : 'w-16'
        }`}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
        <div className="p-4">
          <div className="flex ">
            <span
              className={`transition-opacity ${
                isExpanded ? 'opacity-100' : 'opacity-0'
              } overflow-hidden whitespace-nowrap`}
            >
              <div className="flex flex-row content-start gap-3">
                <img src={logo} className="w-[40px] h-[40px]" />
                <h2 className="text-[32px]">DNX</h2>
              </div>
            </span>
            <span
              className={`transition-opacity ${
                !isExpanded ? 'opacity-100' : 'opacity-0'
              } absolute`}
            >
              <img src={logo} />
            </span>
          </div>
        </div>

        <nav className="pt-8">
          <SidebarItem icon={overview} label="Overview" isExpanded={isExpanded} />
          <SidebarItem icon={task} label="Task" isExpanded={isExpanded} />
          <SidebarItem
            icon={mentor}
            label="Mentors"
            isExpanded={isExpanded}
          />
          <SidebarItem icon={message} label="Message" isExpanded={isExpanded} />
          <SidebarItem icon={settings} label="Settings" isExpanded={isExpanded} />
        </nav>
      </div>
    </div>
  );
};

export default CollapsibleSidebar;