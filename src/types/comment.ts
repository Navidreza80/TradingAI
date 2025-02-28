import { Blog } from "./blog";
import { User } from "./user";

export interface Comment {
    id: string;
    content: string;
    userId: string;
    user: User;
    blogId: number;
    blog: Blog;
    createdAt: string;
    likes: number;
    dislikes: number;
}