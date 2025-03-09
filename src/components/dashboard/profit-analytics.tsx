"use client";

import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { getUserProfits } from "@/actions/user.action";

export default function AnalyticsChart() {
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const [data, setData] = useState();
  const getUserData = async () => {
    const request = await getUserProfits();
    setData(request);
  };
  useEffect(() => {
    getUserData();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-1/2 h-full md:w-1/2 sm:w-full xs:w-full sm:h-1/2 xs:h-1/2"
    >
      <Card className="shadow-xl rounded-2xl border border-[#4b4b4b61] bg-white dark:bg-black border-gray-200 dark:border-gray-800 w-full">
        <CardContent>
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100"></h2>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={data}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#e5e7eb"
                className="dark:stroke-gray-700"
              />
              <XAxis
                dataKey="name"
                stroke={isDarkMode ? "white" : "black"}
                className="dark:stroke-white"
              />
              <Tooltip
                contentStyle={{ backgroundColor: "#000000", color: "#f9fafb" }}
                wrapperStyle={{
                  borderRadius: "8px",
                  border: "1px solid #374151",
                }}
              />
              <Legend
                wrapperStyle={{ color: "#6b7280" }}
                className="dark:text-gray-400"
              />
              <Bar
                dataKey="profit$"
                fill="url(#colorGradient)"
                radius={[6, 6, 0, 0]}
                barSize={35}
              />
              <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity={0.9} />
                  <stop offset="100%" stopColor="#4f46e5" stopOpacity={0.7} />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </motion.div>
  );
}
