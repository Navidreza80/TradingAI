'use client'

import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import {
  UserGroupIcon,
  GlobeAltIcon,
  CubeTransparentIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';

export default function AboutPage() {
  const { t, i18n } = useTranslation();

  const stats = [
    {
      icon: <UserGroupIcon className="w-6 h-6" />,
      value: '50K+',
      label: t('about.stats.users'),
      color: 'from-blue-500 to-cyan-400'
    },
    {
      icon: <GlobeAltIcon className="w-6 h-6" />,
      value: '150+',
      label: t('about.stats.countries'),
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: <CubeTransparentIcon className="w-6 h-6" />,
      value: '99.9%',
      label: t('about.stats.uptime'),
      color: 'from-amber-500 to-orange-400'
    },
    {
      icon: <ShieldCheckIcon className="w-6 h-6" />,
      value: '24/7',
      label: t('about.stats.support'),
      color: 'from-green-500 to-emerald-400'
    }
  ];

  const team = [
    {
      name: 'Sarah Johnson',
      role: t('about.team.roles.ceo'),
      image: '/image/8b167af653c2399dd93b952a48740620.jpg'
    },
    {
      name: 'David Chen',
      role: t('about.team.roles.cto'),
      image: '/image/8b167af653c2399dd93b952a48740620.jpg'
    },
    {
      name: 'Emily Williams',
      role: t('about.team.roles.product'),
      image: '/image/8b167af653c2399dd93b952a48740620.jpg'
    }
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b dark:from-[#0a0a0a] dark:to-[#1a1a1a] from-white to-gray-50 pt-24 pb-12">
      {/* Hero Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20"
        >
          <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 p-2
            bg-gradient-to-r dark:from-white dark:to-gray-400 from-gray-900 to-gray-600 
            bg-clip-text text-transparent 
             
            `}>
            {t('about.title')}
          </h1>
          <p className={`text-xl dark:text-gray-400 text-gray-600 max-w-3xl mx-auto p-2
             
            `}>
            {t('about.subtitle')}
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-20"
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              className="relative group"
            >
              <div className="relative z-10 p-6 rounded-2xl 
                dark:border-white/10 border-black/5 border
                backdrop-blur-xl 
                dark:bg-white/5 bg-white/80
                dark:hover:bg-white/10 hover:bg-white/90
                transition-all duration-300 hover:scale-[1.02]
                dark:hover:shadow-[0_0_30px_rgba(24,144,255,0.1)]
                hover:shadow-[0_0_30px_rgba(24,144,255,0.2)]
                text-center"
              >
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${stat.color}
                  shadow-lg mb-4`}>
                  {stat.icon}
                </div>
                <div className={`text-3xl font-bold mb-2 dark:text-white text-gray-900
                  ${i18n.language === 'fa' || i18n.language === 'ar' ? 'font-numericpersian' : ''}`}>
                  {stat.value}
                </div>
                <div className={`dark:text-gray-400 text-gray-600
                   
                  `}>
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Mission Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-20"
        >
          <div className="max-w-3xl mx-auto text-center">
            <h2 className={`text-3xl font-bold mb-6 dark:text-white text-gray-900
               
              `}>
              {t('about.mission.title')}
            </h2>
            <p className={`text-lg dark:text-gray-400 text-gray-600
               
              `}>
              {t('about.mission.description')}
            </p>
          </div>
        </motion.div>

        {/* Team Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h2 className={`text-3xl font-bold mb-12 text-center dark:text-white text-gray-900
             
            `}>
            {t('about.team.title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 * index }}
                className="relative group"
              >
                <div className="relative z-10 rounded-2xl overflow-hidden
                  dark:border-white/10 border-black/5 border
                  backdrop-blur-xl 
                  dark:bg-white/5 bg-white/80
                  transition-all duration-300 hover:scale-[1.02]
                  dark:hover:shadow-[0_0_30px_rgba(24,144,255,0.1)]
                  hover:shadow-[0_0_30px_rgba(24,144,255,0.2)]"
                >
                  <div className="relative h-64 w-full">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6 text-center">
                    <h3 className={`text-xl font-bold mb-2 dark:text-white text-gray-900
                       
                      `}>
                      {member.name}
                    </h3>
                    <p className={`dark:text-gray-400 text-gray-600
                       
                      `}>
                      {member.role}
                    </p>
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