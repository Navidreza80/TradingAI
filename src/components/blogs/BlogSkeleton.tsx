// Framer motion for animation
import { motion } from "framer-motion";

export default function BlogCardSkeleton() {
  return (
    <motion.div
      className="relative group"
    >
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
          {/* Thumbnail Skeleton */}
          <div className="relative h-48 w-full bg-gray-300 dark:bg-gray-700 animate-pulse"></div>

          {/* Content Skeleton */}
          <div className="p-6">
            {/* Author Info Skeleton */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-700 animate-pulse"></div>
              <div>
                <div className="w-24 h-4 bg-gray-300 dark:bg-gray-700 animate-pulse mb-1"></div>
                <div className="w-16 h-3 bg-gray-300 dark:bg-gray-700 animate-pulse"></div>
              </div>
            </div>

            {/* Title & Description Skeleton */}
            <div className="w-3/4 h-5 bg-gray-300 dark:bg-gray-700 animate-pulse mb-2"></div>
            <div className="w-full h-4 bg-gray-300 dark:bg-gray-700 animate-pulse mb-2"></div>
            <div className="w-2/3 h-4 bg-gray-300 dark:bg-gray-700 animate-pulse mb-4"></div>

            {/* Interaction Buttons Skeleton */}
            <div className="flex items-center gap-4">
              <div className="w-10 h-5 bg-gray-300 dark:bg-gray-700 animate-pulse"></div>
              <div className="w-10 h-5 bg-gray-300 dark:bg-gray-700 animate-pulse"></div>
              <div className="w-10 h-5 bg-gray-300 dark:bg-gray-700 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
