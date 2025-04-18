import { CryptoNews } from "@/types/crypto";
import Image from "next/image";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";

interface NewsCardProps {
  news: CryptoNews;
  compact?: boolean;
}

export function NewsCard({ news, compact = false }: NewsCardProps) {
  // Format the published date as "X time ago"
  const timeAgo = formatDistanceToNow(new Date(news.publishedAt), { addSuffix: true });
  
  // Get sentiment color
  const sentimentColor = {
    positive: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
    negative: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
    neutral: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
  }[news.sentiment];

  // Get coin-specific colors
  const getCoinColor = (coin: string) => {
    const colors: Record<string, string> = {
      BTC: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400",
      ETH: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400",
      XRP: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
      ADA: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400",
      SOL: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
      DOT: "bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-400",
      DOGE: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
      AVAX: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
      MATIC: "bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-400",
      LINK: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
    };
    
    return colors[coin] || "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200";
  };

  if (compact) {
    return (
      <Link 
        href={news.url} 
        target="_blank" 
        rel="noopener noreferrer"
        className="block p-4 rounded-lg border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-md">
            <Image
              src={news.imageUrl}
              alt={news.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-medium text-primary-light dark:text-primary-dark line-clamp-2">
              {news.title}
            </h3>
            <div className="mt-1 flex items-center text-xs text-gray-500 dark:text-gray-400">
              <span>{news.source}</span>
              <span className="mx-1">•</span>
              <span>{timeAgo}</span>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm h-full">
      <div className="relative h-48 w-full">
        <Image
          src={news.imageUrl}
          alt={news.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-5">
        <div className="flex items-center gap-2 mb-3">
          <span className={`text-xs px-2 py-1 rounded-full ${sentimentColor}`}>
            {news.sentiment.charAt(0).toUpperCase() + news.sentiment.slice(1)}
          </span>
          {news.relatedCoins.length > 0 && (
            <div className="flex gap-1 overflow-x-auto">
              {news.relatedCoins.slice(0, 3).map((coin) => (
                <Link
                  key={coin}
                  href={`/market/crypto/${coin.toLowerCase()}`}
                  className={`text-xs px-2 py-1 rounded-full ${getCoinColor(coin)} hover:opacity-80 transition-opacity`}
                >
                  {coin}
                </Link>
              ))}
              {news.relatedCoins.length > 3 && (
                <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200">
                  +{news.relatedCoins.length - 3}
                </span>
              )}
            </div>
          )}
        </div>
        <h3 className="text-lg font-semibold mb-2 text-primary-light dark:text-primary-dark">
          {news.title}
        </h3>
        <p className="text-secondary-light dark:text-secondary-dark text-sm mb-4 line-clamp-2">
          {news.summary}
        </p>
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {news.source} • {timeAgo}
          </div>
        </div>
      </div>
    </div>
  );
}