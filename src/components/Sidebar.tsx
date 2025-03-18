import React, { useState } from "react";
import logo from "../assets/book-square.svg";
import overview from "../assets/category-2.svg";
import task from "../assets/book.svg";
import mentor from "../assets/user-octagon.svg";
import message from "../assets/message.svg";
import settings from "../assets/setting-2.svg";
import { MdClose } from 'react-icons/md';

interface SidebarItemProps {
  icon: string;
  label: string;
  active?: boolean;
}

interface SidebarProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
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
        active ? "bg-blue-600 text-white" : "hover:bg-[#f5f5f7]"
      } w-full cursor-pointer rounded-lg`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center justify-center w-6 h-6">
        <img
          src={icon}
          alt={label}
          className={`transition-colors duration-100 ${
            isHovered ? "filter brightness-0" : ""
          }`}
        />
      </div>
      <span
        className={`sidebar-label pl-2 transition-colors duration-100 ${
          isHovered ? "text-[#141522]" : "text-[#8E92BC]"
        }`}
      >
        {label}
      </span>
    </div>
  );
};

const Sidebar: React.FC<SidebarProps> = ({ isSidebarOpen, toggleSidebar }) => {
  return (
    <div
      className={`${
        isSidebarOpen ? "fixed inset-0 z-50 bg-white" : "w-0 md:w-[252px]"
      } md:relative transition-all duration-300`}
    >
      <div
        className={`w-full md:w-[252px] bg-[#FFFFFF] text-black h-full ${
          isSidebarOpen ? "flex flex-col" : "hidden md:flex md:flex-col"
        }`}
      >
        <div className="p-3 flex justify-between items-center">
          <div
            className={`flex items-center gap-3 p-4 ${
              isSidebarOpen ? "flex" : "hidden md:flex"
            }`}
          >
            <img src={logo} className="w-[40px] h-[40px]" alt="DNX Logo" />
            <h2 className="jakarta text-[32px] text-[#141522] font-semibold">DNX</h2>
          </div>
          <MdClose 
            className="w-[24px] h-[24px] cursor-pointer md:hidden"
            onClick={toggleSidebar}
          />
        </div>

        <div className="flex flex-col flex-1 overflow-hidden">
          <div className="flex flex-col flex-1 justify-between">
            <div className="flex justify-center">
              <nav className="flex flex-col gap-6 w-[75%]">
                <SidebarItem icon={overview} label="Overview" />
                <SidebarItem icon={task} label="Task" />
                <SidebarItem icon={mentor} label="Mentors" />
                <SidebarItem icon={message} label="Message" />
                <SidebarItem icon={settings} label="Settings" />
              </nav>
            </div>

            <div className="p-3 flex justify-center">
              <div className="bg-[#141522] text-white rounded-xl relative w-[188px] h-[248px] flex flex-col items-center">
                <div className="bg-[#f5f5f5] rounded-full w-12 h-12 flex items-center justify-center translate-y-[-24px] shadow-4xl">
                  <span className="text-2xl bg-[#141522] font-bold w-9 rounded-full text-white text-center text-[28px]">
                    ?
                  </span>
                </div>

                <div className="text-center flex-1">
                  <h3 className="jakarta font-semibold text-base">
                    Help Center
                  </h3>
                  <p className="jakarta text-xs p-3">
                    Having Trouble in Learning. Please contact us for more
                    questions.
                  </p>
                </div>
                <div className="flex justify-center w-full pb-4">
                  <button className="cursor-pointer jakarta font-semibold bg-white text-[#141522] w-[75%] py-2 rounded-lg text-xs">
                    Go To Help Center
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;