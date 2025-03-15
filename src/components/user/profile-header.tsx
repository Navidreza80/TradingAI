// Framer motion for animation
import { motion } from "framer-motion";
// Next built in components
import Image from "next/image";

export default function ProfileHeader({itemVariants, coverImage}) {
  return (
    <motion.div variants={itemVariants} className="relative h-[300px] w-full">
      <Image src={coverImage} alt="Cover" fill className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50" />
    </motion.div>
  );
}
