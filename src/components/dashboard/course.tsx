"use client";

import { LucideTrendingUp } from "lucide-react";
import { useTranslation } from "react-i18next";
import * as React from "react";
import { Progress } from "@/components/ui/progress";

export function ProgressDemo() {
  const [progress] = React.useState(66);

  return (
    <div className="w-full flex flex-col flex-wrap items-start p-2">
      <h1 className="w-full dark:text-white text-black">{progress}%</h1>
      <Progress value={progress} className="w-[60%]" />
    </div>
  );
}

export default function Blog() {
  const { i18n, t } = useTranslation();
  return (
    <div
      className={`flex flex-col w-full h-1/2 border border-[#4b4b4b61] rounded-[16px] dark:bg-[#4b4b4b5b] bg-white transition-all duration-300 
            hover:shadow-xl hover:scale-102 hover:border-gray-300 dark:hover:border-gray-700 ${
              i18n.language == "fa" && "font-vazirmatn"
            } ${i18n.language == "ar" && "font-notokufi"}`}
    >
      <div>
        <div className="w-full flex justify-between flex-row p-2">
          {" "}
          <h1 className="dark:text-[#ffffff76] text-[#707070]">
            {t("dashboard.course.title")}
          </h1>
          <LucideTrendingUp color="gray" />
        </div>
        <div className="w-full flex justify-between items-center flex-row px-2">
          <h1 className="font-bold text-2xl dark:text-white gap-9 text-gray-600">
            Head And Shoulders
          </h1>
          <h1 className="text-gray-400">2 hours ago...</h1>
        </div>
        <ProgressDemo />
        <div className="w-full text-left p-2 dark:text-gray-400 text-black">
          Head and shoulders is one of the strongest reversal pattern that can
          occur in the...
        </div>
      </div>
      <div className="w-full h-[135px] ">
        <img src="/image/analyze.png" className="w-full h-full rounded-b-lg" />
      </div>
    </div>
  );
}
