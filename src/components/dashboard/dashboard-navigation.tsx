import { useTranslation } from "react-i18next";
import { Separator } from "@/components/ui/separator";

export default function DashboardNavigation() {
  const { t, i18n } = useTranslation();
  return (
    <div
      className={` ${i18n.language == "fa" && "font-vazirmatn"} ${
        i18n.language == "ar" && "font-notokufi"
      } flex flex-row justify-center gap-3 items-center dark:text-white text-black`}
    >
      <div
        className={`flex h-5 items-center space-x-4 text-sm ${
          i18n.language == "fa" && "font-vazirmatn"
        } ${i18n.language == "ar" && "font-notokufi"}`}
      >
        <div className="transition-all duration-700 hover:text-[#53b1fb] cursor-pointer ml-4">
          {t("dashboard.nav.home")}
        </div>
        <Separator orientation="vertical" />
        <div className="transition-all duration-700 hover:text-[#53b1fb] cursor-pointer">
          {" "}
          {t("dashboard.nav.subscription")}
        </div>
        <Separator orientation="vertical" />
        <div className="transition-all duration-700 hover:text-[#53b1fb] cursor-pointer">
          {" "}
          {t("dashboard.nav.signout")}
        </div>
      </div>
    </div>
  );
}
