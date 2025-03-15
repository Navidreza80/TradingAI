import { Blog } from "./blog";


export interface User {
    id: string;
    email: string;
    username: string;
    clerkId: string;
    name?: string;
    coverImage: string;
    image?: string;
    createdAt: Date;
    blogs: Blog[];
    comments: Comment;
    hideWin: boolean;
    hideTotal: boolean;
    hidePnL: boolean;
}

export interface Stats {
    winRate: number;
    totalTrades: number;
    totalPnL: number;
}