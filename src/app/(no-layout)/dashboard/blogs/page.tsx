"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import YourBlogCard from "@/components/dashboard/your-blog-card";
import { Blog } from "@/types/blog";
import {
  fetchDislikedBlogs,
  fetchLikedBlogs,
  fetchUserBlogs,
} from "@/actions/blog.action";
import Link from "next/link";
import BlogsDropdown from "@/components/dashboard/dropdown-menu-blogs";
import BlogCard from "@/components/blog-card";

interface BlogPost {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
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

export default function BlogsPage() {
  const [selected, setSelected] = useState("Your blogs");
  const [searchQuery] = useState("");
  const [blogs, setBlogs] = useState<Blog[]>([]);

  const fetchBlog = async () => {
    if (selected === "Your blogs") {
      const data = await fetchUserBlogs();
      setBlogs(data);
    } else if (selected === "Liked blogs") {
      const data = await fetchLikedBlogs();
      setBlogs(data);
    } else if (selected === "Disliked blogs") {
      const data = await fetchDislikedBlogs();
      setBlogs(data);
      console.log(data);
    }
  };

  useEffect(() => {
    fetchBlog();
  }, [selected]);

  const filteredBlogs =
    blogs.length > 0 &&
    blogs.filter((blog) =>
      blog.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <main className="min-h-screen pt-2 w-full">
      <div className="relative z-10 w-full">
        {/* Title Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-6"
        >
          <h1
            className={`text-3xl sm:text-4xl lg:text-5xl font-bold p-2
            bg-gradient-to-r dark:from-white dark:to-gray-400 from-gray-900 to-gray-600 
            bg-clip-text text-transparent 
             
            `}
          >
            Your Blogs
          </h1>
          <p
            className={`text-lg dark:text-gray-400 text-gray-600 max-w-3xl mx-auto p-2
             
            `}
          >
            Manage your blogs here
          </p>
          <BlogsDropdown selected={selected} setSelected={setSelected} />
          <Link href="/dashboard/blogs/create">
            <Button className="mt-2">
              <Plus /> Create Blog
            </Button>
          </Link>
        </motion.div>

        {/* Blogs Grid */}
        {filteredBlogs.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {selected == "Your blogs"
              ? filteredBlogs.map((blog, index) => (
                  <YourBlogCard key={index} blog={blog} />
                ))
              : filteredBlogs.map((blog, index) => (
                  <BlogCard key={index} blog={blog} />
                ))}
          </motion.div>
        )}
      </div>
    </main>
  );
}
