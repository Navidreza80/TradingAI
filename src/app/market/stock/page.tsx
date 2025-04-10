"use server";
// Next built in component
import Link from "next/link";
// Page data
import { getEducationalContent } from "@/services/educationalService";
import { getStockPairs } from "@/services/stockMarketService";
import { getStockNews } from "@/services/stockNewsService";
// Third party component
import { NewsCard } from "@/components/stocks/NewsCard";
import { StockPairCard } from "@/components/stocks/StockPairCard";

export default async function StocksPage() {
  // Fetch data for different sections with error handling
  let stockNews = [];
  let topStockPairs = [];
  let educationalContent = [];

  try {
    // Use Promise.allSettled to fetch data in parallel and handle errors individually
    const [newsResult, pairsResult, contentResult] = await Promise.allSettled([
      getStockNews(3),
      getStockPairs(),
      getEducationalContent("stocks", 4),
    ]);

    // Extract data from successful promises
    if (newsResult.status === "fulfilled") stockNews = newsResult.value;
    if (pairsResult.status === "fulfilled") topStockPairs = pairsResult.value;
    if (contentResult.status === "fulfilled")
      educationalContent = contentResult.value;
  } catch (error) {
    console.error("Error fetching data for stocks page:", error);
    // Continue with empty arrays - the UI will handle empty states
  }

  return (
    <div className="container mx-auto px-4 py-24">
      {/* Hero Section */}
      <section className="mb-16 relative overflow-hidden rounded-2xl bg-gradient-to-r from-green-600 to-teal-700 p-8 md:p-12">
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
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Stock Market
          </h1>
          <p className="text-xl max-w-3xl mx-auto mb-8 text-white">
            Explore the world of stocks with real-time data, AI-powered trading
            signals, and expert analysis to help you make informed investment
            decisions.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <button className="bg-white text-green-700 hover:bg-green-50 font-bold py-3 px-6 rounded-lg transition duration-300 shadow-lg">
              Start Trading
            </button>
            <button className="bg-transparent hover:bg-white/20 border-2 border-white font-bold py-3 px-6 rounded-lg transition duration-300">
              Learn Stock Basics
            </button>
          </div>
        </div>
      </section>

      {/* Top Stocks Section */}
      <section className="mb-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold flex items-center text-black dark:text-white">
            <span className="bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300 p-2 rounded-lg mr-3">
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
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </span>
            Top Stocks
          </h2>
          <Link
            href="/market/stock/prices"
            className="text-green-500 hover:text-green-700 flex items-center group"
          >
            View All Prices
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topStockPairs.length > 0 ? (
            topStockPairs
              .slice(0, 6)
              .map((pair) => <StockPairCard key={pair.symbol} pair={pair} />)
          ) : (
            // Fallback UI when no data is available
            <div className="col-span-3 py-10 text-center">
              <p className="text-gray-500 dark:text-gray-400">
                Stock market data is currently unavailable. Please check back
                later.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* News Section */}
      <section className="mb-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold flex items-center text-black dark:text-white">
            <span className="bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300 p-2 rounded-lg mr-3">
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
            Latest Stock News
          </h2>
          <Link
            href="/news/stocks"
            className="text-green-500 hover:text-green-700 flex items-center group"
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
          {stockNews.length > 0 ? (
            stockNews.map((news) => <NewsCard key={news.id} news={news} />)
          ) : (
            <div className="col-span-3 py-10 text-center">
              <p className="text-gray-500 dark:text-gray-400">
                News articles are currently unavailable. Please check back
                later.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
