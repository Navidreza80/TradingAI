'use client'

import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import {
  HandThumbUpIcon,
  HandThumbDownIcon,
  BookmarkIcon,
  ShareIcon,
  ChatBubbleLeftIcon,
  ClockIcon,
  UserIcon,
  CalendarIcon
} from '@heroicons/react/24/outline';
import { fetchBlogById } from '@/actions/blog.action';
import { useEffect, useState } from 'react';
import { createComment, fetchCommentsForBlog } from '@/actions/comment.action';
import { Comment } from '@/types/comment';
import { Blog } from '@/types/blog';

export default function BlogDetailPage() {
  const { t } = useTranslation();
  const { id } = useParams();
  const [detail, setDetail] = useState<Blog>({} as Blog)
  const [comments, setComments] = useState<Comment[]>([])
  const [commentContent, setCommentContent] = useState('')

  const fetchDetail = async () => {
    const data = await fetchBlogById(id);
    setDetail(data)
  }

  const fetchDetailComment = async () => {
    const data = await fetchCommentsForBlog(id)
    setComments(data)
  }

  const handleCommentSubmit = async () => {
    const data = await createComment({
      content: commentContent,
      blogId: id,
    })
    setComments((prev) => [...prev, data])
  }
  useEffect(() => {
    fetchDetail()
    fetchDetailComment()
  })

  return (
    <main className="min-h-screen bg-gradient-to-b dark:from-[#0a0a0a] dark:to-[#1a1a1a] from-white to-gray-50 pt-24 pb-12">
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Blog Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className={`text-3xl sm:text-4xl font-bold mb-4
            dark:text-white text-gray-900
             
            `}>
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
            <div className="flex items-center gap-2">
              <ClockIcon className="w-5 h-5" />
              <span>8 {t('blogs.readTime')}</span>
            </div>
          </div>

          {/* Featured Image */}
          <div className="relative h-[400px] w-full rounded-2xl overflow-hidden mb-8">
            {detail.blogThumbnail && <Image
              src={detail.blogThumbnail ? detail.blogThumbnail : null}
              alt={detail.title}
              fill
              className="object-cover"
            />}
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
          <p>
            {detail.content}
          </p>
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
            >
              {detail.isLiked ?  <HandThumbUpIcon className="w-6 h-6 dark:text-white text-black" /> : <HandThumbUpIcon className="w-6 h-6 dark:text-gray-400 text-gray-600" />}
              <span className="dark:text-gray-400 text-gray-600">{detail.likes}</span>
            </button>

            {/* Dislike Button */}
            <button
              className="flex items-center gap-2 text-sm"
            >
              {detail.isDisliked ? <HandThumbDownIcon className="w-6 h-6 dark:text-white text-black" /> : <HandThumbDownIcon className="w-6 h-6 dark:text-gray-400 text-gray-600" />}
              <span className="dark:text-gray-400 text-gray-600">{detail.dislikes}</span>
            </button>

            {/* Comments Count */}
            <div className="flex items-center gap-2 text-sm">
              <ChatBubbleLeftIcon className="w-6 h-6 dark:text-gray-400 text-gray-600" />
              <span className="dark:text-gray-400 text-gray-600"></span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Save Button */}
            <button
              className="flex items-center gap-2 text-sm"
            >
              <BookmarkIcon className="w-6 h-6 dark:text-gray-400 text-gray-600" />
            </button>

            {/* Share Button */}
            <button
              className="flex items-center gap-2 text-sm"
            >
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
          <h2 className={`text-2xl font-bold mb-8 dark:text-white text-gray-900
             
            `}>
            {t('blogs.comments')}
          </h2>

          {/* Comment Form */}
          <div className="mb-8">
            <textarea
              value={commentContent}
              onChange={(e) => setCommentContent(e.target.value)}
              placeholder={t('blogs.commentPlaceholder')}
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
                onClick={() => handleCommentSubmit()}
                className={`px-6 py-2 bg-[#1890ff] text-white rounded-lg
                  hover:bg-[#40a9ff] transition-colors duration-200
                   
                  `}
              >
                {t('blogs.submitComment')}
              </button>
            </div>
          </div>

          {/* Comments List */}
          {comments.length > 0 &&
            <div className="space-y-6">
              {comments.map((comment) => {
                return comment.user && (
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
                        src={comment.user?.image ? comment.user?.image : null}
                        alt={comment.user?.username}
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className={`font-bold dark:text-white text-gray-900
                         
                        `}>
                            {comment.user.username}
                          </h3>
                          <span className="text-sm dark:text-gray-400 text-gray-600">
                            {new Date(comment.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <p className={`dark:text-gray-300 text-gray-700 mb-4
                       
                      `}>
                          {comment.content}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>}
        </motion.div>
      </div>
    </main>
  );
} 