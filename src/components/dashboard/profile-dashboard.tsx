import Image from "next/image";
import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, GlobeLock, Lock, Mail } from "lucide-react";
import EditBanner from "@/components/dashboard/edit-banner";
import EditProfilePicture from "./edit-profile-picture";
import EditUserName from "./edit-username";
import EditRole from "./edit-role";
import EditSocial from "./edit-social";
import EditStrategy from "./edit-strategy";
import { Switch } from "../ui/switch";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

interface ProfileCardProps {
  user: {
    name: string;
    email: string;
    role: string;
    profilePicture: string;
    coverImage: string;
    bio: string;
    location: string;
    joinDate: Date;
    tradingStyle: string;
    winRate: number;
    totalTrades: number;
    profitLoss: number;
    blogsLiked: BlogPost[];
    commentsPosted: Comment[];
    blogsShared: BlogPost[];
    tradingSuggestions: TradingSuggestion[];
    coursesPassed: Course[];
    social: {
      github?: string;
      twitter?: string;
      linkedin?: string;
    };
  };
}

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: Date;
  readTime: number;
  likes: number;
}

interface Comment {
  id: string;
  content: string;
  date: Date;
  blogTitle: string;
}

interface TradingSuggestion {
  id: string;
  pair: string;
  type: "LONG" | "SHORT";
  entry: number;
  target: number;
  stopLoss: number;
  date: Date;
  status: "WIN" | "LOSS" | "PENDING";
}

interface Course {
  id: string;
  title: string;
  provider: string;
  completionDate: Date;
  certificate: string;
}

