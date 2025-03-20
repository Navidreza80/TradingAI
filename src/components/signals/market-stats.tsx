// Framer motion for animation
import { motion } from "framer-motion"
// Animation variables
import { fadeInUp } from "@/utils/animation-variants"


export default function MarketStats({marketItems}) {
    return (
        <motion.div
            variants={fadeInUp}
            className="bg-white dark:bg-black/40 rounded-2xl shadow-xl p-6"
        >
            <div className="grid grid-cols-2 gap-4">
                {marketItems.map((item, index) => {
                    return (
                        <div key={index} className="flex items-center gap-2">
                            {item.icon}
                            <div>
                                <p className="text-sm text-secondary-light dark:text-secondary-dark">{item.text}</p>
                                <p className="font-semibold text-primary-light dark:text-primary-dark">{item.value}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </motion.div>
    )
}