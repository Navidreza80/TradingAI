'use client'

import { createBlog } from "@/actions/blog.action";

export default function Test() {
  const handleSubmit = async () => {
    const newBlog = await createBlog({
      title: "My First Blog",
      shortDescription: "This is a short description of my blog post.",
      content: "This is the full content of my blog post.",
      blogThumbnail: "https://example.com/blog-thumbnail.jpg",
    });
    
    console.log(newBlog);
  }
  return (
    <div className="mt-16">
      <button onClick={handleSubmit}>Create Your Blog</button>
    </div>
  )
}