export default function ProfileCard({ user }: ProfileCardProps) {
  const { t } = useTranslation();

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
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen bg-gradient-to-b dark:from-[#0a0a0a] dark:to-[#1a1a1a] from-gray-50 to-white w-full"
    >
      {/* Profile Header */}
      <motion.div variants={itemVariants} className="relative h-[300px] w-full">
        <EditBanner />
        <Image
          src={user.coverImage}
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
              <EditProfilePicture />
              <Image
                src={user.profilePicture}
                alt={user.name}
                width={160}
                height={160}
                className="rounded-2xl border-4 border-white dark:border-gray-800"
              />
            </div>

            {/* Info */}
            <div className="flex-grow">
              <div className="flex items-start justify-between">
                <div>
                  <h1
                    className={`text-3xl font-bold dark:text-white text-gray-900 flex flex-row gap-2 items-center`}
                  >
                    {user.name}
                    <EditUserName />
                  </h1>
                  <p
                    className={`text-lg dark:text-blue-400 text-blue-600 font-medium flex flex-row gap-2 items-center`}
                  >
                    {user.role}
                    <EditRole />
                  </p>
                </div>
                <div className="flex gap-4 items-center">
                  <EditSocial />
                  {user.social.github && (
                    <a
                      href={user.social.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                    >
                      <FaGithub size={24} />
                    </a>
                  )}
                  {user.social.twitter && (
                    <a
                      href={user.social.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                    >
                      <FaTwitter size={24} />
                    </a>
                  )}
                  {user.social.linkedin && (
                    <a
                      href={user.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                    >
                      <FaLinkedin size={24} />
                    </a>
                  )}
                </div>
              </div>

              {/* Trading Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
                <div className="p-4 rounded-xl dark:bg-gray-800 bg-gray-100">
                  <div className="text-sm dark:text-gray-400 text-gray-600">
                    {t("dashboard.profile.style")}
                  </div>
                  <div className="text-xl font-bold dark:text-white text-gray-900 flex gap-2">
                    {user.tradingStyle}
                    <EditStrategy />
                  </div>
                </div>
                <div className="p-4 rounded-xl dark:bg-gray-800 bg-gray-100">
                  <div className="text-sm dark:text-gray-400 text-gray-600">
                    {t("dashboard.profile.rate")}
                  </div>
                  <div className="text-xl font-bold dark:text-white text-gray-900">
                    {user.winRate}%
                  </div>
                </div>
                <div className="p-4 rounded-xl dark:bg-gray-800 bg-gray-100">
                  <div className="text-sm dark:text-gray-400 text-gray-600">
                    {t("dashboard.profile.total")}
                  </div>
                  <div className="text-xl font-bold dark:text-white text-gray-900">
                    {user.totalTrades}
                  </div>
                </div>
                <div className="p-4 rounded-xl dark:bg-gray-800 bg-gray-100">
                  <div className="text-sm dark:text-gray-400 text-gray-600">
                    {t("dashboard.profile.pl")}
                  </div>
                  <div
                    className={`text-xl font-bold ${
                      user.profitLoss >= 0 ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {user.profitLoss >= 0 ? "+" : ""}
                    {user.profitLoss}%
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="security" className="mt-12">
            <TabsList className="flex justify-center space-x-2 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
              <TabsTrigger value="security" className="flex items-center gap-2">
                <Lock className="w-5 h-5" />
                {t("dashboard.profile.security")}
              </TabsTrigger>
              <TabsTrigger value="email" className="flex items-center gap-2">
                <Mail className="w-5 h-5" />
                {t("dashboard.profile.email")}
              </TabsTrigger>
              <TabsTrigger
                value="notification"
                className="flex items-center gap-2"
              >
                <Bell className="w-5 h-5" />
                {t("dashboard.profile.notification")}
              </TabsTrigger>
              <TabsTrigger value="privacy" className="flex items-center gap-2">
                <GlobeLock className="w-5 h-5" />
                {t("dashboard.profile.privacy")}
              </TabsTrigger>
            </TabsList>

            <AnimatePresence mode="wait">
              {/* Security Tab */}
              <TabsContent key={"security"} value="security">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="justify-start flex flex-col flex-wrap"
                >
                  <div className="flex flex-row w-full items-center flex-nowrap gap-1">
                    <h2 className="text-gray-600 whitespace-nowrap">
                      {" "}
                      {t("dashboard.profile.auth")}
                    </h2>
                    <div className="w-full border border-[#9f9f9f90]"></div>
                  </div>
                  <div className="flex flex-row w-full items-center justify-between flex-nowrap gap-1 mt-6">
                    <h2 className="dark:text-white text-black">
                      {t("dashboard.profile.authInput")}
                    </h2>
                    <Switch />
                  </div>
                  <div className="flex flex-row w-full items-center flex-nowrap gap-1 mt-6">
                    <h2 className="text-gray-600 whitespace-nowrap">
                      {t("dashboard.profile.reset")}
                    </h2>
                    <div className="w-full border border-[#9f9f9f90]"></div>
                  </div>
                  <div className="flex flex-row w-full items-center justify-between flex-nowrap gap-1 mt-6">
                    <h2 className="dark:text-white text-black">
                      {" "}
                      {t("dashboard.profile.old")}
                    </h2>
                    <Input className="w-1/6 dark:border-white border-black" />
                  </div>
                  <div className="flex flex-row w-full items-center justify-between flex-nowrap gap-1 mt-6">
                    <h2 className="dark:text-white text-black">
                      {" "}
                      {t("dashboard.profile.new")}
                    </h2>
                    <Input className="w-1/6 dark:border-white border-black" />
                  </div>
                  <div className="flex flex-row w-full items-center justify-between flex-nowrap gap-1 mt-6">
                    <h2 className="dark:text-white text-black">
                      {t("dashboard.profile.confirm")}
                    </h2>
                    <Input className="w-1/6 dark:border-white border-black" />
                  </div>
                  <Button className="mt-3 w-32">
                    {" "}
                    {t("dashboard.profile.reset")}
                  </Button>
                </motion.div>
              </TabsContent>

              {/* Email Tab */}
              <TabsContent key={"email"} value="email">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="justify-start flex flex-col flex-wrap"
                >
                  <div className="flex flex-row w-full items-center flex-nowrap gap-1">
                    <h2 className="text-gray-600 whitespace-nowrap">
                      {" "}
                      {t("dashboard.profile.email")}
                    </h2>
                    <div className="w-full border border-[#9f9f9f90]"></div>
                  </div>
                  <div className="w-1/2 h-40 border dark:border-white border-black mt-6 rounded-md p-2">
                    <Input
                      className="w-1/2"
                      defaultValue={"navidrezaabbaszadeh89@gmail.com"}
                    />
                    <li className="w-full text-lg text-gray-400 mt-4">
                      {t("dashboard.profile.receives")}
                    </li>
                    <p className="text-md text-gray-600 ml-6">
                      {t("dashboard.profile.receivesDesc")}
                    </p>
                    <div className="flex justify-end">
                      <Button> {t("dashboard.profile.change")}</Button>
                    </div>
                  </div>
                </motion.div>
              </TabsContent>

              {/* Notification Tab */}
              <TabsContent key={"notification"} value="notification">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="justify-start flex flex-col flex-wrap"
                >
                  <div className="flex flex-row w-full items-center flex-nowrap gap-1">
                    <h2 className="text-gray-600 whitespace-nowrap">
                      {" "}
                      {t("dashboard.profile.notification")}
                    </h2>
                    <div className="w-full border border-[#9f9f9f90]"></div>
                  </div>
                  <div className="flex flex-row w-full items-center justify-between flex-nowrap gap-1 mt-6">
                    <h2 className="dark:text-white text-black">
                      {t("dashboard.profile.notificationInput")}
                    </h2>
                    <Switch />
                  </div>
                </motion.div>
              </TabsContent>

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
                      {" "}
                      {t("dashboard.profile.privacy")}
                    </h2>
                    <div className="w-full border border-[#9f9f9f90]"></div>
                  </div>
                  <div className="flex flex-row w-full items-center justify-between flex-nowrap gap-1 mt-6">
                    <h2 className="dark:text-white text-black">
                      {t("dashboard.profile.hideW")}
                    </h2>
                    <Switch />
                  </div>
                  <div className="flex flex-row w-full items-center justify-between flex-nowrap gap-1 mt-6">
                    <h2 className="dark:text-white text-black">
                      {t("dashboard.profile.hideT")}
                    </h2>
                    <Switch />
                  </div>
                  <div className="flex flex-row w-full items-center justify-between flex-nowrap gap-1 mt-6">
                    <h2 className="dark:text-white text-black">
                      {" "}
                      {t("dashboard.profile.hideP")}
                    </h2>
                    <Switch />
                  </div>
                </motion.div>
              </TabsContent>
            </AnimatePresence>
          </Tabs>
        </div>
      </motion.div>
    </motion.div>
  );
}
