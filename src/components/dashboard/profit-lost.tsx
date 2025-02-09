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
      } flex flex-row flex-wrap pr-2 py-4 border border-[#4b4b4b61] rounded-[16px] justify-start items-center dark:bg-[#4b4b4b5b] bg-white gap-8 w-1/3 transition-all duration-300 
                    hover:shadow-xl hover:scale-102 hover:border-gray-300 dark:hover:border-gray-700`}
    >
      <h2
        className={`text-green ${
          i18n.language != "en" ? "pl-6 pr-4 border-l" : "pr-6 pl-4 border-r"
        } dark:border-[#ffffff7e] border-[#707070] py-4 text-lg font-bold dark:text-[#00FF40] text-[#24822f]`}
      >
        {t("dashboard.pandl.pandl")}
      </h2>
      <div className="flex flex-col flex-wrap justify-center dark:text-[#00FF40] text-[#24822f]">
        {/* How much profit gained or lost */}
        <h2 className="flex flex-row w-full text-2xl items-center gap-1 font-bold">
          1%
          <ChartBar className="-rotate-90" />
        </h2>

        {/* Duration */}
        <h2 className="dark:text-[#ffffff76] text-[#707070]">
          {t("dashboard.pandl.lastMonth")}
        </h2>
      </div>
    </div>
  );
}
