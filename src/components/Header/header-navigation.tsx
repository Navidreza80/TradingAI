"use client";
// Next imports
import Link from "next/link";
// i18n imports for translation
import { useTranslation } from "react-i18next";
import { useState, useRef, useEffect } from "react";

export default function Navigation() {
  // i18n hooks for translation
  const [t, i18n] = useTranslation();
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setActiveDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle escape key to close dropdown
  useEffect(() => {
    function handleEscKey(event: KeyboardEvent) {
      if (event.key === "Escape" && activeDropdown) {
        setActiveDropdown(null);
      }
    }
    document.addEventListener("keydown", handleEscKey);
    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [activeDropdown]);

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Navigation items with translations and dropdown menus
  const navItems = [
    {
      name: "Home",
      href: "/",
      dropdownItem: null,
    },
    {
      name: t("nav.market") || "Market",
      href: "#",
      dropdownItems: [
        { name: t("nav.marketItems.forex") || "Forex", href: "/market/forex" },
        {
          name: t("nav.marketItems.crypto") || "Crypto",
          href: "/market/crypto",
        },
        { name: t("nav.marketItems.stock") || "Stock", href: "/market/stock" },
        {
          name: t("nav.marketItems.commodities") || "Commodities",
          href: "/market/commodities",
        },
        { name: t("nav.marketItems.nft") || "NFT", href: "/market/nft" },
      ],
    },
    {
      name: t("nav.learn") || "Learn",
      href: "#",
      dropdownItems: [
        {
          name: t("nav.learnItems.beginner") || "Beginner",
          href: "/education/beginner",
        },
        {
          name: t("nav.learnItems.markets") || "Markets",
          href: "/education/markets",
        },
        { name: t("nav.learnItems.web3") || "Web3", href: "/education/web3" },
        {
          name: t("nav.learnItems.strategies") || "Strategies",
          href: "/education/technical",
        },
        {
          name: t("nav.learnItems.indicators") || "Indicators",
          href: "/education/indicators",
        },
        { name: t("nav.learnItems.exams") || "Exams", href: "/education/test" },
      ],
    },
    {
      name: t("nav.signals") || "Signals",
      href: "#",
      dropdownItems: [
        {
          name: t("nav.signalsItems.aiGenerator") || "AI Signal Generator",
          href: "/signals/ai-generator",
        },
        {
          name: t("nav.signalsItems.suggestions") || "What Other Suggests?",
          href: "/signals/suggestions",
        },
      ],
    },
    {
      name: t("nav.news") || "News",
      href: "#",
      dropdownItems: [
        { name: t("nav.newsItems.blogs") || "Blogs", href: "/news/blogs" },
        {
          name: t("nav.newsItems.magazine") || "News Magazine",
          href: "/news/magazine",
        },
        { name: t("nav.newsItems.events") || "Events", href: "/news/events" },
        {
          name: t("nav.newsItems.podcasts") || "Podcasts",
          href: "/news/podcasts",
        },
        { name: t("nav.newsItems.videos") || "Videos", href: "/news/videos" },
      ],
    },
  ];

  const toggleDropdown = (name: string) => {
    if (activeDropdown === name) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(name);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, name: string) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleDropdown(name);
    }
  };

  const handleMouseEnter = (name: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setActiveDropdown(name);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 300); // 300ms delay before closing
  };

  return (
    <nav
      className="min-[900px]:flex max-[900px]:hidden items-center justify-center absolute left-1/2 -translate-x-1/2"
      aria-label="Main Navigation"
    >
      <ul className="flex items-center space-x-4 lg:space-x-6 xl:space-x-8">
        {navItems.map((item) =>
          item.dropdownItems ? (
            <li
              key={item.name}
              className={`${
                i18n.language === "fa" || i18n.language === "ar"
                  ? "ml-[32px]"
                  : "first:ml-0"
              } relative`}
              onMouseEnter={() => handleMouseEnter(item.name)}
              onMouseLeave={handleMouseLeave}
            >
              <button
                onClick={() => toggleDropdown(item.name)}
                onKeyDown={(e) => handleKeyDown(e, item.name)}
                className="relative text-sm lg:text-base dark:text-white/80 text-black font-medium
                    hover:text-gray-900 dark:hover:text-white
                    after:absolute after:bottom-0 after:left-0 after:right-0
                    after:h-0.5 after:w-0 after:bg-gradient-to-r
                    after:from-[#1890ff] after:to-[#69c0ff]
                    after:transition-all after:duration-300
                    py-2 flex items-center
                    hover:after:w-full"
                aria-expanded={activeDropdown === item.name}
                aria-haspopup="true"
                aria-controls={`dropdown-${item.name}`}
              >
                {item.name}
                {item.dropdownItems && (
                  <svg
                    className={`ml-1 h-4 w-4 transition-transform ${
                      activeDropdown === item.name ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                )}
              </button>

              {activeDropdown === item.name && item.dropdownItems && (
                <div
                  id={`dropdown-${item.name}`}
                  className="absolute z-10 mt-1 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby={`dropdown-button-${item.name}`}
                  onMouseEnter={() => handleMouseEnter(item.name)}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="py-1">
                    {item.dropdownItems.map((dropdownItem) => (
                      <Link
                        key={dropdownItem.name}
                        href={dropdownItem.href}
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-700"
                        role="menuitem"
                        tabIndex={0}
                        onClick={() => setActiveDropdown(null)}
                      >
                        {dropdownItem.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </li>
          ) : (
            <Link key={item.name} href={item.href}>
              {" "}
              <button
                onClick={() => toggleDropdown(item.name)}
                onKeyDown={(e) => handleKeyDown(e, item.name)}
                className="relative text-sm lg:text-base dark:text-white/80 text-black font-medium
                hover:text-gray-900 dark:hover:text-white
                after:absolute after:bottom-0 after:left-0 after:right-0
                after:h-0.5 after:w-0 after:bg-gradient-to-r
                after:from-[#1890ff] after:to-[#69c0ff]
                after:transition-all after:duration-300
                py-2 flex items-center
                hover:after:w-full"
                aria-expanded={activeDropdown === item.name}
                aria-haspopup="true"
                aria-controls={`dropdown-${item.name}`}
              >
                {item.name}
                {item.dropdownItems && (
                  <svg
                    className={`ml-1 h-4 w-4 transition-transform ${
                      activeDropdown === item.name ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                )}
              </button>
            </Link>
          )
        )}
      </ul>
    </nav>
  );
}
