// Framer motion for animation
import { motion } from "framer-motion";



export default function Hero() {
  
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center mb-20"
    >
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 p-2 text-primary-light dark:text-primary-dark">
        About TradingAI
      </h1>
      <p className="text-xl max-w-3xl mx-auto p-2 text-secondary-light dark:text-secondary-dark">
        Empowering traders with AI-driven insights and analysis
      </p>
    </motion.div>
  );
}
