"use client";
// Server actions
import { calculateUserStats } from "@/actions/trade.action";
// Shadcn components
import { Card, CardContent } from "@/components/UI/card";
// Framer motion for animation
import { motion } from "framer-motion";
// Icons
import { BarChart, DollarSign, TrendingUp } from "lucide-react";
// React built in hooks
import { useEffect, useState } from "react";



export default function Stats() {
  
  
  // State to save status of the user
  const [stats, setStats] = useState({});
  // Status items
  const statsItems = [
    {
      text: 'Total Profits',
      data: `${Math.ceil(stats.totalPnL)}$`,
      icon: <DollarSign size={24} className="text-green-500" />,
    },
    {
      text: 'Total Trades',
      data: stats.totalTrades,
      icon: <BarChart size={24} className="text-blue-500" />,
    },
    {
      text: 'Win Rate',
      data: `${Math.ceil(stats.winRate)}%`,
      icon: <TrendingUp size={24} className="text-purple-500" />,
    },
  ];
  // Function to fetch user status
  const fetchUser = async () => {
    const data = await calculateUserStats();
    setStats(data);
  };
  // Callback function to execute when the component is mounting
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full">
      {/* User Status Items */}
      {statsItems.map((item, index) => {
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 * 0.2 }}
            className="w-full"
            key={index}
          >
            <Card className="p-6 shadow-xl rounded-2xl bg-white dark:bg-black border border-gray-200 dark:border-gray-800 relative overflow-hidden">
              <div className="absolute inset-0 opacity-20 dark:opacity-30 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 rounded-2xl" />
              <div className="absolute inset-0 flex justify-center items-center opacity-20 dark:opacity-40">
                <div className="w-40 h-40 bg-gray-300 dark:bg-gray-700 rounded-full blur-3xl" />
                <div className="absolute w-24 h-24 bg-gray-200 dark:bg-gray-600 rounded-full blur-2xl" />
              </div>
              <CardContent className="flex items-center space-x-4 relative z-10">
                <div className="p-3 rounded-full bg-gray-200 dark:bg-gray-800 shadow-lg">
                  {item.icon}
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {item.text}
                  </p>
                  <h3
                    className={`text-2xl font-bold text-gray-900 dark:text-gray-100`}
                  >
                    {item.data}
                  </h3>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}
