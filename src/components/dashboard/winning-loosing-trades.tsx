"use client";
// Sever actions
import { fetchUserWinLoss } from "@/actions/user.action";
// Shadcn components
import { Card, CardContent } from "@/components/ui/card";
// Framer motion
import { motion } from "framer-motion";
// React built in hooks
import { useEffect, useState } from "react";
// Redux for state management
import { useSelector } from "react-redux";
// Icons
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis
} from "recharts";

export default function TradesAnalyticsChart() {
  // State to save users winning and loosing trades past 6 months
  const [data, setData] = useState();
  // Function to fetch user winning and loosing trades past 6 months
  const getUserData = async () => {
    const request = await fetchUserWinLoss();
    setData(request);
  };
  // Call back function to get user data when the components is mounting
  useEffect(() => {
    getUserData();
  }, []);
  // Redux isDarkMode hook to recognize app theme
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-1/2 h-full md:w-1/2 sm:w-full xs:w-full sm:h-1/2 xs:h-1/2"
    >
      <Card className="p-2 shadow-xl rounded-2xl border border-[#4b4b4b61] bg-white dark:bg-black border-gray-200 dark:border-gray-800 w-full">
        <CardContent>
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
                dataKey="wins"
                fill="url(#winGradient)"
                radius={[6, 6, 0, 0]}
                barSize={30}
              />
              <Bar
                dataKey="losses"
                fill="url(#lossGradient)"
                radius={[6, 6, 0, 0]}
                barSize={30}
              />
              <defs>
                <linearGradient id="winGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity={0.9} />
                  <stop offset="100%" stopColor="#059669" stopOpacity={0.7} />
                </linearGradient>
                <linearGradient id="lossGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ef4444" stopOpacity={0.9} />
                  <stop offset="100%" stopColor="#dc2626" stopOpacity={0.7} />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </motion.div>
  );
}
