import { useTranslation } from "react-i18next";
import { Separator } from "@/components/ui/separator";

export default function DashboardNavigation() {
  const { t, i18n } = useTranslation();

  return (
    <div
      className={`${i18n.language == "fa" && "font-vazirmatn"} ${
        i18n.language == "ar" && "font-notokufi"
      } flex flex-row justify-center items-center dark:text-white text-black w-full`}
    >
      <div
        className={`flex flex-row items-center justify-center gap-2 sm:gap-3 md:gap-4 text-xs sm:text-sm ${
          i18n.language == "fa" && "font-vazirmatn"
        } ${i18n.language == "ar" && "font-notokufi"}`}
      >
        {/* Home */}
        <div className="transition-all duration-700 hover:text-[#53b1fb] cursor-pointer">
          {t("dashboard.nav.home")}
        </div>

        {/* Separator */}
        <Separator orientation="vertical" className="h-4 bg-gray-400" />

        {/* Subscription */}
        <div className="transition-all duration-700 hover:text-[#53b1fb] cursor-pointer">
          {t("dashboard.nav.subscription")}
        </div>

        {/* Separator */}
        <Separator orientation="vertical" className="h-4 bg-gray-400" />

        {/* Sign Out */}
        <div className="transition-all duration-700 hover:text-[#53b1fb] cursor-pointer">
          {t("dashboard.nav.signout")}
        </div>
      </div>
    </div>
  );
}