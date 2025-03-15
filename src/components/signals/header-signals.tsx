// i18n for translation
import { useTranslation } from "react-i18next";

export default function HeaderSignals() {
  // i18n hook for translation
  const { t } = useTranslation();
  return (
    <div className="text-center mb-8 pt-24">
      <h1 className="text-4xl font-bold mb-2">{t("signals.title")}</h1>
      <p className="text-gray-600 dark:text-gray-400">{t("signals.desc")}</p>
    </div>
  );
}
