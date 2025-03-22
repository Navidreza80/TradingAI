import React from 'react';
import Link from 'next/link';

interface ForexMultimedia {
  id: number;
  title: string;
  type: "video" | "podcast";
  thumbnail: string;
  duration: string;
  author: string;
}

interface MultimediaCardProps {
  media: ForexMultimedia;
}

export function MultimediaCard({ media }: MultimediaCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      <div className="h-40 relative">
        <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
          <span className="text-gray-400">Image Placeholder</span>
          {/* Uncomment when you have actual images */}
          {/* <Image 
            src={media.thumbnail} 
            alt={media.title} 
            fill 
            className="object-cover"
          /> */}
        </div>
        <div className="absolute bottom-0 right-0 bg-black/70 text-white text-xs px-2 py-1 m-2 rounded">
          {media.duration}
        </div>
        <div className="absolute top-0 left-0 bg-blue-600 text-white text-xs px-2 py-1 m-2 rounded-br rounded-tl">
          {media.type === "video" ? "Video" : "Podcast"}
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg mb-1 text-black dark:text-white">
          {media.title}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
          By {media.author}
        </p>
        <Link
          href={`/learn/forex/${media.type}/${media.id}`}
          className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline"
        >
          {media.type === "video" ? "Watch Now" : "Listen Now"}
        </Link>
      </div>
    </div>
  );
}