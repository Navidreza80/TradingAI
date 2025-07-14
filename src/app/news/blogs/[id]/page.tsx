/* eslint-disable */
"use client";
// Framer motion imports for animation
import { motion } from "framer-motion";


// Next built in components and hooks
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
// Server actions
import {
  fetchBlogById,
  getBlogReaction,
  toggleBlogReaction,
} from "@/actions/blog.action";
import { createComment, fetchCommentsForBlog } from "@/actions/comment.action";
import { getDbUserId } from "@/actions/user.action";
// Types
import { Blog } from "@/types/blog";
import { Comment } from "@/types/comment";
// Icons
import {
  CalendarIcon,
  ChatBubbleLeftIcon,
  HandThumbDownIcon,
  HandThumbUpIcon,
  ShareIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
// React built in hooks
import { useEffect, useState } from "react";
// React hot toast
import toast from "react-hot-toast";

export default function BlogDetailPage() {
  
  
  // Getting id of the blog from the params
  const { id } = useParams();
  // State to save the data of the blog
  const [detail, setDetail] = useState<Blog>({} as Blog);
  // State to save the comments of the blog
  const [comments, setComments] = useState<Comment[]>([]);
  // State to save user submitted comment content
  const [commentContent, setCommentContent] = useState("");
  // States to save blog reactions
  const [isLiked, setIsLiked] = useState<boolean>();
  const [isDisLiked, setIsDisLiked] = useState<boolean>();
  // Function to fetch detail of the blog
  const fetchDetail = async () => {
    if (typeof id == "string") {
      const data = await fetchBlogById(id);
      setDetail(data);
    }
  };
  // Function to fetch comments of the blog
  const fetchDetailComment = async () => {
    if (typeof id == "string") {
      const data = await fetchCommentsForBlog(id);
      setComments(data);
    }
  };
  // Function to submit the comment and post it to the database
  const handleCommentSubmit = async () => {
    if (typeof id == "string") {
      const data = await createComment({
        content: commentContent,
        blogId: id,
      });
      if (data == "User not authenticated")
        toast.error("User not authenticated");
      else if (data.success) {
        setComments([...comments, data.newComment]);
        toast.success(data.message);
      }
    }
  };
  // Function to fetch reactions of the blog
  const fetchInteraction = async () => {
    const userId = await getDbUserId();
    if (userId) {
      if (typeof id == "string") {
        const request = await getBlogReaction(userId, id);
        console.log(request);
        setIsDisLiked(request.disliked);
        setIsLiked(request.liked);
      }
    }
  };
  // Callback function to fetch detail when the component is mounting
  useEffect(() => {
    fetchDetail();
    fetchDetailComment();
    fetchInteraction();
  }, []);

  return (
    detail.title && (
      // Blog Detail Page
      <main className="min-h-screen bg-background-light dark:bg-background-dark pt-24 pb-12">
        {/* Container */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Blog Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            {/* Blog Title */}
            <h1 className='text-3xl sm:text-4xl font-bold mb-4 dark:text-primary-dark text-primary-light'>
              {detail.title}
            </h1>

            {/* User Info */}
            <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-secondary-light dark:text-secondary-dark">
              {/* Container */}
              <div className="flex items-center gap-2">
                {/* User Icon */}
                <UserIcon className="w-5 h-5" />
                {/* Link That Navigates To User Page */}
                <Link
                  href={`/Users/${detail.publisher.id}`}
                  className="hover:opacity-85 cursor-pointer"
                >
                  {detail.publisher?.username}
                </Link>
              </div>
              {/* Container */}
              <div className="flex items-center gap-2">
                {/* Calender Icon */}
                <CalendarIcon className="w-5 h-5" />
                {/* Blog Published Date */}
                <span>{new Date(detail.createdAt).toLocaleDateString()}</span>
              </div>
            </div>

            {/* Image Container */}
            <div className="relative h-[400px] w-full rounded-2xl overflow-hidden mb-8">
              {typeof detail.blogThumbnail == "string" && (
                // Blog Image
                <Image
                  src={detail.blogThumbnail}
                  alt={detail.title}
                  fill
                  className="object-cover"
                />
              )}
            </div>
          </motion.div>

          {/* Blog Content Container */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className='prose prose-lg max-w-none dark:prose-invert mb-12'>
            {/* Blog Content */}
            <p className="text-primary-light dark:text-primary-dark">{detail.content}</p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap items-center justify-between gap-4 mb-12 pb-8 border-b dark:border-white/10 border-gray-200"
          >
            {/* Container */}
            <div className="flex items-center gap-4">
              {/* Like Button */}
              <button
                className="flex items-center gap-2 text-sm"
                onClick={async () => {
                  if (typeof id == "string") {
                    const request = await toggleBlogReaction(id, "like");
                    if (request == "User not authenticated")
                      toast.error("User not authenticated");
                    else if (request?.success) toast.success(request.message);
                    setIsLiked(true);
                    setIsDisLiked(false);
                  }
                }}
              >
                {isLiked ? (
                  // Liked Icon
                  <HandThumbUpIcon className="w-6 h-6 dark:text-primary-dark text-primary-light" />
                ) : (
                  // Not Liked Icon
                  <HandThumbUpIcon className="w-6 h-6 dark:text-secondary-dark text-secondary-light" />
                )}
                {/* Liked Count */}
                <span className="dark:text-gray-400 text-gray-600">
                  {detail._count.likes}
                </span>
              </button>

              {/* Dislike Button */}
              <button
                className="flex items-center gap-2 text-sm"
                onClick={async () => {
                  if (typeof id == "string") {
                    const request = await toggleBlogReaction(id, "dislike");
                    if (request == "User not authenticated")
                      toast.error("User not authenticated");
                    else if (request?.success) toast.success(request.message);
                    setIsLiked(false);
                    setIsDisLiked(true);
                  }
                }}
              >
                {isDisLiked ? (
                  // DisLiked Icon
                  <HandThumbDownIcon className="w-6 h-6 dark:text-primary-dark text-primary-light" />
                ) : (
                  // Not DisLiked Icon
                  <HandThumbDownIcon className="w-6 h-6 dark:text-secondary-dark text-secondary-light" />
                )}
                  {/* Disliked Count */}
                <span className="dark:text-gray-400 text-gray-600">
                  {detail._count.dislikes}
                </span>
              </button>

              {/* Comments Count */}
              <div className="flex items-center gap-2 text-sm">
                {/* Comment Icon */}
                <ChatBubbleLeftIcon className="w-6 h-6 dark:text-secondary-dark text-secondary-light" />
                {/* Comment Count */}
                <span className="dark:text-gray-400 text-gray-600">{detail._count.comments}</span>
              </div>
            </div>

            {/* Container */}
            <div className="flex items-center gap-4">
              {/* Share Button */}
              <button className="flex items-center gap-2 text-sm">
                {/* Share Button Icon */}
                <ShareIcon className="w-6 h-6 dark:text-secondary-dark text-secondary-light" />
              </button>
            </div>
          </motion.div>

          {/* Comments Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {/* Comments Title */}
            <h2
              className='text-2xl font-bold mb-8 dark:text-primary-dark text-primary-light'>
              Comments
            </h2>

            {/* Comment Form */}
            <div className="mb-8">
              {/* Text Area For Comment */}
              <textarea
                value={commentContent}
                onChange={(e) => setCommentContent(e.target.value)}
                placeholder="Write your comment..."
                className='w-full px-4 py-3 rounded-xl bg-transparent
                dark:text-white text-gray-900
                dark:border-white/10 border-gray-200 border
                focus:outline-none focus:ring-2 focus:ring-[#1890ff]
                placeholder:dark:text-secondary-dark placeholder:text-secondary-light
                transition-all duration-200 min-h-[100px]'
              />
              {/* Container */}
              <div className="flex justify-end mt-4">
                {/* Submit Comment */}
                <button
                  onClick={handleCommentSubmit}
                  className='px-6 py-2 bg-[#1890ff] text-white rounded-lg
                  hover:bg-[#40a9ff] transition-colors duration-200'>
                  Submit
                </button>
              </div>
            </div>

            {/* Comments List */}
            {comments.length > 0 && (
              // Container
              <div className="space-y-6">
                {comments.map((comment) => {
                  return (
                    comment.user && (
                      // Container Wiht Animation
                      <motion.div
                        key={comment.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="relative z-10 p-6 rounded-2xl 
                  dark:border-white/10 border-black/5 border
                  backdrop-blur-xl 
                  bg-transparent"
                      >
                        {/* Container */}
                        <div className="flex items-start gap-4">
                          {typeof comment.user.image == "string" && (
                            // User Profile Picture
                            <Image
                              src={comment.user.image}
                              alt={comment.user?.username}
                              width={40}
                              height={40}
                              className="rounded-full w-10 h-10"
                            />
                          )}
                          {/* Container */}
                          <div className="flex-1">
                            {/* Container */}
                            <div className="flex items-center justify-between mb-2">
                              {/* Link To User Detail Page */}
                              <Link href={`/Users/${comment.user.id}`}>
                              {/* User Username */}
                                <h3
                                  className='font-bold dark:text-primary-dark text-primary-light'>
                                  {comment.user.username}
                                </h3>
                              </Link>
                              {/* Comment Published Date */}
                              <span className="text-sm text-secondary-light dark:text-secondary-dark">
                                {new Date(
                                  comment.createdAt
                                ).toLocaleDateString()}
                              </span>
                            </div>
                            {/* Comment Content */}
                            <p
                              className='dark:text-primary-dark text-primary-light'>
                              {comment.content}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )
                  );
                })}
              </div>
            )}
          </motion.div>
        </div>
      </main>
    )
  );
}
