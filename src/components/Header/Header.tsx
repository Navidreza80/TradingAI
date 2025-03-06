"use client";

// next imports
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

// icons imports
import {
  UserIcon,
  Bars3Icon,
  SunIcon,
  MoonIcon,
  LanguageIcon,
} from "@heroicons/react/24/outline";

// react imports
import { useState, useEffect } from "react";

// antd importss
import { Drawer, Button, Dropdown } from "antd";
import type { MenuProps } from "antd";

// i18n imports
import { useTranslation } from "react-i18next";

// auth imports
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
  SignUpButton,
  useUser,
} from "@clerk/nextjs";

// shadcn imports
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Logo from "../Logo";
import Navigation from "./header-navigation";
import ThemeNLanguage from "../theme-n-language";
import { useSelector } from "react-redux";

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
  // i18n (translation) hooks
  const { t, i18n } = useTranslation();

  // States
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);

  // auth hooks
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

  const pathName = usePathname();

  return (
    !pathName.includes("/dashboard") && (
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-md
        ${
          isScrolled
            ? "dark:bg-[rgba(10,10,10,0.95)] dark:shadow-2xl dark:backdrop-blur-xl bg-white/95 shadow-lg backdrop-blur-xl"
            : "dark:bg-transparent bg-white"
        }
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
          <Logo isDarkMode={isDarkMode} />

          {/* Desktop Navigation - Centered */}
          <Navigation />

          {/* Action Buttons - Desktop Only */}
          <div
            className="hidden lg:flex items-center gap-2 lg:gap-3 xl:gap-4
          w-[90px] xs:w-[100px] sm:w-[140px] lg:w-[300px]
          justify-end"
          >
            {/* Theme & Language */}
            <ThemeNLanguage responsive={"max-[900px]:hidden"} />

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
                  <DropdownMenuItem>
                    <SignOutButton>Sign Out</SignOutButton>
                  </DropdownMenuItem>
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
          ${isDarkMode ? "border-white/[0.08]" : "border-gray-200"}`}
          >
            <ThemeNLanguage responsive={"max-[900px]:flex"} />
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
    )
  );
}
