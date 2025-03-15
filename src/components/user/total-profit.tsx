// i18n for translation
import { useTranslation } from "react-i18next";

export default function TotalProfit({ totalPnL }) {
  const { t } = useTranslation();
  return (
    <div className="p-4 rounded-xl dark:bg-gray-800 bg-gray-100">
      <div className="text-sm dark:text-gray-400 text-gray-600">
        {t("dashboard.stats.profits")}
      </div>
      <div
        className={`text-xl font-bold ${
          totalPnL >= 0 ? "text-green-500" : "text-red-500"
        }`}
      >
        {totalPnL >= 0 ? "+" : ""}
        {Math.ceil(totalPnL)}%
      </div>
    </div>
  );
}
