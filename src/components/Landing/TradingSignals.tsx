'use client'
// Framer motion imports for animation
import { motion } from 'framer-motion';
// i18n imports for translation
import { useTranslation } from 'react-i18next';
// Icons imports
import {
  ChartBarIcon
} from '@heroicons/react/24/outline';
// Global style
import { BitcoinIcon, ClockIcon, StarIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import './Style.css';

export default function TradingSignals() {
  // i18n hooks for translation
  const { t, i18n } = useTranslation();
  const router = useRouter();

  // Stats data with icons and values
  const stats = [
    {
      icon: <BitcoinIcon className="w-8 h-8" />,
      value: 'BTCUSDT',
      title: t('signals.selectP'),
      color: 'from-blue-500 to-cyan-400',
    },
    {
      icon: <ClockIcon className="w-8 h-8" />,
      value: '1h',
      title: t('signals.selectT'),
      color: 'from-emerald-500 to-teal-500'
    },
    {
      icon: <ChartBarIcon className="w-8 h-8" />,
      value: '100',
      title: t('signals.adjustC'),
      color: 'from-amber-500 to-orange-400'
    },
    {
      icon: <StarIcon className="w-8 h-8" />,
      value: 'TP / SL',
      title: t('signals.generateS'),
      color: 'from-purple-500 to-pink-500'
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

  return (
    <section className="relative py-11 bg-background-light dark:bg-background-dark overflow-hidden ">
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
          <h2 className='text-3xl sm:text-4xl lg:text-5xl font-bold p-3
            text-primary-light dark:text-primary-dark'>
            {t('signals.title')}
          </h2>
          <p className={`mt-4 text-lg text-secondary-light dark:text-secondary-dark max-w-3xl mx-auto 
             
            `}>
            {t('signals.desc')}
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push('/signals')}
            className="mt-8 px-8 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-400
              text-white font-semibold shadow-lg hover:shadow-xl
              transition-all duration-300"
          >
            {t('signals.getSignal')}
          </motion.button>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 auto-rows-fr"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative group h-full"
            >
              <div className="relative z-10 p-8 rounded-2xl 
                dark:border-white/10 border-black/5 border
                backdrop-blur-xl 
                dark:hover:bg-white/10 hover:bg-white/90
                transition-all duration-300 hover:scale-[1.02]
                dark:hover:shadow-[0_0_30px_rgba(24,144,255,0.1)]
                hover:shadow-[0_0_30px_rgba(24,144,255,0.2)]
                h-full flex flex-col items-center text-center">
                
                {/* Icon */}
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${stat.color}
                  shadow-lg mb-6`}>
                  {stat.icon}
                </div>

                {/* Value */}
                <div className='text-4xl font-bold mb-4 
                  bg-clip-text text-transparent flex items-center'>
                    <span className='text-secondary-light dark:text-secondary-dark'>{stat.value}</span>
                </div>

                {/* Title */}
                <div className="flex-grow flex flex-col">
                  <h3 className={`text-xl font-bold text-primary-light dark:text-primary-dark mb-2
                     
                    `}>
                    {stat.title}
                  </h3>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r 
                  dark:from-blue-500/20 dark:to-purple-500/20 
                  from-blue-500/10 to-purple-500/10
                  opacity-0 group-hover:opacity-100 transition-opacity 
                  duration-300 blur-xl -z-10" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}