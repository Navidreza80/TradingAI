import EditBanner from "@/components/dashboard/edit-banner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AnimatePresence, motion } from "framer-motion";
import { GlobeLock } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Switch } from "../ui/switch";
import EditProfilePicture from "./edit-profile-picture";
import EditUserName from "./edit-username";
import {
  updatePnL,
  updateTotalTrades,
  updateWinRate,
} from "@/actions/user.action";
import toast from "react-hot-toast";

export default function ProfileCard({
  user,
  stats,
  hideWin,
  setHideWin,
  hideTotal,
  setHideTotal,
  hidePnL,
  setHidePnL,
}) {
  const { t } = useTranslation();
  const [username, setUsername] = useState("");
  const [image, setImage] = useState("");
  const [banner, setBanner] = useState("");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    user.username && (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="min-h-screen w-full"
      >
        {/* Profile Header */}
        <motion.div
          variants={itemVariants}
          className="relative h-[300px] w-full"
        >
          <EditBanner banner={banner} setBanner={setBanner} id={user.id} />
          <Image
            src={banner ? banner : user.coverImage}
            alt="Cover"
            fill
            className="object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50" />
        </motion.div>

        {/* Profile Info */}
        <motion.div
          variants={itemVariants}
          className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32"
        >
          <div className="relative z-10 bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Avatar */}
              <div className="flex-shrink-0 relative">
                <EditProfilePicture
                  id={user.id}
                  setImage={setImage}
                  image={image}
                />
                <Image
                  src={image !== "" ? image : user.image}
                  alt={username !== "" ? username : user.username}
                  width={160}
                  height={160}
                  className="rounded-2xl w-40 h-40 border-4 border-white dark:border-gray-800"
                />
              </div>

              {/* Info */}
              <div className="flex-grow">
                <div className="flex items-start justify-between flex-wrap">
                  <div>
                    <h1
                      className={`text-3xl font-bold dark:text-white text-gray-900 flex flex-row gap-2 items-center`}
                    >
                      {username !== "" ? username : user.username}
                      <EditUserName
                        id={user.id}
                        username={username}
                        setUsername={setUsername}
                      />
                    </h1>
                  </div>
                </div>

                {/* Trading Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
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
                  {!hidePnL && (
                    <div className="p-4 rounded-xl dark:bg-gray-800 bg-gray-100">
                      <div className="text-sm dark:text-gray-400 text-gray-600">
                        {t("dashboard.profile.pl")}
                      </div>
                      <div
                        className={`text-xl font-bold ${
                          stats.totalPnL >= 0
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      >
                        {stats.totalPnL >= 0 ? "+" : "-"}
                        {stats.totalPnL}$
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="security" className="mt-12">
              <TabsList className="flex flex-wrap justify-center gap-2 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
                <TabsTrigger
                  value="privacy"
                  className="flex items-center gap-2 whitespace-nowrap"
                >
                  <GlobeLock className="w-5 h-5" />
                  {t("dashboard.profile.privacy")}
                </TabsTrigger>
              </TabsList>

              <AnimatePresence mode="wait">
                {/* Privacy Tab */}
                <TabsContent key={"privacy"} value="privacy">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="justify-start flex flex-col flex-wrap"
                  >
                    <div className="flex flex-row w-full items-center flex-nowrap gap-1">
                      <h2 className="text-gray-600 whitespace-nowrap">
                        {t("dashboard.profile.privacy")}
                      </h2>
                      <div className="w-full border border-[#9f9f9f90]"></div>
                    </div>
                    <div className="flex flex-row w-full items-center justify-between flex-nowrap gap-1 mt-6">
                      <h2 className="dark:text-white text-black whitespace-nowrap">
                        {t("dashboard.profile.hideW")}
                      </h2>
                      <Switch
                        defaultChecked={hideWin}
                        onCheckedChange={async (e) => {
                          const request = await updateWinRate(user.id, e);
                          if (request.success) {
                            toast.success(request.message);
                            setHideWin(e);
                          }
                        }}
                      />
                    </div>
                    <div className="flex flex-row w-full items-center justify-between flex-nowrap gap-1 mt-6">
                      <h2 className="dark:text-white text-black whitespace-nowrap">
                        {t("dashboard.profile.hideT")}
                      </h2>
                      <Switch
                        defaultChecked={hideTotal}
                        onCheckedChange={async (e) => {
                          const request = await updateTotalTrades(user.id, e);
                          if (request.success) {
                            toast.success(request.message);
                            setHideTotal(e);
                          }
                        }}
                      />
                    </div>
                    <div className="flex flex-row w-full items-center justify-between flex-nowrap gap-1 mt-6">
                      <h2 className="dark:text-white text-black whitespace-nowrap">
                        {t("dashboard.profile.hideP")}
                      </h2>
                      <Switch
                        defaultChecked={hidePnL}
                        onCheckedChange={async (e) => {
                          const request = await updatePnL(user.id, e);
                          if (request.success) {
                            toast.success(request.message);
                            setHidePnL(e);
                          }
                        }}
                      />
                    </div>
                  </motion.div>
                </TabsContent>
              </AnimatePresence>
            </Tabs>
          </div>
        </motion.div>
      </motion.div>
    )
  );
}
