"use client";

// imports
import { ChartBar } from "lucide-react";
import { useTranslation } from "react-i18next";

// tsx render
export function ProfitLost() {
  const { t, i18n } = useTranslation();

  return (
    <div
      className={`${i18n.language == "fa" && "font-vazirmatn"} ${
        i18n.language == "ar" && "font-notokufi"
      } flex flex-row p-4 border border-[#4b4b4b61] rounded-[16px] justify-start items-center dark:bg-[#4b4b4b5b] bg-white gap-4 sm:gap-8 w-full transition-all duration-300 
                    hover:shadow-xl hover:scale-102 hover:border-gray-300 dark:hover:border-gray-700`}
    >
      {/* Title Section */}
      <h2
        className={`text-green ${
          i18n.language != "en" ? "pl-6 pr-4 border-l" : "pr-6 pl-4 border-r"
        } dark:border-[#ffffff7e] border-[#707070] py-2 sm:py-4 text-lg font-bold dark:text-[#00FF40] text-[#24822f]`}
      >
        {t("dashboard.pandl.pandl")}
      </h2>

      {/* Profit/Loss and Duration Section */}
      <div className="flex flex-col items-center sm:items-start gap-1 dark:text-[#00FF40] text-[#24822f]">
        {/* How much profit gained or lost */}
        <h2 className="flex flex-row text-xl sm:text-2xl items-center gap-1 font-bold">
          1%
          <ChartBar className="-rotate-90" />
        </h2>

        {/* Duration */}
        <h2 className="dark:text-[#ffffff76] text-[#707070] text-sm sm:text-base">
          {t("dashboard.pandl.lastMonth")}
        </h2>
      </div>
    </div>
  );
}