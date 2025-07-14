/* eslint-disable */
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getCryptoNewsById } from "@/services/cryptoNewsService";
import { formatDistanceToNow } from "date-fns";
import { Skeleton } from "@/components/UI/skeleton";
import { Button } from "@/components/UI/Button";
import { ArrowLeft, Calendar, ExternalLink, Share2 } from "lucide-react";

export default function CryptoNewsDetail() {
  const params = useParams();
  const router = useRouter();
  const [news, setNews] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchNewsDetail() {
      try {
        if (!params.id) {
          throw new Error("News ID is required");
        }
        
        setLoading(true);
        const newsData = await getCryptoNewsById(params.id as string);
        
        if (!newsData) {
          throw new Error("News article not found");
        }
        
        setNews(newsData);
        setError(null);
      } catch (err) {
        console.error("Error fetching news detail:", err);
        setError(err instanceof Error ? err.message : "Failed to load news article");
      } finally {
        setLoading(false);
      }
    }

    fetchNewsDetail();
  }, [params.id]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: news?.title || "Crypto News",
        text: news?.excerpt || "Check out this crypto news article",
        url: window.location.href,
      }).catch((err) => {
        console.error("Error sharing:", err);
      });
    } else {
      // Fallback for browsers that don't support the Web Share API
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <div className="flex-1 pt-24">
      <div className="container max-w-4xl mx-auto px-4 py-8">
        <Button
          variant="ghost"
          className="mb-6 flex items-center text-blue-600 hover:text-blue-800"
          onClick={() => router.back()}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to News
        </Button>

      {loading ? (
        <div>
          <Skeleton className="h-12 w-3/4 mb-4" />
          <div className="flex items-center mb-6">
            <Skeleton className="h-6 w-32 mr-4" />
            <Skeleton className="h-6 w-24" />
          </div>
          <Skeleton className="h-[400px] w-full mb-8" />
          <Skeleton className="h-6 w-full mb-4" />
          <Skeleton className="h-6 w-full mb-4" />
          <Skeleton className="h-6 w-3/4 mb-8" />
          <Skeleton className="h-6 w-full mb-4" />
          <Skeleton className="h-6 w-full mb-4" />
          <Skeleton className="h-6 w-5/6 mb-4" />
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-2">Error</h2>
          <p>{error}</p>
          <Button 
            className="mt-4"
            onClick={() => router.push("/news/crypto")}
          >
            Go to News List
          </Button>
        </div>
      ) : (
        <>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            {news?.title}
          </h1>
          
          <div className="flex flex-wrap items-center mb-6 text-gray-600 dark:text-gray-400">
            <div className="flex items-center mr-6 mb-2">
              <Calendar className="h-4 w-4 mr-2" />
              <span>
                {news?.date 
                  ? `${formatDistanceToNow(new Date(news.date))} ago` 
                  : "Recently published"}
              </span>
            </div>
            <div className="flex items-center mb-2">
              <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                {news?.category || "Cryptocurrency"}
              </span>
            </div>
          </div>
          
            <div className="relative h-[400px] w-full mb-8 rounded-xl overflow-hidden">
              <Image
                src={typeof news.image == "string" ? news.image : "/image/noImage.jpg"}
                alt={news.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          
          <div className="prose prose-lg max-w-none dark:prose-invert mb-8">
            <p className="text-lg leading-relaxed mb-6">
              {news?.excerpt || "No content available for this article."}
            </p>
            
            {news?.content && (
              <div dangerouslySetInnerHTML={{ __html: news.content }} />
            )}
            
            {news?.url && (
              <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p className="mb-2 font-medium">Read the full article:</p>
                <a 
                  href={news.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 flex items-center"
                >
                  {news.source || "Original Source"}
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </div>
            )}
          </div>
          
          <div className="flex justify-between items-center border-t border-gray-200 dark:border-gray-700 pt-6">
            <Button
              variant="outline"
              onClick={handleShare}
              className="flex items-center"
            >
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
            
            <Link href="/news/crypto">
              <Button variant="default">
                More Crypto News
              </Button>
            </Link>
          </div>
        </>
      )}
    </div>
    </div>
  );
}