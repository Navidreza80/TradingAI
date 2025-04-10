"use client";

import { NewsCard } from "@/components/stocks/NewsCard";
import { Button } from "@/components/UI/Button";
import { Input } from "@/components/UI/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/UI/tabs";
import { getStockNews } from "@/services/stockNewsService";
import { StockNews } from "@/types/stock";
import { Filter, Search } from "lucide-react";
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
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
          Stock Market News
        </h1>

        <div className="mb-8">
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400" />
            <Input
              type="text"
              placeholder="Search news by title, content, or stock symbol..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <Tabs
            defaultValue="all"
            value={activeTab}
            onValueChange={setActiveTab}
          >
            <div className="flex justify-between items-center">
              <TabsList>
                <TabsTrigger value="all">All News</TabsTrigger>
                <TabsTrigger value="positive">Positive</TabsTrigger>
                <TabsTrigger value="negative">Negative</TabsTrigger>
                <TabsTrigger value="neutral">Neutral</TabsTrigger>
              </TabsList>

              <Button variant="outline" size="sm" className="flex items-center">
                <Filter className="mr-2 h-4 w-4" />
                More Filters
              </Button>
            </div>
          </Tabs>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
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
          <div className="bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200 p-6 rounded-lg">
            <p>{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 text-sm font-medium underline"
            >
              Try refreshing the page
            </button>
          </div>
        ) : filteredNews.length === 0 ? (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            <p className="text-xl mb-2">No news articles found</p>
            <p>Try adjusting your search or filters</p>
            {searchQuery && (
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => setSearchQuery("")}
              >
                Clear Search
              </Button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNews.map((item) => (
              <div key={item.id} className="flex flex-col h-full">
                <NewsCard news={item} />
                <div className="mt-4 text-center">
                  <Link href={`/news/stocks/${item.id}`}>
                    <Button variant="outline" className="w-full">
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
