// Shadcn components
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
// Icons
import { ChevronDown } from "lucide-react";
// i18n for translation
import { useTranslation } from "react-i18next";

export default function BlogsDropdown({ selected, setSelected }) {
  // i18n hook for translation
  const { t } = useTranslation();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center gap-2 px-4 py-2 rounded-2xl shadow-md transition mx-auto my-2"
        >
          <span className="dark:text-white text-black">{selected}</span>
          <ChevronDown size={16} className="dark:text-white text-black" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className="w-48 rounded-2xl shadow-lg ring-1 ring-black/10 bg-white dark:bg-black dark:text-white"
      >
        <DropdownMenuItem
          className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 px-4 py-2 rounded-lg"
          onClick={() => setSelected("Your blogs")}
        >
          {t("dashboard.blogs.dropdown.your")}
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 px-4 py-2 rounded-lg"
          onClick={() => setSelected("Disliked blogs")}
        >
          {t("dashboard.blogs.dropdown.disliked")}
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 px-4 py-2 rounded-lg"
          onClick={() => setSelected("Liked blogs")}
        >
          {t("dashboard.blogs.dropdown.liked")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
