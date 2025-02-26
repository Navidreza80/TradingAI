"use client"

import { useState, useEffect } from "react";
import { getDbUser } from "@/actions/user.action";
import Image from "next/image";
import AppSheet from "./app-sidebar";

const UserAvatar = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      const data = await getDbUser();
      setUser(data);
    };
    fetchUser();
  }, []);

  return (
    <div className="flex flex-row items-center">
      <AppSheet />
      {user.image && (
        <img
          src={user.image}
          alt={user.username}
          className="rounded-full ml-2 lg:w-12 lg:h-12 md:w-9 md:h-9 sm:w-8 sm:h-8 xs:w-7 xs:h-7"
        />
      )}
      <div className="flex flex-col ml-2">
        <span className="lg:text-sm md:text-xs sm:text-xs xs:text-xs dark:text-white text-black">{user.username}</span>
        <span className="text-xs text-gray-500">{user.role}</span>
      </div>
    </div>
  );
};

export default UserAvatar;