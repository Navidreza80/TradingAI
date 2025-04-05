"use client"
// Next built in components
import Link from 'next/link';
import Image from 'next/image';
// Crypto media type
import { CryptoMultimedia } from '@/types/crypto';

interface MultimediaCardProps {
  media: CryptoMultimedia;
}

export function MultimediaCard({ media }: MultimediaCardProps) {
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      <div className="h-40 relative">
        <Image 
          src={media.thumbnail} 
          alt={media.title} 
          fill 
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-white bg-opacity-80 flex items-center justify-center">
            {media.type === 'video' ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 010-7.072m12.728 0a9 9 0 010 12.728M3 9.728c.764-1.605 1.722-2.015 2.821-2.015 1.1 0 2.057.41 2.822 2.015"
                />
              </svg>
            )}
          </div>
        </div>
        <div className="absolute bottom-0 right-0 bg-black bg-opacity-70 text-white text-xs px-2 py-1 m-2 rounded-tl">
          {media.duration}
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2 text-black dark:text-white line-clamp-2">
          {media.title}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
          By {media.author}
        </p>
        <Link
          href={`/learn/crypto/multimedia/${media.id}`}
          className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline"
        >
          {media.type === 'video' ? 'Watch Now' : 'Listen Now'} →
        </Link>
      </div>
    </div>
  );
}