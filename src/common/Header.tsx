import React from "react";
import { Menu, Bell, Search, Filter, LayoutGrid } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import profile from "../assets/Profil.png";
import { useLocation } from "react-router-dom";

interface HeaderProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const location = useLocation();
  const isTaskPage = location.pathname === "/task";
  const isMentorPage = location.pathname === "/mentor";
  const isSettingsPage = location.pathname === "/settings";
  const isMessagesPage = location.pathname === "/messages";

  return (
    <header
      className={`p-7 md:w-full flex flex-col gap-4 ${
        isTaskPage || isMentorPage || isSettingsPage || isMessagesPage ? "bg-white" : ""
      }`}
    >
      <div className="flex items-center justify-between">
        {isTaskPage || isMentorPage || isSettingsPage || isMessagesPage ? (
          <>
            <div className="md:hidden flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="p-0"
                onClick={toggleSidebar}
              >
                <Menu className="w-6 h-6" />
              </Button>
            </div>
            <h1 className="hidden md:block text-2xl text-[rgb(20,21,34)] font-semibold">
              {isTaskPage ? "Explore Task" : 
               isMentorPage ? "Explore Mentors" :
               isSettingsPage ? "Settings" :
               isMessagesPage ? "Messages" : ""}
            </h1>
          </>
        ) : (
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden p-0"
              onClick={toggleSidebar}
            >
              <Menu className="w-6 h-6" />
            </Button>
            <div className="hidden md:flex md:flex-col">
              <h1 className="text-2xl text-[#141522] font-semibold">
                Hi, Dennis Nzioki
              </h1>
              <h2 className="text-base text-[#54577A] font-medium">
                Let's finish your task today!
              </h2>
            </div>
          </div>
        )}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="cursor-pointer">
            <Bell className="w-6 h-6 text-zinc-700" />
          </Button>
          <Avatar className="w-11 h-11">
            <AvatarImage src={profile} alt="Profile" />
            <AvatarFallback>DN</AvatarFallback>
          </Avatar>
        </div>
      </div>

      {(isTaskPage || isMentorPage) && ( 
        <div className="jakarta flex items-center justify-between">
          <div className="hidden md:flex items-center w-120 h-13 border rounded-lg px-4 bg-white">
            <Input
              placeholder={isTaskPage ? "Search Task" : "Search Mentors"} 
              className="flex-1 border-none bg-white"
            />
            <Search />
          </div>
          <div className="hidden md:flex text-xs text-[#141522] flex-row gap-6">
            <Button
              variant="outline"
              className="cursor-pointer flex items-center gap-2 h-13 bg-white"
            >
              <LayoutGrid className="w-5 h-5" /> Category
            </Button>
            <Button
              variant="outline"
              className="cursor-pointer flex items-center gap-2 h-13 bg-white"
            >
              <Filter className="w-5 h-5" /> Sort By : Deadline
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;