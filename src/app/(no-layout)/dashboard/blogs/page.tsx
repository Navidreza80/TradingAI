"use client";
// React built in hooks
import { useEffect, useState } from "react";
// Types
import { Blog } from "@/types/blog";
// Server actions
import {
  fetchDislikedBlogs,
  fetchLikedBlogs,
  fetchUserBlogs,
} from "@/actions/blog.action";
// Third party components
import BlogsHeader from "@/components/dashboard/blog-header";
import BlogsGrid from "@/components/dashboard/blogs-grid";

export default function BlogsPage() {
  // State that save the selected options from blog dropdown menu to filter
  const [selected, setSelected] = useState("Your blogs");
  // State to save the value of users input to search over the blogs title
  const [searchQuery] = useState("");
  // State to save the blogs array
  const [blogs, setBlogs] = useState<Blog[] | "User not authenticated">([]);
  // Function to fetch blogs from database
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
  // useEffect with callback function to fetch blogs data when the
  // component is mounting and when the selected value changes
  useEffect(() => {
    fetchBlog();
  }, [selected]);
  // Function to search over the blogs title
  const filteredBlogs =
    blogs.length > 0 &&
    blogs.filter((blog) =>
      blog.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <main className="min-h-screen pt-2 w-full">
      <div className="relative z-10 w-full">
        {/* Blog Header Section */}
        <BlogsHeader selected={selected} setSelected={setSelected} />

        {/* Blogs Grid */}
        <BlogsGrid filteredBlogs={filteredBlogs} setBlogs={setBlogs} selected={selected} />
      </div>
    </main>
  );
}
