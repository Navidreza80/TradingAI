// Third party components
import ChatAssistant from "@/components/dashboard/ai-assistant";
import HeaderDashboard from "@/components/dashboard/dashboard-header";
// Upload thing style for converting file to URL
import "@uploadthing/react/styles.css";
// React hot toast fot creating toasts
import { Toaster } from "react-hot-toast";
// Clerk for authentication
import { auth } from "@clerk/nextjs/server";
// Not found page for un authenticated users
import NotFound from "@/app/not-found";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();
  return userId ? (
    <>
      <main className=" bg-[#F0F0F0] dark:bg-[#0A0A0A]">
        {/* React Hot Toast Provider */}
        <Toaster />
        {/* Dashboard Special Header */}
        <HeaderDashboard />
        {/* AI Chat Assistant */}
        <ChatAssistant />
        <div className="flex flex-wrap flex-row gap-3 w-[95%] bg-[#F0F0F0] dark:bg-[#0A0A0A] xs:flex-wrap pt-3 h-full mt-[80px] m-auto">
          {children}
        </div>
      </main>
    </>
  ) : (
    <NotFound />
  );
}
