"use client";
// Next imports
import { usePathname } from "next/navigation";
// React imports
import { useEffect, useState } from "react";
// Third party components
import Logo from "../Logo";
import ThemeNLanguage from "../theme-n-language";
import AuthButtons from "./auth-buttons";
import Navigation from "./header-navigation";
import MobileDrawer from "./mobile-drawer";
import MobileMenuButton from "./mobile-menu-button";
import UserSection from "./user-section";

export default function Header() {
  // States
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    // Handle scroll effect if user scrolls down 20px
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Hook that recognizes the pathname
  const pathName = usePathname();

  return (
    !pathName.includes("/dashboard") && (
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-md ${
          isScrolled
            ? "dark:bg-[rgba(10,10,10,0.95)] dark:shadow-2xl dark:backdrop-blur-xl bg-white/95 shadow-lg backdrop-blur-xl"
            : "dark:bg-transparent bg-white"
        } min-h-[60px] sm:min-h-[68px] lg:min-h-[68px]`}
        role="banner"
      >
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r dark:from-transparent dark:via-white/[0.08] dark:to-transparent from-transparent via-black/[0.08] to-transparent" />
        <div
          className={`absolute inset-0 transition-opacity duration-300 dark:bg-[radial-gradient(circle_at_50%_50%,rgba(24,144,255,0.08)_1px,transparent_1px),radial-gradient(circle_at_50%_50%,rgba(82,196,26,0.05)_1px,transparent_1px)] bg-[radial-gradient(circle_at_50%_50%,rgba(24,144,255,0.15)_1px,transparent_1px),radial-gradient(circle_at_50%_50%,rgba(82,196,26,0.1)_1px,transparent_1px)]bg-[length:20px_20px,30px_30px] bg-[0_0,15px_15px] animate-headerPattern ${
            isScrolled ? "opacity-30" : "opacity-100"
          }`}
        />

        {/* Header Content */}
        <div className="relative z-10 mx-auto px-3 py-4 xs:px-4 sm:px-6 lg:px-8 xl:px-10 flex items-center justify-between w-full max-w-[1920px] h-full">
          {/* Logo */}
          <Logo />

          {/* Desktop Navigation - Centered */}
          <Navigation />

          {/* Action Buttons - Desktop Only */}
          <div className="hidden lg:flex items-center gap-2 lg:gap-3 xl:gap-4 w-[90px] xs:w-[100px] sm:w-[140px] lg:w-[300px] justify-end">
            {/* Theme & Language */}
            <ThemeNLanguage responsive={"max-[900px]:hidden"} />

            {/* Auth Buttons */}
            <AuthButtons />

            {/* User Section */}
            <UserSection />
          </div>

          {/* Mobile Menu Button */}
          <MobileMenuButton setIsMobileMenuOpen={setIsMobileMenuOpen} />
        </div>

        {/* Mobile Drawer */}
        <MobileDrawer isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />
      </header>
    )
  );
}
