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

    return { data: newBlog, success: true };
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
        _count: {
          select: {
            likes: true,
            dislikes: true,
          },
        },
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
        _count: {
          select: {
            likes: true,
            dislikes: true,
          },
        },
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
        _count: {
          select: {
            likes: true,
            dislikes: true,
          },
        },
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

export async function updateBlog(
  userId: string,
  blogId: string,
  updateData: {
    title?: string;
    shortDescription?: string;
    content?: string;
    blogThumbnail?: string;
  }
) {
  try {
    // Check if the blog exists and belongs to the user
    const existingBlog = await prisma.blog.findUnique({
      where: { id: blogId },
    });

    if (!existingBlog) {
      return { success: false, message: "Blog not found" };
    }

    if (existingBlog.publisherId !== userId) {
      return {
        success: false,
        message: "Unauthorized: You can only edit your own blogs",
      };
    }

    // Update the blog
    const updatedBlog = await prisma.blog.update({
      where: { id: blogId },
      data: { ...updateData },
    });

    return {
      success: true,
      message: "Blog updated successfully!!",
      updatedBlog,
    };
  } catch (error) {
    console.error("Error updating blog:", error);
    return { success: false, message: "An error occurred", error };
  }
}

export async function toggleBlogReaction(
  blogId: string,
  action: "like" | "dislike"
) {
  const userId = await getDbUserId();
  try {
    // Check if the user has already liked or disliked the blog
    const existingLike = await prisma.blogLike.findUnique({
      where: { userId_blogId: { userId, blogId } },
    });

    const existingDislike = await prisma.blogDislike.findUnique({
      where: { userId_blogId: { userId, blogId } },
    });

    if (action === "like") {
      if (existingLike) {
        // If already liked, remove the like
        await prisma.blogLike.delete({
          where: { userId_blogId: { userId, blogId } },
        });
        return { success: true, message: "Like removed." };
      } else {
        // Remove dislike if it exists, then add like
        if (existingDislike) {
          await prisma.blogDislike.delete({
            where: { userId_blogId: { userId, blogId } },
          });
        }

        await prisma.blogLike.create({
          data: { userId, blogId },
        });
        return { success: true, message: "Blog liked successfully!!" };
      }
    } else if (action === "dislike") {
      if (existingDislike) {
        // If already disliked, remove the dislike
        await prisma.blogDislike.delete({
          where: { userId_blogId: { userId, blogId } },
        });
        return { success: true, message: "Dislike removed." };
      } else {
        // Remove like if it exists, then add dislike
        if (existingLike) {
          await prisma.blogLike.delete({
            where: { userId_blogId: { userId, blogId } },
          });
        }

        await prisma.blogDislike.create({
          data: { userId, blogId },
        });
        return { success: true, message: "Blog disliked successfully!!" };
      }
    }
  } catch (error) {
    console.error("Error toggling blog reaction:", error);
    return { success: false, message: "Error toggling reaction", error };
  }
}

export async function getBlogReaction(userId: string, blogId: string) {
  try {
    // Check if user liked the blog
    const liked = await prisma.blogLike.findUnique({
      where: { userId_blogId: { userId, blogId } },
    });

    // Check if user disliked the blog
    const disliked = await prisma.blogDislike.findUnique({
      where: { userId_blogId: { userId, blogId } },
    });

    return {
      liked: !!liked, // Returns true if the blog is liked, otherwise false
      disliked: !!disliked, // Returns true if the blog is disliked, otherwise false
    };
  } catch (error) {
    console.error("Error fetching blog reaction:", error);
    return { liked: false, disliked: false, error };
  }
}

export async function fetchLikedBlogs() {
  try {
    const userId = await getDbUserId();
    const likedBlogs = await prisma.blog.findMany({
      where: {
        likes: {
          some: { userId },
        },
      },
      include: {
        _count: {
          select: {
            likes: true,
            dislikes: true,
          },
        },
        publisher: true, // Include the publisher's details
        comments: true, // Include all comments
      },
      orderBy: {
        createdAt: "desc", // Sort by creation date (newest first)
      },
    });

    return likedBlogs;
  } catch (error) {
    console.error("Error fetching liked blogs:", error);
  }
}

export async function fetchDislikedBlogs() {
  try {
    const userId = await getDbUserId();
    const dislikedBlogs = await prisma.blog.findMany({
      where: {
        dislikes: {
          some: { userId },
        },
      },
      include: {
        _count: {
          select: {
            likes: true,
            dislikes: true,
          },
        },
        publisher: true, // Include the publisher's details
        comments: true, // Include all comments
      },
      orderBy: {
        createdAt: "desc", // Sort by creation date (newest first)
      },
    });

    return dislikedBlogs;
  } catch (error) {
    console.error("Error fetching disliked blogs:", error);
  }
}
