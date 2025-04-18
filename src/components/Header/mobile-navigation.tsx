"use client";

import { useState } from "react";
import Link from "next/link";

import { motion, AnimatePresence } from "framer-motion";

export default function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  // Navigation items with translations and dropdown menus - same structure as header-navigation
  const navItems = [
    { 
      name: "Market", 
      href: "#", 
      dropdownItems: [
        { name: "Forex", href: "/market/forex" },
        { name: "Crypto", href: "/market/crypto" },
        { name: "Stock", href: "/market/stock" },
      ]
    },
    { 
      name: "Learn", 
      href: "#", 
      dropdownItems: [
        { name: "Strategies", href: "/learn/strategies" },
        { name: "Indicators", href: "/learn/indicators" },
        { name: "Exams", href: "/learn/exams" },
        { name: "Certificates", href: "/learn/certificates" },
        { name: "Beginner", href: "/learn/beginner" },
        { name: "Markets", href: "/learn/markets" },
        { name: "Web3", href: "/learn/web3" },
      ]
    },
    { 
      name: "Signals", 
      href: "#", 
      dropdownItems: [
        { name: "AI Signal Generator", href: "/signals/ai-generator" },
        { name: "What Other Suggests?", href: "/signals/suggestions" },
      ]
    },
    { 
      name: "News", 
      href: "#", 
      dropdownItems: [
        { name:"Blogs", href: "/news/blogs" },
        { name: "News Magazine", href: "/news/magazine" },
        { name:"Events", href: "/news/events" },
        { name: "Podcasts", href: "/news/podcasts" },
        { name: "Videos", href: "/news/videos" },
      ]
    },
  ];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (isOpen) {
      setExpandedItem(null);
    }
  };

  const toggleDropdown = (name: string) => {
    setExpandedItem(expandedItem === name ? null : name);
  };

  return (
    <div className="min-[900px]:hidden">
      {/* Hamburger Button */}
      <button
        onClick={toggleMenu}
        className="p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white focus:outline-none"
        aria-label="Toggle menu"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          {isOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={toggleMenu}
          />
        )}
      </AnimatePresence>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed top-0 left-0 bottom-0 w-4/5 max-w-sm bg-white dark:bg-gray-900 z-50 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Menu</h2>
              <button
                onClick={toggleMenu}
                className="p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white focus:outline-none"
                aria-label="Close menu"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <nav className="p-4">
              <ul className="space-y-2">
                {navItems.map((item) => (
                  <li key={item.name} className="border-b border-gray-200 dark:border-gray-700 pb-2">
                    <button
                      onClick={() => toggleDropdown(item.name)}
                      className="flex justify-between items-center w-full py-2 px-3 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
                    >
                      <span className="font-medium">{item.name}</span>
                      <svg
                        className={`w-5 h-5 transition-transform ${
                          expandedItem === item.name ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>

                    <AnimatePresence>
                      {expandedItem === item.name && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <ul className="pl-4 mt-2 space-y-1">
                            {item.dropdownItems?.map((dropdownItem) => (
                              <li key={dropdownItem.name}>
                                <Link
                                  href={dropdownItem.href}
                                  className="block py-2 px-3 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
                                  onClick={toggleMenu}
                                >
                                  {dropdownItem.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>
                ))}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}