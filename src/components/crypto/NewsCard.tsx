// Next built in components
import Link from 'next/link';
import Image from 'next/image';
// Crypto news type
import { CryptoNews } from '@/types/crypto';

interface NewsCardProps {
  news: CryptoNews;
}

export function NewsCard({ news }: NewsCardProps) {
  // Format the date properly
  const formatDate = (dateString: string) => {
    try {
      // Handle API date format like "20250322T075238"
      if (dateString.includes('T') && !dateString.includes('-')) {
        const year = dateString.substring(0, 4);
        const month = dateString.substring(4, 6);
        const day = dateString.substring(6, 8);
        const time = dateString.substring(9);
        
        const formattedDate = `${year}-${month}-${day}T${time}`;
        const date = new Date(formattedDate);
        
        return date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        });
      }
      
      // Handle ISO date strings
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch (error) {
      // Fallback if date parsing fails
      return dateString;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      <div className="h-48 relative">
        <Image 
          src={news.image} 
          alt={news.title} 
          fill 
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={false}
        />
        <div className="absolute top-0 left-0 bg-blue-600 text-white text-xs px-2 py-1 m-2 rounded-br rounded-tl">
          {news.category}
        </div>
      </div>
      <div className="p-4">
        <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
          {formatDate(news.date)}
        </div>
        <h3 className="font-bold text-lg mb-2 text-black dark:text-white line-clamp-2">
          {news.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
          {news.excerpt}
        </p>
        <Link
          href={`/news/crypto/${news.id}`}
          className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline"
        >
          Read More →
        </Link>
      </div>
    </div>
  );
}