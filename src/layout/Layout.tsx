import { useState } from "react";
import Header from "../common/Header";
import Sidebar from "../common/Sidebar";
import { Outlet, useLocation } from "react-router-dom";
import Calendar from "../pages/dashboard/components/Calendar"; // Adjust the import path as needed
import TaskToday from "../pages/dashboard/components/TaskToday"; // Adjust the import path as needed

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const isDashboard =
    location.pathname === "/" || location.pathname === "/dashboard";
  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };
  return (
    <div className="flex h-screen bg-[#fafafa]">
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      {isDashboard ? (
        <div className="flex flex-col flex-grow">
          <div className="flex flex-col gap-40 md:gap-0 md:flex-row w-full">
            <div className="w-full md:w-[60%]">
              <Header
                isSidebarOpen={isSidebarOpen}
                toggleSidebar={toggleSidebar}
              />
              <div className="bg-[#fafafa] h-[calc(100vh-64px)]">
                <Outlet />
              </div>
            </div>
            <div className="w-full bg-[#f5f5f7] md:w-[40%] p-7 pt-7 mt-6 md:mt-0">
              <div className="flex flex-col gap-7 h-full">
                <Calendar />
                <TaskToday />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col flex-grow">
          <Header isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
          <Outlet />
        </div>
      )}
    </div>
  );
};

export default Layout;
