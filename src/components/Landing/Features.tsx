'use client'
// Icons imports
import {
  AcademicCapIcon,
  BoltIcon,
  ChartBarIcon,
  NewspaperIcon
} from '@heroicons/react/24/outline';
// Framer motion imports for animation
import { motion } from 'framer-motion';
// Animation variables
import { containerVariants, itemVariants } from '@/utils/animation-variants';

export default function Features() {
  
  

  // Features items object
  const features = [
    {
      icon: <ChartBarIcon className="w-8 h-8" />,
      title: 'Real-Time Analysis',
      description: 'Get instant market analysis and trading signals based on real-time data',
      color: 'from-blue-500 to-cyan-400' // Real-time analysis theme
    },
    {
      icon: <AcademicCapIcon className="w-8 h-8" />,
      title: 'Learn & Test',
      description: 'Master trading strategies through interactive courses and test your knowledge with comprehensive exams',
      color: 'from-purple-500 to-pink-500' // Education theme
    },
    {
      icon: <BoltIcon className="w-8 h-8" />,
      title: 'Advanced Features',
      description: 'Advanced tools and features powered by artificial intelligence to help you make better trading decisions.',
      color: 'from-amber-500 to-orange-400' // Advanced features theme
    },
    {
      icon: <NewspaperIcon className="w-8 h-8" />,
      title: 'Stay Updated',
      description: 'Get the latest crypto news, market analysis, and expert insights through our regularly updated blogs and news section',
      color: 'from-green-500 to-emerald-400' // News theme
    }
  ];

  return (
    <section className="relative py-11 bg-background-light dark:bg-background-dark overflow-hidden">
      
      {/* Background Pattern - Creates a subtle dot pattern overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(24,144,255,0.1)_1px,transparent_1px)] 
        bg-[length:20px_20px] opacity-50 dark:opacity-50" />

      {/* Content Container - Centers and constrains the content width */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header - Title and subtitle with animations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20"
        >
          {/* Section Title - Gradient text with language support */}
          <h2 className='text-3xl sm:text-4xl lg:text-5xl font-bold p-3 text-primary-light dark:text-primary-dark'>
          Powerful Features for Smart Trading
          </h2>

          {/* Section Subtitle - Responsive text with theme support */}
          <p className='text-secondary-light dark:text-secondary-dark mt-4 text-lg max-w-3xl mx-auto'>
          Advanced tools and features powered by artificial intelligence to help you make better trading decisions
          </p>
        </motion.div>

        {/* Features Grid - Responsive grid with equal height cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 auto-rows-fr"
        >
          
          {/* Feature Cards - Map through features array */}
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative group h-full"
            >
              
              {/* Card Container - Glass morphism effect with theme support */}
              <div className="relative z-10 p-8 rounded-2xl 
                dark:border-white/10 border-black/5 border
                backdrop-blur-xl 
                dark:hover:bg-white/10 hover:bg-white/90
                transition-all duration-300 hover:scale-[1.02]
                dark:hover:shadow-[0_0_30px_rgba(24,144,255,0.1)]
                hover:shadow-[0_0_30px_rgba(24,144,255,0.2)]
                h-full flex flex-col">
                
                {/* Feature Icon - Gradient background with shadow */}
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${feature.color}
                  shadow-lg mb-6 self-start`}>
                  {feature.icon}
                </div>

                {/* Feature Content - Flex column for title and description */}
                <div className="flex-grow flex flex-col">
                  <h3 className='text-xl font-bold dark:text-primary-dark text-primary-light mb-4'>
                    {feature.title}
                  </h3>
                  <p className='text-secondary-light dark:text-secondary-dark'>
                    {feature.description}
                  </p>
                </div>

                {/* Hover Effect - Gradient overlay with blur */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r 
                  dark:from-blue-500/20 dark:to-purple-500/20 
                  from-blue-500/10 to-purple-500/10
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