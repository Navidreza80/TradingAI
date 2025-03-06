import ChatAssistant from "@/components/dashboard/ai-assistant";
import Headerdashboard from "@/components/dashboard/dashboard-header";
import VoiceNavigation from "@/components/dashboard/mic";
import "@uploadthing/react/styles.css";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main className=" bg-[#F0F0F0] dark:bg-[#0A0A0A]">
        <Headerdashboard />
        <ChatAssistant />
        <VoiceNavigation />
        <div className="flex flex-wrap flex-row gap-3 w-[95%] xs:flex-wrap pt-3 h-full mt-[80px] m-auto">
          {children}
        </div>
      </main>
    </>
  );
}
