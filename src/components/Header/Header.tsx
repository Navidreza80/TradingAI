"use client";

// imports

import Link from "next/link";
import Image from "next/image";
import {
  UserIcon,
  Bars3Icon,
  SunIcon,
  MoonIcon,
  LanguageIcon,
} from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import { Drawer, Button, Dropdown } from "antd";
import type { MenuProps } from "antd";
import { useTranslation } from "react-i18next";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  useUser,
} from "@clerk/nextjs";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePathname } from "next/navigation";

/**
 * Header Component
 *
 * A responsive header component with glass morphism effect, navigation menu,
 * and authentication buttons. Supports multiple languages and theme switching.
 *
 * Features:
 * - Responsive design with mobile-first approach
 * - Multi-language support (English, Persian, Arabic)
 * - Dark/Light theme toggle
 * - Glass morphism effect
 * - RTL support for Arabic and Persian
 * - Animated navigation links
 * - Mobile drawer menu
 */

export default function Header() {
  const { t, i18n } = useTranslation();
  // States
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user } = useUser();

  // Navigation items with translations
  const navItems = [
    { name: t("nav.home"), href: "/", description: t("nav.homeDesc") },
    { name: t("nav.blogs"), href: "/blogs", description: t("nav.blogsDesc") },
    {
      name: t("nav.suggestions"),
      href: "/suggestions",
      description: t("nav.suggestionsDesc"),
    },
    { name: t("nav.about"), href: "/about", description: t("nav.aboutDesc") },
  ];

  // Handle scroll effect
  useEffect(() => {
    // Handle scroll effect if user scrolls down 20px
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle language change
  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);
    document.documentElement.lang = lang;
    document.documentElement.dir =
      lang === "fa" || lang === "ar" ? "rtl" : "ltr";
  };

  // Language menu items
  const languageItems: MenuProps["items"] = [
    {
      key: "en",
      label: "English",
      onClick: () => handleLanguageChange("en"),
    },
    {
      key: "fa",
      label: "فارسی",
      onClick: () => handleLanguageChange("fa"),
    },
    {
      key: "ar",
      label: "العربية",
      onClick: () => handleLanguageChange("ar"),
    },
  ];

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  const pathName = usePathname()

  return !pathName.includes('/dashboard') && (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-md
        ${
          isScrolled
            ? "dark:bg-[rgba(10,10,10,0.95)] dark:shadow-2xl dark:backdrop-blur-xl bg-white/95 shadow-lg backdrop-blur-xl"
            : "dark:bg-transparent bg-white"
        }
        ${i18n.language === "fa" ? "font-vazirmatn" : ""}
        ${i18n.language === "ar" ? "font-notokufi" : ""}
        min-h-[60px] sm:min-h-[68px] lg:min-h-[68px]`}
      role="banner"
    >
      {/* Gradient Border */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r dark:from-transparent dark:via-white/[0.08] dark:to-transparent from-transparent via-black/[0.08] to-transparent" />

      {/* Pattern Overlay */}
      <div
        className={`absolute inset-0 transition-opacity duration-300
        dark:bg-[radial-gradient(circle_at_50%_50%,rgba(24,144,255,0.08)_1px,transparent_1px),radial-gradient(circle_at_50%_50%,rgba(82,196,26,0.05)_1px,transparent_1px)]
        bg-[radial-gradient(circle_at_50%_50%,rgba(24,144,255,0.15)_1px,transparent_1px),radial-gradient(circle_at_50%_50%,rgba(82,196,26,0.1)_1px,transparent_1px)]
        bg-[length:20px_20px,30px_30px] bg-[0_0,15px_15px] animate-headerPattern
        ${isScrolled ? "opacity-30" : "opacity-100"}`}
      />

      {/* Header Content */}
      <div
        className="relative z-10 mx-auto 
        px-3 py-4 xs:px-4 sm:px-6 lg:px-8 xl:px-10 
        flex items-center justify-between
        w-full max-w-[1920px] h-full"
      >
        {/* Logo */}
        <div className="flex-shrink-0 w-[180px]">
          <Link
            href="/"
            className="group flex items-center gap-2 xs:gap-3 transition-transform duration-300 hover:scale-[1.02]"
          >
            <div
              className="relative w-4 h-4 xs:w-5 xs:h-5 sm:w-7 sm:h-7 lg:w-9 lg:h-9 
              flex justify-center items-center"
            >
              <Image
                src={isDarkMode ? "/image/Logo.svg" : "/image/LogoDark.svg"}
                alt="TradingAI Logo"
                width={28}
                height={28}
                className="w-full h-full transition-all duration-300 
                  group-hover:drop-shadow-[0_0_8px_rgba(24,144,255,0.5)]"
                priority
              />
            </div>
            <span
              className="text-base xs:text-lg sm:text-xl lg:text-2xl font-bold 
              bg-gradient-to-r from-[#1890ff] to-[#69c0ff] bg-clip-text text-transparent"
            >
              TradingAI
            </span>
          </Link>
        </div>

        {/* Desktop Navigation - Centered */}
        <nav className="hidden lg:flex items-center justify-center absolute left-1/2 -translate-x-1/2">
          <ul className="flex items-center space-x-4 lg:space-x-6 xl:space-x-8">
            {navItems.map((item) => (
              <li
                key={item.name}
                className={`${
                  i18n.language === "fa" || i18n.language === "ar"
                    ? "ml-[32px]"
                    : "first:ml-0"
                }`}
              >
                <Link
                  href={item.href}
                  className="relative text-sm lg:text-base dark:text-white/80 text-black font-medium
                    hover:text-gray-900 dark:hover:text-white
                    after:absolute after:bottom-0 after:left-0 after:right-0
                    after:h-0.5 after:w-0 after:bg-gradient-to-r
                    after:from-[#1890ff] after:to-[#69c0ff]
                    after:transition-all after:duration-300
                    py-2
                    hover:after:w-full"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Action Buttons - Desktop Only */}
        <div
          className="hidden lg:flex items-center gap-2 lg:gap-3 xl:gap-4
          w-[90px] xs:w-[100px] sm:w-[140px] lg:w-[300px]
          justify-end"
        >
          {/* Theme & Language */}
          <div className="flex items-center gap-1 p-1 bg-white/5 rounded-full">
            <button
              onClick={toggleDarkMode}
              className="p-1 xs:p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
            >
              {isDarkMode ? (
                <SunIcon className="w-3.5 h-3.5 xs:w-4 xs:h-4 dark:text-white/80 text-gray-700" />
              ) : (
                <MoonIcon className="w-3.5 h-3.5 xs:w-4 xs:h-4 dark:text-white/80 text-gray-700" />
              )}
            </button>
            <div className="w-[1px] h-3.5 xs:h-4 bg-white/10" />
            <Dropdown menu={{ items: languageItems }} trigger={["click"]}>
              <button className="p-1 xs:p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors">
                <LanguageIcon className="w-3.5 h-3.5 xs:w-4 xs:h-4 dark:text-white/80 text-gray-700" />
              </button>
            </Dropdown>
          </div>

          {/* Auth Buttons */}
          <SignedOut>
            <SignInButton>
              <button
                className="hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 w-[110px]
            text-sm font-bold
            dark:text-white/80 text-black transition-colors delay-300 hover:text-[#1677ff] 
   rounded-[6px] hover:border-solid hover:border hover:border-[#1677ff]
            dark:hover:bg-white/5 hover:bg-gray-50"
              >
                <UserIcon className="w-3.5 h-3.5 xs:w-4 xs:h-4" />
                {t("auth.login")}
              </button>
            </SignInButton>
            <SignUpButton>
              <button
                className="hidden lg:block px-3 py-1.5 text-xs sm:text-sm font-medium text-white w-[120px]
            bg-gradient-to-r from-[#1890ff] to-[#69c0ff]
            rounded-[6px] transition-all duration-300
            hover:shadow-[0_0_20px_rgba(24,144,255,0.3)]
            hover:scale-[1.02]"
              >
                {t("auth.getStarted")}
              </button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <DropdownMenu>
              <DropdownMenuTrigger>
                  <Image
                    src={user?.imageUrl || "/image/user.png"}
                    alt={user?.username || "User Avatar"}
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuItem>Subscription</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SignedIn>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-1.5 xs:p-2 rounded-lg 
            hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <Bars3Icon className="w-5 h-5 xs:w-6 xs:h-6 dark:text-white/80 text-gray-700" />
        </button>
      </div>

      {/* Mobile Drawer */}
      <Drawer
        title={
          <div
            className={`flex items-center gap-3
            ${i18n.language === "fa" ? "font-vazirmatn" : ""}
            ${i18n.language === "ar" ? "font-notokufi" : ""}`}
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
          </div>
        }
        placement={
          i18n.language === "ar" || i18n.language === "fa" ? "left" : "right"
        }
        onClose={() => setIsMobileMenuOpen(false)}
        open={isMobileMenuOpen}
        width={300}
        className={`mobile-drawer
          ${i18n.language === "fa" ? "font-vazirmatn" : ""}
          ${i18n.language === "ar" ? "font-notokufi" : ""}`}
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
        <nav className="mb-8" aria-label="Mobile navigation">
          <ul
            className={`space-y-4 
            ${i18n.language === "fa" ? "font-vazirmatn text-right" : ""}
            ${i18n.language === "ar" ? "font-notokufi text-right" : ""}`}
          >
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`font-bold block py-2 px-4 rounded-lg
                    transition-all duration-200
                    ${
                      isDarkMode
                        ? "text-white/85 hover:text-white hover:bg-white/5"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                    }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-label={item.description}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile Settings */}
        <div
          className={`flex justify-center gap-4 mb-8 py-4 border-t border-b
          ${isDarkMode ? "border-white/[0.08]" : "border-gray-200"}
          ${i18n.language === "fa" ? "font-vazirmatn" : ""}
          ${i18n.language === "ar" ? "font-notokufi" : ""}`}
        >
          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-full transition-colors
              ${
                isDarkMode
                  ? "hover:bg-white/10 text-white/85"
                  : "hover:bg-gray-100 text-gray-600"
              }`}
            aria-label={
              isDarkMode ? "Switch to light mode" : "Switch to dark mode"
            }
          >
            {isDarkMode ? (
              <SunIcon className="w-5 h-5" />
            ) : (
              <MoonIcon className="w-5 h-5" />
            )}
          </button>
          <Dropdown
            menu={{ items: languageItems }}
            placement="bottomRight"
            trigger={["click"]}
          >
            <button
              className={`p-2 rounded-full transition-colors
                ${
                  isDarkMode
                    ? "hover:bg-white/10 text-white/85"
                    : "hover:bg-gray-100 text-gray-600"
                }`}
              aria-label="Change language"
            >
              <LanguageIcon className="w-5 h-5" />
            </button>
          </Dropdown>
        </div>

        {/* Mobile Auth Buttons */}
        <div
          className={`space-y-4 mt-auto
          ${i18n.language === "fa" ? "font-vazirmatn" : ""}
          ${i18n.language === "ar" ? "font-notokufi" : ""}`}
        >
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
        </div>
      </Drawer>
    </header>
  );
}
