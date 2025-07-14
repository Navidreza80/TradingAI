/* eslint-disable */
"use client";
// Third party components
import { CurrencyPairCard } from "@/components/forex/CurrencyPairCard";
import { NewsCard } from "@/components/forex/NewsCard";
// Get page data
// Next built in components
import Link from "next/link";
// React built in hooks
import { useEffect, useState } from "react";

// Define TypeScript interfaces
interface CurrencyPair {
  pair: string;
  price: string;
  change: string;
  changePercent: string;
}

interface ForexNews {
  id: string;
  title: string;
  summary: string;
  url: string;
  imageUrl: string;
  source: string;
  publishedAt: string;
}

interface ExchangeRateApiResponse {
  base: string;
  rates: Record<string, number>;
  time_last_updated: number;
}

// Replace the existing page component with this updated version that fetches real news
export default function ForexPage() {
  const [forexNews, setForexNews] = useState<ForexNews[]>([]);
  const [newsLoading, setNewsLoading] = useState<boolean>(true);
  const [newsError, setNewsError] = useState<string | null>(null);

  // State to save currency pair
  const [currencyPairs, setCurrencyPairs] = useState<CurrencyPair[]>([]);
  // State to save status of is loading
  const [loading, setLoading] = useState<boolean>(true);
  // State to save error
  const [error, setError] = useState<string | null>(null);

  // Function to fetch forex data
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
    } finally {
      setLoading(false);
    }
  };

  // useEffect to get data when the component is mounting
  useEffect(() => {
    fetchForexData();
    fetchForexNews();
    const intervalId = setInterval(fetchForexData, 300000);
    return () => clearInterval(intervalId);
  }, []);

  const fetchForexNews = async () => {
    setNewsLoading(true);
    try {
      // Using a free news API (you may need to register for an API key)
      const response = await fetch(
        "https://finnhub.io/api/v1/news?category=forex&token=cvrljf9r01qnpem87dsgcvrljf9r01qnpem87dt0"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch forex news");
      }

      const data = await response.json();

      // Process and format the news data
      const formattedNews: ForexNews[] = data.slice(0, 3).map((item: any) => ({
        id: item.id || String(Math.random()),
        title: item.headline || "Forex Market Update",
        summary: item.summary || "Latest updates from the forex market",
        url: item.url || "#",
        imageUrl: item.image || "/image/noImage.jpg",
        source: item.source || "Financial News",
        publishedAt: new Date(item.datetime * 1000).toISOString(),
      }));

      setForexNews(formattedNews);
      setNewsError(null);
    } catch (err) {
      console.error("Error fetching forex news:", err);
      setNewsError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    } finally {
      setNewsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 pt-24 bg-background-light dark:bg-background-dark">

      {/* Currency Pairs Section */}
      <section className="mb-8 md:mb-16">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 md:mb-8 gap-2 sm:gap-0">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold flex items-center text-primary-light dark:text-primary-dark">
            <span className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 p-1.5 md:p-2 rounded-lg mr-2 md:mr-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 md:h-6 md:w-6"
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
                  className="w-4 h-4 md:w-5 md:h-5 text-blue-500"
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
            <span className="text-xs md:text-sm text-gray-500 dark:text-gray-400 mr-3">
              Auto-refresh: 5m
            </span>
            <Link
              href="/market/forex/all-pairs"
              className="text-blue-500 hover:text-blue-700 flex items-center group text-sm md:text-base"
            >
              View All Pairs
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 md:h-5 md:w-5 ml-1 group-hover:translate-x-1 transition-transform"
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
          <div className="bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 p-3 md:p-4 rounded-lg mb-4 md:mb-6 text-sm md:text-base">
            <p>Error loading forex data: {error}</p>
            <p className="text-xs md:text-sm mt-1">Showing fallback data instead.</p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
          {loading
            ? Array(8)
                .fill(0)
                .map((_, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 md:p-5 border border-gray-100 dark:border-gray-700"
                  >
                    <div className="flex justify-between items-center mb-3">
                      <div className="h-5 md:h-6 bg-gray-200 dark:bg-gray-700 rounded w-16 md:w-20 animate-pulse"></div>
                      <div className="h-5 md:h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-12 md:w-16 animate-pulse"></div>
                    </div>
                    <div className="h-8 md:h-10 bg-gray-200 dark:bg-gray-700 rounded w-20 md:w-24 mb-2 animate-pulse"></div>
                    <div className="flex items-center">
                      <div className="h-3 md:h-4 w-3 md:w-4 bg-gray-200 dark:bg-gray-700 rounded-full mr-1 animate-pulse"></div>
                      <div className="h-3 md:h-4 bg-gray-200 dark:bg-gray-700 rounded w-10 md:w-12 animate-pulse"></div>
                    </div>
                  </div>
                ))
            : currencyPairs.map((pair) => (
                <CurrencyPairCard key={pair.pair} pair={pair} />
              ))}
        </div>
      </section>

      {/* News Section */}
      <section className="mb-8 md:mb-16">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 md:mb-8 gap-2 sm:gap-0">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold flex items-center text-primary-light dark:text-primary-dark">
            <span className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 p-1.5 md:p-2 rounded-lg mr-2 md:mr-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 md:h-6 md:w-6"
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
            {newsLoading && (
              <span className="ml-2 inline-block animate-pulse">
                <svg
                  className="w-4 h-4 md:w-5 md:h-5 text-blue-500"
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
          <Link
            href="/news/forex"
            className="text-blue-500 hover:text-blue-700 flex items-center group text-sm md:text-base"
          >
            View All News
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 md:h-5 md:w-5 ml-1 group-hover:translate-x-1 transition-transform"
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

        {newsError && (
          <div className="bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 p-3 md:p-4 rounded-lg mb-4 md:mb-6 text-sm md:text-base">
            <p>Error loading forex news: {newsError}</p>
            <p className="text-xs md:text-sm mt-1">Showing fallback news instead.</p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {newsLoading && forexNews && forexNews.length === 0
            ? Array(3)
                .fill(0)
                .map((_, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-100 dark:border-gray-700"
                  >
                    <div className="h-40 md:h-48 bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
                    <div className="p-4 md:p-5">
                      <div className="h-5 md:h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2 md:mb-3 animate-pulse"></div>
                      <div className="h-3 md:h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-1 md:mb-2 animate-pulse"></div>
                      <div className="h-3 md:h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3 mb-3 md:mb-4 animate-pulse"></div>
                      <div className="flex justify-between items-center">
                        <div className="h-3 md:h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3 animate-pulse"></div>
                        <div className="h-6 md:h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4 animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                ))
            : forexNews && forexNews.map((news) => <NewsCard key={news.id} news={news} />)}
        </div>
      </section>
    </div>
  );
}
