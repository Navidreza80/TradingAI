"use client";

// imports
import { getDbUser } from "@/actions/user.action";
import { User } from "@/types/user";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Navigation from "../Header/header-navigation";
import Logo from "../Logo";
import ThemeNLanguage from "../theme-n-language";
import Sidebar from "./app-sidebar";

// tsx render
export default function Headerdashboard() {
  const [user, setUser] = useState<User>();
  const { user: currentUser } = useUser();
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const getUser = async () => {
    const user = await getDbUser();
    setUser(user);
  };

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="w-screen flex flex-row justify-center items-center h-[90px] fixed top-0 left-0 z-50  bg-[#F0F0F0] dark:bg-[#0A0A0A]">
      <div className="w-[95%] flex flex-row justify-between items-center p-2 h-[68px] bg-white dark:bg-black rounded-xl border border-gray-200 dark:border-gray-800">
        <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
        <div className="flex flex-row gap-2 items-center">
          <button
            onClick={toggleSidebar}
            className="w-8 h-8 dark:bg-sidebarDM bg-sidebarLM bg-cover max-[900px]:w-10 max-[900px]:h-10"
          ></button>
          <span className="h-6 bg-gray-400 w-[1px]"></span>
          <Logo isDarkMode={isDarkMode} />
        </div>
        <Navigation />
        <div className="flex gap-2 items-center">
          <ThemeNLanguage responsive={"max-[900px]:hidden"} />
          <img
            src={currentUser?.imageUrl}
            className="max-[900px]:w-10 max-[900px]:h-10 w-8 h-8 rounded-full"
          />
        </div>
      </div>
    </div>
  );
}
