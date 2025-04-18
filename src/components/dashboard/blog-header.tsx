// Next built in components
import Link from "next/link";
// Third party components
import BlogsDropdown from "./dropdown-menu-blogs";
// Shadcn components
import { Button } from "../UI/Button";
// Icons
import { Plus } from "lucide-react";
// Framer motion
import { motion } from "framer-motion";



export default function BlogsHeader({ selected, setSelected }) {
    
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center mb-6"
    >
      <h1
        className={`text-3xl sm:text-4xl lg:text-5xl font-bold p-2
          bg-gradient-to-r dark:from-white dark:to-gray-400 from-gray-900 to-gray-600 
          bg-clip-text text-transparent 
           
          `}
      >
        Your Blogs
      </h1>
      <p
        className={`text-lg dark:text-gray-400 text-gray-600 max-w-3xl mx-auto p-2
           
          `}
      >
        Manage your blogs here
      </p>
      <BlogsDropdown selected={selected} setSelected={setSelected} />
      <Link href="/dashboard/blogs/create">
        <Button className="mt-2">
          <Plus /> Create Blog
        </Button>
      </Link>
    </motion.div>
  );
}
