"use client";

import {
    ArrowTrendingUpIcon,
    MagnifyingGlassIcon,
    RssIcon
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { PaperclipIcon, UsersIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { FaRobot } from "react-icons/fa";

export default function AnalyzeYourself() {
  const { t } = useTranslation();

  // Features to display
  const features = [
    {
      icon: <PaperclipIcon className="w-8 h-8 text-white" />,
      title: t("analyze.demo"),
      description: t("analyze.desc"),
      color: "from-blue-500 to-cyan-400",
    },
    {
      icon: <FaRobot className="w-8 h-8 text-white" />,
      title: t("analyze.titleR"),
      description: t("analyze.descR"),
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: <MagnifyingGlassIcon className="w-8 h-8 text-white" />,
      title: t("analyze.titleM"),
      description: t("analyze.descM"),
      color: "from-amber-500 to-orange-400",
    },
    {
      icon: <UsersIcon className="w-8 h-8 text-white" />,
      title: t("analyze.titleF"),
      description: t("analyze.descF"),
      color: "from-green-500 to-emerald-400",
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="relative py-11 dark:bg-background-dark bg-background-light overflow-hidden">

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
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold p-3 text-primary-light dark:text-primary-dark">
            {t("analyze.title")}
          </h2>
          <p className="mt-6 text-lg sm:text-xl text-secondary-light dark:text-secondary-dark max-w-3xl mx-auto font-medium">
            {t("analyze.description")}
          </p>
          <div className="flex justify-center gap-4 mt-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-400
                text-white font-semibold shadow-lg hover:shadow-xl
                transition-all duration-300"
            >
              {t('analyze.execute')}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 rounded-xl border-2 from-amber-500
                dark:text-white text-gray-900 font-semibold
                hover:bg-emerald-500/10 transition-all duration-300"
            >
              {t('analyze.analyze')}
            </motion.button>
          </div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative group h-full"
            >
              <div className="relative z-10 p-8 rounded-2xl dark:border-white/10 border-black/5 border backdrop-blur-xl dark:hover:bg-white/10 hover:bg-white/90 transition-all duration-300 hover:scale-[1.02] dark:hover:shadow-[0_0_30px_rgba(24,144,255,0.1)] hover:shadow-[0_0_30px_rgba(24,144,255,0.2)] h-full flex flex-col items-center">
                {/* Icon */}
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center`}>
                  {feature.icon}
                </div>

                {/* Content */}
                <h3 className="mt-6 text-xl font-bold dark:text-primary-dark text-primary-light">
                  {feature.title}
                </h3>
                <p className="mt-4 flex-grow dark:text-secondary-dark text-secondary-light text-center">
                  {feature.description}
                </p>

                {/* Hover Effect */}
                <div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${feature.color.replace(
                    "500",
                    "500/20"
                  ).replace("400", "400/20")} opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl -z-10`}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
} 