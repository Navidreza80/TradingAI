import { Comment } from "./comment";
import { User } from "./user";

export interface Blog {
  id: string;
  title: string;
  shortDescription: string;
  content?: string;
  likes: number;
  _count: {
    likes: number;
    dislikes: number;
  };
  dislikes: number;
  isLiked: boolean;
  isDisliked: boolean;
  isSaved: boolean;
  comments: Comment[];
  blogThumbnail?: string;
  publisherId: string;
  publisher: User;
  createdAt: Date;
  updatedAt: Date;
}
