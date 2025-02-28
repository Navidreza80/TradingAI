"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Eye } from "lucide-react";
import { useState } from "react";
import {motion} from "framer-motion"
import Image from "next/image";

export default function ViewReplies() {
      const [comment,] = useState(
        {
          id: 1,
          author: {
            name: 'Alex Thompson',
            avatar: '/image/8b167af653c2399dd93b952a48740620.jpg'
          },
          content: 'Great analysis! This helped me understand the impact of halving on Bitcoin price. Great analysis! This helped me understand the impact of halving on Bitcoin price. Great analysis! This helped me understand the impact of halving on Bitcoin price. Great analysis! This helped me understand the impact of halving on Bitcoin price.',
          date: new Date('2024-03-15'),
          likes: 24,
          isLiked: false
        },
      );
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Eye className="hover:text-gray-400 cursor-pointer text-black dark:text-white rounded-full p-2 w-8 h-8" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="dark:text-white text-gray-400">Replies</DialogTitle>
          <DialogDescription>
          View Your replies here
          </DialogDescription>
        </DialogHeader>
        <div className="flex py-4 overflow-y-scroll h-72 flex-row flex-wrap">
        <motion.div
                key={comment.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative z-10 w-full p-6 rounded-2xl
                  dark:border-white/10 border-black/5 border
                  backdrop-blur-xl 
                  dark:bg-white/5 bg-white/80"
              >
                <div className="flex items-start gap-4">
                  <Image
                    src={comment.author.avatar}
                    alt={comment.author.name}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className={`font-bold dark:text-white text-gray-900
                         
                        `}>
                        {comment.author.name}
                      </h3>
                      <span className="text-sm dark:text-gray-400 text-gray-600">
                        {new Date(comment.date).toLocaleDateString()}
                      </span>
                    </div>
                    <p className={`dark:text-gray-300 text-gray-700 mb-4 w-full overflow-hidden text-ellipsis`}>
                      {comment.content}
                    </p>
                  </div>
                </div>
              </motion.div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
