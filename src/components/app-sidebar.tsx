import { Book, Bookmark, ChartBar, Heart, LayoutDashboard, MessageCircle, User2 } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { FaMoneyBill } from "react-icons/fa"
import { Button } from "./ui/button"

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Profile",
    url: "/dashboard/profile",
    icon: User2,
  },
  {
    title: "Subscriptions",
    url: "/dashboar/subscriptions",
    icon: FaMoneyBill,
  },
  {
    title: "Blogs",
    url: "/dashboard/blogs",
    icon: Book,
  },
  {
    title: "Courses",
    url: "/dashboard/courses",
    icon: ChartBar,
  },
  {
    title: "Comments",
    url: "/dashboard/comments",
    icon: MessageCircle,
  },
  {
    title: "Saved",
    url: "/dashboard/saved",
    icon: Bookmark,
  },
  {
    title: "Likes",
    url: "/dashboard/likes",
    icon: Heart,
  },
]

export function AppSidebar() {
  return (
    <Sidebar className="border-r-[#53B1FB] bg-[#202020b6]">
      <SidebarContent className="flex ml-1 h-full">
        <SidebarGroup className="h-full">
          <SidebarGroupContent className="h-full">
            <SidebarMenu className="flex flex-col justify-between h-full">
              <div>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a href={item.url} className="rounded hover:text-[#53B1FB] hover:bg-[#42424271] transition-all duration-500 py-5">
                        <item.icon className="w-6 h-6" />
                        <span className="text-lg">{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </div>
              <Button>Sign Out</Button>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="text-center text-[#6F6F6F]">© 2025 TradingAI.</SidebarFooter>
    </Sidebar>
  )
}
