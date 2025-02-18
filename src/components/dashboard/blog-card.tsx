"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import Link from "next/link";
import {
  MagnifyingGlassIcon,
  ChatBubbleLeftIcon,
  HandThumbUpIcon,
  HandThumbDownIcon,
  BookmarkIcon,
} from "@heroicons/react/24/outline";
import {
  HeartIcon as HeartIconSolid,
  BookmarkIcon as BookmarkIconSolid,
} from "@heroicons/react/24/solid";

export default function BlogCard({ blog }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="flex"
    >
      <motion.div
        key={blog.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative group"
      >
        <div className="cursor-pointer w-full">
          <div
            className="relative z-10 rounded-2xl overflow-hidden
                dark:border-white/10 border-black/5 border
                backdrop-blur-xl 
                dark:bg-white/5 bg-white/80"
          >
            {/* Thumbnail */}
            <div className="relative h-48 w-full">
              <Image
                src={blog.thumbnail}
                alt={blog.title}
                fill
                className="object-cover"
              />
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Author Info */}
              <div className="flex items-center gap-3 mb-4">
                <Image
                  src={blog.author.avatar}
                  alt={blog.author.name}
                  width={32}
                  height={32}
                  className="rounded-full"
                />
                <div>
                  <p
                    className={`text-sm font-medium dark:text-white text-gray-900
                         
                        `}
                  >
                    {blog.author.name}
                  </p>
                  <p className="text-xs dark:text-gray-400 text-gray-600">
                    {new Date(blog.date).toLocaleDateString()} · {blog.readTime}{" "}
                    min read
                  </p>
                </div>
              </div>

              {/* Title & Description */}
              <h3
                className={`text-xl font-bold mb-2 dark:text-white text-gray-900
                     
                    `}
              >
                {blog.title}
              </h3>
              <p
                className={`text-sm dark:text-gray-400 text-gray-600 mb-4 line-clamp-2
                     
                    `}
              >
                {blog.description}
              </p>

              {/* Interaction Buttons */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {/* Like Button */}
                  <button className="flex items-center gap-1 text-sm">
                    <HandThumbUpIcon
                      className={`w-5 h-5 transition-colors duration-200
                            ${
                              blog.isLiked
                                ? "text-[#1890ff]"
                                : "dark:text-gray-400 text-gray-600"
                            }`}
                    />
                    <span className="dark:text-gray-400 text-gray-600">
                      {blog.likes}
                    </span>
                  </button>

                  {/* Dislike Button */}
                  <button className="flex items-center gap-1 text-sm">
                    <HandThumbDownIcon
                      className={`w-5 h-5 transition-colors duration-200
                            ${
                              blog.isDisliked
                                ? "text-red-500"
                                : "dark:text-gray-400 text-gray-600"
                            }`}
                    />
                    <span className="dark:text-gray-400 text-gray-600">
                      {blog.dislikes}
                    </span>
                  </button>

                  {/* Comments */}
                  <div className="flex items-center gap-1 text-sm">
                    <ChatBubbleLeftIcon className="w-5 h-5 dark:text-gray-400 text-gray-600" />
                    <span className="dark:text-gray-400 text-gray-600">
                      {blog.comments}
                    </span>
                  </div>
                </div>

                {/* Favorite Button */}
                <button className="flex items-center gap-1 text-sm">
                  {blog.isFavorite ? (
                    <BookmarkIconSolid className="w-5 h-5 text-[#1890ff]" />
                  ) : (
                    <BookmarkIcon className="w-5 h-5 dark:text-gray-400 text-gray-600" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
