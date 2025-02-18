"use client";

import BlogCard from "@/components/dashboard/blog-card";
import { Upload } from "@/components/dashboard/file-upload";
import { Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";

export default function CreateBlog() {
  const [uploadedFiles, setUploadedFiles] = useState();
  const [blog, setBlog] = useState({
    id: 1,
    title: "Understanding Bitcoin Halving and Its Impact on Price",
    description:
      "An in-depth analysis of Bitcoin halving events and their historical impact on cryptocurrency prices...",
    thumbnail: "/image/trade.png",
    likes: 1240,
    dislikes: 45,
    comments: 328,
    isLiked: false,
    isDisliked: false,
    isFavorite: false,
    date: new Date("2024-03-15"),
    readTime: 8,
    author: {
      name: "Alex Thompson",
      avatar: "/image/8b167af653c2399dd93b952a48740620.jpg",
    },
  });

  const handleFilesUploaded = (files) => {
    setUploadedFiles(files);
    console.log("Uploaded Files:", files);
  };
  return (
    <div className="flex flex-row w-full gap-2 flex-nowrap p-5">
      <div className="flex flex-col flex-wrap w-1/2 h-full p-5 border rounded-2xl items-start dark:border-gray-400 dark:bg-[#4b4b4b5b] bg-white border-[#4b4b4b61]">
        <div className="flex flex-col h-1/6 w-full mt-4">
          <h2 className="w-full text-left text-md dark:text-gray-300 text-black">
            Title
          </h2>
          <Input className="bg-[#89898961] border-none" />
        </div>
        <div className="flex flex-col h-1/6 w-full mt-4">
          <h2 className="w-full text-left text-md dark:text-gray-300 text-black">
            Description
          </h2>
          <TextArea className="bg-[#89898961] border-none" />
        </div>
        <div className="flex flex-col h-1/6 w-full my-4">
          <h2 className="w-full text-left text-md dark:text-gray-300 text-black">
            Thumbnail
          </h2>
          <Upload onFilesUploaded={handleFilesUploaded} />
        </div>
      </div>
      <div className="w-1/2">
        <BlogCard blog={blog} />
      </div>
    </div>
  );
}
