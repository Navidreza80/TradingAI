"use client";
// React built in hooks
import { useState } from "react";
// Framer motion for animation
import { motion } from "framer-motion";
// Third party components
import CandlesSlider from "@/components/signals/candles-slider";
import HeaderSignals from "@/components/signals/header-signals";
import SymbolDropDown from "@/components/signals/symbol-dropdown";
import TimeFrameDropDown from "@/components/signals/timeframe-dropdown";
// Icons
import { FaChartLine } from "react-icons/fa";
import { Signals } from "@/types/trade";

export default function TradingSignal() {
  // State to save the symbol that user selected
  const [symbol, setSymbol] = useState("BTCUSDT");
  // State to save the timeframe that user selected
  const [timeFrame, setTimeFrame] = useState("1h");
  // State to save the number of the candles that user selected
  const [candles, setCandles] = useState("100");
  // State to save the signal that AI generated
  const [signal, setSignal] = useState<Signals | null>(null);
  // State to save the status of the current request
  const [loading, setLoading] = useState(false);
  // State to save the error of the current request
  const [error, setError] = useState<null | string | unknown>();

  // Function to get the signal from AI
  const getSignal = async () => {
    // First set the status of loading true
    setLoading(true);
    // And the status of error to null
    setError(null);
    try {
      // Get the API key from .env
      const apiKey = process.env.NEXT_PUBLIC_OPENROUTER_API_KEY;
      // Fetch the symbol price data from binance
      const priceData = await fetch(
        `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${timeFrame}&limit=${candles}`
      );
      // Convert it to valid JS object
      const priceHistory = await priceData.json();
      // Function to fetch signal from the openrouter gemini model
      const response = await fetch(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          method: "POST",
          // Header of the request
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            // Provide the model
            model: "google/gemini-2.0-flash-thinking-exp:free",
            // Provide the message
            messages: [
              {
                role: "system",
                content: `You are a trading expert. Provide signals for crypto trades that user wants based on technical analysis and market data. Only generate signals that are 1:2 risk to rewards minimum. Provide take profit, stop loss, the reason why this trade should be taken and the confidence level of the trade.: 
              {
                stopLoss: "",
                takeProfit: "",
                reason: "",
                confidenceLevel: "",
                entryPrice: ""
              } this is the schema of the response you should return JSON`,
              },
              {
                role: "user",
                content: `This is price history in ${timeFrame} ${symbol} provide a signal for that ${priceHistory}`,
              },
            ],
          }),
        }
      );
      // Convert response to a valid JS object
      const data = await response.json();
      const aiMessage = {
        role: "assistant",
        content: data.choices[0]?.message?.content || "...",
      };
      const jsonString = aiMessage.content
        .replace(/```/g, "")
        .replace(/json/g, "");
      const obj = JSON.parse(jsonString);
      // Save the signal in a state
      setSignal(obj);
      console.log(aiMessage.content);
    } catch (error) {
      // Save the error of the request in a state
      setError(error);
    } finally {
      // At the end set the status of the loading to false
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b dark:from-[#0a0a0a] dark:to-[#1a1a1a] from-white to-gray-50 text-gray-900 dark:text-white transition-colors duration-300">
      {/* Header */}
      <HeaderSignals />

      {/* Main Content */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
        {/* Left Side: Controls */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="col-span-1 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg"
        >
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <FaChartLine className="text-blue-500" /> Trading Pair
          </h2>
          <label className="block mb-2 text-gray-600 dark:text-gray-400">
            Symbol:
          </label>
          <SymbolDropDown symbol={symbol} setSymbol={setSymbol} />

          <label className="block mt-4 mb-2 text-gray-600 dark:text-gray-400">
            Time Frame:
          </label>
          <TimeFrameDropDown
            timeFrame={timeFrame}
            setTimeFrame={setTimeFrame}
          />

          <label className="block mt-4 mb-2 text-gray-600 dark:text-gray-400">
            Number of Candles:
          </label>
          <CandlesSlider candles={candles} setCandles={setCandles} />

          <motion.button
            onClick={getSignal}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full mt-6 p-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition duration-300"
          >
            {loading ? "Loading..." : "Get Signal"}
          </motion.button>
        </motion.div>

        {/* Right Side: Signal Output */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="col-span-2 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg"
        >
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <FaChartLine className="text-blue-500" /> Trading Signal
          </h2>
          {loading && (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              <span className="ml-2">Fetching data...</span>
            </div>
          )}
          {typeof error == "string" && <p className="text-red-500">{error}</p>}
          {!loading && !signal && (
            <p className="text-gray-600 dark:text-gray-400">
              No signal generated yet.
            </p>
          )}
          {!loading && signal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <p>
                <strong>Entry Price:</strong> {signal.entryPrice}
              </p>
              <p>
                <strong>Take Profit:</strong> {signal.takeProfit}
              </p>
              <p>
                <strong>Stop Loss:</strong> {signal.stopLoss}
              </p>
              <p>
                <strong>Confidence Level:</strong> {signal.confidenceLevel}
              </p>
              <p>
                <strong>Reason:</strong> {signal.reason}
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
