"use client";

import { CourseCard } from "@/components/forex/CourseCard";
import { CurrencyPairCard } from "@/components/forex/CurrencyPairCard";
import { MultimediaCard } from "@/components/forex/MultimediaCard";
import { NewsCard } from "@/components/forex/NewsCard";
import { SignalCard } from "@/components/forex/SignalCard";
import { getForexNews, getFallbackNews } from '@/services/newsService';
import {
  educationalContent,
  forexMultimedia,
} from "@/data/forexData";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

// Define TypeScript interfaces
interface CurrencyPair {
  pair: string;
  price: string;
  change: string;
  changePercent: string;
}

interface TradingSignal {
  pair: string;
  direction: "buy" | "sell";
  entryPrice: number;
  takeProfit: number;
  stopLoss: number;
  confidence: number;
}

interface ExchangeRateApiResponse {
  base: string;
  rates: Record<string, number>;
  time_last_updated: number;
}

// Replace the existing page component with this updated version that fetches real news
export default function ForexPage() {
  const [activeTab, setActiveTab] = useState<"all" | "video" | "podcast">(
    "all"
  );
  const [currencyPairs, setCurrencyPairs] = useState<CurrencyPair[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [forexNews, setForexNews] = useState([])

  // Initial signals data
  const [signals] = useState<TradingSignal[]>([
    {
      pair: "EUR/USD",
      direction: "buy",
      entryPrice: 1.0915,
      takeProfit: 1.0965,
      stopLoss: 1.0885,
      confidence: 85,
    },
    {
      pair: "GBP/USD",
      direction: "sell",
      entryPrice: 1.266,
      takeProfit: 1.261,
      stopLoss: 1.269,
      confidence: 78,
    },
    {
      pair: "USD/JPY",
      direction: "buy",
      entryPrice: 149.2,
      takeProfit: 149.8,
      stopLoss: 148.8,
      confidence: 82,
    },
  ]);
  const fetchForexData = async () => {
    setLoading(true);
    try {
      const pairs = [
        "EURUSD",
        "GBPUSD",
        "USDJPY",
        "USDCHF",
        "AUDUSD",
        "USDCAD",
        "NZDUSD",
        "EURGBP",
      ];

      // Using ExchangeRate-API as an alternative (no API key required for this endpoint)
      const response = await fetch("https://open.er-api.com/v6/latest/USD");

      if (!response.ok) {
        throw new Error("Failed to fetch exchange rate data");
      }

      const data: ExchangeRateApiResponse = await response.json();

      if (!data.rates) {
        throw new Error("No exchange rate data available");
      }

      // Process the data from the API
      const pairsData: CurrencyPair[] = pairs.map((pair) => {
        const fromCurrency = pair.substring(0, 3);
        const toCurrency = pair.substring(3, 6);

        // Calculate exchange rates based on USD as the base
        let rate: number;
        let previousRate: number;

        if (fromCurrency === "USD") {
          // Direct rate from USD to other currency
          rate = data.rates[toCurrency] || 1;
          // Simulate a small random change for demonstration
          previousRate = rate * (1 + (Math.random() * 0.002 - 0.001));
        } else if (toCurrency === "USD") {
          // Inverse rate from other currency to USD
          rate = 1 / (data.rates[fromCurrency] || 1);
          // Simulate a small random change for demonstration
          previousRate = rate * (1 + (Math.random() * 0.002 - 0.001));
        } else {
          // Cross rate between two non-USD currencies
          rate =
            (data.rates[toCurrency] || 1) / (data.rates[fromCurrency] || 1);
          // Simulate a small random change for demonstration
          previousRate = rate * (1 + (Math.random() * 0.002 - 0.001));
        }

        const change = rate - previousRate;
        const changePercent = (change / previousRate) * 100;

        return {
          pair: `${fromCurrency}/${toCurrency}`,
          price: rate.toFixed(4),
          change: change.toFixed(4),
          changePercent: changePercent.toFixed(2),
        };
      });

      setCurrencyPairs(pairsData);
      setError(null);
    } catch (err) {
      console.error("Error fetching forex data:", err);
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );

      // Fallback to mock data if API fails
      setCurrencyPairs([
        {
          pair: "EUR/USD",
          price: "1.0921",
          change: "0.0012",
          changePercent: "0.11",
        },
        {
          pair: "GBP/USD",
          price: "1.2654",
          change: "-0.0023",
          changePercent: "-0.18",
        },
        {
          pair: "USD/JPY",
          price: "149.32",
          change: "0.45",
          changePercent: "0.30",
        },
        {
          pair: "USD/CHF",
          price: "0.8732",
          change: "-0.0015",
          changePercent: "-0.17",
        },
        {
          pair: "AUD/USD",
          price: "0.6543",
          change: "0.0021",
          changePercent: "0.32",
        },
        {
          pair: "USD/CAD",
          price: "1.3654",
          change: "0.0034",
          changePercent: "0.25",
        },
        {
          pair: "NZD/USD",
          price: "0.6123",
          change: "-0.0018",
          changePercent: "-0.29",
        },
        {
          pair: "EUR/GBP",
          price: "0.8632",
          change: "0.0009",
          changePercent: "0.10",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const fetchForexNews = async () => {
    const fallbackNews = await getFallbackNews(4)
    setForexNews(fallbackNews)
  }

  useEffect(() => {
    fetchForexData();
    fetchForexNews()
    const intervalId = setInterval(fetchForexData, 300000);
    return () => clearInterval(intervalId);
  }, []);

  // Filter multimedia content based on active tab
  const filteredMultimedia = useMemo(() => {
    return forexMultimedia.filter(
      (item) => activeTab === "all" || item.type === activeTab
    );
  }, [activeTab]);

  return (
    <div className="container mx-auto px-4 py-24">
      {/* Hero Section */}
      <section className="mb-16 relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-700 p-8 md:p-12">
        <div className="absolute inset-0 opacity-10">
          <svg className="h-full w-full" viewBox="0 0 800 800">
            <defs>
              <pattern
                id="grid"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 40 0 L 0 0 0 40"
                  fill="none"
                  stroke="white"
                  strokeWidth="1"
                />
              </pattern>
            </defs>
            <rect width="800" height="800" fill="url(#grid)" />
          </svg>
        </div>
        <div className="relative z-10 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Forex Trading</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
            Explore the world's largest financial market with real-time data,
            expert analysis, and AI-powered trading signals.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <button className="bg-white text-blue-700 hover:bg-blue-50 font-bold py-3 px-6 rounded-lg transition duration-300 shadow-lg">
              Start Trading
            </button>
            <button className="bg-transparent hover:bg-white/20 border-2 border-white font-bold py-3 px-6 rounded-lg transition duration-300">
              Learn Forex Basics
            </button>
          </div>
        </div>
      </section>

      {/* Currency Pairs Section */}
      <section className="mb-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold flex items-center text-black dark:text-white">
            <span className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 p-2 rounded-lg mr-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </span>
            Major Currency Pairs
            {loading && (
              <span className="ml-2 inline-block animate-pulse">
                <svg
                  className="w-5 h-5 text-blue-500"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              </span>
            )}
          </h2>
          <div className="flex items-center">
            <span className="text-sm text-gray-500 dark:text-gray-400 mr-3">
              Auto-refresh: 5m
            </span>
            <Link
              href="/market/forex/all-pairs"
              className="text-blue-500 hover:text-blue-700 flex items-center group"
            >
              View All Pairs
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 ml-1 group-hover:translate-x-1 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Link>
          </div>
        </div>

        {error && (
          <div className="bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 p-4 rounded-lg mb-6">
            <p>Error loading forex data: {error}</p>
            <p className="text-sm mt-1">Showing fallback data instead.</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading
            ? Array(8)
                .fill(0)
                .map((_, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5 border border-gray-100 dark:border-gray-700"
                  >
                    <div className="flex justify-between items-center mb-3">
                      <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-20 animate-pulse"></div>
                      <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-16 animate-pulse"></div>
                    </div>
                    <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-24 mb-2 animate-pulse"></div>
                    <div className="flex items-center">
                      <div className="h-4 w-4 bg-gray-200 dark:bg-gray-700 rounded-full mr-1 animate-pulse"></div>
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-12 animate-pulse"></div>
                    </div>
                  </div>
                ))
            : currencyPairs.map((pair) => (
                <CurrencyPairCard key={pair.pair} pair={pair} />
              ))}
        </div>
      </section>

      {/* AI Signals Section */}
      <section className="mb-16 rounded-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 mr-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014"
                ></path>
              </svg>
              AI Trading Signals
            </h2>
            <Link
              href="/tools/forex/signals"
              className="text-white/80 hover:text-white flex items-center group"
            >
              View All Signals
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 ml-1 group-hover:translate-x-1 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Link>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {signals.map((signal) => (
              <SignalCard key={signal.pair} signal={signal} />
            ))}
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="mb-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold flex items-center text-black dark:text-white">
            <span className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 p-2 rounded-lg mr-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                />
              </svg>
            </span>
            Latest Forex News
          </h2>
          <Link
            href="/news/forex"
            className="text-blue-500 hover:text-blue-700 flex items-center group"
          >
            View All News
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 ml-1 group-hover:translate-x-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {forexNews.map((news) => (
            <NewsCard key={news.id} news={news} />
          ))}
        </div>
      </section>

      {/* Multimedia Content Section */}
      <section className="mb-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold flex items-center text-black dark:text-white">
            <span className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 p-2 rounded-lg mr-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
            </span>
            Multimedia Content
          </h2>
          <Link
            href="/learn/forex/multimedia"
            className="text-blue-500 hover:text-blue-700 flex items-center group"
          >
            View All Content
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 ml-1 group-hover:translate-x-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </Link>
        </div>
        <div className="mb-6">
          <div className="flex space-x-4 border-b border-gray-200 dark:border-gray-700 mb-6">
            <button
              onClick={() => setActiveTab("all")}
              className={`py-2 px-4 font-medium ${
                activeTab === "all"
                  ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400"
                  : "text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setActiveTab("video")}
              className={`py-2 px-4 font-medium ${
                activeTab === "video"
                  ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400"
                  : "text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
              }`}
            >
              Videos
            </button>
            <button
              onClick={() => setActiveTab("podcast")}
              className={`py-2 px-4 font-medium ${
                activeTab === "podcast"
                  ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400"
                  : "text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
              }`}
            >
              Podcasts
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredMultimedia.map((item) => (
              <MultimediaCard key={item.id} media={item} />
            ))}
          </div>
        </div>
      </section>

      {/* Educational Content Section */}
      <section className="mb-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold flex items-center text-black dark:text-white">
            <span className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 p-2 rounded-lg mr-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </span>
            Educational Resources
          </h2>
          <Link
            href="/learn/forex"
            className="text-blue-500 hover:text-blue-700 flex items-center group"
          >
            View All Courses
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 ml-1 group-hover:translate-x-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {educationalContent.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="mb-16 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 md:p-12 text-white text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Ready to Start Trading Forex?
        </h2>
        <p className="text-xl max-w-3xl mx-auto mb-8 opacity-90">
          Join thousands of traders who use our AI-powered platform to make
          smarter trading decisions in the forex market.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <button className="bg-white text-blue-700 hover:bg-blue-50 font-bold py-3 px-8 rounded-lg transition duration-300 shadow-lg">
            Open Free Account
          </button>
          <button className="bg-transparent hover:bg-white/20 border-2 border-white font-bold py-3 px-8 rounded-lg transition duration-300">
            Schedule Demo
          </button>
        </div>
      </section>
    </div>
  );
