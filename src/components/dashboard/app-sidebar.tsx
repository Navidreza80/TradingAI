// components/Sidebar.js
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const Sidebar = ({ isOpen, onClose }) => {
  const sidebarItems = [
    {
      iconLight: "bg-dashboardLM",
      iconDark: "dark:bg-dashboardDM",
      text: "Dashboard",
      href: "/dashboard",
    },
    {
      text: "Profile",
      href: "/dashboard/profile",
      iconLight: "bg-userLM",
      iconDark: "dark:bg-userDM",
    },
    {
      text: "Blogs",
      href: "/dashboard/blogs",
      iconLight: "bg-bookLM",
      iconDark: "dark:bg-bookDM",
    },
    {
      text: "Subscription",
      href: "/dashboard/subscriptions",
      iconLight: "bg-coinLM",
      iconDark: "dark:bg-coinDM",
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-y-0 left-0 bg-gradient-to-b from-[#F0F0F0] to-white dark:from-[#0A0A0A] dark:to-black text-black dark:text-white w-64 min-h-screen z-50 shadow-2xl"
          >
            {/* Sidebar Header */}
            <div className="p-6 text-2xl font-bold border-b border-gray-700">
              TradingAI
            </div>

            {/* Sidebar Navigation */}
            <nav className="flex-1 mt-4">
              {sidebarItems.map((item, index) => (
                <motion.div
                  key={index}
                  whileTap={{ scale: 0.8 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="flex items-center py-3 px-6 cursor-pointer hover:opacity-80 hover:scale-[0.99] transition-all duration-200"
                >
                  <span
                    className={`text-xl mr-4 w-7 h-7 ${item.iconDark} ${item.iconLight} bg-cover`}
                  ></span>
                  <Link href={item.href} className="text-lg">
                    {item.text}
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Sidebar Footer */}
            <div className="p-6 text-sm text-gray-400 border-t border-gray-700">
              © 2025 TradingAI
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-white hover:text-gray-300 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;
