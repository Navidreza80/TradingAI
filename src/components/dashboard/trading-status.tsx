// i18n for translation
import { useTranslation } from "react-i18next";

export default function TradingStatus({ hideWin, stats, hideTotal, hidePnL }) {
  // i18n hook for translation
  const { t } = useTranslation();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
      {/* Win Rate */}
      {!hideWin && (
        <div className="p-4 rounded-xl dark:bg-gray-800 bg-gray-100">
          <div className="text-sm dark:text-gray-400 text-gray-600">
            {t("dashboard.profile.rate")}
          </div>
          <div className="text-xl font-bold dark:text-white text-gray-900">
            {Math.ceil(stats.winRate)}%
          </div>
        </div>
      )}
      {/* Total Trades */}
      {!hideTotal && (
        <div className="p-4 rounded-xl dark:bg-gray-800 bg-gray-100">
          <div className="text-sm dark:text-gray-400 text-gray-600">
            {t("dashboard.profile.total")}
          </div>
          <div className="text-xl font-bold dark:text-white text-gray-900">
            {stats.totalTrades}
          </div>
        </div>
      )}
      {/* Profit and Losses */}
      {!hidePnL && (
        <div className="p-4 rounded-xl dark:bg-gray-800 bg-gray-100">
          <div className="text-sm dark:text-gray-400 text-gray-600">
            {t("dashboard.profile.pl")}
          </div>
          <div
            className={`text-xl font-bold ${
              stats.totalPnL >= 0 ? "text-green-500" : "text-red-500"
            }`}
          >
            {stats.totalPnL >= 0 ? "+" : ""}
            {Math.ceil(stats.totalPnL)}$
          </div>
        </div>
      )}
    </div>
  );
}
