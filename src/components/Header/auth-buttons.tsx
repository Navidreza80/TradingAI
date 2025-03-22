"use client";
// Clerk imports
import { SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";
// Icons imports
import { UserIcon } from "lucide-react";
// i18n imports
import { useTranslation } from "react-i18next";
// Redux imports
import { useSelector } from "react-redux";
// Framer Motion
import { motion } from "framer-motion";

export default function AuthButtons() {
  // i18n hooks for translation
  const { t } = useTranslation();
  // Redux States
  const isDarkMode = useSelector((state: any) => state.theme.isDarkMode);

  return (
    <SignedOut>
      <div className="flex items-center gap-2">
        <SignInButton>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`hidden lg:flex items-center gap-1.5 px-3 py-2
              text-sm font-medium rounded-lg border transition-all duration-300
              ${
                isDarkMode
                  ? "text-white/90 border-white/10 hover:bg-white/10"
                  : "text-gray-700 border-gray-200 hover:bg-gray-50"
              }
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
              ${isDarkMode ? "focus:ring-offset-gray-900" : "focus:ring-offset-white"}
            `}
          >
            <UserIcon className="w-4 h-4" />
            <span>{t("auth.login")}</span>
          </motion.button>
        </SignInButton>

        <SignUpButton>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`hidden lg:flex items-center px-4 py-2 text-sm font-medium text-white
              bg-gradient-to-r from-[#1890ff] to-[#69c0ff] rounded-lg
              transition-all duration-300 transform
              hover:shadow-[0_0_20px_rgba(24,144,255,0.3)]
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
              ${isDarkMode ? "focus:ring-offset-gray-900" : "focus:ring-offset-white"}
            `}
          >
            {t("auth.getStarted")}
          </motion.button>
        </SignUpButton>
      </div>
    </SignedOut>
  );
}
