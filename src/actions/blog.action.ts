"use server";

import prisma from "@/lib/prisma";
import { getDbUserId } from "./user.action";
interface CreateBlogInput {
  title: string;
  shortDescription: string;
  content?: string;
  blogThumbnail?: string;
}

export async function createBlog(input: CreateBlogInput) {
  try {
    const userId = await getDbUserId();
    if (!userId) return "User not authenticated";

    const newBlog = await prisma.blog.create({
      data: {
        title: input.title,
        shortDescription: input.shortDescription,
        content: input.content,
        blogThumbnail: input.blogThumbnail,
        publisherId: userId, // Set the authenticated user as the publisher
      },
    });

    return newBlog;
  } catch (error) {
    console.error("Error creating blog:", error);
    throw new Error("Failed to create blog");
  } finally {
    await prisma.$disconnect(); // Disconnect the Prisma Client
  }
}

export async function fetchBlogs() {
  try {
    const blogs = await prisma.blog.findMany({
      include: {
        publisher: true, // Include the publisher's details
        comments: true, // Include all comments
      },
      orderBy: {
        createdAt: "desc", // Sort by creation date (newest first)
      },
    });

    return blogs;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    throw new Error("Failed to fetch blogs");
  } finally {
    await prisma.$disconnect(); // Disconnect the Prisma Client
  }
}

export async function fetchBlogById(id: string) {
  try {
    const blog = await prisma.blog.findUnique({
      where: {
        id, // Find the blog by its ID
      },
      include: {
        publisher: true, // Include the publisher's details
        // comments: true,  // Include all comments
      },
    });

    if (!blog) {
      throw new Error("Blog not found");
    }

    return blog;
  } catch (error) {
    console.error("Error fetching blog by ID:", error);
    throw new Error("Failed to fetch blog");
  } finally {
    await prisma.$disconnect(); // Disconnect the Prisma Client
  }
}

export async function fetchUserBlogs() {
  try {
    const userId = await getDbUserId();
    const blogs = await prisma.blog.findMany({
      where: {
        publisherId: userId, // Filter blogs by the user's ID
      },
      include: {
        comments: true, // Include comments if needed
        publisher: true,
      },
      orderBy: {
        createdAt: "desc", // Sort blogs by creation date (newest first)
      },
    });

    return blogs;
  } catch (error) {
    console.error("Error fetching user blogs:", error);
    throw new Error("Failed to fetch user blogs");
  } finally {
    await prisma.$disconnect(); // Disconnect the Prisma Client
  }
}
