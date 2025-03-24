"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export function MultimediaSection() {
  const multimedia = [
    {
      id: 1,
      title: "Understanding Commodity Market Fundamentals",
      type: "video",
      thumbnail: "https://images.unsplash.com/photo-1610375461369-d613b564f4c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      duration: "18:45",
      author: "Sarah Johnson"
    },
    {
      id: 2,
      title: "Technical Analysis for Commodity Trading",
      type: "video",
      thumbnail: "https://images.unsplash.com/photo-1605801407838-b78f78d0c544?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      duration: "24:10",
      author: "Michael Chen"
    },
    {
      id: 3,
      title: "Weekly Commodities Market Recap",
      type: "podcast",
      thumbnail: "https://images.unsplash.com/photo-1624365169198-f1631dbc41ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      duration: "32:15",
      author: "Trading AI Team"
    },
    {
      id: 4,
      title: "Investing in Precious Metals: A Complete Guide",
      type: "video",
      thumbnail: "https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      duration: "21:30",
      author: "Robert Greene"
    }
  ];

  const [imageErrors, setImageErrors] = React.useState<Record<number, boolean>>({});

  const handleImageError = (id: number) => {
    setImageErrors(prev => ({ ...prev, [id]: true }));
  };

  return (
    <section className="mb-16">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold flex items-center text-black dark:text-white">
          <span className="bg-amber-100 dark:bg-amber-900 text-amber-600 dark:text-amber-300 p-2 rounded-lg mr-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
          </span>
          Featured Content
        </h2>
        <Link
          href="/learn/commodities/multimedia"
          className="text-amber-500 hover:text-amber-700 flex items-center group"
        >
          View All Videos
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 ml-1 group-hover:translate-x-1 transition-transform"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {multimedia.map((media) => (
          <div key={media.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <div className="h-40 relative">
              {!imageErrors[media.id] ? (
                <Image 
                  src={media.thumbnail} 
                  alt={media.title} 
                  fill 
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  onError={() => handleImageError(media.id)}
                />
              ) : (
                <div className="w-full h-full bg-amber-100 dark:bg-amber-900 flex items-center justify-center">
                  <span className="text-amber-600 dark:text-amber-300 text-2xl font-bold">
                    {media.type === 'video' ? 'V' : 'P'}
                  </span>
                </div>
              )}
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-white bg-opacity-80 flex items-center justify-center">
                  {media.type === 'video' ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-amber-600"
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
                      className="h-6 w-6 text-amber-600"
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
                href={`/learn/commodities/multimedia/${media.id}`}
                className="text-amber-600 dark:text-amber-400 text-sm font-medium hover:underline"
              >
                {media.type === 'video' ? 'Watch Now' : 'Listen Now'} →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}