"use client"
// Next built in
import dynamic from "next/dynamic";
// Third party components
const Features = dynamic(() => import('@/components/Landing/Features'), { ssr: false });
const LandingSections = dynamic(() => import('@/components/Landing/Sections'), { ssr: false });
import HeroSection from "@/components/Landing/HeroSection";
// Icons
import { AcademicCapIcon, ArrowTrendingUpIcon, MagnifyingGlassIcon, UserGroupIcon } from "@heroicons/react/24/outline";
import { BitcoinIcon, BookOpenIcon, ChartBarIcon, ClockIcon, NewspaperIcon, PaperclipIcon, RssIcon, StarIcon, TrophyIcon, UsersIcon } from "lucide-react";
import { FaRobot } from "react-icons/fa";
// i18n for translation
import { useTranslation } from "react-i18next";
// Types
import { LandingSectionsInterface } from "@/types";

export default function Home() {
  const { t } = useTranslation()
  const landingSectionItems: LandingSectionsInterface[] = [
    {
      title: t('signals.title'),
      description: t('signals.desc'),
      mainButton: {
        className: "from-blue-500 to-cyan-400",
        text: t('signals.getSignal')
      },
      secondButton: null,
      features: [
        {
          icon: <BitcoinIcon className="w-8 h-8" />,
          value: 'BTCUSDT',
          title: t('signals.selectP'),
          description: null,
          color: 'from-blue-500 to-cyan-400',
        },
        {
          icon: <ClockIcon className="w-8 h-8" />,
          value: '1h',
          title: t('signals.selectT'),
          description: null,
          color: 'from-emerald-500 to-teal-500'
        },
        {
          icon: <ChartBarIcon className="w-8 h-8" />,
          value: '100',
          title: t('signals.adjustC'),
          description: null,
          color: 'from-amber-500 to-orange-400'
        },
        {
          icon: <StarIcon className="w-8 h-8" />,
          value: 'TP / SL',
          title: t('signals.generateS'),
          description: null,
          color: 'from-purple-500 to-pink-500'
        }
      ]
    },
    {
      title: t('strategies.title'),
      description: t('strategies.description'),
      mainButton: {
        className: "from-emerald-500 to-teal-500",
        text: t('strategies.startLearning')
      },
      secondButton: {
        className: "hover:bg-emerald-500/10 border-emerald-500",
        text: t('strategies.takeTest')
      },
      features: [
        {
          icon: <BookOpenIcon className="w-8 h-8" />,
          value: 50,
          title: t('strategies.courses'),
          description: t('strategies.coursesDesc'),
          color: 'from-blue-500 to-cyan-400'
        },
        {
          icon: <AcademicCapIcon className="w-8 h-8" />,
          value: 1000,
          title: t('strategies.exercises'),
          description: t('strategies.exercisesDesc'),
          color: 'from-emerald-500 to-teal-500'
        },
        {
          icon: <TrophyIcon className="w-8 h-8" />,
          value: 20,
          title: t('strategies.certificates'),
          description: t('strategies.certificatesDesc'),
          color: 'from-amber-500 to-orange-400'
        },
        {
          icon: <UserGroupIcon className="w-8 h-8" />,
          value: 5000,
          title: t('strategies.students'),
          description: t('strategies.studentsDesc'),
          color: 'from-purple-500 to-pink-500'
        }
      ],
    },
    {
      title: t("features.update.title"),
      description: t("features.update.description"),
      mainButton: {
        className: "from-purple-500 to-pink-500",
        text: t('news.explore')
      },
      secondButton: {
        className: "hover:bg-purple-500/10 border-purple-500",
        text: t('news.read')
      },
      features: [
        {
          icon: <NewspaperIcon className="w-8 h-8 text-white" />,
          value: null,
          title: t("news.latest.title"),
          description: t("news.latest.description"),
          color: "from-blue-500 to-cyan-400",
        },
        {
          icon: <ChartBarIcon className="w-8 h-8 text-white" />,
          value: null,
          title: t("news.impact.title"),
          description: t("news.impact.description"),
          color: "from-purple-500 to-pink-500",
        },
        {
          icon: <RssIcon className="w-8 h-8 text-white" />,
          value: null,
          title: t("news.blogs.title"),
          description: t("news.blogs.description"),
          color: "from-amber-500 to-orange-400",
        },
        {
          icon: <ArrowTrendingUpIcon className="w-8 h-8 text-white" />,
          title: t("news.share.title"),
          value: null,
          description: t("news.share.description"),
          color: "from-green-500 to-emerald-400",
        },
      ],
    },
    {
      title: t("analyze.title"),
      description: t("analyze.description"),
      mainButton: {
        className: "from-amber-500 to-orange-400",
        text: t('analyze.execute')
      },
      secondButton: {
        className: "hover:bg-amber-500/10 from-amber-500",
        text: t('analyze.analyze')
      },
      features: [
        {
          icon: <PaperclipIcon className="w-8 h-8 text-white" />,
          title: t("analyze.demo"),
          description: t("analyze.desc"),
          value: null,
          color: "from-blue-500 to-cyan-400",
        },
        {
          icon: <FaRobot className="w-8 h-8 text-white" />,
          title: t("analyze.titleR"),
          description: t("analyze.descR"),
          value: null,
          color: "from-purple-500 to-pink-500",
        },
        {
          icon: <MagnifyingGlassIcon className="w-8 h-8 text-white" />,
          title: t("analyze.titleM"),
          description: t("analyze.descM"),
          value: null,
          color: "from-amber-500 to-orange-400",
        },
        {
          icon: <UsersIcon className="w-8 h-8 text-white" />,
          title: t("analyze.titleF"),
          value: null,
          description: t("analyze.descF"),
          color: "from-green-500 to-emerald-400",
        },
      ],
    },
  ]
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white flex flex-col">
      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <Features />
      
      {landingSectionItems.map((item, index) => {
        return (
          <LandingSections features={item.features} secondButton={item.secondButton} title={item.title} description={item.description} mainButton={item.mainButton} key={index} />
        )
      })}
    </main>
  )
}
