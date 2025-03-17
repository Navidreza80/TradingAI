'use client'
// Framer motion imports for user animation
import { motion } from 'framer-motion';
// i18n imports for translation
import { useTranslation } from 'react-i18next';
// Icons imports
import {
  AcademicCapIcon,
  BookOpenIcon,
  TrophyIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline';
// Next imports
import { useRouter } from 'next/navigation';
// Global styles
import './Style.css';

export default function TradingStrategies() {
  const { t } = useTranslation();
  const router = useRouter();

  const features = [
    {
      icon: <BookOpenIcon className="w-8 h-8" />,
      value: 50,
      title: t('strategies.courses'),
      description: t('strategies.coursesDesc'),
      color: 'from-blue-500 to-cyan-400'
    },
    {
      icon: <AcademicCapIcon className="w-8 h-8" />,
      value: 1000,
      title: t('strategies.exercises'),
      description: t('strategies.exercisesDesc'),
      color: 'from-emerald-500 to-teal-500'
    },
    {
      icon: <TrophyIcon className="w-8 h-8" />,
      value: 20,
      title: t('strategies.certificates'),
      description: t('strategies.certificatesDesc'),
      color: 'from-amber-500 to-orange-400'
    },
    {
      icon: <UserGroupIcon className="w-8 h-8" />,
      value: 5000,
      title: t('strategies.students'),
      description: t('strategies.studentsDesc'),
      color: 'from-purple-500 to-pink-500'
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
    <section className="relative py-11 bg-background-light dark:bg-background-dark overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(24,144,255,0.1)_1px,transparent_1px)] 
        bg-[length:20px_20px] opacity-50 dark:opacity-50" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold p-3 text-primary-light dark:text-primary-dark">
            {t('strategies.title')}
          </h2>
          <p className="mt-4 text-lg text-secondary-light dark:text-secondary-dark max-w-3xl mx-auto">
            {t('strategies.description')}
          </p>
          <div className="flex justify-center gap-4 mt-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push('/strategies/learn')}
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500
                text-white font-semibold shadow-lg hover:shadow-xl
                transition-all duration-300"
            >
              {t('strategies.startLearning')}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push('/strategies/test')}
              className="px-8 py-3 rounded-xl border-2 border-emerald-500
                dark:text-white text-gray-900 font-semibold
                hover:bg-emerald-500/10 transition-all duration-300"
            >
              {t('strategies.takeTest')}
            </motion.button>
          </div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative group"
            >
              <div className="relative z-10 p-8 rounded-2xl 
                dark:border-white/10 border-black/5 border
                backdrop-blur-xl 
                dark:hover:bg-white/10 hover:bg-white/90
                transition-all duration-300 hover:scale-[1.02]
                dark:hover:shadow-[0_0_30px_rgba(24,144,255,0.1)]
                hover:shadow-[0_0_30px_rgba(24,144,255,0.2)]
                h-full flex flex-col items-center text-center">
                
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${feature.color}
                  shadow-lg mb-6`}>
                  {feature.icon}
                </div>

                <div className="text-4xl font-bold mb-4 text-secondary-light dark:text-secondary-dark">
                  {feature.value}+
                </div>

                <h3 className="text-xl font-bold dark:text-primary-dark text-primary-light mb-2">
                  {feature.title}
                </h3>
                
                <p className="text-sm dark:text-secondary-dark text-secondary-light">
                  {feature.description}
                </p>

                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r 
                  dark:from-emerald-500/20 dark:to-teal-500/20 
                  from-emerald-500/10 to-teal-500/10
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