"use client";
// Framer motion imports for animation
import { motion } from "framer-motion";
// Antd style library imports
import { Button } from "antd";
// Next imports
import Link from "next/link";
// 3D imports
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import Model from "../3D/model";
// responsive
import { useMediaQuery } from "react-responsive";
// Types
import { HeroModelsType } from "@/types";

export default function HeroSection() {
  // responsive hooks
  // For very small screens
  const isSmall = useMediaQuery({ maxWidth: 440 });
  // For mobiles
  const isMobile = useMediaQuery({ maxWidth: 768 });
  // For Tablets
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1024 });
  // 3D model scale
  const modelScale = 0.2;

  // models array
  const models: HeroModelsType[] = [
    {
      url: "/models/bitcoin.glb",
      position: isSmall ? [-2, 3.5, -3] : isMobile ? [-4, 3.5, -2.5] : isTablet ? [-6, 3.5, -2] : [-7, 3.5, 0],
    },
    {
      url: "/models/chart.glb",
      position: isSmall ? [2, 3.5, -3] : isMobile ? [4, 3.5, -2.5] : isTablet ? [6, 3.5, -2] : [7, 3.5, 0],
    },
    {
      url: "/models/robot.glb",
      position: isSmall ? [-2, -3.5, -3] : isMobile ? [-4, -3.5, -2.5] : isTablet ? [-6, -3.5, -2] : [-7, -3.5, 0],
    },
    {
      url: "/models/graph.glb",
      position: isSmall ? [2, -3.5, -3] : isMobile ? [4, -3.5, -2.5] : isTablet ? [6, -3.5, -2] : [7, -3.5, 0],
    },
  ]

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden dark:bg-background-dark bg-background-light">
      {/* 3D Objects Canvas */}
      <div className="absolute inset-0 z-0">
        <Canvas
          camera={{ position: [0, 0, 15], fov: 40 }}
          gl={{ alpha: true, antialias: true }}
        >
          <ambientLight intensity={2} />
          <pointLight position={[10, 10, 10]} />
          <Suspense fallback={null}>
            {models.map((item, index) => {
              return (
                <Model
                  key={index}
                  url={item.url}
                  position={item.position}
                  rotation={[0, 0, 0]}
                  scale={modelScale}
                />
              )
            })}

          </Suspense>
        </Canvas>
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div
          className="flex flex-col items-center justify-center text-center space-y-12 max-w-4xl mx-auto"
        >
          {/* Main Title */}
          <div
            className="space-y-6 w-full"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-none">
              <span className="inline-block text-headline-light dark:text-headline-dark pb-2 dark:text-primary-dark text-primary-light">
              Trade Smarter with AI
              </span>
              <br />
              <span className="inline-block text-headline-light dark:text-headline-dark dark:text-primary-dark text-primary-light">
              Master the Crypto Market
              </span>
            </h1>
            <div
              className="text-secondary-light dark:text-secondary-dark max-w-3xl mx-auto text-base sm:text-lg md:text-xl font-medium px-4"
            >
              Experience the power of AI-driven trading analysis, real-time market insights, and professional-grade tools to maximize your crypto trading potential.
            </div>
          </div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full"
          >
            <Link href="/trade" className="sm:w-auto">
              <Button
                type="primary"
                size="large"
                className="bounce-button w-full text-subtitle-light dark:text-subtitle-dark sm:w-auto h-12 sm:h-14 px-6 sm:px-8 text-base sm:text-lg font-bold rounded-xl bg-button-primary-light dark:bg-button-primary-dark border-none transition-all duration-300"
              >
                Get Started
              </Button>
            </Link>
            <Link href="/about" className="sm:w-auto">
              <Button
                size="large"
                className="w-full sm:w-auto h-12 sm:h-14 px-6 sm:px-8 text-base sm:text-lg font-bold rounded-xl bg-button-secondary-light dark:bg-button-secondary-dark border-none hover:scale-105 transition-all duration-300"
              >
                Learn More
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1890ff]/20 to-transparent dark:via-[#1890ff]/20 light:via-[#1890ff]/10" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-[#1890ff]/10 blur-sm dark:bg-[#1890ff]/10 light:bg-[#1890ff]/5" />
    </section>
  );
}
