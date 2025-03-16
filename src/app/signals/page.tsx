"use client";
// React built in hooks
import { useState, useEffect } from "react";
// Framer motion for animation
import { motion, AnimatePresence } from "framer-motion";
// Third party components
import CandlesSlider from "@/components/signals/candles-slider";
import HeaderSignals from "@/components/signals/header-signals";
import SymbolDropDown from "@/components/signals/symbol-dropdown";
import TimeFrameDropDown from "@/components/signals/timeframe-dropdown";
// Icons
import { HiOutlineChartBar, HiOutlineCog, HiOutlineShieldCheck, HiOutlineTrendingUp, HiOutlineVolumeUp } from "react-icons/hi";
// Types for type safety
import { Signals } from "@/types/trade";
// i18n for translation
import { useTranslation } from "react-i18next";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

export default function TradingSignal() {
  // i18n for translation
  const { t } = useTranslation();
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
      console.log(aiMessage.content);
    } catch (error) {
      // Save the error of the request in a state
      setError(t('signals.error'));
    } finally {
      // At the end set the status of the loading to false
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br dark:from-black dark:via-gray-900 dark:to-black from-gray-50 via-white to-gray-50 text-gray-900 dark:text-white transition-all duration-500">
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
            <div className="bg-white dark:bg-black/40 rounded-2xl shadow-xl p-6 backdrop-blur-lg backdrop-filter">
              <div className="flex items-center gap-3 mb-6">
                <HiOutlineCog className="w-6 h-6 text-blue-500" />
                <h2 className="text-xl font-semibold">{t('signals.settings')}</h2>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('signals.symbol')}
                  </label>
                  <SymbolDropDown symbol={symbol} setSymbol={setSymbol} />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('signals.time')}
                  </label>
                  <TimeFrameDropDown timeFrame={timeFrame} setTimeFrame={setTimeFrame} />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('signals.candles')}
                  </label>
                  <CandlesSlider candles={candles} setCandles={setCandles} />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={getSignal}
                  disabled={loading}
                  className={`w-full py-3 px-4 rounded-xl font-semibold text-white transition-all duration-300 ${
                    loading
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:shadow-lg hover:shadow-blue-500/25'
                  }`}
                >
                  {loading ? t('signals.loading') : t('signals.getSignal')}
                </motion.button>
              </div>
            </div>

            {/* Market Stats */}
            <motion.div
              variants={fadeInUp}
              className="bg-white dark:bg-black/40 rounded-2xl shadow-xl p-6"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <HiOutlineShieldCheck className="w-5 h-5 text-green-500" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{t('signals.accuracy')}</p>
                    <p className="font-semibold">{marketStats.accuracy || '...'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <HiOutlineTrendingUp className="w-5 h-5 text-blue-500" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{t('signals.trend')}</p>
                    <p className="font-semibold">{marketStats.trend || '...'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <HiOutlineVolumeUp className="w-5 h-5 text-purple-500" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{t('signals.volume')}</p>
                    <p className="font-semibold">{marketStats.volume || '...'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <HiOutlineChartBar className="w-5 h-5 text-red-500" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{t('signals.risk')}</p>
                    <p className="font-semibold">{marketStats.risk || '...'}</p>
                  </div>
                </div>
              </div>
            </motion.div>
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
                <h2 className="text-xl font-semibold">{t('signals.analysis')}</h2>
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
                    <p className="text-gray-600 dark:text-gray-300">{t('signals.loading')}</p>
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
                    <p className="text-gray-600 dark:text-gray-300">{t('signals.no')}</p>
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
                      <div className="bg-gray-50 dark:bg-black/60 p-4 rounded-xl">
                        <p className="text-sm text-gray-500 dark:text-gray-400">{t('signals.entry')}</p>
                        <p className="text-xl font-semibold">{signal.entryPrice}</p>
                      </div>
                      <div className="bg-gray-50 dark:bg-black/60 p-4 rounded-xl">
                        <p className="text-sm text-gray-500 dark:text-gray-400">{t('signals.profit')}</p>
                        <p className="text-xl font-semibold text-green-500">{signal.takeProfit}</p>
                      </div>
                      <div className="bg-gray-50 dark:bg-black/60 p-4 rounded-xl">
                        <p className="text-sm text-gray-500 dark:text-gray-400">{t('signals.loss')}</p>
                        <p className="text-xl font-semibold text-red-500">{signal.stopLoss}</p>
                      </div>
                      <div className="bg-gray-50 dark:bg-black/60 p-4 rounded-xl">
                        <p className="text-sm text-gray-500 dark:text-gray-400">{t('signals.level')}</p>
                        <p className="text-xl font-semibold text-blue-500">{signal.confidenceLevel}</p>
                      </div>
                    </div>

                    <div className="bg-gray-50 dark:bg-black/60 p-4 rounded-xl">
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{t('signals.reason')}</p>
                      <p className="text-gray-800 dark:text-gray-200">{signal.reason}</p>
                    </div>

                    <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-4">
                      {t('signals.disclaimer')}
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
