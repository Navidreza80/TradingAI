
'use client'

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import Link from 'next/link';
import {
  MagnifyingGlassIcon,
  ChatBubbleLeftIcon,
  HandThumbUpIcon,
  HandThumbDownIcon,
} from '@heroicons/react/24/outline';
import { fetchBlogs } from '@/actions/blog.action';
import { Blog } from '@/types/blog';


export default function BlogsPage() {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [blogs, setBlogs] = useState<Blog[]>([])
  const fetch = async (): Promise<void> => {
    const blogs: Blog[] = await fetchBlogs()
    setBlogs(blogs)
  }
  useEffect(() => {
    fetch()
  })
  const filteredBlogs = blogs.filter(blog =>
    blog.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
             
            `}>
            {t('blogs.title')}
          </h1>
          <p className={`text-lg dark:text-gray-400 text-gray-600 max-w-3xl mx-auto p-2
             
            `}>
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
                 
                `}
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
          {filteredBlogs.map((blog) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="relative group"
            >
              <Link href={`/blogs/${blog.id}`}>
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
                      {blog.blogThumbnail && <Image
                        src={blog.blogThumbnail}
                        alt={blog.title}
                        fill
                        className="object-cover"
                      />}
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      {/* Author Info */}
                      <div className="flex items-center gap-3 mb-4">
                        {blog.publisher.image &&<Image
                          src={blog.publisher.image}
                          alt={blog.publisher?.username}
                          width={32}
                          height={32}
                          className="rounded-full"
                        />}
                        <div>
                          <p className={`text-sm font-medium dark:text-white text-gray-900
                         
                        `}>
                            {blog.publisher.username}
                          </p>
                          <p className="text-xs dark:text-gray-400 text-gray-600">
                            {new Date(blog.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      {/* Title & Description */}
                      <h3 className={`text-xl font-bold mb-2 dark:text-white text-gray-900
                     
                    `}>
                        {blog.title}
                      </h3>
                      <p className={`text-sm dark:text-gray-400 text-gray-600 mb-4 line-clamp-2
                     
                    `}>
                        {blog.shortDescription}
                      </p>

                      {/* Interaction Buttons */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          {/* Like Button */}
                          <button
                            className="flex items-center gap-1 text-sm"
                          >
                            <HandThumbUpIcon
                              className={`w-5 h-5 transition-colors duration-200
                            ${blog.isLiked
                                  ? 'text-[#1890ff]'
                                  : 'dark:text-gray-400 text-gray-600'}`}
                            />
                            <span className="dark:text-gray-400 text-gray-600">
                              {blog.likes}
                            </span>
                          </button>

                          {/* Dislike Button */}
                          <button
                            className="flex items-center gap-1 text-sm"
                          >
                            <HandThumbDownIcon
                              className={`w-5 h-5 transition-colors duration-200
                            ${blog.isDisliked
                                  ? 'text-red-500'
                                  : 'dark:text-gray-400 text-gray-600'}`}
                            />
                            <span className="dark:text-gray-400 text-gray-600">
                              {blog.dislikes}
                            </span>
                          </button>

                          {/* Comments */}
                          <div className="flex items-center gap-1 text-sm">
                            <ChatBubbleLeftIcon className="w-5 h-5 dark:text-gray-400 text-gray-600" />
                            <span className="dark:text-gray-400 text-gray-600">{blog.comments?.length}
                            </span>
                          </div>
                        </div>
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