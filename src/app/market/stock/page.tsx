"use server";
// Next built in component
import Link from "next/link";
// Page data
import { getStockNews } from "@/services/stockNewsService";
import { getStockPairs } from "@/services/stockMarketService";
import { getStockSignals } from "@/services/stockSignalService";
import { getEducationalContent } from "@/services/educationalService";
// Third party component
import { NewsCard } from "@/components/stocks/NewsCard";
import { StockPairCard } from "@/components/stocks/StockPairCard";
import { SignalCard } from "@/components/stocks/SignalCard";
import { CourseCard } from "@/components/stocks/CourseCard";
import { MultimediaSection } from "@/components/stocks/MultimediaSection";

export default async function StocksPage() {
  // Fetch data for different sections with error handling
  let stockNews = [];
  let topStockPairs = [];
  let tradingSignals = [];
  let educationalContent = [];

  try {
    // Use Promise.allSettled to fetch data in parallel and handle errors individually
    const [newsResult, pairsResult, signalsResult, contentResult] =
      await Promise.allSettled([
        getStockNews(3),
        getStockPairs(6),
        getStockSignals(3),
        getEducationalContent("stocks", 4),
      ]);

    // Extract data from successful promises
    if (newsResult.status === "fulfilled") stockNews = newsResult.value;
    if (pairsResult.status === "fulfilled") topStockPairs = pairsResult.value;
    if (signalsResult.status === "fulfilled")
      tradingSignals = signalsResult.value;
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
            href="/market/stocks/prices"
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
            topStockPairs.map((pair) => (
              <StockPairCard key={pair.symbol} pair={pair} />
            ))
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

      {/* Trading Signals Section */}
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
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>
            </span>
            AI Trading Signals
          </h2>
          <Link
            href="/signals/stocks"
            className="text-green-500 hover:text-green-700 flex items-center group"
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

      {/* Educational Content Section */}
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
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </span>
            Learn Stock Trading
          </h2>
          <Link
            href="/learn/stocks"
            className="text-green-500 hover:text-green-700 flex items-center group"
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
      <section className="mb-16 bg-gradient-to-r from-green-600 to-teal-700 rounded-2xl p-8 md:p-12 text-white text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Ready to Start Trading Stocks?
        </h2>
        <p className="text-xl mb-8 max-w-3xl mx-auto">
          Join thousands of traders who are already using our AI-powered platform to make smarter investment decisions.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/auth/signup"
            className="bg-white text-green-700 hover:bg-green-50 font-bold py-3 px-8 rounded-lg transition duration-300 shadow-lg"
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
                  d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </span>
            Market Insights
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-100 dark:border-gray-700">
            <h3 className="font-bold text-xl mb-4 text-black dark:text-white">Market Overview</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-2 border-b border-gray-200 dark:border-gray-700">
                <span className="text-gray-600 dark:text-gray-400">S&P 500</span>
                <div className="flex items-center">
                  <span className="font-medium text-black dark:text-white mr-2">4,587.64</span>
                  <span className="text-green-500">+0.58%</span>
                </div>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-gray-200 dark:border-gray-700">
                <span className="text-gray-600 dark:text-gray-400">Dow Jones</span>
                <div className="flex items-center">
                  <span className="font-medium text-black dark:text-white mr-2">36,124.23</span>
                  <span className="text-green-500">+0.43%</span>
                </div>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-gray-200 dark:border-gray-700">
                <span className="text-gray-600 dark:text-gray-400">NASDAQ</span>
                <div className="flex items-center">
                  <span className="font-medium text-black dark:text-white mr-2">14,259.50</span>
                  <span className="text-red-500">-0.12%</span>
                </div>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-gray-200 dark:border-gray-700">
                <span className="text-gray-600 dark:text-gray-400">Russell 2000</span>
                <div className="flex items-center">
                  <span className="font-medium text-black dark:text-white mr-2">2,323.61</span>
                  <span className="text-green-500">+1.02%</span>
                </div>
              </div>
            </div>
            <Link
              href="/market/stocks/indices"
              className="mt-4 inline-block text-green-600 dark:text-green-400 hover:underline"
            >
              View detailed market data →
            </Link>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-100 dark:border-gray-700">
            <h3 className="font-bold text-xl mb-4 text-black dark:text-white">Sector Performance</h3>
            <div className="space-y-4">
              <div className="flex items-center pb-2">
                <div className="w-32 text-gray-600 dark:text-gray-400">Technology</div>
                <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '78%' }}></div>
                </div>
                <div className="w-16 text-right text-green-500 ml-2">+2.4%</div>
              </div>
              <div className="flex items-center pb-2">
                <div className="w-32 text-gray-600 dark:text-gray-400">Healthcare</div>
                <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '65%' }}></div>
                </div>
                <div className="w-16 text-right text-green-500 ml-2">+1.8%</div>
              </div>
              <div className="flex items-center pb-2">
                <div className="w-32 text-gray-600 dark:text-gray-400">Financials</div>
                <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '52%' }}></div>
                </div>
                <div className="w-16 text-right text-green-500 ml-2">+1.2%</div>
              </div>
              <div className="flex items-center pb-2">
                <div className="w-32 text-gray-600 dark:text-gray-400">Energy</div>
                <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div className="bg-red-500 h-2.5 rounded-full" style={{ width: '35%' }}></div>
                </div>
                <div className="w-16 text-right text-red-500 ml-2">-0.7%</div>
              </div>
              <div className="flex items-center pb-2">
                <div className="w-32 text-gray-600 dark:text-gray-400">Utilities</div>
                <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div className="bg-red-500 h-2.5 rounded-full" style={{ width: '28%' }}></div>
                </div>
                <div className="w-16 text-right text-red-500 ml-2">-1.3%</div>
              </div>
            </div>
            <Link
              href="/market/stocks/sectors"
              className="mt-4 inline-block text-green-600 dark:text-green-400 hover:underline"
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
              What is stock trading?
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Stock trading involves buying and selling shares of publicly traded companies on stock exchanges. Traders aim to profit from short-term price fluctuations, while investors typically hold stocks for longer periods to benefit from company growth and dividends.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-5 border border-gray-100 dark:border-gray-700">
            <h3 className="font-bold text-lg mb-2 text-black dark:text-white">
              How do I start investing in stocks?
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              To start investing in stocks, you need to open a brokerage account, deposit funds, research companies you're interested in, and then place buy orders. Our platform provides educational resources and AI-powered insights to help beginners make informed investment decisions.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-5 border border-gray-100 dark:border-gray-700">
            <h3 className="font-bold text-lg mb-2 text-black dark:text-white">
              What are the benefits of using AI for stock trading?
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              AI can analyze vast amounts of market data, identify patterns, and generate trading signals much faster than humans. It helps remove emotional bias from trading decisions and can process news, social media sentiment, and technical indicators simultaneously to provide more comprehensive insights.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-5 border border-gray-100 dark:border-gray-700">
            <h3 className="font-bold text-lg mb-2 text-black dark:text-white">
              How risky is stock trading?
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Stock trading involves significant risk, including the potential loss of principal. Market volatility, company performance, economic factors, and global events can all impact stock prices. It's important to diversify your portfolio, only invest what you can afford to lose, and consider your risk tolerance.
            </p>
          </div>
        </div>
      </section>
    </div>
  );