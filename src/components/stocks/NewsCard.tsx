import { StockNews } from "@/types/stock";
import Image from "next/image";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";

interface NewsCardProps {
  news: StockNews;
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
    <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm">
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
          {news.relatedSymbols.length > 0 && (
            <div className="flex gap-1 overflow-x-auto">
              {news.relatedSymbols.slice(0, 3).map((symbol) => (
                <Link
                  key={symbol}
                  href={`/market/stock/${symbol}`}
                  className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  {symbol}
                </Link>
              ))}
              {news.relatedSymbols.length > 3 && (
                <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200">
                  +{news.relatedSymbols.length - 3}
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
          <Link
            href={`/news/stocks/${news.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
          >
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
}