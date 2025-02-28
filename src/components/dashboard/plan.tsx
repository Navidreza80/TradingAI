"use client";

import { Info } from "lucide-react";
import { Button } from "../ui/button";
import { useTranslation } from "react-i18next";

export default function Plan() {
  const { t } = useTranslation();

  return (
    <div
      className={`flex flex-col flex-wrap w-full justify-between items-center h-full border border-[#4b4b4b61] rounded-[16px] dark:bg-[#4b4b4b5b] bg-white transition-all duration-300 
                      hover:shadow-xl hover:scale-102 hover:border-gray-300 dark:hover:border-gray-700`}
    >
      {/* Title and Info Icon */}
      <div className="w-full flex justify-between flex-row p-2">
        <h1 className="dark:text-[#ffffff76] text-[#707070] text-sm sm:text-base">
          {t("dashboard.plan.current")}
        </h1>
        <Info color="gray" className="w-5 h-5 sm:w-6 sm:h-6" />
      </div>

      {/* Plan Name */}
      <h1 className="font-bold text-4xl sm:text-5xl md:text-6xl dark:text-white text-gray-600">
        PRO
      </h1>

      {/* Upgrade Button and View Link */}
      <div className="w-full flex justify-between flex-row p-2">
        <div className="text-[#00A19E] flex items-end underline cursor-pointer text-sm sm:text-base">
          {t("dashboard.plan.view")}
        </div>
      </div>
    </div>
  );
}