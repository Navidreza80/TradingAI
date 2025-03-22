"use server";
// Prisma client import
import prisma from "@/lib/prisma";
// Server actions
import { getDbUserId } from "./user.action";
// Payload interface for type safety
import { CreateBlogInput } from "@/types/blog";

// Action to create a blog
export async function createBlog(input: CreateBlogInput) {
  try {
    // Get the id of the user
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
    return { success: false, error: error, message: "Failed to create blog" };
  }
}

// Action to fetch all blogs
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
    return { success: false, error: error, message: "Failed to fetch blog" };
  }
}

// Action to fetch detail of the blog
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
            comments: true,
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
    return {
      success: false,
      error: error,
      message: "Failed to fetch blog detail",
    };
  }
}

// Action to fetch all of the blogs from a user
export async function fetchUserBlogs() {
  try {
    const userId = await getDbUserId();
    if (!userId) return "User not authenticated";
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
    return {
      success: false,
      error: error,
      message: "Failed to fetch user blog",
    };
  }
}

// Action to update or edit blogs detail and information
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
    return { success: false, message: "Failed to update blog", error };
  }
}

// Action to add reaction for blog
export async function toggleBlogReaction(
  blogId: string,
  action: "like" | "dislike"
) {
  const userId = await getDbUserId();
  if (!userId) return "User not authenticated";
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
    return { success: false, message: "Error toggling reaction", error: error };
  }
}

// Action to get the blog likes and dislikes
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
    return { liked: false, disliked: false, error };
  }
}

// Action to fetch user liked blogs
export async function fetchLikedBlogs() {
  try {
    const userId = await getDbUserId();
    if (!userId) return "User not authenticated";
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
    return {
      success: false,
      error: error,
      message: "Failed to fetch liked blog",
    };
  }
}

// Action to fetch user disliked blogs
export async function fetchDislikedBlogs() {
  try {
    const userId = await getDbUserId();
    if (!userId) return "User not authenticated";
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
    return {
      success: false,
      error: error,
      message: "Failed to fetch disliked blog",
    };
  }
}

// Action to delete blog
export async function deleteBlog(blogId: string) {
  try {
    const userId = await getDbUserId();
    if (!userId) return "User not authenticated";
    await prisma.comment.deleteMany({ where: { blogId } });
    await prisma.blogLike.deleteMany({ where: { blogId } });
    await prisma.blogDislike.deleteMany({ where: { blogId } });
    // Ensure only the blog owner can delete it
    const deletedBlog = await prisma.blog.deleteMany({
      where: { id: blogId, publisherId: userId },
    });

    if (deletedBlog.count === 0) {
      return { success: false, message: "Blog not found or unauthorized." };
    }

    return { success: true, message: "Blog deleted successfully." };
  } catch (error) {
    return { success: false, error: error, message: "Failed to delete blog" };
  }
}
