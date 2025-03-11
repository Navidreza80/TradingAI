"use client";

import { calculateUserStats } from "@/actions/trade.action";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { BarChart, DollarSign, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";

export default function Stats() {
  const [stats, setStats] = useState({});
  const fetchUser = async () => {
    const data = await calculateUserStats();
    setStats(data);
  };
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1 * 0.2 }}
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
              <DollarSign size={24} className="text-green-500" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Total Profit
              </p>
              <h3 className={`text-2xl font-bold text-gray-900 dark:text-gray-100`}>
                {Math.ceil(stats.totalPnL)}$
              </h3>
            </div>
          </CardContent>
        </Card>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 2 * 0.2 }}
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
              <BarChart size={24} className="text-blue-500" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Total Trades
              </p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {stats.totalTrades}
              </h3>
            </div>
          </CardContent>
        </Card>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 3 * 0.2 }}
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
              <TrendingUp size={24} className="text-purple-500" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Win Rate
              </p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {Math.ceil(stats.winRate)}%
              </h3>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
