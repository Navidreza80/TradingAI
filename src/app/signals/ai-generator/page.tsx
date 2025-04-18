"use client";
// React built in hooks
import { useState } from "react";
// Framer motion for animation
import { AnimatePresence, motion } from "framer-motion";
// Third party components
import HeaderSignals from "@/components/signals/header-signals";
import SignalSetting from "@/components/signals/signal-setting";
import MarketStats from "@/components/signals/market-stats";
// Icons
import { HiOutlineChartBar, HiOutlineShieldCheck, HiOutlineTrendingUp, HiOutlineVolumeUp } from "react-icons/hi";
// Types for type safety
import { Signals } from "@/types/trade";


// Animation variables
import { fadeInUp } from "@/utils/animation-variants";

export default function TradingSignal() {
  
  
  // State to save the symbol that user selected
  const [symbol, setSymbol] = useState("BTCUSDT");
  // State to save the timeframe that user selected
  const [timeFrame, setTimeFrame] = useState("1h");
  // State to save the number of the candles that user selected
  const [candles, setCandles] = useState("100");
  // State to save the signal that AI generated
  const [signal, setSignal] = useState<Signals | null>(null);
  // Add new states for market stats
  const [marketStats, setMarketStats] = useState({
    accuracy: '',
    trend: '',
    volume: '',
    risk: ''
  });
  // State to save the status of the current request
  const [loading, setLoading] = useState(false);
  // State to save the error of the current request
  const [error, setError] = useState<null | string>();

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
                content: `You are a trading expert. Provide signals for crypto trades that user wants based on technical analysis and market data. Only generate signals that are 1:2 risk to rewards minimum. Provide take profit, stop loss, the reason why this trade should be taken, confidence level of the trade, and market statistics.: 
              {
                stopLoss: "",
                takeProfit: "",
                reason: "",
                confidenceLevel: "",
                entryPrice: "",
                marketStats: {
                  accuracy: "",
                  trend: "",
                  volume: "",
                  risk: ""
                }
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
      // Update market stats
      if (obj.marketStats) {
        setMarketStats(obj.marketStats);
      }
    } catch (error) {
      // Save the error of the request in a state
      setError('Error getting signal');
    } finally {
      // At the end set the status of the loading to false
      setLoading(false);
    }
  };

  const marketItems = [
    { icon: <HiOutlineShieldCheck className="w-5 h-5 text-green-500" />, text: 'Signal Accuracy', value: marketStats.accuracy || '...' },
    { icon: <HiOutlineTrendingUp className="w-5 h-5 text-blue-500" />, text: 'Market Trend', value: marketStats.trend || '...' },
    { icon: <HiOutlineVolumeUp className="w-5 h-5 text-purple-500" />, text: 'Trading Volume', value: marketStats.volume || '...' },
    { icon: <HiOutlineChartBar className="w-5 h-5 text-red-500" />, text: 'Risk Level', value: marketStats.risk || '...' },
  ]

  const signalItems = [
    { text: 'Entry Price:', value: signal?.entryPrice, colour: 'dark:text-white text-black' },
    { text: 'Take Profit:', value: signal?.takeProfit, colour: 'text-green-500' },
    { text: 'Stop Loss:', value: signal?.stopLoss, colour: 'text-red-500' },
    { text: 'Confidence Level:', value: signal?.confidenceLevel, colour: 'text-blue-500' },
  ]

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark transition-all duration-500">
      {/* Header */}
      <HeaderSignals />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto px-4 py-8"
      >

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Settings Panel */}
          <motion.div
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            className="lg:col-span-1 space-y-6"
          >
            <SignalSetting getSignal={getSignal} loading={loading} candles={candles} setCandles={setCandles} timeFrame={timeFrame} setTimeFrame={setTimeFrame} symbol={symbol} setSymbol={setSymbol} />

            {/* Market Stats */}
            <MarketStats marketItems={marketItems} />
          </motion.div>

          {/* Signal Output */}
          <motion.div
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            className="lg:col-span-2"
          >
            <div className="bg-white dark:bg-black/40 rounded-2xl shadow-xl p-6 h-full">
              <div className="flex items-center gap-3 mb-6">
                <HiOutlineChartBar className="w-6 h-6 text-blue-500" />
                <h2 className="text-xl font-semibold text-primary-light dark:text-primary-dark">Market Analysis</h2>
              </div>

              <AnimatePresence mode="wait">
                {loading && (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center h-[400px]"
                  >
                    <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4" />
                    <p className="text-gray-600 dark:text-gray-300">AI is thinking...</p>
                  </motion.div>
                )}

                {error && (
                  <motion.div
                    key="error"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center justify-center h-[400px]"
                  >
                    <p className="text-red-500">{error?.toString()}</p>
                  </motion.div>
                )}

                {!loading && !error && !signal && (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center justify-center h-[400px]"
                  >
                    <p className="text-gray-600 dark:text-gray-300">No signal has been generated</p>
                  </motion.div>
                )}

                {!loading && !error && signal && (
                  <motion.div
                    key="signal"
                    variants={fadeInUp}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {signalItems.map((item, index) => {
                        return (
                          <div key={index} className="bg-gray-50 dark:bg-black/60 p-4 rounded-xl">
                            <p className="text-sm text-primary-light dark:text-primary-dark">{item.text}</p>
                            <p className={`text-xl font-semibold ${item.colour}`}>{item.value}</p>
                          </div>
                        )
                      })}
                    </div>

                    <div className="bg-gray-50 dark:bg-black/60 p-4 rounded-xl">
                      <p className="text-sm text-primary-light dark:text-primary-dark mb-2">Reason:</p>
                      <p className="text-secondary-light dark:text-secondary-dark">{signal.reason}</p>
                    </div>

                    <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-4">
                    Trading signals are for informational purposes only.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
