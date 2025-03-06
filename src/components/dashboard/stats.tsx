"use client"

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { TrendingUp, Users, DollarSign, BarChart } from "lucide-react";

export default function Stats() {
  const stats = [
    {
      title: "Total Profit",
      value: "$124,500",
      icon: <DollarSign size={24} className="text-green-500" />, 
    },
    {
      title: "Total Trades",
      value: "8,320",
      icon: <BarChart size={24} className="text-blue-500" />, 
    },
    {
      title: "Win Rate",
      value: "12.5%",
      icon: <TrendingUp size={24} className="text-purple-500" />, 
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.2 }}
          className="w-full"
        >
          <Card className="p-6 shadow-xl rounded-2xl bg-white dark:bg-black border border-gray-200 dark:border-gray-800 relative overflow-hidden">
            <div className="absolute inset-0 opacity-20 dark:opacity-30 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 rounded-2xl" />
            <div className="absolute inset-0 flex justify-center items-center opacity-20 dark:opacity-40">
              <div className="w-40 h-40 bg-gray-300 dark:bg-gray-700 rounded-full blur-3xl" />
              <div className="absolute w-24 h-24 bg-gray-200 dark:bg-gray-600 rounded-full blur-2xl" />
            </div>
            <CardContent className="flex items-center space-x-4 relative z-10">
              <div className="p-3 rounded-full bg-gray-200 dark:bg-gray-800 shadow-lg">
                {stat.icon}
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {stat.title}
                </p>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {stat.value}
                </h3>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}