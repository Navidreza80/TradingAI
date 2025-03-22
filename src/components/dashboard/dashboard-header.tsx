"use client";
// React built in hooks
import { useState } from "react";
// Third party components
import Navigation from "../Header/header-navigation";
import UserSection from "../Header/user-section";
import Logo from "../Header/Logo";
import ThemeNLanguage from "../Header/theme-n-language";
import Sidebar from "./app-sidebar";
import ToggleSideBar from "./toggle-sidebar";

export default function HeaderDashboard() {
  // State to open or close the sidebar
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  // Function to setSidebar true or false
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="w-screen flex flex-row justify-center items-center h-[90px] fixed top-0 left-0 z-50  bg-[#F0F0F0] dark:bg-[#0A0A0A]">
      <div className="w-[95%] flex flex-row justify-between items-center p-2 h-[68px] bg-white dark:bg-black rounded-xl border border-gray-200 dark:border-gray-800">
        {/* Dashboard Sidebar */}
        <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
        <div className="flex flex-row gap-2 items-center">
          {/* Toggle Sidebar */}
          <ToggleSideBar toggleSidebar={toggleSidebar} />
          <span className="h-6 bg-gray-400 w-[1px]"></span>

          {/* Website Logo */}
          <Logo />
        </div>

        {/* Header Navigation */}
        <Navigation />
        <div className="flex gap-2 items-center">
          {/* Theme and Language */}
          <ThemeNLanguage responsive={"max-[900px]:hidden"} />

          {/* User Profile Section */}
          <UserSection />
        </div>
      </div>
    </div>
  );
}
