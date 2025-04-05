"use server";
// Next built in components
import Link from "next/link";
// Get data
import { getCommodityNews } from "@/services/commodityNewsService";
import { getCommodityPairs } from "@/services/commodityMarketService";
import { getCommoditySignals } from "@/services/commoditySignalService";
import { getEducationalContent } from "@/services/educationalService";
// Third party components
import { NewsCard } from "@/components/commodities/NewsCard";
import { CommodityPairCard } from "@/components/commodities/CommodityPairCard";
import { SignalCard } from "@/components/commodities/SignalCard";
import { CourseCard } from "@/components/commodities/CourseCard";
import { MultimediaSection } from "@/components/commodities/MultimediaSection";

export default async function CommoditiesPage() {
  // Fetch data for different sections with error handling
  let commodityNews = [];
  let topCommodityPairs = [];
  let tradingSignals = [];
  let educationalContent = [];

  try {
    // Use Promise.allSettled to fetch data in parallel and handle errors individually
    const [newsResult, pairsResult, signalsResult, contentResult] =
      await Promise.allSettled([
        getCommodityNews(3),
        getCommodityPairs(6),
        getCommoditySignals(3),
        getEducationalContent("commodities", 4),
      ]);

    // Extract data from successful promises
    if (newsResult.status === "fulfilled") commodityNews = newsResult.value;
    if (pairsResult.status === "fulfilled") topCommodityPairs = pairsResult.value;
    if (signalsResult.status === "fulfilled")
      tradingSignals = signalsResult.value;
    if (contentResult.status === "fulfilled")
      educationalContent = contentResult.value;
  } catch (error) {
    console.error("Error fetching data for commodities page:", error);
    // Continue with empty arrays - the UI will handle empty states
  }

  return (
    <div className="container mx-auto px-4 py-24">
      {/* Hero Section */}
      <section className="mb-16 relative overflow-hidden rounded-2xl bg-gradient-to-r from-amber-600 to-yellow-700 p-8 md:p-12">
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
            Commodities Market
          </h1>
          <p className="text-xl max-w-3xl mx-auto mb-8 text-white">
            Explore global commodities with real-time data, AI-powered trading
            signals, and expert analysis to help you make informed investment
            decisions.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <button className="bg-white text-amber-700 hover:bg-amber-50 font-bold py-3 px-6 rounded-lg transition duration-300 shadow-lg">
              Start Trading
            </button>
            <button className="bg-transparent hover:bg-white/20 border-2 border-white font-bold py-3 px-6 rounded-lg transition duration-300">
              Learn Commodities Basics
            </button>
          </div>
        </div>
      </section>

      {/* Top Commodities Section */}
      <section className="mb-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold flex items-center text-black dark:text-white">
            <span className="bg-amber-100 dark:bg-amber-900 text-amber-600 dark:text-amber-300 p-2 rounded-lg mr-3">
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
            Top Commodities
          </h2>
          <Link
            href="/market/commodities/prices"
            className="text-amber-500 hover:text-amber-700 flex items-center group"
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
          {topCommodityPairs.length > 0 ? (
            topCommodityPairs.map((pair) => (
              <CommodityPairCard key={pair.symbol} pair={pair} />
            ))
          ) : (
            // Fallback UI when no data is available
            <div className="col-span-3 py-10 text-center">
              <p className="text-gray-500 dark:text-gray-400">
                Commodity market data is currently unavailable. Please check back
                later.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Trading Signals Section */}
      <section className="mb-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold flex items-center text-black dark:text-white">
            <span className="bg-amber-100 dark:bg-amber-900 text-amber-600 dark:text-amber-300 p-2 rounded-lg mr-3">
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
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>
            </span>
            AI Trading Signals
          </h2>
          <Link
            href="/signals/commodities"
            className="text-amber-500 hover:text-amber-700 flex items-center group"
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tradingSignals.length > 0 ? (
            tradingSignals.map((signal) => (
              <SignalCard key={signal.id} signal={signal} />
            ))
          ) : (
            <div className="col-span-3 py-10 text-center">
              <p className="text-gray-500 dark:text-gray-400">
                Trading signals are currently being calculated. Please check
                back soon.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* News Section */}
      <section className="mb-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold flex items-center text-black dark:text-white">
            <span className="bg-amber-100 dark:bg-amber-900 text-amber-600 dark:text-amber-300 p-2 rounded-lg mr-3">
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
            Latest Commodities News
          </h2>
          <Link
            href="/news/commodities"
            className="text-amber-500 hover:text-amber-700 flex items-center group"
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
          {commodityNews.length > 0 ? (
            commodityNews.map((news) => <NewsCard key={news.id} news={news} />)
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

      {/* Educational Content Section */}
      <section className="mb-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold flex items-center text-black dark:text-white">
            <span className="bg-amber-100 dark:bg-amber-900 text-amber-600 dark:text-amber-300 p-2 rounded-lg mr-3">
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
            Learn Commodities Trading
          </h2>
          <Link
            href="/learn/commodities"
            className="text-amber-500 hover:text-amber-700 flex items-center group"
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
          {educationalContent.length > 0 ? (
            educationalContent.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))
          ) : (
            <div className="col-span-4 py-10 text-center">
              <p className="text-gray-500 dark:text-gray-400">
                Educational content is currently being updated. Please check
                back soon.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Multimedia Content Section - Using client component for interactivity */}
      <MultimediaSection />

      {/* Call to Action Section */}
      <section className="mb-16 bg-gradient-to-r from-amber-600 to-yellow-700 rounded-2xl p-8 md:p-12 text-white text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Ready to Start Trading Commodities?
        </h2>
        <p className="text-xl mb-8 max-w-3xl mx-auto">
          Join thousands of traders who are already using our AI-powered platform to make smarter investment decisions in the commodities market.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/auth/signup"
            className="bg-white text-amber-700 hover:bg-amber-50 font-bold py-3 px-8 rounded-lg transition duration-300 shadow-lg"
          >
            Create Free Account
          </Link>
          <Link
            href="/pricing"
            className="bg-transparent hover:bg-white/20 border-2 border-white font-bold py-3 px-8 rounded-lg transition duration-300"
          >
            View Pricing Plans
          </Link>
        </div>
      </section>

      {/* Market Insights Section */}
      <section className="mb-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold flex items-center text-black dark:text-white">
            <span className="bg-amber-100 dark:bg-amber-900 text-amber-600 dark:text-amber-300 p-2 rounded-lg mr-3">
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
                  d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </span>
            Market Insights
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-100 dark:border-gray-700">
            <h3 className="font-bold text-xl mb-4 text-black dark:text-white">Commodity Overview</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-2 border-b border-gray-200 dark:border-gray-700">
                <span className="text-gray-600 dark:text-gray-400">Gold</span>
                <div className="flex items-center">
                  <span className="font-medium text-black dark:text-white mr-2">$2,345.60</span>
                  <span className="text-green-500">+1.24%</span>
                </div>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-gray-200 dark:border-gray-700">
                <span className="text-gray-600 dark:text-gray-400">Silver</span>
                <div className="flex items-center">
                  <span className="font-medium text-black dark:text-white mr-2">$28.75</span>
                  <span className="text-green-500">+0.87%</span>
                </div>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-gray-200 dark:border-gray-700">
                <span className="text-gray-600 dark:text-gray-400">Crude Oil (WTI)</span>
                <div className="flex items-center">
                  <span className="font-medium text-black dark:text-white mr-2">$78.32</span>
                  <span className="text-red-500">-0.45%</span>
                </div>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-gray-200 dark:border-gray-700">
                <span className="text-gray-600 dark:text-gray-400">Natural Gas</span>
                <div className="flex items-center">
                  <span className="font-medium text-black dark:text-white mr-2">$2.87</span>
                  <span className="text-green-500">+2.14%</span>
                </div>
              </div>
            </div>
            <Link
              href="/market/commodities/prices"
              className="mt-4 inline-block text-amber-600 dark:text-amber-400 hover:underline"
            >
              View detailed market data →
            </Link>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-100 dark:border-gray-700">
            <h3 className="font-bold text-xl mb-4 text-black dark:text-white">Sector Performance</h3>
            <div className="space-y-4">
              <div className="flex items-center pb-2">
                <div className="w-32 text-gray-600 dark:text-gray-400">Precious Metals</div>
                <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '82%' }}></div>
                </div>
                <div className="w-16 text-right text-green-500 ml-2">+1.8%</div>
              </div>
              <div className="flex items-center pb-2">
                <div className="w-32 text-gray-600 dark:text-gray-400">Energy</div>
                <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div className="bg-red-500 h-2.5 rounded-full" style={{ width: '35%' }}></div>
                </div>
                <div className="w-16 text-right text-red-500 ml-2">-0.3%</div>
              </div>
              <div className="flex items-center pb-2">
                <div className="w-32 text-gray-600 dark:text-gray-400">Agriculture</div>
                <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '65%' }}></div>
                </div>
                <div className="w-16 text-right text-green-500 ml-2">+1.2%</div>
              </div>
              <div className="flex items-center pb-2">
                <div className="w-32 text-gray-600 dark:text-gray-400">Industrial Metals</div>
                <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '58%' }}></div>
                </div>
                <div className="w-16 text-right text-green-500 ml-2">+0.9%</div>
              </div>
              <div className="flex items-center pb-2">
                <div className="w-32 text-gray-600 dark:text-gray-400">Livestock</div>
                <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div className="bg-red-500 h-2.5 rounded-full" style={{ width: '28%' }}></div>
                </div>
                <div className="w-16 text-right text-red-500 ml-2">-0.7%</div>
              </div>
            </div>
            <Link
              href="/market/commodities/sectors"
              className="mt-4 inline-block text-amber-600 dark:text-amber-400 hover:underline"
            >
              View all sectors →
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="mb-16">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-black dark:text-white">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-5 border border-gray-100 dark:border-gray-700">
            <h3 className="font-bold text-lg mb-2 text-black dark:text-white">
              What are commodities?
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Commodities are raw materials or primary agricultural products that can be bought and sold, such as gold, oil, wheat, and coffee. They are the building blocks for other goods and services and are traded on specialized exchanges.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-5 border border-gray-100 dark:border-gray-700">
            <h3 className="font-bold text-lg mb-2 text-black dark:text-white">
              How do I start investing in commodities?
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              You can invest in commodities through futures contracts, ETFs, mutual funds, or by buying shares in companies that produce commodities. For beginners, ETFs are often the simplest way to gain exposure to commodity markets without dealing with the complexity of futures contracts.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-5 border border-gray-100 dark:border-gray-700">
            <h3 className="font-bold text-lg mb-2 text-black dark:text-white">
              What factors affect commodity prices?
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Commodity prices are influenced by supply and demand dynamics, geopolitical events, weather conditions, currency fluctuations, economic growth, inflation, and market speculation. Understanding these factors is crucial for successful commodity trading.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-5 border border-gray-100 dark:border-gray-700">
            <h3 className="font-bold text-lg mb-2 text-black dark:text-white">
              Are commodities a good hedge against inflation?
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Commodities are often considered a hedge against inflation because their prices typically rise when inflation increases. Raw materials and agricultural products tend to maintain their intrinsic value even as the purchasing power of currency declines.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}