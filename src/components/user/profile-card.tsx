import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Stats, User } from "@/types/user";
import {
  BookOpenIcon
} from "@heroicons/react/24/outline";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import ProfileHeader from "./profile-header";
import TotalProfit from "./total-profit";
import TotalTrades from "./total-trades";
import UserAvatar from "./user-avatar";
import UserName from "./username";
import WinRate from "./win-rate";

export default function ProfileCard({
  user,
  stats,
}: {
  user: User;
  stats: Stats;
}) {
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
      className="min-h-screen pt-20 bg-gradient-to-b dark:from-[#0a0a0a] dark:to-[#1a1a1a] from-gray-50 to-white"
    >
      {/* Profile Header */}
      <ProfileHeader itemVariants={itemVariants} coverImage={user.coverImage} />

      {/* Profile Info */}
      <motion.div
        variants={itemVariants}
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32"
      >
        <div className="relative z-10 bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Avatar */}
            <UserAvatar image={user.image} name={user.name} />

            {/* Info */}
            <div className="flex-grow">
              <UserName username={user.username} />

              {/* Trading Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
                {!user.hideWin && <WinRate winRate={stats.winRate} />}
                {!user.hideTotal && <TotalTrades totalTrades={stats.totalTrades} />}
                {!user.hidePnL && <TotalProfit totalPnL={stats.totalPnL} />}
              </div>
            </div>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="blogs" className="mt-12">
            <TabsList className="flex justify-center space-x-2 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
              <TabsTrigger value="blogs" className="flex items-center gap-2">
                <BookOpenIcon className="w-5 h-5" />
                {t('nav.blogs')}
              </TabsTrigger>
            </TabsList>

            <AnimatePresence mode="wait">
              <TabsContent value="blogs">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8"
                >
                  {user.blogs.map((blog) => (
                    <Card key={blog.id} className="overflow-hidden">
                      <CardHeader>
                        <CardTitle>
                          <Link href={`/blogs/${blog.id}`} className="cursor-pointer hover:opacity-85"> {blog.title}</Link>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm dark:text-gray-400 text-gray-600 line-clamp-3 mb-4">
                          {blog.shortDescription}
                        </p>
                        <div className="flex items-center justify-between text-sm dark:text-gray-400 text-gray-600">
                          <span>
                            {new Date(blog.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </motion.div>
              </TabsContent>
            </AnimatePresence>
          </Tabs>
        </div>
      </motion.div>
    </motion.div>
  );
}
