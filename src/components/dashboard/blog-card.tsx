"use client";

import { getDbUser } from "@/actions/user.action";
import {
  ChatBubbleLeftIcon,
  HandThumbDownIcon,
  HandThumbUpIcon,
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function BlogCard({ title, shortDescription, image }) {
  const [user, setUser] = useState({});
  const fetchUser = async () => {
    const data = await getDbUser();
    setUser(data);
  };
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="flex w-full h-full"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative group w-full h-full"
      >
        <div className="cursor-pointer w-full h-full">
          <div
            className="relative z-10 rounded-2xl overflow-hidden h-full
                dark:border-white/10 border-black/5 border
                backdrop-blur-xl 
                dark:bg-white/5 bg-white/80"
          >
            {/* Thumbnail */}
            <div className="relative h-48 w-full">
              <Image
                src={
                  image
                    ? image
                    : "data:image/png;base64,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"
                }
                alt={title}
                fill
                className="object-cover"
              />
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Author Info */}
              <div className="flex items-center gap-3 mb-4">
                {user.image != '' && <Image
                  src={user.image ? user.image : null}
                  alt={user.username}
                  width={32}
                  height={32}
                  className="rounded-full"
                />}
                <div>
                  <p
                    className={`text-sm font-medium dark:text-white text-gray-900
                         
                        `}
                  >
                    {user.username}
                  </p>
                  <p className="text-xs dark:text-gray-400 text-gray-600">
                    {new Date().toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Title & Description */}
              <h3
                className={`text-xl font-bold mb-2 dark:text-white text-gray-900
                     
                    `}
              >
                {title}
              </h3>
              <p
                className={`text-sm dark:text-gray-400 text-gray-600 mb-4 line-clamp-2
                     
                    `}
              >
                {shortDescription}
              </p>

              {/* Interaction Buttons */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {/* Like Button */}
                  <button className="flex items-center gap-1 text-sm">
                    <HandThumbUpIcon
                      className="w-5 h-5 transition-colors duration-200 dark:text-gray-400 text-gray-600"
                    />
                    <span className="dark:text-gray-400 text-gray-600">
                      0
                    </span>
                  </button>

                  {/* Dislike Button */}
                  <button className="flex items-center gap-1 text-sm">
                    <HandThumbDownIcon
                      className="w-5 h-5 transition-colors duration-200 dark:text-gray-400 text-gray-600"
                    />
                    <span className="dark:text-gray-400 text-gray-600">
                      0
                    </span>
                  </button>

                  {/* Comments */}
                  <div className="flex items-center gap-1 text-sm">
                    <ChatBubbleLeftIcon className="w-5 h-5 dark:text-gray-400 text-gray-600" />
                    <span className="dark:text-gray-400 text-gray-600">
                      {/* {blog.comments} */}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
