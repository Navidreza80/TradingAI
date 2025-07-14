/* eslint-disable */
"use client";
// Next imports
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
// Third party components
import ThemeNLanguage from "./theme-n-language";
// Icons imports
import {
  BarChart2,
  BookOpen,
  ChevronDown,
  ChevronRight,
  Home,
  Info,
  LayoutDashboard,
  Newspaper,
  UserIcon,
  Zap,
} from "lucide-react";
// Antd style library imports
import { Drawer } from "antd";
// Redux imports
import { SignedIn, SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";
import { useSelector } from "react-redux";
// Framer Motion
import { motion } from "framer-motion";
// React built in
import { useState } from "react";

export default function MobileDrawer({
  setIsMobileMenuOpen,
  isMobileMenuOpen,
}: {
  setIsMobileMenuOpen: (value: boolean) => void;
  isMobileMenuOpen: boolean;
}) {
  // Redux hooks for recognizing theme
  const isDarkMode = useSelector((state: any) => state.theme.isDarkMode);
  // Current pathname
  const pathname = usePathname();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleDropdown = (itemName: string) => {
    setExpandedItems((prev) =>
      prev.includes(itemName)
        ? prev.filter((item) => item !== itemName)
        : [...prev, itemName]
    );
  };

  // Navigation items with translations and icons
  const navItems = [
    {
      name: "Home",
      href: "/",
      icon: <Home className="w-5 h-5" />,
    },
    {
      name: "Market",
      href: "#",
      icon: <BarChart2 className="w-5 h-5" />,
      dropdown: [
        { name: "Forex", href: "/market/forex" },
        { name: "Stocks", href: "/market/stock" },
        { name: "Crypto", href: "/market/crypto" },
      ],
    },
    {
      name: "News",
      href: "/news",
      icon: <Newspaper className="w-5 h-5" />,
      dropdown: [
        { name: "Forex News", href: "/news/forex" },
        { name: "Stock Market News", href: "/news/stocks" },
        { name: "Cryptocurrency News", href: "/news/crypto" },
        { name: "Blogs", href: "/news/blogs" },
      ],
    },
    {
      name: "Signals",
      href: "#",
      icon: <Zap className="w-5 h-5" />,
      dropdown: [
        {
          name: "AI Signal Generator",
          href: "/signals/ai-generator",
        },
      ],
    },
    {
      name: "Education",
      href: "#",
      icon: <BookOpen className="w-5 h-5" />,
      dropdown: [
        {
          name: "Beginner",
          href: "/education/beginner",
        },
        {
          name: "Markets",
          href: "/education/markets",
        },
        { name: "Web3", href: "/education/web3" },
        {
          name: "Strategies",
          href: "/education/technical",
        },
        {
          name: "Indicators",
          href: "/education/indicators",
        },
        { name: "Exams", href: "/education/test" },
      ],
    },
    {
      name: "About",
      href: "/about",
      icon: <Info className="w-5 h-5" />,
    },
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
    <>
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
        placement="right"
        onClose={() => setIsMobileMenuOpen(false)}
        open={isMobileMenuOpen}
        width={300}
        className="mobile-drawer"
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
                <div className="flex flex-col">
                  <div className="flex items-center">
                    <Link
                      href={item.href}
                      className={`relative font-medium flex items-center py-3 px-4 rounded-lg
                        transition-all duration-200 overflow-hidden group flex-grow
                        ${
                          pathname === item.href ||
                          pathname.startsWith(item.href + "/")
                            ? isDarkMode
                              ? "text-white bg-white/10"
                              : "text-blue-600 bg-blue-50"
                            : isDarkMode
                            ? "text-white/85 hover:text-white hover:bg-white/5"
                            : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                        }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <span
                        className={`mr-3 ${
                          pathname === item.href ||
                          pathname.startsWith(item.href + "/")
                            ? "text-blue-500"
                            : ""
                        }`}
                      >
                        {item.icon}
                      </span>
                      <span className="relative z-10">{item.name}</span>
                      <motion.div
                        className={`absolute inset-0 ${
                          isDarkMode ? "bg-white/5" : "bg-blue-50"
                        }`}
                        initial={{ scale: 0 }}
                        animate={
                          pathname === item.href ||
                          pathname.startsWith(item.href + "/")
                            ? { scale: 1 }
                            : { scale: 0 }
                        }
                        transition={{ duration: 0.2 }}
                      />
                    </Link>

                    {item.dropdown && (
                      <button
                        onClick={() => toggleDropdown(item.name)}
                        className={`p-3 rounded-lg ml-1 ${
                          isDarkMode
                            ? "text-white/70 hover:text-white hover:bg-white/5"
                            : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
                        }`}
                        aria-label={
                          expandedItems.includes(item.name)
                            ? "Collapse menu"
                            : "Expand menu"
                        }
                      >
                        {expandedItems.includes(item.name) ? (
                          <ChevronDown className="w-4 h-4" />
                        ) : (
                          <ChevronRight className="w-4 h-4" />
                        )}
                      </button>
                    )}
                  </div>

                  {/* Dropdown Items */}
                  {item.dropdown && expandedItems.includes(item.name) && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="ml-8 mt-1 space-y-1 overflow-hidden"
                    >
                      {item.dropdown.map((dropdownItem) => (
                        <Link
                          key={dropdownItem.name}
                          href={dropdownItem.href}
                          className={`block py-2 px-4 rounded-md text-sm
                            ${
                              pathname === dropdownItem.href
                                ? isDarkMode
                                  ? "text-blue-400 bg-white/5"
                                  : "text-blue-600 bg-blue-50/80"
                                : isDarkMode
                                ? "text-white/75 hover:text-white hover:bg-white/5"
                                : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                            }`}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {dropdownItem.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </div>
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
          className='space-y-4 mt-8'>
          <SignedOut>
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
              ${
                isDarkMode
                  ? "focus:ring-offset-gray-900"
                  : "focus:ring-offset-white"
              }
            `}
              >
                <UserIcon className="w-4 h-4" />
                <span>Login</span>
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
              ${
                isDarkMode
                  ? "focus:ring-offset-gray-900"
                  : "focus:ring-offset-white"
              }
            `}
              >
                Get Started
              </motion.button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <Link
              href="/dashboard"
              className={`relative font-medium flex items-center py-3 px-4 rounded-lg
                        transition-all duration-200 overflow-hidden group flex-grow
                        ${
                          pathname === "/dashboard" ||
                          pathname.startsWith("/dashboard" + "/")
                            ? isDarkMode
                              ? "text-white bg-white/10"
                              : "text-blue-600 bg-blue-50"
                            : isDarkMode
                            ? "text-white/85 hover:text-white hover:bg-white/5"
                            : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                        }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span
                className={`mr-3 ${
                  pathname === "/dashboard" ||
                  pathname.startsWith("/dashboard" + "/")
                    ? "text-blue-500"
                    : ""
                }`}
              >
                <LayoutDashboard />
              </span>
              <span className="relative z-10">Dashboard</span>
            </Link>
          </SignedIn>
        </div>
      </Drawer>
    </>
  );
}
