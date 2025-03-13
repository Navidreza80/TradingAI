// Framer motion import for animation
import { motion } from "framer-motion";
// i18n for translation
import { useTranslation } from "react-i18next";
// Icons
import {
  UserGroupIcon,
  GlobeAltIcon,
  CubeTransparentIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";

export default function StatsGrid() {
  // i18n hooks for translation
  const { t, i18n } = useTranslation();
  // Stats items to map over them
  const stats = [
    {
      icon: <UserGroupIcon className="w-6 h-6" />,
      value: "50K+",
      label: t("about.stats.users.title"),
      color: "from-blue-500 to-cyan-400",
    },
    {
      icon: <GlobeAltIcon className="w-6 h-6" />,
      value: "150+",
      label: t("about.stats.countries.title"),
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: <CubeTransparentIcon className="w-6 h-6" />,
      value: "99.9%",
      label: t("about.stats.uptime.title"),
      color: "from-amber-500 to-orange-400",
    },
    {
      icon: <ShieldCheckIcon className="w-6 h-6" />,
      value: "24/7",
      label: t("about.stats.support.title"),
      color: "from-green-500 to-emerald-400",
    },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-20"
    >
      {stats.map((stat, index) => (
        <div key={index} className="relative group">
          <div
            className="relative z-10 p-6 rounded-2xl 
                dark:border-white/10 border-black/5 border
                backdrop-blur-xl 
                dark:bg-white/5 bg-white/80
                dark:hover:bg-white/10 hover:bg-white/90
                transition-all duration-300 hover:scale-[1.02]
                dark:hover:shadow-[0_0_30px_rgba(24,144,255,0.1)]
                hover:shadow-[0_0_30px_rgba(24,144,255,0.2)]
                text-center"
          >
            <div
              className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${stat.color}
                  shadow-lg mb-4`}
            >
              {stat.icon}
            </div>
            <div
              className={`text-3xl font-bold mb-2 dark:text-white text-gray-900
                  ${
                    i18n.language === "fa" || i18n.language === "ar"
                      ? "font-numericpersian"
                      : ""
                  }`}
            >
              {stat.value}
            </div>
            <div
              className={`dark:text-gray-400 text-gray-600
                   
                  `}
            >
              {stat.label}
            </div>
          </div>
        </div>
      ))}
    </motion.div>
  );
}
