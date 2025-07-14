/* eslint-disable */
"use client"
// React built in hooks
import React, { useEffect, useState } from 'react';
// Next built in components
import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';


export default function NotFoundPage() {
  
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      
      // Calculate normalized offset from center (-1 to 1)
      const offsetX = (clientX - centerX) / centerX;
      const offsetY = (clientY - centerY) / centerY;
      
      setMousePosition({ x: offsetX * 20, y: offsetY * 20 });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      <Head>
        <title>404 - Page Not Found</title>
      </Head>
      <div className="min-h-screen flex flex-col justify-center items-center px-4 relative overflow-hidden bg-gradient-to-b from-gray-900 to-black">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-[2px] h-[2px] bg-blue-500/30"
              initial={{ opacity: 0.1, scale: 0 }}
              animate={{
                opacity: [0.1, 0.5, 0.1],
                scale: [0, 1, 0],
                x: [Math.random() * window.innerWidth, Math.random() * window.innerWidth],
                y: [Math.random() * window.innerHeight, Math.random() * window.innerHeight],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
          ))}
        </div>

        {/* Main content */}
        <motion.div 
          className="relative z-10 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Animated 404 SVG */}
          <motion.div 
            className="relative mb-8"
            style={{
              transform: `perspective(1000px) rotateX(${mousePosition.y}deg) rotateY(${mousePosition.x}deg)`,
            }}
          >
            <svg className="w-48 h-48 mx-auto" viewBox="0 0 24 24" fill="none">
              <motion.circle 
                cx="12" 
                cy="12" 
                r="10" 
                stroke="url(#gradient)" 
                strokeWidth="1.5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
              <motion.circle 
                cx={`${9 + mousePosition.x * 0.05}`} 
                cy="10" 
                r="1" 
                fill="#60A5FA"
              />
              <motion.circle 
                cx={`${15 + mousePosition.x * 0.05}`} 
                cy="10" 
                r="1" 
                fill="#60A5FA"
              />
              <motion.path 
                d={`M8 ${16 + mousePosition.y * 0.05}c1.5-2 4.5-2 6 0`}
                stroke="#60A5FA"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="gradient" x1="0" y1="0" x2="24" y2="24">
                  <stop offset="0%" stopColor="#60A5FA" />
                  <stop offset="100%" stopColor="#3B82F6" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>

          {/* Text content */}
          <motion.h1 
            className="text-8xl font-black mb-8 relative"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <span className="relative inline-block">
              <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-400 blur-xl opacity-50" />
              <span className="relative bg-gradient-to-r from-blue-600 to-blue-400 text-transparent bg-clip-text">
                404
              </span>
            </span>
          </motion.h1>

          <motion.p 
            className="text-2xl font-medium text-gray-300 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Page Not Found
          </motion.p>

          <motion.p 
            className="text-gray-400 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            Sorry, we couldn't find the page you're looking for.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <Link 
              href="/" 
              className="inline-block px-8 py-4 rounded-full bg-gradient-to-r from-blue-600 to-blue-400 text-white font-medium transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 hover:scale-105"
            >
              Back to Home
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
};
