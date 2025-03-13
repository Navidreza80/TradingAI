// Third party components
import ChatAssistant from "@/components/dashboard/ai-assistant";
import HeaderDashboard from "@/components/dashboard/dashboard-header";
import VoiceNavigation from "@/components/dashboard/mic";
// Upload thing style for converting file to URL
import "@uploadthing/react/styles.css";
// React hot toast fot creating toasts
import { Toaster } from "react-hot-toast";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main className=" bg-[#F0F0F0] dark:bg-[#0A0A0A]">
        {/* React Hot Toast Provider */}
        <Toaster />
        {/* Dashboard Special Header */}
        <HeaderDashboard />
        {/* AI Chat Assistant */}
        <ChatAssistant />
        {/* Voice Navigator */}
        <VoiceNavigation />
        <div className="flex flex-wrap flex-row gap-3 w-[95%] bg-[#F0F0F0] dark:bg-[#0A0A0A] xs:flex-wrap pt-3 h-full mt-[80px] m-auto">
          {children}
        </div>
      </main>
    </>
  );
}
