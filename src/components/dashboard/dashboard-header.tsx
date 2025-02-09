"use client";

// imports
import Image from "next/image";
import { CustomTrigger } from "./trigger";
import DashboardNavigation from "./dashboard-navigation";
import ActionBtns from "./dashboard-header-action-btns";


// tsx render
export default function Headerdashboard() {

  return (
    <div className="w-full h-[68px] border-b border-[#53B1FB] flex flex-row flex-wrap justify-between p-[5px] items-center dark:text-white dark:bg-black text-black bg-white">
      <div className="flex items-center flex-wrap flex-row justify-start">
        {/* custom trigger for sidebar */}
        <CustomTrigger />

        <div className="flex flex-row gap-2 ml-5">
          {/* user profile picture */}
          <Image
            src="/image/8b167af653c2399dd93b952a48740620.jpg"
            alt="user"
            width="48"
            height="48"
            className="rounded-full"
          />

          {/* username and role */}
          <div className="flex flex-row justify-start items-center flex-wrap">
            <h1 className="w-full font-semibold text-[17px]">Navidreza</h1>
            <h3 className="w-full text-[15px] text-[#92CFFF]">Forex Trader</h3>
          </div>
        </div>
      </div>

      {/* navigation */}
      <DashboardNavigation />

      <div
        className="hidden lg:flex items-center gap-2 lg:gap-3 xl:gap-4
          w-[90px] xs:w-[100px] sm:w-[140px] lg:w-[300px]
          justify-end"
      >
        {/* Theme & Language */}
        <ActionBtns />
      </div>
    </div>
  );
}
