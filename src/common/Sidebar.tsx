import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { X } from "lucide-react";
import logo from "../assets/book-square.svg";
import { SIDEBAR_NAV_ITEMS, HELP_CENTER_CONTENT } from "../constants"; // Import constants

interface SidebarItemProps {
  icon: string;
  label: string;
  active?: boolean;
  path: string;
}
interface SidebarProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}
const SidebarItem: React.FC<SidebarItemProps> = ({
  icon,
  label,
  active = false,
  path,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      to={path}
      className={`flex items-center px-2 py-3 pb-2 ${
        active ? "bg-[#F5F5F7] text-black" : "hover:bg-[#f5f5f7]"
      } w-full cursor-pointer rounded-lg`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center justify-center w-6 h-6">
        <img
          src={icon}
          alt={label}
          className={`transition-colors duration-100 ${
            active ? "brightness-1" : isHovered ? "filter brightness-0" : ""
          }`}
        />
      </div>
      <span
        className={`pl-2 transition-colors duration-100 ${
          active
            ? "text-black font-medium"
            : isHovered
            ? "text-[#141522]"
            : "text-[#8E92BC]"
        }`}
      >
        {label}
      </span>
    </Link>
  );
};
const Sidebar: React.FC<SidebarProps> = ({ isSidebarOpen, toggleSidebar }) => {
  const location = useLocation();
  const currentPath = location.pathname;
  const isActive = (path: string) => {
    if (path === "/") {
      return currentPath === path;
    }
    return currentPath === path || currentPath.startsWith(`${path}/`);
  };
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
            <h2 className="jakarta text-[32px] text-[#141522] font-semibold">
              DNX
            </h2>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="w-[24px] h-[24px] cursor-pointer md:hidden"
            onClick={toggleSidebar}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
        <div className="flex flex-col flex-1 overflow-hidden">
          <div className="flex flex-col flex-1 justify-between">
            <div className="flex justify-center">
              <nav className="flex flex-col gap-6 w-[75%]">
                {SIDEBAR_NAV_ITEMS.map((item) => (
                  <SidebarItem
                    key={item.label}
                    icon={item.icon}
                    label={item.label}
                    active={isActive(item.path)}
                    path={item.path}
                  />
                ))}
              </nav>
            </div>
            <div className="p-3 flex justify-center">
              <Card className="bg-[#141522] text-white rounded-xl relative w-[188px] h-[248px] flex flex-col items-center">
                <div className="bg-[#f5f5f5] rounded-full w-12 h-12 flex items-center justify-center absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-6 shadow-lg">
                  <span className="text-2xl bg-[#141522] font-bold w-9 h-9 rounded-full text-white flex items-center justify-center">
                    ?
                  </span>
                </div>
                <div className="text-center flex-1 pt-8">
                  <h3 className="jakarta font-semibold text-base">
                    {HELP_CENTER_CONTENT.title}
                  </h3>
                  <p className="jakarta text-xs p-3">
                    {HELP_CENTER_CONTENT.description}
                  </p>
                </div>
                <div className="flex justify-center w-full">
                  <Button className="jakarta cursor-pointer font-semibold bg-white text-[#141522] w-[75%] py-2 rounded-lg text-xs hover:bg-white hover:opacity-90">
                    {HELP_CENTER_CONTENT.buttonText}
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
