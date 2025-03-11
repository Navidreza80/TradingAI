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
import { fetchClosedTrades } from "@/actions/trade.action";

export default function TradeHistory() {
  const { theme } = useTheme();
  const [tradeHistory, setTradeHistory] = useState([]);
  const fetchTrades = async () => {
    const data = await fetchClosedTrades();
    setTradeHistory(data);
  };

  useEffect(() => {
    fetchTrades();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-1/2 h-[300px] overflow-y-scroll md:w-full sm:w-full xs:w-full sm:h-1/2 xs:h-1/2 max-w-5xl mx-auto"
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
                <TableHead>Asset</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Profit/Loss</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tradeHistory.length > 0 ? (
                tradeHistory.map((trade) => (
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
