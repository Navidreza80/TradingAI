"use client";
// Server actions
import { calculateUserStats } from "@/actions/trade.action";
import { getDbUser } from "@/actions/user.action";
// Third party components
import ProfileCard from "@/components/dashboard/profile-dashboard";
// React built in hooks
import { useEffect, useState } from "react";

export default function UserProfilePage() {
  // State to save user details and information
  const [user, setUser] = useState({});
  // State to save user status: total trades, win rate, total profit
  const [stats, setStats] = useState({});
  // State to either hide win rate of user or not
  const [hideWin, setHideWin] = useState<boolean | null>(false);
  // State to either hide user total trades or not
  const [hideTotal, setHideTotal] = useState<boolean | null>(false);
  // State to either hide user profits or not
  const [hidePnL, setHidePnL] = useState<boolean | null>(false);
  // function to fetch all of the user information
  const fetchUser = async () => {
    const stats = await calculateUserStats();
    const data = await getDbUser();
    if (data == "User not found") return;
    else if(data && typeof data !== "string") {
      setUser(data);
      setHideWin(data.hideWin);
      setHideTotal(data.hideTotal);
      setHidePnL(data.hidePnL);
    }
    setStats(stats);
  };
  // useEffect to fetch user information when the component is mounting
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
