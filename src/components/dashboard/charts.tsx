"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useTranslation } from "react-i18next";
import { TrendingUp } from "lucide-react";

const chartData = [
  { month: "January", win: 186, loose: 80 },
  { month: "February", win: 305, loose: 200 },
  { month: "March", win: 237, loose: 120 },
  { month: "April", win: 73, loose: 190 },
  { month: "May", win: 209, loose: 130 },
  { month: "June", win: 214, loose: 140 },
];

const chartConfig = {
  desktop: {
    label: "Win",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Loose",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function Chart() {
  const { t } = useTranslation();

  return (
    <div
      className={`flex flex-col flex-wrap items-start justify-start w-full h-full border border-[#4b4b4b61] rounded-[16px] dark:bg-[#4b4b4b5b] bg-white transition-all duration-300 
                      hover:shadow-xl hover:scale-102 hover:border-gray-300 dark:hover:border-gray-700 `}
    >
      {/* Title and Icon */}
      <div className="w-full flex justify-between flex-row p-2">
        <h1 className="dark:text-[#ffffff76] text-[#707070] text-sm sm:text-base">
          {t("dashboard.chart.title")}
        </h1>
        <TrendingUp color="gray" className="w-5 h-5 sm:w-6 sm:h-6" />
      </div>

      {/* Chart Container */}
      <ChartContainer config={chartConfig} className="w-full h-[400px] sm:h-[250px] md:h-[300px]">
        <BarChart
          accessibilityLayer
          data={chartData}
          margin={{ top: 20, right: 20, left: 20, bottom: 10 }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={true}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
            fontSize={12}
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator="dashed" />}
          />
          <Bar dataKey="win" fill="var(--color-desktop)" radius={4} />
          <Bar dataKey="loose" fill="var(--color-mobile)" radius={4} />
        </BarChart>
      </ChartContainer>
    </div>
  );
}