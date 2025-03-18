import React, { useState, ReactNode } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import DashboardContent from "./dashboard/DashboardContent";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-[#fafafa]">
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex flex-col flex-grow">
        <Header isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <DashboardContent />
      </div>
    </div>
  );
};

export default Layout;