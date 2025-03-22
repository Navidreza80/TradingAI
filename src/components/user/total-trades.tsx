// i18n for translation
import { useTranslation } from "react-i18next";

export default function TotalTrades({ totalTrades }) {
  const { t } = useTranslation();
  return (
    <div className="p-4 rounded-xl dark:bg-gray-800 bg-gray-100">
      <div className="text-sm dark:text-gray-400 text-gray-600">
      {t('dashboard.stats.trades')}
      </div>
      <div className="text-xl font-bold dark:text-white text-gray-900">
        {totalTrades}
      </div>
    </div>
  );
}
