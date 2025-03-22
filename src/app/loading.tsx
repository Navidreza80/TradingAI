"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const LoadingPage = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-gray-900 to-black relative overflow-hidden">
      {/* Background animation */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-500/20"
            initial={{ 
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: 0,
              opacity: 0 
            }}
            animate={{ 
              scale: [0, 1, 0],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: Math.random() * 2 + 1,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Loading animation */}
      <div className="relative">
        <motion.div
          className="w-24 h-24 rounded-full border-4 border-blue-500/30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        />
        <motion.div
          className="absolute top-0 left-0 w-24 h-24 rounded-full border-4 border-t-blue-500 border-r-blue-500 border-b-transparent border-l-transparent"
          animate={{ 
            rotate: 360,
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute top-0 left-0 w-24 h-24 rounded-full border-4 border-t-transparent border-r-transparent border-b-blue-400 border-l-blue-400"
          animate={{ 
            rotate: -180,
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      {/* Loading text */}
      <motion.div
        className="mt-8 text-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-2xl font-semibold bg-gradient-to-r from-blue-400 to-blue-600 text-transparent bg-clip-text mb-2">
          {t('loading.title')}
        </h2>
        <p className="text-gray-400 text-sm">
          {t('loading.subtitle')}
        </p>
      </motion.div>

      {/* Progress bar */}
      <motion.div
        className="w-48 h-1 bg-blue-500/20 rounded-full mt-8 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <motion.div
          className="h-full bg-gradient-to-r from-blue-500 to-blue-400"
          animate={{
            x: ["-100%", "100%"],
          }}
          transition={{
            repeat: Infinity,
            duration: 1.5,
            ease: "easeInOut",
          }}
        />
      </motion.div>
    </div>
  );
};

export default LoadingPage;