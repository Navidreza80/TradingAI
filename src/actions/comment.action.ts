"use server";
// Prisma client import
import prisma from "@/lib/prisma";
// Server actions
import { getDbUserId } from "./user.action";
// Types fot type safety
import { CreateCommentInput } from "@/types/comment";

// Action to fetch comments of the blog
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
    return { error, message: "failed to fetch comments", success: false };
  }
}

// Action to fetch all comments of the user
export async function fetchUserComment() {
  try {
    const userId = await getDbUserId();
    if (!userId) return "User not authenticated";
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
    return { error, message: "failed to fetch user comments", success: false };
  }
}

// Action to create a comment
export async function createComment(input: CreateCommentInput) {
  try {
    const id = await getDbUserId();

    if (!id) return "User not authenticated";

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
    return { error, message: "failed to create new comment", success: false };
  }
}

// Action to update or edit comment
export async function editComment(commentId: string, newContent: string) {
  try {
    const userId = await getDbUserId();
    if (!userId) return "User not authenticated";
    const updatedComment = await prisma.comment.updateMany({
      where: { id: commentId, userId }, // Ensures only the comment owner can edit
      data: { content: newContent },
    });

    if (updatedComment.count === 0) {
      return { success: false, message: "Comment not found or unauthorized." };
    }

    return { success: true, message: "Comment updated successfully." };
  } catch (error) {
    return { error, message: "failed to update comment", success: false };
  }
}

// Action to delete comment
export async function deleteComment(commentId: string) {
  try {
    const userId = await getDbUserId();
    if (!userId) return "User not authenticated";
    // Check if the user owns the comment
    const comment = await prisma.comment.findFirst({
      where: { id: commentId, userId },
    });

    if (!comment) {
      return { success: false, message: "Comment not found or unauthorized." };
    }

    // Delete the comment
    await prisma.comment.delete({ where: { id: commentId } });

    return { success: true, message: "Comment deleted successfully." };
  } catch (error) {
    return { success: false, message: "Failed to delete comment.", error };
  }
}
