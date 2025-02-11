'use client'

import { useState, useEffect } from 'react';
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
import {
  HandThumbUpIcon as HandThumbUpSolid,
  HandThumbDownIcon as HandThumbDownSolid,
  BookmarkIcon as BookmarkSolid
} from '@heroicons/react/24/solid';

interface Comment {
  id: number;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  date: Date;
  likes: number;
  isLiked: boolean;
}

export default function BlogDetailPage() {
  const { t, i18n } = useTranslation();
  const params = useParams();
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [likes, setLikes] = useState(1240);
  const [dislikes, setDislikes] = useState(45);
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      author: {
        name: 'Gholi Tabar',
        avatar: '/image/8b167af653c2399dd93b952a48740620.jpg'
      },
      content: 'trump khafane kheyli ziad',
      date: new Date('2025-2-11'),
      likes: 24,
      isLiked: false
    },
    // Add more comments...
  ]);

  const handleLike = () => {
    if (isDisliked) {
      setIsDisliked(false);
      setDislikes(prev => prev - 1);
    }
    if (isLiked) {
      setIsLiked(false);
      setLikes(prev => prev - 1);
    } else {
      setIsLiked(true);
      setLikes(prev => prev + 1);
    }
  };

  const handleDislike = () => {
    if (isLiked) {
      setIsLiked(false);
      setLikes(prev => prev - 1);
    }
    if (isDisliked) {
      setIsDisliked(false);
      setDislikes(prev => prev - 1);
    } else {
      setIsDisliked(true);
      setDislikes(prev => prev + 1);
    }
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
  };

  const handleShare = async () => {
    try {
      await navigator.share({
        title: 'Understanding Bitcoin Halving',
        text: 'Learn about Bitcoin halving and its impact on price',
        url: window.location.href
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: comments.length + 1,
      author: {
        name: 'Current User',
        avatar: '/image/8b167af653c2399dd93b952a48740620.jpg'
      },
      content: newComment,
      date: new Date(),
      likes: 0,
      isLiked: false
    };

    setComments([comment, ...comments]);
    setNewComment('');
  };

  const handleCommentLike = (commentId: number) => {
    setComments(comments.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          isLiked: !comment.isLiked,
          likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1
        };
      }
      return comment;
    }));
  };

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
            ${i18n.language === 'fa' ? 'font-vazirmatn' : ''} 
            ${i18n.language === 'ar' ? 'font-notokufi' : ''}`}>
            Understanding 
          </h1>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-4 mb-6 text-sm dark:text-gray-400 text-gray-600">
            <div className="flex items-center gap-2">
              <UserIcon className="w-5 h-5" />
              <span>Alex Thompson</span>
            </div>
            <div className="flex items-center gap-2">
              <CalendarIcon className="w-5 h-5" />
              <span>March 15, 2024</span>
            </div>
            <div className="flex items-center gap-2">
              <ClockIcon className="w-5 h-5" />
              <span>8 {t('blogs.readTime')}</span>
            </div>
          </div>

          {/* Featured Image */}
          <div className="relative h-[400px] w-full rounded-2xl overflow-hidden mb-8">
            <Image
              src="/image/trade.png"
              alt="Bitcoin Halving"
              fill
              className="object-cover"
            />
          </div>
        </motion.div>

        {/* Blog Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={`prose prose-lg max-w-none dark:prose-invert mb-12
            ${i18n.language === 'fa' ? 'font-vazirmatn' : ''} 
            ${i18n.language === 'ar' ? 'font-notokufi' : ''}`}
        >
          {/* Add your blog content here */}
          <p>
            Bitcoin halving is a significant event that occurs approximately every four years...
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
              onClick={handleLike}
              className="flex items-center gap-2 text-sm"
            >
              {isLiked ? (
                <HandThumbUpSolid className="w-6 h-6 text-[#1890ff]" />
              ) : (
                <HandThumbUpIcon className="w-6 h-6 dark:text-gray-400 text-gray-600" />
              )}
              <span className="dark:text-gray-400 text-gray-600">{likes}</span>
            </button>

            {/* Dislike Button */}
            <button
              onClick={handleDislike}
              className="flex items-center gap-2 text-sm"
            >
              {isDisliked ? (
                <HandThumbDownSolid className="w-6 h-6 text-red-500" />
              ) : (
                <HandThumbDownIcon className="w-6 h-6 dark:text-gray-400 text-gray-600" />
              )}
              <span className="dark:text-gray-400 text-gray-600">{dislikes}</span>
            </button>

            {/* Comments Count */}
            <div className="flex items-center gap-2 text-sm">
              <ChatBubbleLeftIcon className="w-6 h-6 dark:text-gray-400 text-gray-600" />
              <span className="dark:text-gray-400 text-gray-600">{comments.length}</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Save Button */}
            <button
              onClick={handleSave}
              className="flex items-center gap-2 text-sm"
            >
              {isSaved ? (
                <BookmarkSolid className="w-6 h-6 text-[#1890ff]" />
              ) : (
                <BookmarkIcon className="w-6 h-6 dark:text-gray-400 text-gray-600" />
              )}
            </button>

            {/* Share Button */}
            <button
              onClick={handleShare}
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
            ${i18n.language === 'fa' ? 'font-vazirmatn' : ''} 
            ${i18n.language === 'ar' ? 'font-notokufi' : ''}`}>
            {t('blogs.comments')} ({comments.length})
          </h2>

          {/* Comment Form */}
          <form onSubmit={handleCommentSubmit} className="mb-8">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder={t('blogs.commentPlaceholder')}
              className={`w-full px-4 py-3 rounded-xl
                dark:bg-white/5 bg-white
                dark:text-white text-gray-900
                dark:border-white/10 border-gray-200 border
                focus:outline-none focus:ring-2 focus:ring-[#1890ff]
                placeholder:dark:text-gray-500 placeholder:text-gray-400
                transition-all duration-200 min-h-[100px]
                ${i18n.language === 'fa' ? 'font-vazirmatn' : ''} 
                ${i18n.language === 'ar' ? 'font-notokufi' : ''}`}
            />
            <div className="flex justify-end mt-4">
              <button
                type="submit"
                className={`px-6 py-2 bg-[#1890ff] text-white rounded-lg
                  hover:bg-[#40a9ff] transition-colors duration-200
                  ${i18n.language === 'fa' ? 'font-vazirmatn' : ''} 
                  ${i18n.language === 'ar' ? 'font-notokufi' : ''}`}
              >
                {t('blogs.submitComment')}
              </button>
            </div>
          </form>

          {/* Comments List */}
          <div className="space-y-6">
            {comments.map((comment) => (
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
                    src={comment.author.avatar}
                    alt={comment.author.name}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className={`font-bold dark:text-white text-gray-900
                        ${i18n.language === 'fa' ? 'font-vazirmatn' : ''} 
                        ${i18n.language === 'ar' ? 'font-notokufi' : ''}`}>
                        {comment.author.name}
                      </h3>
                      <span className="text-sm dark:text-gray-400 text-gray-600">
                        {new Date(comment.date).toLocaleDateString()}
                      </span>
                    </div>
                    <p className={`dark:text-gray-300 text-gray-700 mb-4
                      ${i18n.language === 'fa' ? 'font-vazirmatn' : ''} 
                      ${i18n.language === 'ar' ? 'font-notokufi' : ''}`}>
                      {comment.content}
                    </p>
                    <button
                      onClick={() => handleCommentLike(comment.id)}
                      className="flex items-center gap-2 text-sm"
                    >
                      {comment.isLiked ? (
                        <HandThumbUpSolid className="w-5 h-5 text-[#1890ff]" />
                      ) : (
                        <HandThumbUpIcon className="w-5 h-5 dark:text-gray-400 text-gray-600" />
                      )}
                      <span className="dark:text-gray-400 text-gray-600">
                        {comment.likes}
                      </span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </main>
  );
} 