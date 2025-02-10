"use client";

import { ChartArea, CircleDollarSign } from "lucide-react";
import Image from "next/image";
import { useTranslation } from "react-i18next";

export default function Position() {
  const { t, i18n } = useTranslation();
  return (
    <div
      className={`flex flex-col flex-wrap w-1/3 items-center aspect-square border border-[#4b4b4b61] rounded-[16px] dark:bg-[#4b4b4b5b] bg-white transition-all duration-300 
                      hover:shadow-xl hover:scale-102 hover:border-gray-300 dark:hover:border-gray-700 ${
                        i18n.language == "fa" && "font-vazirmatn"
                      } ${i18n.language == "ar" && "font-notokufi"}`}
    >
      <div className="w-full flex justify-between flex-row pt-2 pb-1 px-2">
        <h1 className="dark:text-[#ffffff76] text-[#707070]">
          {t("dashboard.position.title")}
        </h1>
        <ChartArea color="gray" />
      </div>
      <div className="w-full flex flex-row gap-2 px-2">
        <Image src="/image/crypto/btc.svg" alt="icon" width={24} height={24} />
        <h2 className="text-gray-700 font-bold dark:text-white">BTCUSDT</h2>
      </div>
      <div className="w-full flex flex-row gap-2 px-2 pt-1">
        <CircleDollarSign color="gray" />
        <h2 className="text-gray-400 font-bold">
          {t("dashboard.position.price")}: 100,000
        </h2>
      </div>
      <h2 className="text-green-400 font-bold text-4xl my-auto">118%</h2>
      <div className="text-[#00A19E] underline cursor-pointer w-full text-left p-2">
        {t("dashboard.position.view")}
      </div>
    </div>
  );
}
