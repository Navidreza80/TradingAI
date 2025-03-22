"use client";
// i18n imports
import { useTranslation } from "react-i18next";
// Next imports
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
// Third party components
import ThemeNLanguage from "./theme-n-language";
// Icons imports
import { UserIcon } from "lucide-react";
// Antd style library imports
import { Button, Drawer } from "antd";
// Redux imports
import { useSelector } from "react-redux";
import { SignedOut } from "@clerk/nextjs";
// Framer Motion
import { motion, AnimatePresence } from "framer-motion";

export default function MobileDrawer({
  setIsMobileMenuOpen,
  isMobileMenuOpen,
}: {
  setIsMobileMenuOpen: (value: boolean) => void;
  isMobileMenuOpen: boolean;
}) {
  // i18n hooks for translation
  const [t, i18n] = useTranslation();
  // Redux hooks for recognizing theme
  const isDarkMode = useSelector((state: any) => state.theme.isDarkMode);
  // Current pathname
  const pathname = usePathname();
  // Navigation items with translations
  const navItems = [
    { name: t("nav.home"), href: "/", description: t("nav.homeDesc") },
    { name: t("nav.blogs"), href: "/blogs", description: t("nav.blogsDesc") },
    {
      name: t("nav.signals"),
      href: "/signals",
      description: t("nav.signalsDesc"),
    },
    { name: t("nav.trade"), href: "/trade", description: t("nav.tradeDesc") },
    {
      name: t("nav.strategies"),
      href: "/education",
      description: t("nav.strategiesDesc"),
    },
    { name: t("nav.about"), href: "/about", description: t("nav.aboutDesc") },
  ];

  // Animation variants
  const listVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 },
  };

  return (
    <Drawer
      title={
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3"
        >
          <Image
            src={isDarkMode ? "/image/Logo.svg" : "/image/LogoDark.svg"}
            alt="TradingAI Logo"
            width={24}
            height={24}
            className="transition-all duration-300"
          />
          <span className="bg-gradient-to-r from-[#1890ff] to-[#69c0ff] bg-clip-text text-transparent font-bold">
            TradingAI
          </span>
        </motion.div>
      }
      placement={
        i18n.language === "ar" || i18n.language === "fa" ? "left" : "right"
      }
      onClose={() => setIsMobileMenuOpen(false)}
      open={isMobileMenuOpen}
      width={300}
      className='mobile-drawer'
      styles={{
        header: {
          borderBottom: isDarkMode
            ? "1px solid rgba(255, 255, 255, 0.08)"
            : "1px solid rgba(0, 0, 0, 0.08)",
          padding: "16px 24px",
          background: isDarkMode
            ? "rgba(15, 15, 15, 0.98)"
            : "rgba(255, 255, 255, 0.98)",
        },
        body: {
          background: isDarkMode
            ? "rgba(15, 15, 15, 0.98)"
            : "rgba(255, 255, 255, 0.98)",
          padding: "24px",
        },
        mask: {
          backdropFilter: "blur(8px)",
          background: "rgba(0, 0, 0, 0.5)",
        },
        wrapper: {
          background: "transparent",
        },
        content: {
          boxShadow: "none",
        },
      }}
    >
      {/* Mobile Navigation */}
      <nav>
        <motion.ul
          variants={listVariants}
          initial="hidden"
          animate="show"
          className="space-y-4"
        >
          {navItems.map((item) => (
            <motion.li key={item.name} variants={itemVariants}>
              <Link
                href={item.href}
                className={`relative font-medium block py-3 px-4 rounded-lg
                  transition-all duration-200 overflow-hidden group
                  ${
                    pathname === item.href
                      ? isDarkMode
                        ? "text-white bg-white/10"
                        : "text-blue-600 bg-blue-50"
                      : isDarkMode
                      ? "text-white/85 hover:text-white hover:bg-white/5"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label={item.description}
              >
                <span className="relative z-10">{item.name}</span>
                <motion.div
                  className={`absolute inset-0 ${
                    isDarkMode ? "bg-white/5" : "bg-blue-50"
                  }`}
                  initial={{ scale: 0 }}
                  animate={pathname === item.href ? { scale: 1 } : { scale: 0 }}
                  transition={{ duration: 0.2 }}
                />
              </Link>
            </motion.li>
          ))}
        </motion.ul>
      </nav>

      {/* Mobile Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className={`flex justify-center gap-4 mt-8 py-4 border-t border-b
          ${isDarkMode ? "border-white/[0.08]" : "border-gray-200"}`}
      >
        <ThemeNLanguage responsive={"max-[900px]:flex"} />
      </motion.div>

      {/* Mobile Auth Buttons */}
      <div
        className={`space-y-4 mt-auto
          ${i18n.language === "fa" ? "font-vazirmatn" : ""}
          ${i18n.language === "ar" ? "font-notokufi" : ""}`}
      >
        <SignedOut>
          <Button
            type="text"
            className={`w-full h-12 flex items-center justify-center gap-2
              transition-all duration-300 font-bold
              ${isDarkMode ? "text-white/85" : "text-gray-600"}`}
            icon={<UserIcon className="w-5 h-5" />}
          >
            {t("auth.login")}
          </Button>
          <Button
            type="primary"
            className="w-full h-12 bg-gradient-to-r from-[#1890ff] to-[#69c0ff]
              border-none rounded-lg font-bold text-white hover:opacity-90
              hover:shadow-[0_0_20px_rgba(24,144,255,0.3)] transition-all duration-300"
          >
            {t("auth.getStarted")}
          </Button>
        </SignedOut>
      </div>
    </Drawer>
  );
}
