"use client";

// imports
import DashboardNavigation from "./dashboard-navigation";
import ActionBtns from "./dashboard-header-action-btns";
import { useTranslation } from "react-i18next";
import AppSheet from "./app-sidebar";

// tsx render
export default function Headerdashboard() {
  const { i18n } = useTranslation();

  return (
    <div className="w-full h-[68px] border-b border-[#53B1FB] flex flex-row justify-between iems-center p-2 dark:text-white dark:bg-black text-black bg-white">
      {/* Left Section: Trigger and User Info */}
      <div className="flex items-center">
        {/* custom trigger for sidebar */}
        <AppSheet />

        {/* User Profile Picture and Info */}
        <div className={`flex items-center flex-row gap-2 ${i18n.language !== 'en' ? 'lg:mr-5 md:mr-4 sm:mr-3 xs:mr-2' : 'lg:ml-5 md:ml-4 sm:ml-3 xs:ml-2 '}`}>
          <img
            src="/image/8b167af653c2399dd93b952a48740620.jpg"
            alt="user"
            className="rounded-full lg:h-10 lg:w-10 md:h-9 md:w-9 sm:h-8 sm:w-8 xs:h-7 xs:w-7"
          />
          <div className="flex flex-col justify-center items-start">
            <h1 className="font-semibold text-sm sm:text-base">Navidreza</h1>
            <h3 className="text-xs sm:text-sm text-[#92CFFF]">Forex Trader</h3>
          </div>
        </div>
      </div>

      {/* Center Section: Navigation */}
      <div className=" flex justify-center mx-2">
        <DashboardNavigation />
      </div>

      {/* Right Section: Action Buttons */}
      <div className="flex items-center gap-2 sm:gap-3 lg:gap-4 flex-shrink-0">
        <ActionBtns />
      </div>
    </div>
  );
}