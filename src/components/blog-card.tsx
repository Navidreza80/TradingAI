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
    <motion.div
      key={blog.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative group"
    >
      <Link href={`/blogs/${blog.id}`}>
        <div className="cursor-pointer w-full">
          <div
            className="relative z-10 rounded-2xl overflow-hidden
                dark:border-white/10 border-black/5 border
                backdrop-blur-xl 
                dark:bg-white/5 bg-white/80
                dark:hover:bg-white/10 hover:bg-white/90
                transition-all duration-300 hover:scale-[1.02]
                dark:hover:shadow-[0_0_30px_rgba(24,144,255,0.1)]
                hover:shadow-[0_0_30px_rgba(24,144,255,0.2)]"
          >
            {/* Thumbnail */}
            <div className="relative h-48 w-full">
              {blog.blogThumbnail && (
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
                  <Image
                    src={blog.publisher.image}
                    alt={blog.publisher?.username}
                    width={32}
                    height={32}
                    className="rounded-full w-8 h-8"
                  />
                )}
                <div>
                  <p
                    className={`text-sm font-medium dark:text-white text-gray-900
                         
                        `}
                  >
                    {blog.publisher.username}
                  </p>
                  <p className="text-xs dark:text-gray-400 text-gray-600">
                    {new Date(blog.createdAt).toLocaleDateString()}
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
                {blog.shortDescription}
              </p>

              {/* Interaction Buttons */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {/* Like Button */}
                  <button className="flex items-center gap-1 text-sm">
                    <HandThumbUpIcon
                      className="w-5 h-5 transition-colors duration-200 dark:text-gray-400 text-black"
                    />
                    <span className="dark:text-gray-400 text-black">
                      {blog._count.likes}
                    </span>
                  </button>

                  {/* Dislike Button */}
                  <button className="flex items-center gap-1 text-sm">
                    <HandThumbDownIcon
                      className="w-5 h-5 transition-colors duration-200 dark:text-gray-400 text-black"
                    />
                    <span className="dark:text-gray-400 text-black">
                      {blog._count.dislikes}
                    </span>
                  </button>

                  {/* Comments */}
                  <div className="flex items-center gap-1 text-sm">
                    <ChatBubbleLeftIcon className="w-5 h-5 dark:text-gray-400 text-black" />
                    <span className="dark:text-gray-400 text-black">
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
