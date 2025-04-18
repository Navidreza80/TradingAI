"use client";

import { NewsCard } from "@/components/stocks/NewsCard";
import { Button } from "@/components/UI/Button";
import { Input } from "@/components/UI/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/UI/tabs";
import { getStockNews } from "@/services/stockNewsService";
import { StockNews } from "@/types/stock";
import { Search } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function StockNewsPage() {
  const [news, setNews] = useState<StockNews[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function fetchNews() {
      try {
        setLoading(true);
        const newsData = await getStockNews(20); // Get more news for the dedicated page
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
  }, []);

  // Filter news based on active tab and search query
  const filteredNews = news.filter((item) => {
    // First filter by sentiment
    const sentimentMatch =
      activeTab === "all" ||
      (activeTab === "positive" && item.sentiment === "positive") ||
      (activeTab === "negative" && item.sentiment === "negative") ||
      (activeTab === "neutral" && item.sentiment === "neutral");

    // Then filter by search query
    const searchMatch =
      !searchQuery ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.relatedSymbols.some((symbol) =>
        symbol.toLowerCase().includes(searchQuery.toLowerCase())
      );

    return sentimentMatch && searchMatch;
  });

  return (
    <div className="container mx-auto px-4 py-24">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6 text-primary-light dark:text-primary-dark">
          Stock Market News
        </h1>

        <div className="mb-6 md:mb-8">
          <div className="relative mb-4 md:mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 h-4 w-4 sm:h-5 sm:w-5" />
            <Input
              type="text"
              placeholder="Search news..."
              className="pl-10 text-sm md:text-base h-10 md:h-12"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <Tabs
            defaultValue="all"
            value={activeTab}
            onValueChange={setActiveTab}
          >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0">
              <TabsList className="h-9 sm:h-10 mb-3 sm:mb-0 w-full sm:w-auto overflow-x-auto">
                <TabsTrigger value="all" className="text-xs sm:text-sm px-2 sm:px-3">All News</TabsTrigger>
                <TabsTrigger value="positive" className="text-xs sm:text-sm px-2 sm:px-3">Positive</TabsTrigger>
                <TabsTrigger value="negative" className="text-xs sm:text-sm px-2 sm:px-3">Negative</TabsTrigger>
                <TabsTrigger value="neutral" className="text-xs sm:text-sm px-2 sm:px-3">Neutral</TabsTrigger>
              </TabsList>
            </div>
          </Tabs>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-40 sm:h-44 md:h-48 bg-gray-200 dark:bg-gray-700 rounded-t-xl"></div>
                <div className="p-3 sm:p-4 md:p-5 border border-gray-200 dark:border-gray-800 rounded-b-xl">
                  <div className="h-3 sm:h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2 sm:mb-3 w-1/4"></div>
                  <div className="h-5 sm:h-6 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                  <div className="h-5 sm:h-6 bg-gray-200 dark:bg-gray-700 rounded mb-2 w-3/4"></div>
                  <div className="h-3 sm:h-4 bg-gray-200 dark:bg-gray-700 rounded mb-3 sm:mb-4 w-1/2"></div>
                  <div className="flex justify-between">
                    <div className="h-3 sm:h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
                    <div className="h-3 sm:h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200 p-4 sm:p-6 rounded-lg">
            <p className="text-sm sm:text-base">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-3 sm:mt-4 text-xs sm:text-sm font-medium underline"
            >
              Try refreshing the page
            </button>
          </div>
        ) : filteredNews.length === 0 ? (
          <div className="text-center py-8 sm:py-10 md:py-12 text-gray-500 dark:text-gray-400">
            <p className="text-lg sm:text-xl mb-2">No news articles found</p>
            <p className="text-sm sm:text-base">Try adjusting your search or filters</p>
            {searchQuery && (
              <Button
                variant="outline"
                className="mt-4 text-xs sm:text-sm bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => setSearchQuery("")}
              >
                Clear Search
              </Button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {filteredNews.map((item, index) => (
              <div key={index} className="flex flex-col h-full bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
                <NewsCard news={item} />
                <div className="mt-auto p-3 sm:p-4">
                  <Link href={`/news/stocks/${item.id}`} className="block w-full">
                    <Button
                      variant="outline"
                      className="w-full text-xs sm:text-sm h-9 sm:h-10 bg-white dark:bg-gray-800 hover:bg-green-50 dark:hover:bg-green-900/20 text-green-600 dark:text-green-400 border-green-200 dark:border-green-800 hover:border-green-300 dark:hover:border-green-700"
                    >
                      Read More
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
