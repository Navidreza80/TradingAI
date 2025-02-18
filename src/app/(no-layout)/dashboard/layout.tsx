import { SidebarProvider } from "@/components/ui/sidebar"
import Headerdashboard from "@/components/dashboard/dashboard-header"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <main className="w-screen dark:bg-[#262626] bg-white">
      <Headerdashboard />
      <main className="flex flex-wrap flex-row w-full">
        {children}
      </main>
      </main>
    </SidebarProvider>
  )
}
