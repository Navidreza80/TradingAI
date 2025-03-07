"use client";

import { createBlog } from "@/actions/blog.action";
import BlogCard from "@/components/dashboard/blog-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UploadButton } from "@/utils/uploadthing";
import { useState } from "react";

export default function CreateBlog() {
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [content, setContent] = useState("");
  const [blog, setBlog] = useState({
    id: 1,
    title: title,
    content: content,
    shortDescription: shortDescription,
    blogThumbnail: image,
  });

  const handleSubmit = async () => {
    const newBlog = await createBlog({
      title: title,
      shortDescription: shortDescription,
      content: content,
      blogThumbnail: image,
    });
  };

  return (
    <div className="flex flex-row w-2/3 gap-2 flex-nowrap p-5 mx-auto">
      <div className="flex flex-col flex-wrap w-1/2 h-full p-5 border rounded-2xl items-start dark:border-gray-400 dark:bg-[#4b4b4b5b] bg-white border-[#4b4b4b61]">
        <div className="flex flex-col h-1/6 w-full mt-4">
          <h2 className="w-full text-left text-md dark:text-gray-300 text-black">
            Title
          </h2>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-[#89898961] border-none"
          />
        </div>
        <div className="flex flex-col h-1/6 w-full mt-4">
          <h2 className="w-full text-left text-md dark:text-gray-300 text-black">
            Short Description
          </h2>
          <Input
            value={shortDescription}
            onChange={(e) => setShortDescription(e.target.value)}
            className="bg-[#89898961] border-none"
          />
        </div>
        <div className="flex flex-col h-1/6 w-full mt-4">
          <h2 className="w-full text-left text-md dark:text-gray-300 text-black">
            Content
          </h2>
          <Input
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="bg-[#89898961] border-none h-20"
          />
        </div>
        <div className="flex flex-col h-1/6 w-full my-4">
          <h2 className="w-full text-left text-md dark:text-gray-300 text-black">
            Thumbnail
          </h2>
          <UploadButton
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              // Do something with the response
              setImage(res[0].url);
            }}
            onUploadError={(error: Error) => {
              // Do something with the error.
              alert(`ERROR! ${error.message}`);
            }}
          />
        </div>
        <Button onClick={handleSubmit}>Create</Button>
      </div>
      <div className="w-1/2">
        <BlogCard
          image={image}
          shortDescription={shortDescription}
          title={title}
        />
      </div>
    </div>
  );
}
