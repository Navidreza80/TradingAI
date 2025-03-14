"use client";
// Server actions
import { fetchMostTradedCurrencies } from "@/actions/user.action";
// Shadcn components
import { Card, CardContent } from "@/components/ui/card";
// Framer motion for animation
import { motion } from "framer-motion";
// React built in hooks
import { useEffect, useState } from "react";

export default function MostTradedCryptos() {
  // State to save user most traded currencies
  const [data, setData] = useState();
  // Function to fetch users most traded currencies
  const getUserData = async () => {
    const request = await fetchMostTradedCurrencies();
    if(request == "User not authenticated") return
    else setData(request);
  };
  // UseEffect with callback function to fetch user most traded currencies when the component is mounting
  useEffect(() => {
    getUserData();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-1/2 md:w-1/2 sm:w-full xs:w-full"
    >
      <Card className="shadow-2xl rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-black w-full max-w-4xl mx-auto relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 dark:opacity-20 bg-gradient-to-br from-gray-300 to-gray-100 dark:from-gray-900 dark:to-gray-800" />
        <div className="absolute inset-0 flex justify-center items-center opacity-20 dark:opacity-30">
          <div className="w-64 h-64 bg-gray-200 dark:bg-gray-700 rounded-full blur-3xl" />
        </div>
        <CardContent className="relative z-10">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-gray-400 dark:border-gray-600 text-lg">
                  <th className="p-4 text-gray-700 dark:text-gray-300">
                    Asset
                  </th>
                  <th className="p-4 text-gray-700 dark:text-gray-300">
                    Trades
                  </th>
                  <th className="p-4 text-gray-700 dark:text-gray-300">
                    Volume
                  </th>
                </tr>
              </thead>
              <tbody>
                {data &&
                  data.map((item, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-300 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-900 transition duration-300 text-base md:text-lg"
                    >
                      <td className="p-4 flex items-center space-x-3 text-gray-900 dark:text-gray-100 font-semibold">
                        <span>{item.currency}</span>
                      </td>
                      <td className="p-4 text-gray-900 dark:text-gray-100">
                        {item.trades}
                      </td>
                      <td className="p-4 text-gray-900 dark:text-gray-100">
                        {item.volume}$
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
