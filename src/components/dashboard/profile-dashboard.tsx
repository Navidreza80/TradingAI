// Framer motion for animation
import { motion } from "framer-motion";
// React built in hooks
import { useState } from "react";
// Third party components
import Avatar from "./avatar";
import ProfileHeader from "./profile-header";
import TradingStatus from "./trading-status";
import UserTabs from "./user-tabs";
import Username from "./username";

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
  // State to save users username
  const [username, setUsername] = useState("");
  // State to save user profile picture
  const [image, setImage] = useState("");
  // State to save user background cover image
  const [banner, setBanner] = useState("");
  // Animation variables
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
        <ProfileHeader
          itemVariants={itemVariants}
          banner={banner}
          setBanner={setBanner}
          user={user}
        />

        {/* Profile Info */}
        <motion.div
          variants={itemVariants}
          className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32"
        >
          <div className="relative z-10 bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Avatar */}
              <Avatar
                image={image}
                setImage={setImage}
                user={user}
                username={username}
              />
              {/* Users Username */}
              <div className="flex-grow">
                <Username
                  username={username}
                  user={user}
                  setUsername={setUsername}
                />

                {/* Trading Stats */}
                <TradingStatus
                  hidePnL={hidePnL}
                  hideWin={hideWin}
                  hideTotal={hideTotal}
                  stats={stats}
                />
              </div>
            </div>

            {/* Tabs */}
            <UserTabs
              hideWin={hidePnL}
              setHideWin={setHideWin}
              hideTotal={hideTotal}
              setHideTotal={setHideTotal}
              hidePnL={hidePnL}
              setHidePnL={setHidePnL}
              user={user}
            />
          </div>
        </motion.div>
      </motion.div>
    )
  );
}
