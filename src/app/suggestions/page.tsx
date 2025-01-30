'use client'

import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import {
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  InformationCircleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline';
import { useState, useMemo, useEffect } from 'react';

/**
 * Trading Suggestions Page
 * 
 * Displays AI-powered trading suggestions with detailed analysis
 * Features:
 * - Confidence level indicator
 * - Take profit and stop loss levels
 * - Entry price recommendations
 * - Trading rationale
 * - Cryptocurrency icons and info
 * - RTL support
 * - Theme support
 * - Responsive design
 */
export default function SuggestionsPage() {
  const { t, i18n } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [input, setInput] = useState("hello what can yo");
  const [response, setResponse] = useState("");
  const cardsPerPage = 3;

  // Extended trading suggestions data with 9 currencies
  const suggestions = [
    {
      id: 1,
      crypto: 'Bitcoin',
      symbol: 'BTC',
      icon: '/image/crypto/btc.svg',
      type: 'long',
      confidence: 85,
      entry: 43250,
      takeProfit: 45500,
      stopLoss: 42000,
      reason: 'Strong bullish divergence on RSI with increasing volume. Key resistance level broken.',
      timestamp: new Date(),
      color: 'from-green-500 to-emerald-400'
    },
    {
      id: 2,
      crypto: 'Ethereum',
      symbol: 'ETH',
      icon: '/image/crypto/eth.svg',
      type: 'short',
      confidence: 78,
      entry: 2280,
      takeProfit: 2150,
      stopLoss: 2350,
      reason: 'Double top formation with declining volume. Bearish MACD crossover.',
      timestamp: new Date(),
      color: 'from-red-500 to-pink-500'
    },
    {
      id: 3,
      crypto: 'Binance Coin',
      symbol: 'BNB',
      icon: '/image/crypto/bnb.svg',
      type: 'long',
      confidence: 82,
      entry: 320,
      takeProfit: 340,
      stopLoss: 310,
      reason: 'Breaking out of ascending triangle pattern with high volume.',
      timestamp: new Date(),
      color: 'from-green-500 to-emerald-400'
    },
    {
      id: 4,
      crypto: 'Cardano',
      symbol: 'ADA',
      icon: '/image/crypto/ada.svg',
      type: 'long',
      confidence: 75,
      entry: 0.52,
      takeProfit: 0.58,
      stopLoss: 0.48,
      reason: 'Accumulation phase complete with increasing buy pressure. Moving averages showing golden cross.',
      timestamp: new Date(),
      color: 'from-green-500 to-emerald-400'
    },
    {
      id: 5,
      crypto: 'Solana',
      symbol: 'SOL',
      icon: '/image/crypto/sol.svg',
      type: 'short',
      confidence: 80,
      entry: 95,
      takeProfit: 85,
      stopLoss: 100,
      reason: 'Overbought conditions on RSI with bearish divergence. Resistance zone rejection.',
      timestamp: new Date(),
      color: 'from-red-500 to-pink-500'
    },
    {
      id: 6,
      crypto: 'Ripple',
      symbol: 'XRP',
      icon: '/image/crypto/xrp.svg',
      type: 'long',
      confidence: 77,
      entry: 0.65,
      takeProfit: 0.72,
      stopLoss: 0.61,
      reason: 'Breaking out of consolidation phase with strong volume. Support level holding strong.',
      timestamp: new Date(),
      color: 'from-green-500 to-emerald-400'
    },
    {
      id: 7,
      crypto: 'Polkadot',
      symbol: 'DOT',
      icon: '/image/crypto/dot.svg',
      type: 'short',
      confidence: 73,
      entry: 7.8,
      takeProfit: 7.2,
      stopLoss: 8.1,
      reason: 'Head and shoulders pattern completion. Volume confirming downward movement.',
      timestamp: new Date(),
      color: 'from-red-500 to-pink-500'
    },
    {
      id: 8,
      crypto: 'Avalanche',
      symbol: 'AVAX',
      icon: '/image/crypto/avax.svg',
      type: 'long',
      confidence: 81,
      entry: 28.5,
      takeProfit: 32,
      stopLoss: 26.8,
      reason: 'Bullish flag pattern with increasing buy volume. Support trend line holding.',
      timestamp: new Date(),
      color: 'from-green-500 to-emerald-400'
    },
    {
      id: 9,
      crypto: 'Chainlink',
      symbol: 'LINK',
      icon: '/image/crypto/link.svg',
      type: 'short',
      confidence: 76,
      entry: 15.8,
      takeProfit: 14.5,
      stopLoss: 16.5,
      reason: 'Triple top formation complete. Momentum indicators showing bearish signals.',
      timestamp: new Date(),
      color: 'from-red-500 to-pink-500'
    }
  ];

  // Filter suggestions based on search query
  const filteredSuggestions = useMemo(() => {
    return suggestions.filter(suggestion =>
      suggestion.crypto.toLowerCase().includes(searchQuery.toLowerCase()) ||
      suggestion.symbol.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [suggestions, searchQuery]);

  // Calculate pagination with filtered results
  const totalPages = Math.ceil(filteredSuggestions.length / cardsPerPage);
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = filteredSuggestions.slice(indexOfFirstCard, indexOfLastCard);

  // Reset to first page when search changes
  const handleSearch = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  // Handle page changes
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const fetchAIResponse = async (prompt: string) => {
    const res = await fetch("/api/mistral", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });
    const data = await res.json();
    console.log(data);
  };

  useEffect(() => {
    fetchAIResponse(input);
  }, []);

    return (
    <main className="min-h-screen bg-gradient-to-b dark:from-[#0a0a0a] dark:to-[#1a1a1a] from-white to-gray-50 pt-24 pb-12">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(24,144,255,0.1)_1px,transparent_1px)] 
        bg-[length:20px_20px] opacity-50 dark:opacity-50" />

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className={`text-3xl sm:text-4xl lg:text-5xl font-bold p-3
            bg-gradient-to-r dark:from-white dark:to-gray-400 from-gray-900 to-gray-600 
            bg-clip-text text-transparent 
            ${i18n.language === 'fa' ? 'font-vazirmatn' : ''} 
            ${i18n.language === 'ar' ? 'font-notokufi' : ''}`}>
            {t('suggestions.title')}
          </h1>
          <p className={`mt-4 text-lg dark:text-gray-400 text-gray-600 max-w-3xl mx-auto
            ${i18n.language === 'fa' ? 'font-vazirmatn' : ''} 
            ${i18n.language === 'ar' ? 'font-notokufi' : ''}`}>
            {t('suggestions.subtitle')}
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8"
        >
          <div className="relative max-w-md mx-auto">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder={t('suggestions.searchPlaceholder')}
                className={`w-full px-4 py-3 pl-12 rounded-xl
                  dark:bg-white/5 bg-white
                  dark:text-white text-gray-900
                  dark:border-white/10 border-gray-200 border
                  focus:outline-none focus:ring-2 focus:ring-[#1890ff]
                  placeholder:dark:text-gray-500 placeholder:text-gray-400
                  transition-all duration-200
                  ${i18n.language === 'fa' ? 'font-vazirmatn' : ''} 
                  ${i18n.language === 'ar' ? 'font-notokufi' : ''}`}
              />
              <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 dark:text-gray-400 text-gray-500" />
            </div>
          </div>
        </motion.div>

        {/* No Results Message */}
        {filteredSuggestions.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className={`text-lg dark:text-gray-400 text-gray-600
              ${i18n.language === 'fa' ? 'font-vazirmatn' : ''} 
              ${i18n.language === 'ar' ? 'font-notokufi' : ''}`}>
              {t('suggestions.noResults')}
            </p>
          </motion.div>
        )}

        {/* Suggestions Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr mb-12"
        >
          {currentCards.map((suggestion) => (
            <motion.div
              key={suggestion.id}
              variants={itemVariants}
              className="relative group h-full"
            >
              {/* Suggestion Card - Fixed dimensions */}
              <div className="relative z-10 p-6 rounded-2xl h-full
                dark:border-white/10 border-black/5 border
                backdrop-blur-xl 
                dark:bg-white/5 bg-white/80
                dark:hover:bg-white/10 hover:bg-white/90
                transition-all duration-300 hover:scale-[1.02]
                dark:hover:shadow-[0_0_30px_rgba(24,144,255,0.1)]
                hover:shadow-[0_0_30px_rgba(24,144,255,0.2)]
                flex flex-col">

                {/* Header - Fixed height */}
                <div className="flex items-center justify-between h-[72px]">
                  {/* Crypto Info */}
                  <div className="flex items-center gap-3">
                    <Image
                      src={suggestion.icon}
                      alt={suggestion.crypto}
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
        <div>
                      <h3 className={`font-bold dark:text-white text-gray-900
                        ${i18n.language === 'fa' ? 'font-vazirmatn' : ''} 
                        ${i18n.language === 'ar' ? 'font-notokufi' : ''}`}>
                        {suggestion.crypto}
                      </h3>
                      <span className="text-sm dark:text-gray-400 text-gray-600">
                        {suggestion.symbol}
                      </span>
                    </div>
                  </div>

                  {/* Trade Type Badge */}
                  <div className={`px-3 py-1 rounded-full text-white text-sm font-semibold
                    ${suggestion.type === 'long'
                      ? 'bg-gradient-to-r from-green-500 to-emerald-400'
                      : 'bg-gradient-to-r from-red-500 to-pink-500'}`}>
                    {suggestion.type.toUpperCase()}
                  </div>
                </div>

                {/* Confidence Meter - Fixed height */}
                <div className="h-[72px]">
                  <div className="flex justify-between items-center mb-2">
                    <span className={`text-sm dark:text-gray-400 text-gray-600
                      ${i18n.language === 'fa' ? 'font-vazirmatn' : ''} 
                      ${i18n.language === 'ar' ? 'font-notokufi' : ''}`}>
                      {t('suggestions.confidence')}
                    </span>
                    <span className="text-sm font-bold dark:text-white text-gray-900">
                      {suggestion.confidence}%
                    </span>
                  </div>
                  <div className="h-2 bg-gray-200 dark:bg-white/10 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full bg-gradient-to-r ${suggestion.color}`}
                      style={{ width: `${suggestion.confidence}%` }}
                    />
                  </div>
                </div>

                {/* Price Levels - Fixed height */}
                <div className="h-[144px] space-y-4">
                  {/* Entry */}
                  <div className="flex justify-between items-center">
                    <span className={`text-sm dark:text-gray-400 text-gray-600
                      ${i18n.language === 'fa' ? 'font-vazirmatn' : ''} 
                      ${i18n.language === 'ar' ? 'font-notokufi' : ''}`}>
                      {t('suggestions.entry')}
                    </span>
                    <span className="font-mono text-sm dark:text-white text-gray-900">
                      ${suggestion.entry.toLocaleString()}
                    </span>
                  </div>

                  {/* Take Profit */}
                  <div className="flex justify-between items-center">
                    <span className={`text-sm dark:text-gray-400 text-gray-600
                      ${i18n.language === 'fa' ? 'font-vazirmatn' : ''} 
                      ${i18n.language === 'ar' ? 'font-notokufi' : ''}`}>
                      {t('suggestions.takeProfit')}
                    </span>
                    <span className="font-mono text-sm text-green-500">
                      ${suggestion.takeProfit.toLocaleString()}
                    </span>
                  </div>

                  {/* Stop Loss */}
                  <div className="flex justify-between items-center">
                    <span className={`text-sm dark:text-gray-400 text-gray-600
                      ${i18n.language === 'fa' ? 'font-vazirmatn' : ''} 
                      ${i18n.language === 'ar' ? 'font-notokufi' : ''}`}>
                      {t('suggestions.stopLoss')}
                    </span>
                    <span className="font-mono text-sm text-red-500">
                      ${suggestion.stopLoss.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Reason - Flex grow to fill remaining space */}
                <div className="flex-grow mt-4">
                  <div className="p-4 rounded-xl h-full dark:bg-white/5 bg-gray-50">
                    <div className="flex items-start gap-2 h-full">
                      <InformationCircleIcon className="w-5 h-5 dark:text-gray-400 text-gray-600 flex-shrink-0 mt-0.5" />
                      <p className={`text-sm dark:text-gray-400 text-gray-600 line-clamp-4
                        ${i18n.language === 'fa' ? 'font-vazirmatn' : ''} 
                        ${i18n.language === 'ar' ? 'font-notokufi' : ''}`}>
                        {suggestion.reason}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Hover Effect */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${suggestion.color.replace('500', '500/20').replace('400', '400/20')}
                  opacity-0 group-hover:opacity-100 transition-opacity 
                  duration-300 blur-xl -z-10`} />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Custom Pagination */}
        {filteredSuggestions.length > 0 && (
          <div className="flex justify-center items-center gap-3 mt-8">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`flex items-center justify-center w-10 h-10 rounded-full
                transition-all duration-200
                ${currentPage === 1
                  ? 'dark:text-gray-600 text-gray-400 cursor-not-allowed'
                  : 'dark:text-white text-gray-900 hover:bg-white/10 dark:hover:bg-white/10'}`}
              aria-label="Previous page"
            >
              <ChevronLeftIcon className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2">
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index + 1}
                  onClick={() => handlePageChange(index + 1)}
                  className={`w-10 h-10 rounded-full font-medium transition-all duration-200
                    ${currentPage === index + 1
                      ? 'bg-[#1890ff] text-white'
                      : 'dark:text-white text-gray-900 hover:bg-white/10 dark:hover:bg-white/10'}
                    ${i18n.language === 'fa' ? 'font-vazirmatn' : ''} 
                    ${i18n.language === 'ar' ? 'font-notokufi' : ''}`}
                >
                  {index + 1}
                </button>
              ))}
            </div>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`flex items-center justify-center w-10 h-10 rounded-full
                transition-all duration-200
                ${currentPage === totalPages
                  ? 'dark:text-gray-600 text-gray-400 cursor-not-allowed'
                  : 'dark:text-white text-gray-900 hover:bg-white/10 dark:hover:bg-white/10'}`}
              aria-label="Next page"
            >
              <ChevronRightIcon className="w-5 h-5" />
            </button>
          </div>
        )}
        </div>
    </main>
    );
}