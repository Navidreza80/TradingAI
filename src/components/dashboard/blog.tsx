"use client";

import { Book, Eye, Calendar, Heart, MessageSquare } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function Course() {
  const { i18n, t } = useTranslation();
  return (
    <div
      className={`flex flex-col w-full h-1/2 border border-[#4b4b4b61] justify-between rounded-[16px] dark:bg-[#4b4b4b5b] bg-white transition-all duration-300 
            hover:shadow-xl hover:scale-102 hover:border-gray-300 dark:hover:border-gray-700 ${
              i18n.language == "fa" && "font-vazirmatn"
            } ${i18n.language == "ar" && "font-notokufi"}`}
    >
      <div>
        <div className="w-full flex justify-between flex-row p-2">
          {" "}
          <h1 className="dark:text-[#ffffff76] text-[#707070]">
            {t("dashboard.blog.title")}
          </h1>
          <Book color="gray" />
        </div>
        <div className="w-full flex justify-between items-center flex-row px-2">
          <h1 className="font-bold text-2xl dark:text-white gap-9 text-gray-600">
            Whats Bitcoin?
          </h1>
          <h1 className="text-gray-400">2 hours ago...</h1>
        </div>

        <div className="w-full flex justify-start items-center flex-row p-2 dark:text-gray-400 gap-9 text-gray-600">
          <div className="flex flex-row gap-1">
            <Eye />
            12
          </div>
          <div className="flex flex-row gap-1">
            <Heart />
            30
          </div>
          <div className="flex flex-row gap-1">
            <Calendar />
            07/02/2025
          </div>
          <div className="flex flex-row gap-1">
            <MessageSquare />5
          </div>
        </div>

        <div className="w-full text-left p-2 dark:text-gray-400 text-black">
          Well, Bitcoin is a cryptocurrency that is decentrelized built on
          blockchain....
        </div>
      </div>
      <div className="w-full h-[135px] ">
        <img src="/image/trade.png" className="w-full h-full rounded-b-lg" />
      </div>
    </div>
  );
}
