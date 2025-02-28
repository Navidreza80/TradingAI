'use client'

import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { 
  UserGroupIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
  GlobeAltIcon 
} from '@heroicons/react/24/outline';
import CountUp from 'react-countup';
import { convertToLocaleNumber } from '@/lib/utils';
import './Style.css';

/**
 * Stats Section Component
 * 
 * Displays key statistics and metrics with animations and modern design.
 * Features:
 * - Animated counters
 * - Responsive grid layout
 * - Equal height/width cards
 * - Theme support
 * - RTL support
 * - Glass morphism effects
 */
export default function Stats() {
  const { t, i18n } = useTranslation();

  // Format number based on locale
  const formatNumber = (num: number): string => {
    return convertToLocaleNumber(num, i18n.language);
  };

  // Stats data with icons and values
  const stats = [
    {
      icon: <UserGroupIcon className="w-8 h-8" />,
      value: 50000,
      formattedValue: formatNumber(50000),
      title: t('stats.users.title'),
      suffix: i18n.language === 'fa' || i18n.language === 'ar' ? '+' : '+',
      color: 'from-blue-500 to-cyan-400'
    },
    {
      icon: <CurrencyDollarIcon className="w-8 h-8" />,
      value: 1000000,
      formattedValue: formatNumber(1000000),
      title: t('stats.volume.title'),
      prefix: '$',
      suffix: i18n.language === 'fa' || i18n.language === 'ar' ? 'م' : 'M',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: <ChartBarIcon className="w-8 h-8" />,
      value: 99.9,
      formattedValue: formatNumber(99.9),
      title: t('stats.accuracy.title'),
      suffix: i18n.language === 'fa' || i18n.language === 'ar' ? '٪' : '%',
      color: 'from-amber-500 to-orange-400'
    },
    {
      icon: <GlobeAltIcon className="w-8 h-8" />,
      value: 150,
      formattedValue: formatNumber(150),
      title: t('stats.countries.title'),
      suffix: i18n.language === 'fa' || i18n.language === 'ar' ? '+' : '+',
      color: 'from-green-500 to-emerald-400'
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
             
            `}>
            {t('stats.title')}
          </h2>
          <p className={`mt-4 text-lg dark:text-gray-400 text-gray-600 max-w-3xl mx-auto 
             
            `}>
            {t('stats.subtitle')}
          </p>
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
                dark:bg-white/5 bg-white/80
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

                {/* Counter */}
                <div className={`text-4xl font-bold mb-4 bg-gradient-to-r from-[#1890ff] to-[#69c0ff] 
                  bg-clip-text text-transparent flex items-center 
                  ${i18n.language === 'fa' || i18n.language === 'ar' ? 'font-numericpersian' : ''}`}>
                  {stat.prefix && <span>{stat.prefix}</span>}
                  {i18n.language === 'fa' || i18n.language === 'ar' ? (
                    <span>{stat.formattedValue}</span>
                  ) : (
                    <CountUp
                      end={stat.value}
                      duration={2.5}
                      decimals={stat.value % 1 !== 0 ? 1 : 0}
                    />
                  )}
                  {stat.suffix && <span>{stat.suffix}</span>}
                </div>

                {/* Title & Description */}
                <div className="flex-grow flex flex-col">
                  <h3 className={`text-xl font-bold dark:text-white text-gray-900 mb-2
                     
                    `}>
                    {stat.title}
                  </h3>
                  <p className={`dark:text-gray-400 text-gray-600
                     
                    `}>
                  </p>
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