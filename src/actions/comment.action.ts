"use server";

import prisma from "@/lib/prisma";
import { getDbUserId } from "./user.action";

export async function fetchCommentsForBlog(blogId: string) {
  try {
    const comments = await prisma.comment.findMany({
      where: {
        blogId, // Filter comments by blog ID
      },
      include: {
        user: true, // Include the comment author's details
      },
      orderBy: {
        createdAt: "desc", // Sort comments by creation date (newest first)
      },
    });

    return comments;
  } catch (error) {
    console.error("Error fetching comments for blog:", error);
    throw new Error("Failed to fetch comments");
  } finally {
    await prisma.$disconnect(); // Disconnect the Prisma Client
  }
}

export async function fetchUserComment() {
  try {
    const userId = getDbUserId();
    const comments = await prisma.comment.findMany({
      where: {
        userId: userId, // Filter comments by user ID
      },
      include: {
        user: true, // Include the comment author's details
      },
      orderBy: {
        createdAt: "desc", // Sort comments by creation date (newest first)
      },
    });

    return comments;
  } catch (error) {
    console.error("Error fetching comments for blog:", error);
    throw new Error("Failed to fetch comments");
  } finally {
    await prisma.$disconnect(); // Disconnect the Prisma Client
  }
}

interface CreateCommentInput {
  content: string;
  blogId: string;
}

export async function createComment(input: CreateCommentInput) {
  try {
    const id = await getDbUserId();

    if (!id) {
      throw new Error("User not authenticated.");
    }

    const newComment = await prisma.comment.create({
      data: {
        content: input.content,
        userId: id, // Set the authenticated user as the comment author
        blogId: input.blogId, // Associate the comment with the blog
      },
    });

    return {
      newComment,
      success: true,
      message: "Comment Added Successfully!!",
    };
  } catch (error) {
    console.error("Error creating comment:", error);
    throw new Error("Failed to create comment");
  } finally {
    await prisma.$disconnect(); // Disconnect the Prisma Client
  }
}

export async function editComment(commentId: string, newContent: string) {
  try {
    const userId = await getDbUserId();
    const updatedComment = await prisma.comment.updateMany({
      where: { id: commentId, userId }, // Ensures only the comment owner can edit
      data: { content: newContent },
    });

    if (updatedComment.count === 0) {
      return { success: false, message: "Comment not found or unauthorized." };
    }

    return { success: true, message: "Comment updated successfully." };
  } catch (error) {
    console.error("Error updating comment:", error);
    return { success: false, message: "Failed to update comment." };
  }
}
