"use client";

// imports
import DashboardNavigation from "./dashboard-navigation";
import ActionBtns from "./dashboard-header-action-btns";
import { useTranslation } from "react-i18next";
import AppSheet from "./app-sidebar";
import { getDbUser } from "@/actions/user.action";
import { useEffect, useState } from "react";
import { User } from "@/types/user";
import UserAvatar from "./user-avatar";

// tsx render
export default function Headerdashboard() {
  const { i18n } = useTranslation();
  const [user, setUser] = useState<User>();
  const getUser = async () => {
    const user = await getDbUser();
    setUser(user);
  };
  useEffect(() => {
    getUser();
  }, []);

  return (
 <div className="w-screen flex flex-row flex-shrink justify-between items-center p-2 h-16 bg-white dark:bg-black border-b border-b-[#3ca6ff]">
  <UserAvatar />
  <ActionBtns />
 </div>
  );
}
