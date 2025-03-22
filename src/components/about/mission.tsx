// Framer motion for animation
import { motion } from "framer-motion";
// i18n for translation
import { useTranslation } from "react-i18next";

export default function Mission() {
  const { t } = useTranslation();
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="mb-20"
    >
      <div className="max-w-3xl mx-auto text-center">
        <h2
          className='text-3xl font-bold mb-6 dark:text-primary-dark text-primary-light'>
          {t("about.mission.title")}
        </h2>
        <p
          className='text-lg dark:text-secondary-dark text-secondary-light'>
          {t("about.mission.description")}
        </p>
      </div>
    </motion.div>
  );
}
