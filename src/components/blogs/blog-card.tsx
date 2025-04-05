// Icons
import {
  ChatBubbleLeftIcon,
  HandThumbDownIcon,
  HandThumbUpIcon,
} from "@heroicons/react/24/outline";
// Framer motion for imports
import { motion } from "framer-motion";
// Next built in components
import Image from "next/image";
import Link from "next/link";

export default function BlogCard({ blog }) {
  return (
    // Blog Container With Animation
    <motion.div
      key={blog.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative group"
    >
      {/* Link To Blog Detail */}
      <Link href={`/news/blogs/${blog.id}`}>
      {/* Container */}
        <div className="cursor-pointer w-full">
          {/* Container */}
          <div
            className="relative z-10 rounded-2xl overflow-hidden
                dark:border-white/10 border-black/5 border
                backdrop-blur-xl 
                dark:bg-background-dark bg-background-light
                transition-all duration-300 hover:scale-[1.02]
                dark:hover:shadow-[0_0_30px_rgba(24,144,255,0.1)]
                hover:shadow-[0_0_30px_rgba(24,144,255,0.2)]"
          >
            {/* Thumbnail */}
            <div className="relative h-48 w-full">
              {blog.blogThumbnail && (
                // Blog Thumbnail Image
                <Image
                  src={blog.blogThumbnail}
                  alt={blog.title}
                  fill
                  className="object-cover"
                />
              )}
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Author Info */}
              <div className="flex items-center gap-3 mb-4">
                {blog.publisher.image && (
                  // Author Profile Picture
                  <Image
                    src={blog.publisher.image}
                    alt={blog.publisher?.username}
                    width={32}
                    height={32}
                    className="rounded-full w-8 h-8"
                  />
                )}
                {/* Container */}
                <div>
                  {/* Blog Publisher Username */}
                  <p
                    className='text-sm font-medium dark:text-secondary-dark text-secondary-light'>
                    {blog.publisher.username}
                  </p>
                  {/* Blog Published Date */}
                  <p className="text-xs dark:text-secondary-dark text-secondary-light">
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Title & Description */}
              {/* Blog Title */}
              <h3
                className='text-xl font-bold mb-2 text-primary-light dark:text-primary-dark'>
                {blog.title}
              </h3>
              {/* Blog Short Description */}
              <p
                className='text-sm dark:text-secondary-dark text-secondary-light mb-4 line-clamp-2'>
                {blog.shortDescription}
              </p>

              {/* Interaction Buttons */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {/* Like Button */}
                  <button className="flex items-center gap-1 text-sm">
                    <HandThumbUpIcon
                      className="w-5 h-5 transition-colors duration-200 dark:text-secondary-dark text-secondary-light"
                    />
                    <span className="dark:text-secondary-dark text-secondary-light">
                      {blog._count.likes}
                    </span>
                  </button>

                  {/* Dislike Button */}
                  <button className="flex items-center gap-1 text-sm">
                    <HandThumbDownIcon
                      className="w-5 h-5 transition-colors duration-200 dark:text-secondary-dark text-secondary-light"
                    />
                    <span className="dark:text-secondary-dark text-secondary-light">
                      {blog._count.dislikes}
                    </span>
                  </button>

                  {/* Comments */}
                  <div className="flex items-center gap-1 text-sm">
                    <ChatBubbleLeftIcon className="w-5 h-5 dark:text-secondary-dark text-secondary-light" />
                    <span className="dark:text-secondary-dark text-secondary-light">
                      {blog.comments?.length}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
