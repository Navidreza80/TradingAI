"use client";

import { LanguageIcon } from "@heroicons/react/24/outline";
import { Dropdown, MenuProps } from "antd";
import { MoonIcon, SunIcon } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function ActionBtns() {
  const [isDarkMode, setIsDarkMode] = useState(true);
    const { i18n } = useTranslation();

  // Handle language change
  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);
    document.documentElement.lang = lang;
    document.documentElement.dir =
      lang === "fa" || lang === "ar" ? "rtl" : "ltr";
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
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
  return (
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
  );
}
