"use server";
// Next built in components
import Link from "next/link";
// Get page data
import { getCryptoNews } from "@/services/cryptoNewsService";
import { getCryptoPairs } from "@/services/cryptoMarketService";
import { getCryptoSignals } from "@/services/cryptoSignalService";
import { getEducationalContent } from "@/services/educationalService";
// Third party components
import { NewsCard } from "@/components/crypto/NewsCard";
import { CryptoPairCard } from "@/components/crypto/CryptoPairCard";
import { SignalCard } from "@/components/crypto/SignalCard";
import { CourseCard } from "@/components/crypto/CourseCard";
import { MultimediaSection } from "@/components/crypto/MultimediaSection";

export default async function CryptoPage() {
  // Fetch data for different sections with error handling
  let cryptoNews = [];
  let topCryptoPairs = [];
  let tradingSignals = [];
  let educationalContent = [];

  try {
    // Use Promise.allSettled to fetch data in parallel and handle errors individually
    const [newsResult, pairsResult, signalsResult, contentResult] =
      await Promise.allSettled([
        getCryptoNews(3),
        getCryptoPairs(6),
        getCryptoSignals(3),
        getEducationalContent("crypto", 4),
      ]);

    // Extract data from successful promises
    if (newsResult.status === "fulfilled") cryptoNews = newsResult.value;
    if (pairsResult.status === "fulfilled") topCryptoPairs = pairsResult.value;
    if (signalsResult.status === "fulfilled")
      tradingSignals = signalsResult.value;
    if (contentResult.status === "fulfilled")
      educationalContent = contentResult.value;
  } catch (error) {
    console.error("Error fetching data for crypto page:", error);
    // Continue with empty arrays - the UI will handle empty states
  }

  // Rest of the component remains the same
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
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Cryptocurrency Market
          </h1>
          <p className="text-xl max-w-3xl mx-auto mb-8 text-white">
            Explore the world of cryptocurrencies with real-time data,
            AI-powered trading signals, and expert analysis to help you make
            informed decisions.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <button className="bg-white text-blue-700 hover:bg-blue-50 font-bold py-3 px-6 rounded-lg transition duration-300 shadow-lg">
              Start Trading
            </button>
            <button className="bg-transparent hover:bg-white/20 border-2 border-white font-bold py-3 px-6 rounded-lg transition duration-300">
              Learn Crypto Basics
            </button>
          </div>
        </div>
      </section>

      {/* Top Cryptocurrencies Section */}
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
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </span>
            Top Cryptocurrencies
          </h2>
          <Link
            href="/market/crypto/prices"
            className="text-blue-500 hover:text-blue-700 flex items-center group"
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
          {topCryptoPairs.length > 0 ? (
            topCryptoPairs.map((pair) => (
              <CryptoPairCard key={pair.symbol} pair={pair} />
            ))
          ) : (
            // Fallback UI when no data is available
            <div className="col-span-3 py-10 text-center">
              <p className="text-gray-500 dark:text-gray-400">
                Cryptocurrency data is currently unavailable. Please check back
                later.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Trading Signals Section */}
      <section className="mb-16">
        {/* Section content remains the same */}
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
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>
            </span>
            AI Trading Signals
          </h2>
          <Link
            href="/signals/crypto"
            className="text-blue-500 hover:text-blue-700 flex items-center group"
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
        {/* Section content remains the same */}
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
            Latest Crypto News
          </h2>
          <Link
            href="/news/crypto"
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
          {cryptoNews.length > 0 ? (
            cryptoNews.map((news) => <NewsCard key={news.id} news={news} />)
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
        {/* Section content remains the same */}
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
            Learn Cryptocurrency
          </h2>
          <Link
            href="/learn/crypto"
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
      <section className="mb-16 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 md:p-12 text-white text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Ready to Start Trading Crypto?
        </h2>
        <p className="text-xl max-w-3xl mx-auto mb-8 opacity-90">
          Join thousands of traders who use our AI-powered platform to make
          smarter trading decisions in the cryptocurrency market.
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
}
