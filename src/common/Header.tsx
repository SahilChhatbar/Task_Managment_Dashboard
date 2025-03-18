import React from "react";
import { Menu } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";
import profile from "../assets/Profil.png"
interface HeaderProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ isSidebarOpen, toggleSidebar }) => {
  return (
    <header className="p-7 md:w-[61%] flex items-center justify-between">
      <div className="flex flex-row items-center gap-4">
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden p-0" 
          onClick={toggleSidebar}
        >
          <Menu className="w-6 h-6" />
        </Button>
        <div className="hidden md:flex md:flex-col">
          <h1 className="text-2xl text-[#141522] font-semibold font-['Plus_Jakarta_Sans']">Hi, Dennis Nzioki</h1>
          <h2 className="text-base text-[#54577A] font-medium font-['Plus_Jakarta_Sans']">Let's finish your task today!</h2>
        </div>
      </div>
      <nav className={`flex flex-row ${isSidebarOpen ? "hidden md:flex" : "flex"}`}>
        <ul className="flex flex-row gap-6 items-center">
          <li>
            <Button variant="ghost" size="icon" className="cursor-pointer">
              <Bell className="w-6 h-6 text-zinc-700 " />
            </Button>
          </li>
          <li>
            <Avatar className="w-13 h-13">
              <AvatarImage src={profile}  alt="Profile" />
              <AvatarFallback>DN</AvatarFallback>
            </Avatar>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;