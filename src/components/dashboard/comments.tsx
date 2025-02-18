"use client";

import { Calendar, Eye, Heart, MessageSquare, Reply } from "lucide-react";
import Image from "next/image";
import { useTranslation } from "react-i18next";

export default function Comments() {
  const { t } = useTranslation();

  return (
    <div
      className={`flex flex-col flex-wrap w-full items-center h-full border border-[#4b4b4b61] rounded-[16px] dark:bg-[#4b4b4b5b] bg-white transition-all duration-300 
                      hover:shadow-xl hover:scale-102 hover:border-gray-300 dark:hover:border-gray-700 p-2`}
    >
      {/* Title and Message Icon */}
      <div className="w-full flex justify-between flex-row py-2">
        <h1 className="dark:text-[#ffffff76] text-[#707070] text-sm sm:text-base">
          {t("dashboard.comments.title")}
        </h1>
        <MessageSquare color="gray" className="w-5 h-5 sm:w-6 sm:h-6" />
      </div>

      {/* User Info Section */}
      <div className="w-full flex justify-between items-center flex-row py-2">
        <div className="flex flex-row gap-2">
          {/* User Profile Picture */}
          <Image
            src="/image/8b167af653c2399dd93b952a48740620.jpg"
            alt="user"
            width={40}
            height={40}
            className="rounded-full w-10 h-10 sm:w-12 sm:h-12"
          />

          {/* Username and Role */}
          <div className="flex flex-col justify-start items-start">
            <h1 className="font-semibold text-sm sm:text-base dark:text-gray-400 text-gray-600">
              Navidreza
            </h1>
            <h3 className="text-xs sm:text-sm dark:text-gray-400 text-gray-600">
              Forex Trader
            </h3>
          </div>
        </div>

        {/* Timestamp */}
        <h1 className="text-gray-400 text-xs sm:text-sm">2 hours ago...</h1>
      </div>

      {/* Stats Section (Views, Likes, Date, Replies) */}
      <div className="w-full flex justify-start items-center flex-row py-2 gap-2 sm:gap-4 dark:text-gray-400 text-gray-600">
        <div className="flex flex-row gap-1 items-center text-xs sm:text-sm">
          <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
          12
        </div>
        <div className="flex flex-row gap-1 items-center text-xs sm:text-sm">
          <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
          30
        </div>
        <div className="flex flex-row gap-1 items-center text-xs sm:text-sm">
          <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
          07/02/2025
        </div>
        <div className="flex flex-row gap-1 items-center text-xs sm:text-sm">
          <Reply className="w-4 h-4 sm:w-5 sm:h-5" />
          5
        </div>
      </div>

      {/* Comment Content */}
      <div className="flex flex-col w-full py-2 items-start gap-2">
        <h1 className="font-bold text-lg sm:text-xl md:text-2xl dark:text-gray-400 text-gray-600">
          How this strategy works?
        </h1>
        <div className="w-1/2 overflow-hidden"
        >        <h3 className="text-gray-400 text-sm sm:text-base overflow-hidden text-ellipsis whitespace-nowrap w-full">
            How can I implement this strategy in my trades so I can gain loads of

          </h3></div>

      </div>
    </div>
  );
}