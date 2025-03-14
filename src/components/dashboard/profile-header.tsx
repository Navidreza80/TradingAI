// Framer motion for animation
import { motion } from "framer-motion";
// Third party components
import EditBanner from "./edit-banner";
// NExt built in components
import Image from "next/image";

export default function ProfileHeader({banner, setBanner, user, itemVariants}) {

  return (
    <motion.div variants={itemVariants} className="relative h-[300px] w-full">
      {/* Edit User Profile Background Image Modal */}
      <EditBanner banner={banner} setBanner={setBanner} id={user.id} />
      <Image
        src={banner ? banner : user.coverImage}
        alt="Cover"
        fill
        className="object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50" />
    </motion.div>
  );
}
