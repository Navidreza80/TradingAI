'use client'

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import Link from 'next/link';
import {
  MagnifyingGlassIcon,
  HeartIcon,
  ChatBubbleLeftIcon,
  HandThumbUpIcon,
  HandThumbDownIcon,
  BookmarkIcon
} from '@heroicons/react/24/outline';
import {
  HeartIcon as HeartIconSolid,
  BookmarkIcon as BookmarkIconSolid
} from '@heroicons/react/24/solid';

interface NewPost {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  category:string;
  likes: number;
  dislikes: number;
  comments: number;
  isLiked: boolean;
  isDisliked: boolean;
  isFavorite: boolean;
  date: Date;
  readTime: number;
  author: {
    name: string;
    avatar: string;
  };
}

export default function NewsPage() {
  const { t, i18n } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [news, setNews] = useState<NewPost[]>([
    {
      id: 1,
      title: 'oh,trump forokhting his bitcoins',
      description: 'trump forokhted his bitcoin and kharided gholiCoin',
      thumbnail: '/image/trade.png',
      category: 'BTC',
      likes: 73463489,
      dislikes: 0,
      comments: 33657,
      isLiked: false,
      isDisliked: false,
      isFavorite: false,
      date: new Date('2025-11-02'),
      readTime: 8,
      author: {
        name: 'Gholi Tabar',
        avatar: '/image/8b167af653c2399dd93b952a48740620.jpg'
      }
    },
    // ... اضافه کردن بلاگ‌های بیشتر
  ]);

  const filteredNews = news.filter(New =>
    New.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleLike = (NewId: number) => {
    setNews(news.map(New => {
      if (New.id === NewId) {
        if (New.isLiked) {
          return { ...New, isLiked: false, likes: New.likes - 1 };
        } else {
          if (New.isDisliked) {
            return {
              ...New,
              isLiked: true,
              isDisliked: false,
              likes: New.likes + 1,
              dislikes: New.dislikes - 1
            };
          }
          return { ...New, isLiked: true, likes: New.likes + 1 };
        }
      }
      return New;
    }));
  };

  const handleDislike = (NewId: number) => {
    setNews(news.map(New => {
      if (New.id === NewId) {
        if (New.isDisliked) {
          return { ...New, isDisliked: false, dislikes: New.dislikes - 1 };
        } else {
          if (New.isLiked) {
            return {
              ...New,
              isDisliked: true,
              isLiked: false,
              dislikes: New.dislikes + 1,
              likes: New.likes - 1
            };
          }
          return { ...New, isDisliked: true, dislikes: New.dislikes + 1 };
        }
      }
      return New;
    }));
  };

  const handleFavorite = (NewId: number) => {
    setNews(news.map(New => {
      if (New.id === NewId) {
        return { ...New, isFavorite: !New.isFavorite };
      }
      return New;
    }));
  };

  return (
    <main className="min-h-screen bg-gradient-to-b dark:from-[#0a0a0a] dark:to-[#1a1a1a] from-white to-gray-50 pt-24 pb-12">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className={`text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 p-2
            bg-gradient-to-r dark:from-white dark:to-gray-400 from-gray-900 to-gray-600 
            bg-clip-text text-transparent 
            ${i18n.language === 'fa' ? 'font-vazirmatn' : ''} 
            ${i18n.language === 'ar' ? 'font-notokufi' : ''}`}>
            {t('blogs.title')}
          </h1>
          <p className={`text-lg dark:text-gray-400 text-gray-600 max-w-3xl mx-auto p-2
            ${i18n.language === 'fa' ? 'font-vazirmatn' : ''} 
            ${i18n.language === 'ar' ? 'font-notokufi' : ''}`}>
            {t('blogs.subtitle')}
          </p>
        </motion.div>

        {/* Search Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-12"
        >
          <div className="relative max-w-2xl mx-auto">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('blogs.searchPlaceholder')}
              className={`w-full px-4 py-3 pl-12 rounded-xl
                dark:bg-white/5 bg-white
                dark:text-white text-gray-900
                dark:border-white/10 border-gray-200 border
                focus:outline-none focus:ring-2 focus:ring-[#1890ff]
                placeholder:dark:text-gray-500 placeholder:text-gray-400
                transition-all duration-200
                ${i18n.language === 'fa' ? 'font-vazirmatn' : ''} 
                ${i18n.language === 'ar' ? 'font-notokufi' : ''}`}
            />
            <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 dark:text-gray-400 text-gray-500" />
          </div>
        </motion.div>

        {/* Blogs Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredNews.map((New) => (
            <motion.div
              key={New.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="relative group"
            >
              <Link href={`/News/${New.id}`}>
                <div className="cursor-pointer w-full">
                  <div className="relative z-10 rounded-2xl overflow-hidden
                dark:border-white/10 border-black/5 border
                backdrop-blur-xl 
                dark:bg-white/5 bg-white/80
                dark:hover:bg-white/10 hover:bg-white/90
                transition-all duration-300 hover:scale-[1.02]
                dark:hover:shadow-[0_0_30px_rgba(24,144,255,0.1)]
                hover:shadow-[0_0_30px_rgba(24,144,255,0.2)]">

                    {/* Thumbnail */}
                    <div className="relative h-48 w-full">
                      <Image
                        src={New.thumbnail}
                        alt={New.title}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      {/* Author Info */}
                      <div className="flex items-center gap-3 mb-4">
                        <Image
                          src={New.author.avatar}
                          alt={New.author.name}
                          width={32}
                          height={32}
                          className="rounded-full"
                        />
                        <div>
                          <p className={`text-sm font-medium dark:text-white text-gray-900
                        ${i18n.language === 'fa' ? 'font-vazirmatn' : ''} 
                        ${i18n.language === 'ar' ? 'font-notokufi' : ''}`}>
                            {New.author.name}
                          </p>
                          <p className="text-xs dark:text-gray-400 text-gray-600">
                            {new Date(New.date).toLocaleDateString()} · {New.readTime} min read
                          </p>
                        </div>
                      </div>

                      {/* Title & Description */}
                      <h3 className={`text-xl font-bold mb-2 dark:text-white text-gray-900
                    ${i18n.language === 'fa' ? 'font-vazirmatn' : ''} 
                    ${i18n.language === 'ar' ? 'font-notokufi' : ''}`}>
                        {New.title}
                      </h3>
                      <p className={`text-sm dark:text-gray-400 text-gray-600 mb-4 line-clamp-2
                    ${i18n.language === 'fa' ? 'font-vazirmatn' : ''} 
                    ${i18n.language === 'ar' ? 'font-notokufi' : ''}`}>
                        {New.description}
                      </p>

                      {/* Interaction Buttons */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          {/* Like Button */}
                          <button
                            onClick={() => handleLike(New.id)}
                            className="flex items-center gap-1 text-sm"
                          >
                            <HandThumbUpIcon
                              className={`w-5 h-5 transition-colors duration-200
                            ${New.isLiked
                                  ? 'text-[#1890ff]'
                                  : 'dark:text-gray-400 text-gray-600'}`}
                            />
                            <span className="dark:text-gray-400 text-gray-600">
                              {New.likes}
                            </span>
                          </button>

                          {/* Dislike Button */}
                          <button
                            onClick={() => handleDislike(New.id)}
                            className="flex items-center gap-1 text-sm"
                          >
                            <HandThumbDownIcon
                              className={`w-5 h-5 transition-colors duration-200
                            ${New.isDisliked
                                  ? 'text-red-500'
                                  : 'dark:text-gray-400 text-gray-600'}`}
                            />
                            <span className="dark:text-gray-400 text-gray-600">
                              {New.dislikes}
                            </span>
                          </button>

                          {/* Comments */}
                          <div className="flex items-center gap-1 text-sm">
                            <ChatBubbleLeftIcon className="w-5 h-5 dark:text-gray-400 text-gray-600" />
                            <span className="dark:text-gray-400 text-gray-600">
                              {New.comments}
                            </span>
                          </div>
                        </div>

                        {/* Favorite Button */}
                        <button
                          onClick={() => handleFavorite(New.id)}
                          className="flex items-center gap-1 text-sm"
                        >
                          {New.isFavorite ? (
                            <BookmarkIconSolid className="w-5 h-5 text-[#1890ff]" />
                          ) : (
                            <BookmarkIcon className="w-5 h-5 dark:text-gray-400 text-gray-600" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </main>
  );
}





























