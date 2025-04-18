"use client";

import {
  Facebook,
  Github,
  Instagram,
  Linkedin,
  Twitter
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";

export default function Footer() {
  const isDarkMode = useSelector((state: any) => state.theme.isDarkMode);
  const currentYear = new Date().getFullYear();

  // Social media links array
  const socialLinks = [
    { 
      name: "Twitter", 
      href: "https://twitter.com", 
      icon: Twitter, 
      hoverColor: "hover:text-blue-500 dark:hover:text-blue-400" 
    },
    { 
      name: "Facebook", 
      href: "https://facebook.com", 
      icon: Facebook, 
      hoverColor: "hover:text-blue-600 dark:hover:text-blue-400" 
    },
    { 
      name: "Instagram", 
      href: "https://instagram.com", 
      icon: Instagram, 
      hoverColor: "hover:text-pink-600 dark:hover:text-pink-400" 
    },
    { 
      name: "LinkedIn", 
      href: "https://linkedin.com", 
      icon: Linkedin, 
      hoverColor: "hover:text-blue-700 dark:hover:text-blue-400" 
    },
    { 
      name: "GitHub", 
      href: "https://github.com", 
      icon: Github, 
      hoverColor: "hover:text-gray-900 dark:hover:text-white" 
    },
  ];

  // Navigation sections
  const navigationSections = [
    {
      title: "Platform",
      links: [
        { name: "Market", href: "/market" },
        { name: "News", href: "/news" },
        { name: "Signals", href: "/signals" },
        { name: "Trade", href: "/trade" },
        { name: "Education", href: "/education" },
      ]
    },
    {
      title: "Resources",
      links: [
        { name: "Tutorials", href: "/education/tutorials" },
        { name: "Trading Strategies", href: "/education/strategies" },
        { name: "Glossary", href: "/education/glossary" },
        { name: "Blog", href: "/blog" },
        { name: "FAQ", href: "/faq" },
      ]
    },
    {
      title: "Company",
      links: [
        { name: "About Us", href: "/about" },
        { name: "Contact", href: "/contact" },
        { name: "Careers", href: "/careers" },
        { name: "Privacy Policy", href: "/privacy" },
        { name: "Terms of Service", href: "/terms" },
      ]
    }
  ];

  // Footer links
  const footerLinks = [
    { name: "Privacy", href: "/privacy" },
    { name: "Terms", href: "/terms" },
    { name: "Cookies", href: "/cookies" },
    { name: "Sitemap", href: "/sitemap" },
  ];

  return (
    <footer className="bg-background-light dark:bg-background-dark border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Logo and Description */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Image
                src={isDarkMode ? "/image/Logo.svg" : "/image/LogoDark.svg"}
                alt="TradingAI Logo"
                width={32}
                height={32}
                className="transition-all duration-300"
              />
              <span className="bg-gradient-to-r from-[#1890ff] to-[#69c0ff] bg-clip-text text-transparent font-bold text-xl">
                TradingAI
              </span>
            </Link>
            <p className="text-secondary-light dark:text-secondary-dark mb-4 max-w-md">
              Advanced AI-powered trading platform with real-time market
              analysis, signals, and educational resources for traders of all
              levels.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-gray-500 ${social.hoverColor} dark:text-gray-400 transition-colors`}
                >
                  <social.icon className="text-primary-light dark:text-primary-dark" size={20} />
                  <span className="sr-only">{social.name}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Sections */}
          {navigationSections.map((section) => (
            <div key={section.title}>
              <h3 className={`text-sm text-primary-light dark:text-primary-dark font-semibold uppercase tracking-wider mb-4`}>
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-secondary-light dark:text-secondary-dark hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
          <div className="max-w-md">
            <h3 className="text-sm font-semibold text-primary-light dark:text-primary-dark uppercase tracking-wider mb-4">
              Subscribe to our newsletter
            </h3>
            <p className="text-secondary-light dark:text-secondary-dark mb-4">
              Get the latest news, updates and trading insights delivered to
              your inbox weekly.
            </p>
            <form className="flex gap-2">
              <div className="flex-grow">
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="w-full px-4 py-2 text-base text-gray-900 dark:text-white placeholder-gray-500 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your email"
                />
              </div>
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            © {currentYear} TradingAI. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            {footerLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white text-sm"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
