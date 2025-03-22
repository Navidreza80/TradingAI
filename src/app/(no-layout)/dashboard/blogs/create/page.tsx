"use client";
// Third party components
import BlogCard from "@/components/dashboard/blog-card";
import CreateNewBlog from "@/components/dashboard/create-blog";
// React built in hooks
import { useState } from "react";

export default function CreateBlog() {
  // State to save the blogs thumbnail
  const [image, setImage] = useState(null);
  // State to save the blogs title
  const [title, setTitle] = useState("");
  // State to save the blogs short description
  const [shortDescription, setShortDescription] = useState("");
  // State to save the blogs content
  const [content, setContent] = useState("");

  return (
    <div className="flex flex-row xl:w-2/3 lg:w-2/3 md:w-3/4 sm:w-11/12 sm:flex-wrap xs:flex-wrap justify-center xs:w-11/12 gap-2 lg:flex-nowrap p-5 mx-auto">
      {/* New Blog Form */}
      <CreateNewBlog
        image={image}
        setImage={setImage}
        setContent={setContent}
        setTitle={setTitle}
        shortDescription={shortDescription}
        setShortDescription={setShortDescription}
        content={content}
        title={title}
      />
      <div className="lg:w-1/2 md:w-full sm:w-full xs:w-full lg:h-full md:h-1/2 sm:h-1/2 xs:h-1/2">
        {/* Preview Of The Blog */}
        <BlogCard
          image={image}
          shortDescription={shortDescription}
          title={title}
        />
      </div>
    </div>
  );
}
