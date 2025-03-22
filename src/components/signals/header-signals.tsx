// i18n for translation
import { useTranslation } from "react-i18next";

export default function HeaderSignals() {
  // i18n hook for translation
  const { t } = useTranslation();
  return (
    <div className="text-center mb-8 pt-24">
      <h1 className="text-4xl font-bold mb-2 text-primary-light dark:text-primary-dark">{t("signals.title")}</h1>
      <p className="text-secondary-light dark:text-secondary-dark">{t("signals.desc")}</p>
    </div>
  );
}
