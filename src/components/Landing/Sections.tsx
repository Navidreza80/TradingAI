'use client'
// Framer motion imports for user animation
import { motion } from 'framer-motion';
// Animation variables
import { containerVariants, itemVariants } from '@/utils/animation-variants';
import { LandingSectionsInterface } from '@/types';

export default function LandingSections({title, description, mainButton, secondButton, features}: LandingSectionsInterface) {

  return (
    <section className="relative py-11 bg-background-light dark:bg-background-dark overflow-hidden">

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold p-3 text-primary-light dark:text-primary-dark">
            {title}
          </h2>
          <p className="mt-4 text-lg text-secondary-light dark:text-secondary-dark max-w-3xl mx-auto">
            {description}
          </p>
          <div className="flex justify-center gap-4 mt-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-8 py-3 rounded-xl bg-gradient-to-r ${mainButton.className}
                text-white font-semibold shadow-lg hover:shadow-xl
                transition-all duration-300`}
            >
              {mainButton.text}
            </motion.button>
            {secondButton && <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-8 py-3 rounded-xl border-2 ${secondButton.className}
                dark:text-white text-gray-900 font-semibold
                transition-all duration-300`}
            >
              {secondButton.text}
            </motion.button>}
          </div>
        </motion.div>

        {/* Strategies Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative group"
            >
              <div className="relative z-10 p-8 rounded-2xl 
                dark:border-white/10 border-black/5 border
                backdrop-blur-xl 
                dark:hover:bg-white/10 hover:bg-white/90
                transition-all duration-300 hover:scale-[1.02]
                dark:hover:shadow-[0_0_30px_rgba(24,144,255,0.1)]
                hover:shadow-[0_0_30px_rgba(24,144,255,0.2)]
                h-full flex flex-col items-center text-center">

                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${feature.color} shadow-lg mb-6`}>
                  {feature.icon}
                </div>

                {feature.value && <div className="text-4xl font-bold mb-4 text-secondary-light dark:text-secondary-dark">
                  {feature.value}+
                </div>}

                <h3 className="text-xl font-bold dark:text-primary-dark text-primary-light mb-2">
                  {feature.title}
                </h3>

                {feature.description && <p className="text-sm dark:text-secondary-dark text-secondary-light">
                  {feature.description}
                </p>}

                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r 
                  dark:from-emerald-500/20 dark:to-teal-500/20 
                  from-emerald-500/10 to-teal-500/10
                  opacity-0 group-hover:opacity-100 transition-opacity 
                  duration-300 blur-xl -z-10" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
} 