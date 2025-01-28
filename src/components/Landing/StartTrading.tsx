'use client'

import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { 
  ArrowPathIcon,
  ShieldCheckIcon,
  BanknotesIcon,
  ChartBarIcon 
} from '@heroicons/react/24/outline';
import Image from 'next/image';

/**
 * StartTrading Section Component
 * 
 * A section showcasing how to start trading with platform features
 * Features:
 * - Step-by-step guide
 * - Interactive cards
 * - Animated illustrations
 * - RTL support
 * - Theme support
 * - Glass morphism effects
 */
export default function StartTrading() {
  const { t, i18n } = useTranslation();

  const steps = [
    {
      icon: <BanknotesIcon className="w-6 h-6" />,
      title: t('startTrading.steps.deposit.title'),
      description: t('startTrading.steps.deposit.description'),
      color: 'from-green-500 to-emerald-400',
      image: '/image/deposit.png'
    },
    {
      icon: <ChartBarIcon className="w-6 h-6" />,
      title: t('startTrading.steps.analyze.title'),
      description: t('startTrading.steps.analyze.description'),
      color: 'from-blue-500 to-cyan-400',
      image: '/image/analyze.png'
    },
    {
      icon: <ArrowPathIcon className="w-6 h-6" />,
      title: t('startTrading.steps.trade.title'),
      description: t('startTrading.steps.trade.description'),
      color: 'from-purple-500 to-pink-500',
      image: '/image/trade.png'
    },
    {
      icon: <ShieldCheckIcon className="w-6 h-6" />,
      title: t('startTrading.steps.secure.title'),
      description: t('startTrading.steps.secure.description'),
      color: 'from-amber-500 to-orange-400',
      image: '/image/secure.png'
    }
  ];

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

  return (
    <section className="relative py-20 bg-gradient-to-b dark:from-[#1a1a1a] dark:to-[#0a0a0a] from-gray-50 to-white overflow-hidden">
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
            {t('startTrading.title')}
          </h2>
          <p className={`mt-4 text-lg dark:text-gray-400 text-gray-600 max-w-3xl mx-auto 
            ${i18n.language === 'fa' ? 'font-vazirmatn' : ''} 
            ${i18n.language === 'ar' ? 'font-notokufi' : ''}`}>
            {t('startTrading.subtitle')}
          </p>
        </motion.div>

        {/* Steps Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 auto-rows-fr"
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
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
                
                {/* Step Number & Icon */}
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${step.color}
                    flex items-center justify-center text-white font-bold`}>
                    {index + 1}
                  </div>
                  <div className={`p-2 rounded-lg bg-gradient-to-r ${step.color}`}>
                    {step.icon}
                  </div>
                </div>

                {/* Step Content */}
                <div className="flex-grow flex flex-col">
                  <h3 className={`text-xl font-bold dark:text-white text-gray-900 mb-4
                    ${i18n.language === 'fa' ? 'font-vazirmatn' : ''} 
                    ${i18n.language === 'ar' ? 'font-notokufi' : ''}`}>
                    {step.title}
                  </h3>
                  <p className={`dark:text-gray-400 text-gray-600 mb-6
                    ${i18n.language === 'fa' ? 'font-vazirmatn' : ''} 
                    ${i18n.language === 'ar' ? 'font-notokufi' : ''}`}>
                    {step.description}
                  </p>
                </div>

                {/* Step Image */}
                <div className="relative h-32 w-full rounded-lg overflow-hidden">
                  <Image
                    src={step.image}
                    alt={step.title}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Hover Effect */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${step.color.replace('500', '500/20').replace('400', '400/20')}
                  opacity-0 group-hover:opacity-100 transition-opacity 
                  duration-300 blur-xl -z-10`} />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-16 text-center"
        >
          <button className={`px-8 py-4 bg-gradient-to-r from-[#1890ff] to-[#69c0ff]
            rounded-xl text-white font-bold text-lg
            hover:shadow-[0_0_30px_rgba(24,144,255,0.3)]
            transition-all duration-300 hover:scale-[1.02]
            ${i18n.language === 'fa' ? 'font-vazirmatn' : ''} 
            ${i18n.language === 'ar' ? 'font-notokufi' : ''}`}>
            {t('startTrading.cta')}
          </button>
        </motion.div>
      </div>
    </section>
  );
} 