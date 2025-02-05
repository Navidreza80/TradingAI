import Image from "next/image";
import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/UI/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/UI/card";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpenIcon,
  ShareIcon,
  ChatBubbleLeftIcon,
  HeartIcon
} from "@heroicons/react/24/outline";

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
  type: 'LONG' | 'SHORT';
  entry: number;
  target: number;
  stopLoss: number;
  date: Date;
  status: 'WIN' | 'LOSS' | 'PENDING';
}

interface Course {
  id: string;
  title: string;
  provider: string;
  completionDate: Date;
  certificate: string;
}

export default function ProfileCard({ user }: ProfileCardProps) {
  const { t, i18n } = useTranslation();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen bg-gradient-to-b dark:from-[#0a0a0a] dark:to-[#1a1a1a] from-gray-50 to-white"
    >

      {/* Profile Header */}
      <motion.div 
        variants={itemVariants}
        className="relative h-[300px] w-full"
      >
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
            <div className="flex-shrink-0">
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
                  <h1 className={`text-3xl font-bold dark:text-white text-gray-900
                    ${i18n.language === 'fa' ? 'font-vazirmatn' : ''} 
                    ${i18n.language === 'ar' ? 'font-notokufi' : ''}`}>
                    {user.name}
                  </h1>
                  <p className={`text-lg dark:text-blue-400 text-blue-600 font-medium
                    ${i18n.language === 'fa' ? 'font-vazirmatn' : ''} 
                    ${i18n.language === 'ar' ? 'font-notokufi' : ''}`}>
                    {user.role}
                  </p>
                </div>
                <div className="flex gap-4">
                  {user.social.github && (
                    <a href={user.social.github} target="_blank" rel="noopener noreferrer"
                      className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                      <FaGithub size={24} />
                    </a>
                  )}
                  {user.social.twitter && (
                    <a href={user.social.twitter} target="_blank" rel="noopener noreferrer"
                      className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                      <FaTwitter size={24} />
                    </a>
                  )}
                  {user.social.linkedin && (
                    <a href={user.social.linkedin} target="_blank" rel="noopener noreferrer"
                      className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                      <FaLinkedin size={24} />
                    </a>
                  )}
                </div>
              </div>

              {/* Trading Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
                <div className="p-4 rounded-xl dark:bg-gray-800 bg-gray-100">
                  <div className="text-sm dark:text-gray-400 text-gray-600">Trading Style</div>
                  <div className="text-xl font-bold dark:text-white text-gray-900">{user.tradingStyle}</div>
                </div>
                <div className="p-4 rounded-xl dark:bg-gray-800 bg-gray-100">
                  <div className="text-sm dark:text-gray-400 text-gray-600">Win Rate</div>
                  <div className="text-xl font-bold dark:text-white text-gray-900">{user.winRate}%</div>
                </div>
                <div className="p-4 rounded-xl dark:bg-gray-800 bg-gray-100">
                  <div className="text-sm dark:text-gray-400 text-gray-600">Total Trades</div>
                  <div className="text-xl font-bold dark:text-white text-gray-900">{user.totalTrades}</div>
                </div>
                <div className="p-4 rounded-xl dark:bg-gray-800 bg-gray-100">
                  <div className="text-sm dark:text-gray-400 text-gray-600">P&L</div>
                  <div className={`text-xl font-bold ${user.profitLoss >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {user.profitLoss >= 0 ? '+' : ''}{user.profitLoss}%
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="blogs" className="mt-12">
            <TabsList className="flex justify-center space-x-2 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
              <TabsTrigger value="blogs" className="flex items-center gap-2">
                <HeartIcon className="w-5 h-5" />
                {t('profile.tabs.likedBlogs')}
              </TabsTrigger>
              <TabsTrigger value="comments" className="flex items-center gap-2">
                <ChatBubbleLeftIcon className="w-5 h-5" />
                {t('profile.tabs.comments')}
              </TabsTrigger>
              <TabsTrigger value="shared" className="flex items-center gap-2">
                <ShareIcon className="w-5 h-5" />
                {t('profile.tabs.shared')}
              </TabsTrigger>
              <TabsTrigger value="suggestions" className="flex items-center gap-2">
                {/* <TrendingUpIcon className="w-5 h-5" /> */}
                {t('profile.tabs.suggestions')}
              </TabsTrigger>
              <TabsTrigger value="courses" className="flex items-center gap-2">
                <BookOpenIcon className="w-5 h-5" />
                {t('profile.tabs.courses')}
              </TabsTrigger>
            </TabsList>

            <AnimatePresence mode="wait">
              {/* Liked Blogs Tab */}
              <TabsContent value="blogs">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8"
                >
                  {user.blogsLiked.map((blog) => (
                    <Card key={blog.id} className="overflow-hidden">
                      <CardHeader>
                        <CardTitle className="line-clamp-2">{blog.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm dark:text-gray-400 text-gray-600 line-clamp-3 mb-4">
                          {blog.excerpt}
                        </p>
                        <div className="flex items-center justify-between text-sm dark:text-gray-400 text-gray-600">
                          <span>{new Date(blog.date).toLocaleDateString()}</span>
                          <span>{blog.readTime} min read</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </motion.div>
              </TabsContent>

              {/* Similar structure for other tabs... */}
            </AnimatePresence>
          </Tabs>
        </div>
      </motion.div>
    </motion.div>
  );
}