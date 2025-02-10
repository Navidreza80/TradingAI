"use client";

import { Info } from "lucide-react";
import { Button } from "../ui/button";
import { useTranslation } from "react-i18next";

export default function Plan() {
  const { t, i18n } = useTranslation();
  return (
    <div
      className={`flex flex-col flex-wrap items-center justify-between w-1/3 aspect-square border border-[#4b4b4b61] rounded-[16px] dark:bg-[#4b4b4b5b] bg-white transition-all duration-300 
                    hover:shadow-xl hover:scale-102 hover:border-gray-300 dark:hover:border-gray-700 ${
                      i18n.language == "fa" && "font-vazirmatn"
                    } ${i18n.language == "ar" && "font-notokufi"}`}
    >
      <div className="w-full flex justify-between flex-row p-2">
        <h1 className="dark:text-[#ffffff76] text-[#707070]">
          {t("dashboard.plan.current")}
        </h1>
        <Info color="gray" />
      </div>
      <h1 className="font-bold text-6xl dark:text-white text-gray-600">PRO</h1>
      <div className="w-full flex justify-between flex-row p-2">
        <Button>{t("dashboard.plan.upgrade")}</Button>
        <div className="text-[#00A19E] flex items-end underline cursor-pointer">
          {t("dashboard.plan.view")}
        </div>
      </div>
    </div>
  );
}
