"use client";

// imports
import {
  Book,
  Bookmark,
  ChartBar,
  Heart,
  LayoutDashboard,
  MessageCircle,
  User2,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import { FaMoneyBill } from "react-icons/fa";
import { Button } from "./ui/button";
import Image from "next/image";
import { useTranslation } from "react-i18next";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { t, i18n } = useTranslation();
  const { open } = useSidebar();

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
      url: "/dashboar/subscriptions",
      icon: FaMoneyBill,
    },
    {
      title: t("dashboard.side.blogs"),
      url: "/dashboard/blogs",
      icon: Book,
    },
    {
      title: t("dashboard.side.courses"),
      url: "/dashboard/courses",
      icon: ChartBar,
    },
    {
      title: t("dashboard.side.comments"),
      url: "/dashboard/comments",
      icon: MessageCircle,
    },
    {
      title: t("dashboard.side.saved"),
      url: "/dashboard/saved",
      icon: Bookmark,
    },
    {
      title: t("dashboard.side.likes"),
      url: "/dashboard/likes",
      icon: Heart,
    },
  ];
  return (
    <Sidebar
      collapsible="icon"
      {...props}
      side={i18n.language == "fa" || i18n.language == "ar" ? "right" : "left"}
      className="border-r-[#53B1FB] dark:bg-[#202020b6] bg-white"
    >
      <SidebarHeader>
        <div className="w-full flex justify-start flex-row flex-wrap items-center pt-3 pl-3">
          {/* Logo */}
          <div
            className="relative w-4 h-4 xs:w-5 xs:h-5 sm:w-7 sm:h-7 lg:w-9 lg:h-9 
              flex justify-start items-center"
          >
            <Image
              src="/image/Logo.svg"
              alt="TradingAI Logo"
              width={28}
              height={28}
              className="w-full h-full transition-all duration-300 
                  group-hover:drop-shadow-[0_0_8px_rgba(24,144,255,0.5)]"
              priority
            />
          </div>
          {open && (
            <span
              className="text-base xs:text-lg sm:text-xl lg:text-2xl font-bold ml-2
              bg-gradient-to-r from-[#1890ff] to-[#69c0ff] bg-clip-text text-transparent"
            >
              TradingAI
            </span>
          )}
        </div>
      </SidebarHeader>
      <SidebarContent className="flex ml-1 h-full">
        <SidebarGroup className="h-full">
          <SidebarGroupContent className="h-full">
            <SidebarMenu className="flex flex-col justify-between h-full">
              <div
                className={`${i18n.language == "fa" && "font-vazirmatn"} ${
                  i18n.language == "ar" && "font-notokufi"
                } dark:text-white text-black`}
              >
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a
                        href={item.url}
                        className="rounded hover:text-[#53B1FB] hover:bg-[#42424271] transition-all duration-500 py-5"
                      >
                        <item.icon className="w-6 h-6" />
                        <span className="text-lg">{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </div>
              {open == true && <Button>Sign Out</Button>}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      {open == true && (
        <SidebarFooter className="text-center text-[#6F6F6F]">
          © 2025 TradingAI.
        </SidebarFooter>
      )}
      <SidebarRail />
    </Sidebar>
  );
}
