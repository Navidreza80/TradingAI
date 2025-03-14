"use client";
// Framer motion imports for animation
import { motion } from "framer-motion";
// i18n for translation
import { useTranslation } from "react-i18next";
// Next built in components and hooks
import Image from "next/image";
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
  UserIcon
} from "@heroicons/react/24/outline";
// React built in hooks
import { useEffect, useState } from "react";
// React hot toast
import toast from "react-hot-toast";

export default function BlogDetailPage() {
  // i18n hooks for translation
  const { t } = useTranslation();
  // Getting id of the blog from the params
  const { id } = useParams();
  // State to save the data of the blog
  const [detail, setDetail] = useState<Blog>({} as Blog);
  // State to save the comments of the blog
  const [comments, setComments] = useState<Comment[]>([]);
  // State to save user submitted comment content
  const [commentContent, setCommentContent] = useState("");
  // States to save blog reactions
  const [isLiked, setIsLiked] = useState();
  const [isDisLiked, setIsDisLiked] = useState();
  // Function to fetch detail of the blog
  const fetchDetail = async () => {
    const data = await fetchBlogById(id);
    setDetail(data);
  };
  // Function to fetch comments of the blog
  const fetchDetailComment = async () => {
    const data = await fetchCommentsForBlog(id);
    setComments(data);
  };
  // Function to submit the comment and post it to the database
  const handleCommentSubmit = async () => {
    const data = await createComment({
      content: commentContent,
      blogId: id,
    });
    console.log(data.newComment);
    if (data.success) {
      setComments([...comments, data.newComment]);
      toast.success(data.message);
    }
  };
  // Function to fetch reactions of the blog
  const fetchInteraction = async () => {
    const userId = await getDbUserId();
    if (userId) {
      const request = await getBlogReaction(userId, id);
      console.log(request);
      setIsDisLiked(request.disliked);
      setIsLiked(request.liked);
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
      <main className="min-h-screen bg-gradient-to-b dark:from-[#0a0a0a] dark:to-[#1a1a1a] from-white to-gray-50 pt-24 pb-12">
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Blog Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h1
              className={`text-3xl sm:text-4xl font-bold mb-4
            dark:text-white text-gray-900
             
            `}
            >
              {detail.title}
            </h1>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-4 mb-6 text-sm dark:text-gray-400 text-gray-600">
              <div className="flex items-center gap-2">
                <UserIcon className="w-5 h-5" />
                <span>{detail.publisher?.username}</span>
              </div>
              <div className="flex items-center gap-2">
                <CalendarIcon className="w-5 h-5" />
                <span>{new Date(detail.createdAt).toLocaleDateString()}</span>
              </div>
            </div>

            {/* Featured Image */}
            <div className="relative h-[400px] w-full rounded-2xl overflow-hidden mb-8">
              {detail.blogThumbnail && (
                <Image
                  src={detail.blogThumbnail ? detail.blogThumbnail : null}
                  alt={detail.title}
                  fill
                  className="object-cover"
                />
              )}
            </div>
          </motion.div>

          {/* Blog Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={`prose prose-lg max-w-none dark:prose-invert mb-12
             
            `}
          >
            {/* Add your blog content here */}
            <p className="text-black dark:text-white">{detail.content}</p>
            {/* More content... */}
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap items-center justify-between gap-4 mb-12 pb-8 border-b dark:border-white/10 border-gray-200"
          >
            <div className="flex items-center gap-4">
              {/* Like Button */}
              <button
                className="flex items-center gap-2 text-sm"
                onClick={async () => {
                  const request = await toggleBlogReaction(id, "like");
                  if (request?.success) toast.success(request.message);
                  setIsLiked(true);
                  setIsDisLiked(false);
                }}
              >
                {isLiked ? (
                  <HandThumbUpIcon className="w-6 h-6 dark:text-white text-black" />
                ) : (
                  <HandThumbUpIcon className="w-6 h-6 dark:text-gray-400 text-gray-600" />
                )}
                <span className="dark:text-gray-400 text-gray-600">
                  {detail._count.likes}
                </span>
              </button>

              {/* Dislike Button */}
              <button
                className="flex items-center gap-2 text-sm"
                onClick={async () => {
                  const request = await toggleBlogReaction(id, "dislike");
                  if (request?.success) toast.success(request.message);
                  setIsLiked(false);
                  setIsDisLiked(true);
                }}
              >
                {isDisLiked ? (
                  <HandThumbDownIcon className="w-6 h-6 dark:text-white text-black" />
                ) : (
                  <HandThumbDownIcon className="w-6 h-6 dark:text-gray-400 text-gray-600" />
                )}
                <span className="dark:text-gray-400 text-gray-600">
                  {detail._count.dislikes}
                </span>
              </button>

              {/* Comments Count */}
              <div className="flex items-center gap-2 text-sm">
                <ChatBubbleLeftIcon className="w-6 h-6 dark:text-gray-400 text-gray-600" />
                <span className="dark:text-gray-400 text-gray-600"></span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Share Button */}
              <button className="flex items-center gap-2 text-sm">
                <ShareIcon className="w-6 h-6 dark:text-gray-400 text-gray-600" />
              </button>
            </div>
          </motion.div>

          {/* Comments Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h2
              className={`text-2xl font-bold mb-8 dark:text-white text-gray-900
             
            `}
            >
              {t("blogs.comments")}
            </h2>

            {/* Comment Form */}
            <div className="mb-8">
              <textarea
                value={commentContent}
                onChange={(e) => setCommentContent(e.target.value)}
                placeholder={t("blogs.commentPlaceholder")}
                className={`w-full px-4 py-3 rounded-xl
                dark:bg-white/5 bg-white
                dark:text-white text-gray-900
                dark:border-white/10 border-gray-200 border
                focus:outline-none focus:ring-2 focus:ring-[#1890ff]
                placeholder:dark:text-gray-500 placeholder:text-gray-400
                transition-all duration-200 min-h-[100px]
                 
                `}
              />
              <div className="flex justify-end mt-4">
                <button
                  onClick={handleCommentSubmit}
                  className={`px-6 py-2 bg-[#1890ff] text-white rounded-lg
                  hover:bg-[#40a9ff] transition-colors duration-200
                   
                  `}
                >
                  {t("blogs.submitComment")}
                </button>
              </div>
            </div>

            {/* Comments List */}
            {comments.length > 0 && (
              <div className="space-y-6">
                {comments.map((comment) => {
                  return (
                    comment.user && (
                      <motion.div
                        key={comment.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="relative z-10 p-6 rounded-2xl 
                  dark:border-white/10 border-black/5 border
                  backdrop-blur-xl 
                  dark:bg-white/5 bg-white/80"
                      >
                        <div className="flex items-start gap-4">
                          <Image
                            src={
                              comment.user?.image ? comment.user?.image : null
                            }
                            alt={comment.user?.username}
                            width={40}
                            height={40}
                            className="rounded-full w-10 h-10"
                          />
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h3
                                className={`font-bold dark:text-white text-gray-900
                         
                        `}
                              >
                                {comment.user.username}
                              </h3>
                              <span className="text-sm dark:text-gray-400 text-gray-600">
                                {new Date(
                                  comment.createdAt
                                ).toLocaleDateString()}
                              </span>
                            </div>
                            <p
                              className={`dark:text-gray-300 text-gray-700 mb-4
                       
                      `}
                            >
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
