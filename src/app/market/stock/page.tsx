"use server";
// Next built in component
import Link from "next/link";
// Page data
import { getStockPairs } from "@/services/stockMarketService";
import { getStockNews } from "@/services/stockNewsService";
// Third party component
import { NewsCard } from "@/components/stocks/NewsCard";
import { StockPairCard } from "@/components/stocks/StockPairCard";

export default async function StocksPage() {
  // Fetch data for different sections with error handling
  let stockNews = [];
  let topStockPairs = [];

  try {
    // Use Promise.allSettled to fetch data in parallel and handle errors individually
    const [newsResult, pairsResult] = await Promise.allSettled([
      getStockNews(3),
      getStockPairs(),
    ]);

    // Extract data from successful promises
    if (newsResult.status === "fulfilled") stockNews = newsResult.value;
    if (pairsResult.status === "fulfilled") topStockPairs = pairsResult.value;
  } catch (error) {
    throw error;
    // Continue with empty arrays - the UI will handle empty states
  }

  return (
    <div className="container mx-auto px-4 pt-24">
      {/* Top Stocks Section */}
      <section className="mb-8 md:mb-16">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 md:mb-8 gap-2 sm:gap-0">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold flex items-center text-black dark:text-white">
            <span className="bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300 p-1.5 md:p-2 rounded-lg mr-2 md:mr-3">
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
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </span>
            Top Stocks
          </h2>
          <Link
            href="/market/stock/prices"
            className="text-green-500 hover:text-green-700 flex items-center group text-sm md:text-base"
          >
            View All Prices
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {topStockPairs.length > 0 ? (
            topStockPairs
              .slice(0, 6)
              .map((pair) => <StockPairCard key={pair.symbol} pair={pair} />)
          ) : (
            // Fallback UI when no data is available
            <div className="col-span-1 sm:col-span-2 lg:col-span-3 py-6 md:py-10 text-center">
              <p className="text-gray-500 dark:text-gray-400 text-sm md:text-base">
                Stock market data is currently unavailable. Please check back
                later.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* News Section */}
      <section className="mb-8 md:mb-16">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 md:mb-8 gap-2 sm:gap-0">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold flex items-center text-black dark:text-white">
            <span className="bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300 p-1.5 md:p-2 rounded-lg mr-2 md:mr-3">
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
            Latest Stock News
          </h2>
          <Link
            href="/news/stocks"
            className="text-green-500 hover:text-green-700 flex items-center group text-sm md:text-base"
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {stockNews.length > 0 ? (
            stockNews.map((news, index) => <NewsCard key={index} news={news} />)
          ) : (
            <div className="col-span-1 sm:col-span-2 md:col-span-3 py-6 md:py-10 text-center">
              <p className="text-gray-500 dark:text-gray-400 text-sm md:text-base">
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
