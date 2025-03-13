import { Trash } from "lucide-react";
import { Button } from "../ui/button";
import { deleteBlog } from "@/actions/blog.action";
import toast from "react-hot-toast";

export default function DeleteBlog({ id, blog, setBlogs }) {
  const handleDeleteBlog = async () => {
    const request = await deleteBlog(id);
    if (request.success) toast.success("Blog deleted successfully!!");
    setBlogs(blog.filter((e) => e.id = id))
  };
  return (
    <Button
      onClick={handleDeleteBlog}
      className="absolute z-10 top-12 right-2 dark:bg-red-800 bg-red-800"
    >
      {/* Icon */}
      <Trash /> Delete
    </Button>
  );
}
