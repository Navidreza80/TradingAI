/* eslint-disable */
"use client";

import { Button } from "@/components/UI/Button";
import { Card, CardContent } from "@/components/UI/card";
import { Skeleton } from "@/components/UI/skeleton";
import { getFallbackNews } from "@/services/newsService";
import { ArrowLeft, Calendar, Clock, ExternalLink, Share2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface ForexNews {
  id: string;
  title: string;
  summary: string;
  content?: string;
  url: string;
  imageUrl: string;
  source: string;
  publishedAt: string;
  category?: string;
}

export default function NewsDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [news, setNews] = useState<ForexNews | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const newsId = params.id as string;

  useEffect(() => {
    const fetchNewsDetail = async () => {
      setLoading(true);
      
      try {
        // First try to fetch from Finnhub API
        const apiKey = process.env.NEXT_PUBLIC_FINNHUB_API_KEY || 'cvrljf9r01qnpem87dsgcvrljf9r01qnpem87dt0';
        const response = await fetch(
          `https://finnhub.io/api/v1/news?category=forex&token=${apiKey}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch news from Finnhub");
        }

        const data = await response.json();
        
        // Find the news item with matching ID or similar title
        const finnhubNews = data.find((item: any) => 
          item.id.toString() === newsId || 
          item.headline?.toLowerCase().includes(newsId.toLowerCase())
        );
        
        if (finnhubNews) {
          setNews({
            id: finnhubNews.id.toString(),
            title: finnhubNews.headline,
            summary: finnhubNews.summary,
            content: finnhubNews.summary + "\n\n" + (finnhubNews.content || ""),
            url: finnhubNews.url,
            imageUrl: finnhubNews.image || "/images/forex-analysis.jpg",
            source: finnhubNews.source,
            publishedAt: new Date(finnhubNews.datetime * 1000).toISOString(),
            category: finnhubNews.category || "Forex"
          });
        } else {
          // If specific news not found in API response, use the first forex news item
          if (data.length > 0) {
            const latestNews = data[0];
            setNews({
              id: latestNews.id.toString(),
              title: latestNews.headline,
              summary: latestNews.summary,
              content: latestNews.summary + "\n\n" + (latestNews.content || ""),
              url: latestNews.url,
              imageUrl: latestNews.image || "/images/forex-analysis.jpg",
              source: latestNews.source,
              publishedAt: new Date(latestNews.datetime * 1000).toISOString(),
              category: latestNews.category || "Forex"
            });
          } else {
            throw new Error("No forex news available from Finnhub");
          }
        }
      } catch (err) {
        console.error("Error fetching news from Finnhub:", err);
        
        // Fallback to mock data if API fails
        try {
          const fallbackNews = await getFallbackNews(20);
          const newsItem = fallbackNews.find(item => item.id === newsId);
          
          if (newsItem) {
            // Found the news item in fallback data
            setNews({
              ...newsItem,
              content: `${newsItem.summary}\n\nThe foreign exchange market (Forex, FX, or currency market) is a global decentralized market for the trading of currencies. This market determines foreign exchange rates for every currency. It includes all aspects of buying, selling and exchanging currencies at current or determined prices.\n\nTraders in the forex market include governments, central banks, commercial banks, investment firms, hedge funds, retail brokers, and individual investors. The forex market is considered the largest financial market in the world, with a daily trading volume exceeding $6 trillion.\n\nThis particular news highlights important developments that could impact currency valuations and trading strategies in the coming days. Traders should monitor these events closely and adjust their positions accordingly.`
            });
          } else {
            // Create a default news item if the specific ID isn't found
            setNews({
              id: newsId,
              title: "Currency Market Analysis and Forecast",
              summary: "Latest developments in the foreign exchange market and their potential impact on major currency pairs.",
              content: "The foreign exchange market (Forex, FX, or currency market) is a global decentralized market for the trading of currencies. This market determines foreign exchange rates for every currency. It includes all aspects of buying, selling and exchanging currencies at current or determined prices.\n\nTraders in the forex market include governments, central banks, commercial banks, investment firms, hedge funds, retail brokers, and individual investors. The forex market is considered the largest financial market in the world, with a daily trading volume exceeding $6 trillion.\n\nRecent economic data releases have shown mixed signals across major economies. The US dollar has been fluctuating against major currencies as traders assess the Federal Reserve's next policy moves. Meanwhile, the Euro and British Pound face their own challenges amid varying economic performance across European nations.\n\nTechnical analysis suggests key support and resistance levels for major pairs that traders should watch closely in the coming sessions. Fundamental factors including central bank decisions, inflation data, and geopolitical developments will likely drive market sentiment in the near term.",
              url: "https://example.com/forex-market-analysis",
              imageUrl: "/images/forex-analysis.jpg",
              source: "Trading AI Analysis",
              publishedAt: new Date().toISOString(),
              category: "Analysis"
            });
          }
        } catch (fallbackErr) {
          console.error("Error fetching fallback news:", fallbackErr);
          setError("Unable to load the news article. Please try again later.");
        }
      } finally {
        setLoading(false);
      }
    };

    if (newsId) {
      fetchNewsDetail();
    }
  }, [newsId]);

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (e) {
      return "Recent";
    }
  };

  const formatTime = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (e) {
      return "";
    }
  };

  // Loading state with skeleton UI
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 md:py-24">
        <div className="max-w-4xl mx-auto">
          <Button 
            variant="ghost" 
            className="mb-6 hover:bg-gray-100 dark:hover:bg-gray-800"
            onClick={() => router.back()}
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to News
          </Button>
          
          <Skeleton className="h-10 w-3/4 mb-4" />
          <div className="flex flex-wrap items-center mb-6 gap-4">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-5 w-40" />
          </div>
          
          <Skeleton className="h-[400px] w-full mb-8 rounded-xl" />
          
          <Skeleton className="h-6 w-full mb-4" />
          <Skeleton className="h-6 w-5/6 mb-8" />
          
          <div className="space-y-4">
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-5/6" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-4/5" />
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !news) {
    return (
      <div className="container mx-auto px-4 py-12 md:py-24">
        <div className="max-w-4xl mx-auto">
          <Button 
            variant="ghost" 
            className="mb-6 hover:bg-gray-100 dark:hover:bg-gray-800"
            onClick={() => router.back()}
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to News
          </Button>
          
          <Card>
            <CardContent className="pt-6">
              <div className="bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200 p-8 rounded-lg text-center">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-12 w-12 mx-auto mb-4 text-red-500 dark:text-red-400" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
                  />
                </svg>
                <h2 className="text-2xl font-bold mb-3">News Article Not Found</h2>
                <p className="mb-6 text-lg">{error || "The requested news article could not be found."}</p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Button 
                    onClick={() => router.push('/market/forex')}
                    className="bg-red-600 hover:bg-red-700 text-white"
                  >
                    Browse All News
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => router.back()}
                    className="border-red-600 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                  >
                    Go Back
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Success state - display news
  return (
    <div className="container mx-auto px-4 py-12 md:py-24">
      <div className="max-w-4xl mx-auto">
        <Button 
          variant="ghost" 
          className="mb-6 hover:bg-gray-100 dark:hover:bg-gray-800 group"
          onClick={() => router.back()}
        >
          <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" /> 
          Back to News
        </Button>
        
        {/* Category badge */}
        {news.category && (
          <div className="mb-4">
            <span className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 text-xs font-medium px-2.5 py-1 rounded">
              {news.category}
            </span>
          </div>
        )}
        
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white leading-tight">
          {news.title}
        </h1>
        
        <div className="flex flex-wrap items-center text-sm text-gray-500 dark:text-gray-400 mb-8 gap-y-2 gap-x-6">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1.5" />
            {formatDate(news.publishedAt)}
          </div>
          {formatTime(news.publishedAt) && (
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1.5" />
              {formatTime(news.publishedAt)}
            </div>
          )}
          <div className="flex items-center">
            Source: <span className="font-medium ml-1">{news.source}</span>
          </div>
        </div>
        
        <div className="relative w-full h-[300px] md:h-[400px] mb-8 rounded-xl overflow-hidden shadow-lg">
          <Image
            src={news.imageUrl || "/images/forex-analysis.jpg"}
            alt={news.title}
            fill
            className="object-cover transition-transform hover:scale-105 duration-700"
            priority
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null; // Prevent infinite error loop
              target.src = "/images/forex-analysis.jpg";
            }}
          />
        </div>
        
        <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
          {news.summary && news.summary.includes('<p') ? (
            <div dangerouslySetInnerHTML={{ __html: news.summary }} className="text-xl font-medium mb-8 text-gray-700 dark:text-gray-300 leading-relaxed" />
          ) : (
            <p className="text-xl font-medium mb-8 text-gray-700 dark:text-gray-300 leading-relaxed">
              {news.summary}
            </p>
          )}
          
          {news.content && (
            <div 
              className="mt-6 text-gray-700 dark:text-gray-300 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: news.content }}
            />
          )}
        </div>
        
        <div className="flex flex-col sm:flex-row justify-between items-center border-t border-gray-200 dark:border-gray-700 pt-6 mt-8 gap-4">
          <Link 
            href={news.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Read Original Article
          </Link>
          
          <div className="flex gap-3">
            <Button variant="outline" size="sm" className="rounded-full">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
            
            <Button size="sm" className="rounded-full">
              Related News
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}