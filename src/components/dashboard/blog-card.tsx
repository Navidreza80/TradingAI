"use client";
// Sever actions
import { getDbUser } from "@/actions/user.action";
// Types for type safety
import { User } from "@/types/user";
// Icons
import {
  ChatBubbleLeftIcon,
  HandThumbDownIcon,
  HandThumbUpIcon,
} from "@heroicons/react/24/outline";
// Framer motion
import { motion } from "framer-motion";
// Next built in components
import Image from "next/image";
// React built in hooks
import { useEffect, useState } from "react";

export default function BlogCard({ title, shortDescription, image }) {
  // State to save user detail
  const [user, setUser] = useState<User>({});
  // Function to fetch users detail
  const fetchUser = async () => {
    const data = await getDbUser();
    setUser(data);
  };
  // uesEffect with callback function to fetch users detail when the component is mounting
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
                src={typeof image == "string" ? image : "/image/noImage.jpg"}
                alt={title}
                fill
                className="object-cover"
              />
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Author Info */}
              <div className="flex items-center gap-3 mb-4">
                {
                  <Image
                    src={
                      typeof user.image == "string"
                        ? user.image
                        : "/image/noImage.jpg"
                    }
                    alt={"user profile"}
                    width={32}
                    height={32}
                    className="rounded-full w-8 h-8"
                  />
                }
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
                    <HandThumbUpIcon className="w-5 h-5 transition-colors duration-200 dark:text-gray-400 text-gray-600" />
                    <span className="dark:text-gray-400 text-gray-600">0</span>
                  </button>

                  {/* Dislike Button */}
                  <button className="flex items-center gap-1 text-sm">
                    <HandThumbDownIcon className="w-5 h-5 transition-colors duration-200 dark:text-gray-400 text-gray-600" />
                    <span className="dark:text-gray-400 text-gray-600">0</span>
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
