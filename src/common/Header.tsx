import React from "react";
import { Menu, Search } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import profile from "../assets/Profil.png";
import { useLocation, useNavigate } from "react-router-dom";
import Notif from "../assets/notif.png";
import category from "../assets/element-1.png";
import sort from "../assets/sort.png";

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
  const isTaskDetailPage = location.pathname === "/detailtask";
  const navigate = useNavigate();

  return (
    <header
      className={`p-7 md:w-full flex flex-col gap-7 ${
        isTaskPage ||
        isMentorPage ||
        isSettingsPage ||
        isMessagesPage ||
        isTaskDetailPage
          ? "bg-white" + (isMessagesPage ? " border-l-1" : "")
          : ""
      }`}
    >
      <div className="flex items-center justify-between">
        {isTaskPage ||
        isMentorPage ||
        isSettingsPage ||
        isMessagesPage ||
        isTaskDetailPage ? (
          <>
            <div className="md:hidden flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="p-0"
                onClick={toggleSidebar}
              >
                <div className="border-1 rounded-full border-[#F5F5F7] p-[8px]">
                  <Menu className="w-10 h-10 text-[#8E92BC]" />
                </div>
              </Button>
            </div>
            <h1 className="hidden md:block text-2xl text-[rgb(20,21,34)] font-semibold">
              {isTaskPage
                ? "Explore Task"
                : isMentorPage
                ? "Explore Mentors"
                : isSettingsPage
                ? "Settings"
                : isTaskDetailPage
                ? "Detail Task"
                : isMessagesPage
                ? "Messages"
                : " "}
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
              <div className="border-1 rounded-full border-[#F5F5F7] p-[8px]">
                <Menu className="w-10 h-10 text-[#8E92BC]" />
              </div>
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
          <Button
            variant="ghost"
            size="icon"
            className="cursor-pointer relative w-10 h-10 rounded-full border-1 border-gray-200 flex items-center justify-center hover:border-gray-300"
            onClick={() => navigate("/messages")}
          >
            <img src={Notif} className="w-6 h-6" />
          </Button>
          <Avatar
            className="w-11 h-11 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <AvatarImage src={profile} alt="Profile" />
            <AvatarFallback>DN</AvatarFallback>
          </Avatar>
        </div>
      </div>
      {(isTaskPage || isMentorPage) && (
        <div className="flex items-center justify-between">
          <div className="hidden md:flex items-center w-120 h-13 border rounded-lg px-4 bg-white">
            <Input
              placeholder={isTaskPage ? "Search Task" : "Search Mentors"}
              className="flex-1 border-none shadow-none bg-white focus:bg-white [&_input]:bg-white"
              style={{ background: "white" }}
            />
            <Search className="text-[#9c9fc4]" size={20} />
          </div>
          <div className="hidden md:flex text-xs text-[#141522] flex-row gap-6">
            <Button
              variant="ghost"
              className="cursor-pointer flex items-center border-1 gap-2 h-13 bg-white"
            >
              <img src={category} /> Category
            </Button>
            <Button
              variant="ghost"
              className="cursor-pointer flex items-center gap-2 h-13 border-1 bg-white"
            >
              <img src={sort} /> Sort By :{isTaskPage ? "Deadline" : "Popular"}
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
