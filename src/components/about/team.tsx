// Framer motion for animation
import { motion } from "framer-motion";
// Next built in components
import Image from "next/image";



export default function Team() {
  
  
  // Team items for translation
  const team = [
    {
      name: "Navidreza Abbaszadeh",
      role: 'Front / Back developer',
      image: "/image/8b167af653c2399dd93b952a48740620.jpg",
    },
    {
      name: "Taha Talebi",
      role: 'Front developer',
      image: "/image/8b167af653c2399dd93b952a48740620.jpg",
    },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
    >
      <h2
        className='text-3xl font-bold mb-12 text-center dark:text-primary-dark text-primary-light'>
        Meet Our Team
      </h2>
      <div className="flex flex-row flex-wrap justify-center w-full gap-8">
        {team.map((member, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 * index }}
            className="relative group xl:w-1/3 lg:w-1/3 md:w-1/2 sm:w-full xs:w-full max-[400px]:w-full"
          >
            <div
              className="relative z-10 rounded-2xl overflow-hidden
                dark:border-white/10 border-black/5 border
                backdrop-blur-xl 
                transition-all duration-300 hover:scale-[1.02]
                dark:hover:shadow-[0_0_30px_rgba(24,144,255,0.1)]
                hover:shadow-[0_0_30px_rgba(24,144,255,0.2)]"
            >
              <div className="relative h-64 w-full">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6 text-center">
                <h3
                  className='text-xl font-bold mb-2 dark:text-primary-dark text-primary-light'>
                  {member.name}
                </h3>
                <p
                  className='dark:text-secondary-dark text-secondary-light'>
                  {member.role}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
