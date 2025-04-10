"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/UI/tabs";
import { getStockNews } from "@/services/stockNewsService";
import { StockNews } from "@/types/stock";
import Link from "next/link";
import { useEffect, useState } from "react";
import { NewsCard } from "./NewsCard";

export function StockNewsSection() {
  const [news, setNews] = useState<StockNews[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    async function fetchNews() {
      try {
        setLoading(true);
        const newsData = await getStockNews(9);
        setNews(newsData);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch news:", err);
        setError("Failed to load news. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    fetchNews();

    // Refresh news every 15 minutes
    const interval = setInterval(fetchNews, 15 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  // Filter news based on active tab
  const filteredNews = news.filter((item) => {
    if (activeTab === "all") return true;
    if (activeTab === "positive") return item.sentiment === "positive";
    if (activeTab === "negative") return item.sentiment === "negative";
    return true;
  });

  return (
    <section className="mb-16">
      <div className="flex justify-between items-center mb-6">
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

      <Tabs
        defaultValue="all"
        value={activeTab}
        onValueChange={setActiveTab}
        className="mb-6"
      >
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="all">All News</TabsTrigger>
          <TabsTrigger value="positive">Positive</TabsTrigger>
          <TabsTrigger value="negative">Negative</TabsTrigger>
        </TabsList>
      </Tabs>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded-t-xl"></div>
              <div className="p-5 border border-gray-200 dark:border-gray-800 rounded-b-xl">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-3 w-1/4"></div>
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-2 w-3/4"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-4 w-1/2"></div>
                <div className="flex justify-between">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200 p-4 rounded-lg">
          <p>{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-2 text-sm font-medium underline"
          >
            Try refreshing the page
          </button>
        </div>
      ) : filteredNews.length === 0 ? (
        <div className="text-center py-10 text-gray-500 dark:text-gray-400">
          <p>No news articles found for this category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredNews.map((item) => (
            <NewsCard key={item.id} news={item} />
          ))}
        </div>
      )}
    </section>
  );
}
