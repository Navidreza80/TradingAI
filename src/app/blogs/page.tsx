"use client";
// Server actions
import { fetchBlogs } from "@/actions/blog.action";
// Third party components
import BlogCard from "@/components/blog-card";
import SearchBlogs from "@/components/blog-search";
import BlogCardSkeleton from "@/components/blogs/BlogSkeleton";
// Types
import { Blog } from "@/types/blog";
// Icons
// Framer motion for animation
import { motion } from "framer-motion";
// React built in hooks
import { useEffect, useState } from "react";
// i18n for translation
import { useTranslation } from "react-i18next";

export default function BlogsPage() {
  // i18n hooks for translation
  const { t } = useTranslation();
  // Search query state for searching through blogs
  const [searchQuery, setSearchQuery] = useState("");
  // Save blogs in state variable
  const [blogs, setBlogs] = useState<Blog[]>([]);
  // Fetching blogs function
  const fetch = async (): Promise<void> => {
    const blogs = await fetchBlogs();
    console.log(blogs);
    setBlogs(blogs);
  };
  // Callback function to fetch blogs at the mounting
  useEffect(() => {
    fetch();
  }, []);
  // Function to search through blogs
  const filteredBlogs = blogs.length > 0 && blogs.filter((blog) =>
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
          <h1
            className={`text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 p-2
            bg-gradient-to-r dark:from-white dark:to-gray-400 from-gray-900 to-gray-600 
            bg-clip-text text-transparent 
             
            `}
          >
            {t("blogs.title")}
          </h1>
          <p
            className={`text-lg dark:text-gray-400 text-gray-600 max-w-3xl mx-auto p-2
             
            `}
          >
            {t("blogs.subtitle")}
          </p>
        </motion.div>

        {/* Search Section */}
        <SearchBlogs searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

        {/* Blogs Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredBlogs.length > 0 ? filteredBlogs.map((blog, index) => (<BlogCard key={index} blog={blog} />)) :  Array.from({ length: 6 }).map((_, index) => <BlogCardSkeleton key={index} />)}
        </motion.div>
      </div>
    </main>
  );
}
