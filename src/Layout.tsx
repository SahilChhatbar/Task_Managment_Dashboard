import { useState } from "react";
import Header from "./common/Header";
import Sidebar from "./common/Sidebar";
import { Outlet } from "react-router-dom" 


const Layout:any = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(prev=>!prev);
  };

  return (
    <div className="flex h-screen bg-[#fafafa]">
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex flex-col flex-grow">
        <Header isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <Outlet/>
      </div>
    </div>
  );
};

export default Layout;