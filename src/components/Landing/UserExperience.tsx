'use client'

import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import { StarIcon } from '@heroicons/react/24/solid';
import { StarIcon as StarOutline } from '@heroicons/react/24/outline';

/**
 * UserExperience Section Component
 * 
 * Displays user testimonials and reviews with modern design and animations.
 * Features:
 * - Animated testimonial cards
 * - Star rating system
 * - User avatars
 * - RTL support
 * - Theme support
 * - Glass morphism effects
 */
export default function UserExperience() {
  const { t, i18n } = useTranslation();

  // Testimonials data
  const testimonials = [
    {
      id: 1,
      name: t('experience.testimonials.user1.name'),
      role: t('experience.testimonials.user1.role'),
      content: t('experience.testimonials.user1.content'),
      rating: 5,
      avatar: '/image/8b167af653c2399dd93b952a48740620.jpg',
      color: 'from-blue-500/20 to-cyan-400/20'
    },
    {
      id: 2,
      name: t('experience.testimonials.user2.name'),
      role: t('experience.testimonials.user2.role'),
      content: t('experience.testimonials.user2.content'),
      rating: 5,
      avatar: '/image/8b167af653c2399dd93b952a48740620.jpg',
      color: 'from-purple-500/20 to-pink-500/20'
    },
    {
      id: 3,
      name: t('experience.testimonials.user3.name'),
      role: t('experience.testimonials.user3.role'),
      content: t('experience.testimonials.user3.content'),
      rating: 5,
      avatar: '/image/8b167af653c2399dd93b952a48740620.jpg',
      color: 'from-amber-500/20 to-orange-400/20'
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  // Render star rating
  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, index) => (
      index < rating ? (
        <StarIcon key={index} className="w-5 h-5 text-yellow-400" />
      ) : (
        <StarOutline key={index} className="w-5 h-5 text-yellow-400" />
      )
    ));
  };

  return (
    <section className="relative py-20 bg-gradient-to-b dark:from-[#0a0a0a] dark:to-[#1a1a1a] from-white to-gray-50 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(24,144,255,0.1)_1px,transparent_1px)] 
        bg-[length:20px_20px] opacity-50 dark:opacity-50" />

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20"
        >
          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold p-3
            bg-gradient-to-r dark:from-white dark:to-gray-400 from-gray-900 to-gray-600 
            bg-clip-text text-transparent 
            ${i18n.language === 'fa' ? 'font-vazirmatn' : ''} 
            ${i18n.language === 'ar' ? 'font-notokufi' : ''}`}>
            {t('experience.title')}
          </h2>
          <p className={`mt-4 text-lg dark:text-gray-400 text-gray-600 max-w-3xl mx-auto 
            ${i18n.language === 'fa' ? 'font-vazirmatn' : ''} 
            ${i18n.language === 'ar' ? 'font-notokufi' : ''}`}>
            {t('experience.subtitle')}
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 auto-rows-fr"
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              variants={itemVariants}
              className="relative group h-full"
            >
              <div className="relative z-10 p-8 rounded-2xl 
                dark:border-white/10 border-black/5 border
                backdrop-blur-xl 
                dark:bg-white/5 bg-white/80
                dark:hover:bg-white/10 hover:bg-white/90
                transition-all duration-300 hover:scale-[1.02]
                dark:hover:shadow-[0_0_30px_rgba(24,144,255,0.1)]
                hover:shadow-[0_0_30px_rgba(24,144,255,0.2)]
                h-full flex flex-col">
                
                {/* User Info */}
                <div className="flex items-center mb-6">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden">
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="ml-4">
                    <h3 className={`font-bold dark:text-white text-gray-900
                      ${i18n.language === 'fa' ? 'font-vazirmatn' : ''} 
                      ${i18n.language === 'ar' ? 'font-notokufi' : ''}`}>
                      {testimonial.name}
                    </h3>
                    <p className={`text-sm dark:text-gray-400 text-gray-600
                      ${i18n.language === 'fa' ? 'font-vazirmatn' : ''} 
                      ${i18n.language === 'ar' ? 'font-notokufi' : ''}`}>
                      {testimonial.role}
                    </p>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex mb-4">
                  {renderStars(testimonial.rating)}
                </div>

                {/* Content */}
                <p className={`flex-grow dark:text-gray-300 text-gray-700
                  ${i18n.language === 'fa' ? 'font-vazirmatn' : ''} 
                  ${i18n.language === 'ar' ? 'font-notokufi' : ''}`}>
                  {testimonial.content}
                </p>

                {/* Hover Effect */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${testimonial.color}
                  opacity-0 group-hover:opacity-100 transition-opacity 
                  duration-300 blur-xl -z-10`} />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
} 