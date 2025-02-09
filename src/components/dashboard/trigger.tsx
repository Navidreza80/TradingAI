import { SidebarClose, SidebarOpen } from "lucide-react";
import { useSidebar } from "../ui/sidebar";
import { useTranslation } from "react-i18next";

export function CustomTrigger() {
  const { toggleSidebar, open } = useSidebar();
  const { i18n } = useTranslation();

  return (
    <button
      onClick={toggleSidebar}
      className={`border-[#ffffff74] ${
        i18n.language != "en" ? "pl-3 border-l" : "pr-3 border-r"
      }`}
    >
      {open ? (
        <SidebarClose className="w-8 h-8" />
      ) : (
        <SidebarOpen className="w-8 h-8" />
      )}
    </button>
  );
}
