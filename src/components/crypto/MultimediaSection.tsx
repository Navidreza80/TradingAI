"use client"

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { MultimediaCard } from './MultimediaCard';
import { CryptoMultimedia } from '@/types/crypto';
import { getMultimediaContent } from '@/services/cryptoMultimediaService';

export function MultimediaSection() {
  const [activeTab, setActiveTab] = useState("all");
  const [multimedia, setMultimedia] = useState<CryptoMultimedia[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMultimedia() {
      try {
        const data = await getMultimediaContent(4);
        setMultimedia(data);
      } catch (error) {
        console.error("Failed to load multimedia content:", error);
      } finally {
        setLoading(false);
      }
    }

    loadMultimedia();
  }, []);

  const filteredMultimedia = multimedia.filter(item => {
    if (activeTab === "all") return true;
    return item.type === activeTab;
  });

  return (
    <section className="mb-16">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold flex items-center text-black dark:text-white">
          <span className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 p-2 rounded-lg mr-3">
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
          Multimedia Content
        </h2>
        <Link
          href="/learn/crypto/multimedia"
          className="text-blue-500 hover:text-blue-700 flex items-center group"
        >
          View All Content
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
      <div className="mb-6">
        <div className="flex space-x-4 border-b border-gray-200 dark:border-gray-700 mb-6">
          <button
            onClick={() => setActiveTab("all")}
            className={`py-2 px-4 font-medium ${
              activeTab === "all"
                ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400"
                : "text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setActiveTab("video")}
            className={`py-2 px-4 font-medium ${
              activeTab === "video"
                ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400"
                : "text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
            }`}
          >
            Videos
          </button>
          <button
            onClick={() => setActiveTab("podcast")}
            className={`py-2 px-4 font-medium ${
              activeTab === "podcast"
                ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400"
                : "text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
            }`}
          >
            Podcasts
          </button>
        </div>
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="bg-gray-200 dark:bg-gray-700 rounded-lg h-64 animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredMultimedia.map((item) => (
              <MultimediaCard key={item.id} media={item} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}