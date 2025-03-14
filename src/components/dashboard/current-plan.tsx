"use client"
// ShadCn components
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
// Framer motion for animation
import { motion } from "framer-motion";

export default function UserPlan() {
  // Mock Plan Object
  const currentPlan = {
    name: "Basic Plan",
    price: "$9.99/month",
    features: ["Access to basic analytics", "Limited trade insights", "Standard support"],
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-1/2 md:w-full sm:w-full xs:w-full flex justify-center h-[350px]"
    >
      <Card className="w-full p-6 shadow-2xl rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-black relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 dark:opacity-20 bg-gradient-to-br from-gray-300 to-gray-100 dark:from-gray-900 dark:to-gray-800" />
        <div className="absolute inset-0 flex justify-center items-center opacity-20 dark:opacity-30">
          <div className="w-64 h-64 bg-gray-200 dark:bg-gray-700 rounded-full blur-3xl" />
        </div>
        <CardContent className="relative z-10 text-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">Current Plan</h2>
          <p className="text-lg font-semibold text-gray-800 dark:text-gray-300 mb-2">{currentPlan.name}</p>
          <p className="text-xl font-bold text-blue-600 dark:text-blue-400">{currentPlan.price}</p>
          <ul className="mt-4 space-y-2 text-gray-700 dark:text-gray-300">
            {currentPlan.features.map((feature, index) => (
              <li key={index} className="flex items-center justify-center">
                ✅ {feature}
              </li>
            ))}
          </ul>
          <Button className="mt-6 px-6 py-2 text-lg font-semibold rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:opacity-90 dark:from-blue-600 dark:to-indigo-700">
            Upgrade Plan
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
