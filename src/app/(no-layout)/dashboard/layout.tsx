import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import Headerdashboard from "@/components/HeaderDashboard"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <Headerdashboard />
      <main>
        {children}
      </main>
    </SidebarProvider>
  )
}
