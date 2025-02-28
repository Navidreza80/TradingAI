"use client";

import {
  Book,
  Heart,
  LayoutDashboard,
  MessageCircle,
  User2,
} from "lucide-react";
import { FaMoneyBill } from "react-icons/fa";
import { Button } from "../ui/button";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet"; // Import shadcn sheet components
import { Menu } from "lucide-react"; // Icon for the sheet trigger button

export default function AppSheet() {
  const { t, i18n } = useTranslation();

  // Menu items.
  const items = [
    {
      title: t("dashboard.side.dashboard"),
      url: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: t("dashboard.side.profile"),
      url: "/dashboard/profile",
      icon: User2,
    },
    {
      title: t("dashboard.side.subscriptions"),
      url: "/dashboard/subscriptions",
      icon: FaMoneyBill,
    },
    {
      title: t("dashboard.side.blogs"),
      url: "/dashboard/blogs",
      icon: Book,
    },
    {
      title: t("dashboard.side.comments"),
      url: "/dashboard/comments",
      icon: MessageCircle,
    },
    {
      title: t("dashboard.side.likes"),
      url: "/dashboard/likes",
      icon: Heart,
    },
  ];

  return (
    <Sheet>
      {/* Sheet Trigger Button */}
      <SheetTrigger asChild>
        <div
          className=" aspect-square" // Position the button
        >
          <Menu className="lg:w-6 lg:h-6 md:w-5 md:h-5 sm:w-5 sm:h-5 xs:w-5 xs:h-5 text-black dark:text-white" /> {/* Hamburger menu icon */}
        </div>
      </SheetTrigger>

      {/* Sheet Content */}
      <SheetContent
        side={i18n.language == "fa" || i18n.language == "ar" ? "right" : "left"}
        className="dark:bg-[#000000bd] bg-white border-r-[#53B1FB] w-[300px]"
      >
        <SheetHeader>
          {/* Logo and Title */}
          <div className="w-full flex justify-start flex-row flex-wrap items-center pt-3 pl-3">
            <div className="relative w-9 h-9 flex justify-start items-center">
              <Image
                src="/image/Logo.svg"
                alt="TradingAI Logo"
                width={28}
                height={28}
                className="w-full h-full transition-all duration-300 group-hover:drop-shadow-[0_0_8px_rgba(24,144,255,0.5)]"
                priority
              />
            </div>
            <SheetTitle className="text-2xl font-bold ml-2 bg-gradient-to-r from-[#1890ff] to-[#69c0ff] bg-clip-text text-transparent">
              TradingAI
            </SheetTitle>
          </div>
        </SheetHeader>

        {/* Sheet Menu Items */}
        <div className="flex flex-col p-4 space-y-2">
          {items.map((item) => (
            <Link
              key={item.title}
              href={item.url}
              className="flex items-center p-3 rounded hover:text-[#53B1FB] hover:bg-[#42424271] transition-all duration-500"
            >
              <item.icon className="w-6 h-6 mr-3" />
              <span className="text-lg">{item.title}</span>
            </Link>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}