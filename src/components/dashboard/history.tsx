"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";

export default function TradeHistory() {
  const { theme } = useTheme();
  const [tradeHistory, setTradeHistory] = useState([]);

  useEffect(() => {
    // Simulated fetch request (replace with actual API call)
    setTimeout(() => {
      setTradeHistory([
        {
          id: 1,
          asset: "BTC/USD",
          type: "Buy",
          amount: "0.5 BTC",
          price: "$45,000",
          profit: "+$500",
          date: "2024-03-06",
        },
        {
          id: 2,
          asset: "ETH/USD",
          type: "Sell",
          amount: "2 ETH",
          price: "$3,200",
          profit: "-$100",
          date: "2024-03-05",
        },
        {
          id: 3,
          asset: "XRP/USD",
          type: "Buy",
          amount: "1000 XRP",
          price: "$0.50",
          profit: "+$200",
          date: "2024-03-04",
        },
      ]);
    }, 1000);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-1/2 h-full md:w-full sm:w-full xs:w-full sm:h-1/2 xs:h-1/2 max-w-5xl mx-auto"
    >
      <Card
        className={`p-4 rounded-xl shadow-lg overflow-auto ${
          theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"
        }`}
      >
        <div className="overflow-x-auto">
          <Table className="w-full min-w-[600px]">
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Asset</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Profit/Loss</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tradeHistory.length > 0 ? (
                tradeHistory.map((trade) => (
                  <TableRow key={trade.id}>
                    <TableCell>{trade.id}</TableCell>
                    <TableCell>{trade.asset}</TableCell>
                    <TableCell
                      className={
                        trade.type === "Buy" ? "text-green-500" : "text-red-500"
                      }
                    >
                      {trade.type}
                    </TableCell>
                    <TableCell>{trade.amount}</TableCell>
                    <TableCell>{trade.price}</TableCell>
                    <TableCell
                      className={
                        trade.profit.startsWith("+")
                          ? "text-green-500"
                          : "text-red-500"
                      }
                    >
                      {trade.profit}
                    </TableCell>
                    <TableCell>{trade.date}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-4">
                    Loading trade history...
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Card>
    </motion.div>
  );
}
