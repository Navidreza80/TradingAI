"use client";
// Server action
import { calculateUserStatsById } from "@/actions/trade.action";
import { getUserById } from "@/actions/user.action";
// Third party components
import ProfileCard from "@/components/user/profile-card";
// Types  for type safety
import { User } from "@/types/user";
// Next built in hook
import { useParams } from "next/navigation";
// React built in hooks
import { useEffect, useState } from "react";

export default function UserProfilePage() {
  // State to save user information
  const [user, setUser] = useState<User>(null);
  // State to save user trading status
  const [stats, setStats] = useState(null);
  // Get user id from route param
  const { id } = useParams();
  // Function to get user by id
  const getUserInformation = async () => {
    if (typeof id == "string") {
      const user = await getUserById(id);
      setUser(user.user);
      const userStats = await calculateUserStatsById(id);
      setStats(userStats);
    }
  };
  useEffect(() => {
    getUserInformation();
  }, []);

  return user && stats && <ProfileCard user={user} stats={stats} />;
}
