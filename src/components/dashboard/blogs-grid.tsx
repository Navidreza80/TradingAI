// Framer motion for animation
import { motion } from "framer-motion";
// Third party components
import YourBlogCard from "./your-blog-card";
import BlogCard from "../blogs/blog-card";

export default function BlogsGrid({ filteredBlogs, selected, setBlogs}) {
  return (
    filteredBlogs.length > 0 && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {selected == "Your blogs"
          ? filteredBlogs.map((blog, index) => (
              <YourBlogCard setBlogs={setBlogs} key={index} blog={blog} />
            ))
          : filteredBlogs.map((blog, index) => (
              <BlogCard key={index} blog={blog} />
            ))}
      </motion.div>
    )
  );
}
