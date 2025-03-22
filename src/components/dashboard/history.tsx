"use client";
// React built in hooks
import { useState, useEffect } from "react";
// ShadCn components
import { Card } from "@/components/UI/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/UI/table";
// Next built in hooks
import { useTheme } from "next-themes";
// Framer motion for animation
import { motion } from "framer-motion";
// Server actions
import { fetchClosedTrades } from "@/actions/trade.action";

export default function TradeHistory() {
  // Next useTheme hook to recognize app theme
  const { theme } = useTheme();
  // State tot save user Closed-Trade history
  const [tradeHistory, setTradeHistory] = useState([]);
  // Function to fetch user Closed-Trade history
  const fetchTrades = async () => {
    const data = await fetchClosedTrades();
    if(data == "User not authenticated") return
    else setTradeHistory(data);
  };
  // useEffect with callback function to fetch user Closed-Trade history past 6 months
  useEffect(() => {
    fetchTrades();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-1/2 h-[350px] overflow-scroll md:w-full sm:w-full xs:w-full max-w-5xl mx-auto"
    >
      <Card
        className={`p-4 rounded-xl shadow-lg overflow-auto ${
          theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"
        }`}
      >
        <div className="overflow-x-auto h-full">
          <Table className="w-full min-w-[600px] h-full">
            <TableHeader>
              <TableRow>
                <TableHead>Asset</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Profit/Loss</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tradeHistory.length > 0 ? (
                tradeHistory.slice(0, 6).map((trade) => (
                  <TableRow key={trade.id}>
                    <TableCell>{trade.symbol}</TableCell>
                    <TableCell
                      className={
                        trade.type === "Buy" ? "text-green-500" : "text-red-500"
                      }
                    >
                      {trade.type}
                    </TableCell>
                    <TableCell>{trade.amount}$</TableCell>
                    <TableCell
                      className={
                        trade.pnlAmount > 0 ? "text-green-500" : "text-red-500"
                      }
                    >
                      {Math.ceil(trade.pnlAmount)}
                    </TableCell>
                    <TableCell>
                      {" "}
                      {new Date(trade.closeTimeDate).toLocaleDateString()}
                    </TableCell>
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
