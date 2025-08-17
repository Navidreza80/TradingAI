// Next imports
import Link from "next/link";
// React built ins
import { useState, useRef, useEffect } from "react";

export default function Navigation() {
  // States
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  // Refs
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
      name: "Market",
      href: "#",
      dropdownItems: [
        { name: "Forex", href: "/market/forex" },
        {
          name: "Crypto",
          href: "/market/crypto",
        },
        { name: "Stock", href: "/market/stock" },
      ],
    },
    {
      name: "Learn",
      href: "#",
      dropdownItems: [
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
      name: "Signals",
      href: "#",
      dropdownItems: [
        {
          name: "AI Signal Generator",
          href: "/signals/ai-generator",
        },
      ],
    },
    {
      name: "News",
      href: "#",
      dropdownItems: [
        { name: "News Blogs", href: "/news/blogs" },
        {
          name: "News",
          href: "/news",
        },
        {
          name: "Blogs",
          href: "/blogs" 
        },
        {
          name: "Forex",
          href: "/news/forex",
        },
        {
          name: "Stock",
          href: "/stocks",
        },
        {
          name: "Crypto",
          href: "/news/crypto",
        },
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
              className="relative"
              onMouseEnter={() => handleMouseEnter(item.name)}
              onMouseLeave={handleMouseLeave}
            >
              <button
                onClick={() => toggleDropdown(item.name)}
                onKeyDown={(e) => handleKeyDown(e, item.name)}
                className="relative text-sm lg:text-base font-medium
                    text-primary-light dark:text-primary-dark
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
                className="relative text-sm lg:text-base text-secondary-light dark:text-secondary-dark font-bold
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
