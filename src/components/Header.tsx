import React from "react";
import { MdMenu } from "react-icons/md";
import notification from "../assets/notif.png";
import profile from "../assets/Profil.png"

interface HeaderProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ isSidebarOpen, toggleSidebar }) => {
  return (
    <header className="text-[#141522] p-8 md:w-[61%] flex items-center justify-between">
      <div className="flex flex-row items-center">
        <MdMenu className="w-[24px] h-[24px] cursor-pointer md:hidden" onClick={toggleSidebar} />
        <div className="hidden md:flex md:flex-col">
          <h1 className="jakarta text-2xl text-[#141522] font-semibold">Hi, Dennis Nzioki</h1>
          <h2 className="jakarta text-base text-[#54577A] font-medium">Let's finish your task today!</h2>
        </div>
      </div>
      <nav className={`flex flex-row ${isSidebarOpen ? "hidden md:flex" : "flex"}`}>
        <ul className="flex flex-row gap-6 items-center">
          <li>
            <a href="#" className="hover:underline">
              <img src={notification} />
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline">
              <img src={profile} />
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;