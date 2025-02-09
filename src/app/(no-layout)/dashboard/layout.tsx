import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import Headerdashboard from "@/components/HeaderDashboard"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-screen">
      <Headerdashboard />
      <main className="flex flex-wrap flex-row w-full">
        {children}
      </main>
      </main>
    </SidebarProvider>
  )
}
