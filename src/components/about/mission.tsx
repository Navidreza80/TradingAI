// Framer motion for animation
import { motion } from "framer-motion";



export default function Mission() {
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="mb-20"
    >
      <div className="max-w-3xl mx-auto text-center">
        <h2
          className='text-3xl font-bold mb-6 dark:text-primary-dark text-primary-light'>
          Our Mission
        </h2>
        <p
          className='text-lg dark:text-secondary-dark text-secondary-light'>
          To democratize trading by providing advanced AI-powered tools and insights to traders of all levels, helping them make more informed decisions in the cryptocurrency market.
        </p>
      </div>
    </motion.div>
  );
}
