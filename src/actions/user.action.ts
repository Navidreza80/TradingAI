"use server";

import prisma from "@/lib/prisma";
import { auth, currentUser } from "@clerk/nextjs/server";

export async function syncUser() {
  try {
    const { userId } = await auth();
    const user = await currentUser();

    if (!userId || !user) return;

    const existingUser = await prisma.user.findUnique({
      where: {
        clerkId: userId,
      },
    });

    if (existingUser) return existingUser;

    const dbUser = await prisma.user.create({
      data: {
        clerkId: userId,
        name: `${user.firstName || ""} ${user.lastName || ""}`,
        username:
          user.username ?? user.emailAddresses[0].emailAddress.split("@")[0],
        email: user.emailAddresses[0].emailAddress,
        image: user.imageUrl,
      },
    });

    return dbUser;
  } catch (error) {
    console.log("Error in syncUser", error);
  }
}

export async function getUserByClerkId(clerkId: string) {
  return prisma.user.findUnique({
    where: {
      clerkId,
    },
  });
}

export async function getDbUserId() {
  const { userId: clerkId } = await auth();
  if (!clerkId) return clerkId;

  const user = await getUserByClerkId(clerkId);

  if (!user) throw new Error("User not found");

  return user.id;
}

export async function getDbUser() {
  const { userId: clerkId } = await auth();
  if (!clerkId) return clerkId;

  const user = await getUserByClerkId(clerkId);

  if (!user) throw new Error("User not found");

  return user;
}

export async function updateUsername(userId: string, newUsername: string) {
  try {
    // Check if the new username is already taken
    const existingUser = await prisma.user.findUnique({
      where: { username: newUsername },
    });

    if (existingUser) {
      return { success: false, message: "Username is already taken" };
    }

    // Update the username
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { username: newUsername },
    });

    return {
      success: true,
      message: "Username updated successfully!!",
      updatedUser,
    };
  } catch (error) {
    console.error("Error updating username:", error);
    return { success: false, message: "An error occurred", error };
  }
}

export async function updateUserImage(userId: string, url: string) {
  try {
    // Update the user image
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { image: url },
    });

    return {
      success: true,
      message: "Avatar updated successfully!!",
      updatedUser,
    };
  } catch (error) {
    console.error("Error updating avatar:", error);
    return { success: false, message: "An error occurred", error };
  }
}

export async function updateUserBanner(userId: string, url: string) {
  try {
    // Update the user image
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { coverImage: url },
    });

    return {
      success: true,
      message: "Banner updated successfully!!",
      updatedUser,
    };
  } catch (error) {
    console.error("Error updating banner:", error);
    return { success: false, message: "An error occurred", error };
  }
}
