"use client";

import { calculateUserStats } from "@/actions/trade.action";
import { getDbUser, getDbUserId } from "@/actions/user.action";
import ProfileCard from "@/components/dashboard/profile-dashboard";
import { useEffect, useState } from "react";

const staticUser = {
  name: "Sarah Johnson",
  email: "sarah.j@tradingai.com",
  role: "Professional Crypto Trader",
  profilePicture: "/image/8b167af653c2399dd93b952a48740620.jpg",
  coverImage: "/image/trade.png",
  bio: "Professional crypto trader with 5+ years of experience. Specialized in technical analysis and algorithmic trading.",
  location: "Singapore",
  joinDate: new Date("2021-06-15"),
  tradingStyle: "Swing Trading",
  winRate: 76.5,
  totalTrades: 1247,
  profitLoss: 324.5,

  // Social media links
  social: {
    github: "https://github.com/sarahj",
    twitter: "https://twitter.com/sarahj_trader",
    linkedin: "https://linkedin.com/in/sarahj",
  },
};

export default function UserProfilePage() {
  const [user, setUser] = useState({});
  const [stats, setStats] = useState({});
  const [hideWin, setHideWin] = useState(false);
  const [hideTotal, setHideTotal] = useState(false);
  const [hidePnL, setHidePnL] = useState(false);
  const fetchUser = async () => {
    const userId = await getDbUserId();
    const stats = await calculateUserStats(userId);
    const data = await getDbUser();
    setUser(data);
    setStats(stats);
    setHideWin(data.hideWin);
    setHideTotal(data.hideTotal);
    setHidePnL(data.hidePnL);
  };
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <ProfileCard
      user={user}
      stats={stats}
      setHideWin={setHideWin}
      hideWin={hideWin}
      hideTotal={hideTotal}
      setHideTotal={setHideTotal}
      hidePnL={hidePnL}
      setHidePnL={setHidePnL}
    />
  );
}
