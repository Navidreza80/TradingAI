import { Blog } from "./blog";


export interface User {
    id: string;
    email: string;
    username: string;
    clerkId: string;
    name?: string;
    image?: string;
    createdAt: Date;
    updatedAt: Date;
    role? : string;
    blogs: Blog[];
    comments: Comment
}