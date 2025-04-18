"use client";
// Next built in components
import Link from "next/link";
// Get page data
import { getCryptoNews } from "@/services/cryptoNewsService";
import { getEducationalContent } from "@/services/educationalService";
// Third party components
import { CryptoPairCard } from "@/components/crypto/CryptoPairCard";
import { NewsCard } from "@/components/crypto/NewsCard";
import { useEffect, useState } from "react";

// Define TypeScript interfaces
interface CryptoPair {
  symbol: string;
  name: string;
  price: string;
  change: string;
  changePercent: string;
  marketCap: string;
  volume: string;
  image?: string;
}

export default function CryptoPage() {
  // State for crypto data
  const [topCryptoPairs, setTopCryptoPairs] = useState<CryptoPair[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // State for other sections
  const [cryptoNews, setCryptoNews] = useState([]);
  const [educationalContent, setEducationalContent] = useState([]);
  
  // Function to fetch cryptocurrency data
  const fetchCryptoData = async () => {
    setLoading(true);
    try {
      // Using CoinGecko API to fetch top cryptocurrencies
      const response = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=6&page=1"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch cryptocurrency data");
      }

      const data = await response.json();

      // Process and format the crypto data
      const formattedData: CryptoPair[] = data.map((coin: any) => ({
        symbol: coin.symbol.toUpperCase(),
        name: coin.name,
        price: coin.current_price.toFixed(2),
        change: coin.price_change_24h.toFixed(2),
        changePercent: coin.price_change_percentage_24h.toFixed(2),
        marketCap: formatMarketCap(coin.market_cap),
        volume: formatVolume(coin.total_volume),
        image: coin.image,
      }));

      setTopCryptoPairs(formattedData);
      setError(null);
    } catch (err) {
      console.error("Error fetching crypto data:", err);
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  // Helper function to format market cap
  const formatMarketCap = (marketCap: number): string => {
    if (marketCap >= 1e12) {
      return `${(marketCap / 1e12).toFixed(1)}T`;
    } else if (marketCap >= 1e9) {
      return `${(marketCap / 1e9).toFixed(1)}B`;
    } else if (marketCap >= 1e6) {
      return `${(marketCap / 1e6).toFixed(1)}M`;
    } else {
      return `${marketCap.toFixed(0)}`;
    }
  };

  // Helper function to format volume
  const formatVolume = (volume: number): string => {
    if (volume >= 1e9) {
      return `${(volume / 1e9).toFixed(1)}B`;
    } else if (volume >= 1e6) {
      return `${(volume / 1e6).toFixed(1)}M`;
    } else if (volume >= 1e3) {
      return `${(volume / 1e3).toFixed(1)}K`;
    } else {
      return `${volume.toFixed(0)}`;
    }
  };

  // Function to fetch other data
  const fetchOtherData = async () => {
    try {
      // Fetch news
      const news = await getCryptoNews(3);
      setCryptoNews(news);
      
      // Fetch educational content
      const content = await getEducationalContent("crypto", 4);
      setEducationalContent(content);
    } catch (error) {
      console.error("Error fetching data for crypto page:", error);
      // Continue with empty arrays - the UI will handle empty states
    }
  };

  // useEffect to get data when the component is mounting
  useEffect(() => {
    fetchCryptoData();
    fetchOtherData();
    const intervalId = setInterval(fetchCryptoData, 300000); // Refresh every 5 minutes
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="container mx-auto px-4 pt-24">
      {/* Top Cryptocurrencies Section */}
      <section className="mb-8 md:mb-16">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 md:mb-8 gap-2 sm:gap-0">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold flex items-center text-black dark:text-white">
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
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </span>
            Top Cryptocurrencies
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
              href="/market/crypto/prices"
              className="text-blue-500 hover:text-blue-700 flex items-center group text-sm md:text-base"
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
        </div>

        {error && (
          <div className="bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 p-3 md:p-4 rounded-lg mb-4 md:mb-6 text-sm md:text-base">
            <p>Error loading cryptocurrency data: {error}</p>
            <p className="text-xs md:text-sm mt-1">Showing fallback data instead.</p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
          {loading
            ? Array(6)
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
            : topCryptoPairs.map((pair) => (
                <CryptoPairCard key={pair.symbol} pair={pair} />
              ))}
        </div>
      </section>

      {/* News Section */}
      <section className="mb-8 md:mb-16">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 md:mb-8 gap-2 sm:gap-0">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold flex items-center text-black dark:text-white">
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
            Latest Crypto News
          </h2>
          <Link
            href="/news/crypto"
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-6">
          {cryptoNews.length > 0 ? (
            cryptoNews.map((news) => (
              <NewsCard key={news.id} news={news} />
            ))
          ) : (
            Array(3)
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
          )}
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="mb-8 md:mb-16 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl md:rounded-2xl p-6 md:p-12 text-white text-center">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4">
          Ready to Start Trading Crypto?
        </h2>
        <p className="text-base md:text-lg lg:text-xl max-w-3xl mx-auto mb-6 md:mb-8 opacity-90">
          Join thousands of traders who use our AI-powered platform to make
          smarter trading decisions in the cryptocurrency market.
        </p>
        <div className="flex flex-wrap justify-center gap-3 md:gap-4">
          <Link href="/trade" className="bg-white text-blue-700 hover:bg-blue-50 font-bold py-2 md:py-3 px-6 md:px-8 rounded-lg transition duration-300 shadow-lg text-sm md:text-base">
            Open Free Account
          </Link>
          <Link href="/trade" className="bg-transparent hover:bg-white/20 border-2 border-white font-bold py-2 md:py-3 px-6 md:px-8 rounded-lg transition duration-300 text-sm md:text-base">
            Schedule Demo
          </Link>
        </div>
      </section>
    </div>
  );
}