"use client";

// imports
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

// tsx render
export default function Welcome() {
  const { t, i18n } = useTranslation();
  // variants for animation
  const variants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="flex flex-row gap-2">
      {/* friendly waving hand icon */}
      <div className="dark:bg-wave bg-waveDark w-[32px] h-[32px] bg-cover"></div>

      {/* A phrase to welcome user with his/her name on it */}
      <motion.h1
        className={`text-4xl font-extrabold w-full dark:text-white text-black ${i18n.language == "fa" && "font-vazirmatn"} ${i18n.language == "ar" && "font-notokufi"}`}
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={variants}
        transition={{ duration: 0.5 }}
      >
        {t("dashboard.welcome.welcome")} Navidreza!
      </motion.h1>
    </div>
  );
}
