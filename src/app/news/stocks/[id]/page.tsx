"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { formatDistanceToNow, format } from "date-fns";
import { ArrowLeft, Share2, Bookmark, Eye } from "lucide-react";
import { Button } from "@/components/UI/Button";
import { getStockNewsById } from "@/services/stockNewsService";
import { StockNews } from "@/types/stock";
import { NewsCard } from "@/components/stocks/NewsCard";
import { Skeleton } from "@/components/UI/skeleton";

export default function StockNewsDetailPage() {
  const params = useParams();
  const newsId = params.id as string;
  
  const [news, setNews] = useState<StockNews | null>(null);
  const [relatedNews, setRelatedNews] = useState<StockNews[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchNewsDetail() {
      try {
        setLoading(true);
        const newsData = await getStockNewsById(newsId);
        setNews(newsData);
        
        // Fetch related news based on the symbols
        if (newsData && newsData.relatedSymbols.length > 0) {
          const symbol = newsData.relatedSymbols[0];
          const related = await getStockNewsBySymbol(symbol, 3);
          setRelatedNews(related.filter(item => item.id !== newsId));
        }
        
        setError(null);
      } catch (err) {
        console.error("Failed to fetch news detail:", err);
        setError("Failed to load the news article. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    if (newsId) {
      fetchNewsDetail();
    }
  }, [newsId]);

  // Format the published date
  const formattedDate = news ? format(new Date(news.publishedAt), "MMMM d, yyyy") : "";
  const timeAgo = news ? formatDistanceToNow(new Date(news.publishedAt), { addSuffix: true }) : "";

  // Get sentiment color
  const getSentimentColor = (sentiment: string) => {
    return {
      positive: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
      negative: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
      neutral: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
    }[sentiment];
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-24">
        <div className="max-w-4xl mx-auto">
          <Skeleton className="h-8 w-3/4 mb-4" />
          <div className="flex items-center gap-4 mb-6">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-6 w-24" />
          </div>
          <Skeleton className="h-96 w-full mb-8" />
          <Skeleton className="h-6 w-full mb-4" />
          <Skeleton className="h-6 w-full mb-4" />
          <Skeleton className="h-6 w-3/4 mb-8" />
          <Skeleton className="h-6 w-full mb-4" />
          <Skeleton className="h-6 w-full mb-4" />
          <Skeleton className="h-6 w-5/6 mb-4" />
        </div>
      </div>
    );
  }

  if (error || !news) {
    return (
      <div className="container mx-auto px-4 py-24">
        <div className="max-w-4xl mx-auto">
          <div className="bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Error</h2>
            <p>{error || "News article not found"}</p>
            <Link href="/news/stocks">
              <Button className="mt-4">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Stock News
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-24">
      <div className="max-w-4xl mx-auto">
        {/* Back button */}
        <Link href="/news/stocks" className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Stock News
        </Link>

        {/* Article header */}
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
          {news.title}
        </h1>

        <div className="flex flex-wrap items-center gap-3 mb-6">
          <div className="text-gray-600 dark:text-gray-400 flex items-center">
            <span className="font-medium text-gray-900 dark:text-gray-200 mr-1">Source:</span> 
            {news.source}
          </div>
          <div className="text-gray-500 dark:text-gray-400">•</div>
          <div className="text-gray-600 dark:text-gray-400">
            {formattedDate} ({timeAgo})
          </div>
          {news.sentiment && (
            <>
              <div className="text-gray-500 dark:text-gray-400">•</div>
              <span className={`text-xs px-2 py-1 rounded-full ${getSentimentColor(news.sentiment)}`}>
                {news.sentiment.charAt(0).toUpperCase() + news.sentiment.slice(1)}
              </span>
            </>
          )}
        </div>

        {/* Related symbols */}
        {news.relatedSymbols && news.relatedSymbols.length > 0 && (
          <div className="mb-6">
            <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Related Stocks:</div>
            <div className="flex flex-wrap gap-2">
              {news.relatedSymbols.map(symbol => (
                <Link 
                  key={symbol} 
                  href={`/market/stock/${symbol}`}
                  className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  {symbol}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Featured image */}
        <div className="relative w-full h-96 mb-8 rounded-xl overflow-hidden">
          <Image
            src={news.imageUrl}
            alt={news.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Article content */}
        <div className="prose prose-lg max-w-none dark:prose-invert mb-8">
          <p className="text-xl text-gray-700 dark:text-gray-300 mb-6">
            {news.summary}
          </p>
          
          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg mb-6">
            <p className="italic text-gray-600 dark:text-gray-300">
              This is a summary of the original article. To read the full article, please visit the source website.
            </p>
            <a 
              href={news.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
            >
              <Eye className="mr-2 h-4 w-4" />
              Read Full Article on {news.source}
            </a>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex justify-between items-center border-t border-b border-gray-200 dark:border-gray-800 py-4 mb-8">
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex items-center">
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
            <Button variant="outline" size="sm" className="flex items-center">
              <Bookmark className="mr-2 h-4 w-4" />
              Save
            </Button>
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Published on {formattedDate}
          </div>
        </div>

        {/* Related news */}
        {relatedNews.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Related News</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedNews.map(item => (
                <NewsCard key={item.id} news={item} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Helper function to get news by symbol (imported from stockNewsService)
async function getStockNewsBySymbol(symbol: string, limit: number = 3): Promise<StockNews[]> {
  // This is a temporary implementation until we update the service
  const allNews = await getStockNewsById('dummy'); // This will return all news
  return allNews.filter(news => 
    news.relatedSymbols.includes(symbol) || 
    news.title.includes(symbol) || 
    news.summary.includes(symbol)
  ).slice(0, limit);
}