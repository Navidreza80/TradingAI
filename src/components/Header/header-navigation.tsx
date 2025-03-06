"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";

export default function Navigation() {
  const [t, i18n] = useTranslation();
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

  return (
    <nav className="min-[900px]:flex max-[900px]:hidden items-center justify-center absolute left-1/2 -translate-x-1/2">
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
  );
};
