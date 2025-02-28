"use client";

import { ChartArea, CircleDollarSign } from "lucide-react";
import Image from "next/image";
import { useTranslation } from "react-i18next";

export default function Position() {
  const { t } = useTranslation();

  return (
    <div
      className={`flex flex-col flex-wrap w-full items-center h-full border border-[#4b4b4b61] rounded-[16px] dark:bg-[#4b4b4b5b] bg-white transition-all duration-300 
                      hover:shadow-xl hover:scale-102 hover:border-gray-300 dark:hover:border-gray-700`}
    >
      {/* Title and Chart Icon */}
      <div className="w-full flex justify-between flex-row pt-2 pb-1 px-2">
        <h1 className="dark:text-[#ffffff76] text-[#707070] text-sm sm:text-base">
          {t("dashboard.position.title")}
        </h1>
        <ChartArea color="gray" className="w-5 h-5 sm:w-6 sm:h-6" />
      </div>

      {/* Crypto Icon and Name */}
      <div className="w-full flex flex-row gap-2 px-2">
        <Image
          src="/image/crypto/btc.svg"
          alt="icon"
          width={24}
          height={24}
          className="w-5 h-5 sm:w-6 sm:h-6"
        />
        <h2 className="text-gray-700 font-bold dark:text-white text-sm sm:text-base">
          BTCUSDT
        </h2>
      </div>

      {/* Price Section */}
      <div className="w-full flex flex-row gap-2 px-2 pt-1">
        <CircleDollarSign color="gray" className="w-5 h-5 sm:w-6 sm:h-6" />
        <h2 className="text-gray-400 font-bold text-sm sm:text-base">
          {t("dashboard.position.price")}: 100,000
        </h2>
      </div>

      {/* Percentage Gain */}
      <h2 className="text-green-400 font-bold text-2xl sm:text-3xl md:text-4xl my-auto">
        118%
      </h2>

      {/* View Link */}
      <div className="text-[#00A19E] underline cursor-pointer w-full text-left p-2 text-sm sm:text-base">
        {t("dashboard.position.view")}
      </div>
    </div>
  );
}