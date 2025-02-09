"use client";

import { Calendar, Eye, Heart, MessageSquare, Reply } from "lucide-react";
import Image from "next/image";
import { useTranslation } from "react-i18next";

export default function Comments() {
  const { t, i18n } = useTranslation();
  return (
    <div
      className={`flex flex-col flex-wrap items-start justify-start w-2/3 aspect-auto border border-[#4b4b4b61] rounded-[16px] dark:bg-[#4b4b4b5b] bg-white transition-all duration-300 
                      hover:shadow-xl hover:scale-102 hover:border-gray-300 dark:hover:border-gray-700 ${
                        i18n.language == "fa" && "font-vazirmatn"
                      } ${i18n.language == "ar" && "font-notokufi"}`}
    >
      {" "}
      <div className="w-full flex justify-between flex-row p-2">
        <h1 className="dark:text-[#ffffff76] text-[#707070]">
          {t("dashboard.comments.title")}
        </h1>
        <MessageSquare color="gray" />
      </div>
      <div className="w-full flex justify-between items-center flex-row p-2">
        <div className={`flex flex-row gap-2`}>
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
            <h1 className="w-full font-semibold text-[17px] dark:text-gray-400 gap-9 text-gray-600">Navidreza</h1>
            <h3 className="w-full text-[15px] dark:text-gray-400 gap-9 text-gray-600">Forex Trader</h3>
          </div>
        </div>
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
          <Reply />5
        </div>
      </div>
      <div className="flex flex-col w-full p-2 items-start gap-2">
        <h1 className="font-bold text-2xl dark:text-gray-400 gap-9 text-gray-600">How this strategy works?</h1>
        <h3 className="text-gray-400 overflow-hidden w-96 h-full text-ellipsis whitespace-nowrap">how can i implement this strategy in my trades so i can gai loads of profit and became elon musk ow can i implement this strategy in my trades so i can gai loads of profit and became elon musk ow can i implement this strategy in my trades so i can gai loads of profit and became elon musk</h3>
      </div>
    </div>
  );
}
