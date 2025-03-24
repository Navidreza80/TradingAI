"use server";

import Link from "next/link";
import { getNFTCollections } from "@/services/nftMarketService";
import { getNFTNews } from "@/services/nftNewsService";
import { getNFTSignals } from "@/services/nftSignalService";
import { getEducationalContent } from "@/services/educationalService";
import { NewsCard } from "@/components/nft/NewsCard";
import { NFTCollectionCard } from "@/components/nft/NFTCollectionCard";
import { SignalCard } from "@/components/nft/SignalCard";
import { CourseCard } from "@/components/nft/CourseCard";
import { MultimediaSection } from "@/components/nft/MultimediaSection";
import { TrendingNFTs } from "@/components/nft/TrendingNFTs";

export default async function NFTPage() {
  // Fetch data for different sections with error handling
  let nftNews = [];
  let topNFTCollections = [];
  let tradingSignals = [];
  let educationalContent = [];

  try {
    // Use Promise.allSettled to fetch data in parallel and handle errors individually
    const [newsResult, collectionsResult, signalsResult, contentResult] =
      await Promise.allSettled([
        getNFTNews(3),
        getNFTCollections(6),
        getNFTSignals(3),
        getEducationalContent("nft", 4),
      ]);

    // Extract data from successful promises
    if (newsResult.status === "fulfilled") nftNews = newsResult.value;
    if (collectionsResult.status === "fulfilled") topNFTCollections = collectionsResult.value;
    if (signalsResult.status === "fulfilled") tradingSignals = signalsResult.value;
    if (contentResult.status === "fulfilled") educationalContent = contentResult.value;
  } catch (error) {
    console.error("Error fetching data for NFT page:", error);
    // Continue with empty arrays - the UI will handle empty states
  }

  return (
    <div className="container mx-auto px-4 py-24">
      {/* Hero Section */}
      <section className="mb-16 relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-700 p-8 md:p-12">
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
            NFT Market
          </h1>
          <p className="text-xl max-w-3xl mx-auto mb-8 text-white">
            Explore the world of digital collectibles with real-time data, AI-powered trading
            signals, and expert analysis to help you make informed NFT investment decisions.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <button className="bg-white text-purple-700 hover:bg-purple-50 font-bold py-3 px-6 rounded-lg transition duration-300 shadow-lg">
              Explore Collections
            </button>
            <button className="bg-transparent hover:bg-white/20 border-2 border-white font-bold py-3 px-6 rounded-lg transition duration-300">
              Learn NFT Basics
            </button>
          </div>
        </div>
      </section>

      {/* Trending NFTs Section */}
      <TrendingNFTs />

      {/* Top Collections Section */}
      <section className="mb-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold flex items-center text-black dark:text-white">
            <span className="bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300 p-2 rounded-lg mr-3">
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
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
            </span>
            Top Collections
          </h2>
          <Link
            href="/market/nft/collections"
            className="text-purple-500 hover:text-purple-700 flex items-center group"
          >
            View All Collections
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
          {topNFTCollections.length > 0 ? (
            topNFTCollections.map((collection) => (
              <NFTCollectionCard key={collection.id} collection={collection} />
            ))
          ) : (
            // Fallback UI when no data is available
            <div className="col-span-3 py-10 text-center">
              <p className="text-gray-500 dark:text-gray-400">
                NFT collection data is currently unavailable. Please check back
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
            <span className="bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300 p-2 rounded-lg mr-3">
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
            href="/signals/nft"
            className="text-purple-500 hover:text-purple-700 flex items-center group"
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
            <span className="bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300 p-2 rounded-lg mr-3">
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
            Latest NFT News
          </h2>
          <Link
            href="/news/nft"
            className="text-purple-500 hover:text-purple-700 flex items-center group"
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
          {nftNews.length > 0 ? (
            nftNews.map((news) => <NewsCard key={news.id} news={news} />)
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
            <span className="bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300 p-2 rounded-lg mr-3">
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
            Learn NFT Trading
          </h2>
          <Link
            href="/learn/nft"
            className="text-purple-500 hover:text-purple-700 flex items-center group"
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
      <section className="mb-16 bg-gradient-to-r from-purple-600 to-indigo-700 rounded-2xl p-8 md:p-12 text-white text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Ready to Start Trading NFTs?
        </h2>
        <p className="text-xl mb-8 max-w-3xl mx-auto">
          Join thousands of traders who are already using our AI-powered platform to make smarter investment decisions in the NFT market.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/auth/signup"
            className="bg-white text-purple-700 hover:bg-purple-50 font-bold py-3 px-8 rounded-lg transition duration-300 shadow-lg"
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
            <span className="bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300 p-2 rounded-lg mr-3">
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
            <h3 className="font-bold text-xl mb-4 text-black dark:text-white">NFT Market Overview</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-2 border-b border-gray-200 dark:border-gray-700">
                <span className="text-gray-600 dark:text-gray-400">Total Market Cap</span>
                <div className="flex items-center">
                  <span className="font-medium text-black dark:text-white mr-2">$24.8B</span>
                  <span className="text-green-500">+2.4%</span>
                </div>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-gray-200 dark:border-gray-700">
                <span className="text-gray-600 dark:text-gray-400">24h Volume</span>
                <div className="flex items-center">
                  <span className="font-medium text-black dark:text-white mr-2">$1.2B</span>
                  <span className="text-green-500">+5.7%</span>
                </div>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-gray-200 dark:border-gray-700">
                <span className="text-gray-600 dark:text-gray-400">Active Collections</span>
                <div className="flex items-center">
                  <span className="font-medium text-black dark:text-white mr-2">12,845</span>
                  <span className="text-green-500">+124</span>
                </div>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-gray-200 dark:border-gray-700">
                <span className="text-gray-600 dark:text-gray-400">Floor Price Index</span>
                <div className="flex items-center">
                  <span className="font-medium text-black dark:text-white mr-2">142.5</span>
                  <span className="text-red-500">-1.2%</span>
                </div>
              </div>
            </div>
            <Link
              href="/market/nft/stats"
              className="mt-4 inline-block text-purple-600 dark:text-purple-400 hover:underline"
            >
              View detailed market data →
            </Link>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-100 dark:border-gray-700">
            <h3 className="font-bold text-xl mb-4 text-black dark:text-white">Category Performance</h3>
            <div className="space-y-4">
              <div className="flex items-center pb-2">
                <div className="w-32 text-gray-600 dark:text-gray-400">Art</div>
                <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '78%' }}></div>
                </div>
                <div className="w-16 text-right text-green-500 ml-2">+3.2%</div>
              </div>
              <div className="flex items-center pb-2">
                <div className="w-32 text-gray-600 dark:text-gray-400">Collectibles</div>
                <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '65%' }}></div>
                </div>
                <div className="w-16 text-right text-green-500 ml-2">+1.8%</div>
              </div>
              <div className="flex items-center pb-2">
                <div className="w-32 text-gray-600 dark:text-gray-400">Gaming</div>
                <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div className="bg-red-500 h-2.5 rounded-full" style={{ width: '45%' }}></div>
                </div>
                <div className="w-16 text-right text-red-500 ml-2">-0.7%</div>
              </div>
              <div className="flex items-center pb-2">
                <div className="w-32 text-gray-600 dark:text-gray-400">Metaverse</div>
                <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '82%' }}></div>
                </div>
                <div className="w-16 text-right text-green-500 ml-2">+4.5%</div>
              </div>
              <div className="flex items-center pb-2">
                <div className="w-32 text-gray-600 dark:text-gray-400">Utility</div>
                <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div className="bg-red-500 h-2.5 rounded-full" style={{ width: '38%' }}></div>
                </div>
                <div className="w-16 text-right text-red-500 ml-2">-1.2%</div>
              </div>
            </div>
            <Link
              href="/market/nft/categories"
              className="mt-4 inline-block text-purple-600 dark:text-purple-400 hover:underline"
            >
              View all categories →
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
              What are NFTs?
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              NFTs (Non-Fungible Tokens) are unique digital assets that represent ownership of a specific item or piece of content on the blockchain. Unlike cryptocurrencies such as Bitcoin, each NFT has distinct properties that make it non-interchangeable with other tokens.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-5 border border-gray-100 dark:border-gray-700">
            <h3 className="font-bold text-lg mb-2 text-black dark:text-white">
              How do I start investing in NFTs?
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              To start investing in NFTs, you'll need a cryptocurrency wallet (like MetaMask), some cryptocurrency (usually Ethereum), and an account on an NFT marketplace such as OpenSea, Rarible, or Foundation. Research collections, understand floor prices, and consider factors like artist reputation and utility before investing.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-5 border border-gray-100 dark:border-gray-700">
            <h3 className="font-bold text-lg mb-2 text-black dark:text-white">
              What factors affect NFT prices?
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              NFT prices are influenced by artist or creator reputation, rarity within a collection, historical significance, utility and benefits, community strength, overall market sentiment, and media attention. Understanding these factors can help you make more informed investment decisions.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-5 border border-gray-100 dark:border-gray-700">
            <h3 className="font-bold text-lg mb-2 text-black dark:text-white">
              Are NFTs a good investment?
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              NFTs can be highly speculative investments with significant volatility. While some NFTs have generated substantial returns, many others have lost value. It's important to invest only what you can afford to lose, thoroughly research projects, and consider the long-term utility and community behind any NFT collection.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}