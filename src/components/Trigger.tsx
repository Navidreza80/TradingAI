import { SidebarClose, SidebarOpen } from "lucide-react"
import { useSidebar } from "./ui/sidebar"

export function CustomTrigger() {
    const { toggleSidebar, open } = useSidebar()
  
    return <button onClick={toggleSidebar} className="pr-3 border-r border-[#ffffff74]">{open ? <SidebarClose className="w-8 h-8" /> : <SidebarOpen className="w-8 h-8" />}</button>
  }