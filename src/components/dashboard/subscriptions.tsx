"use client"; // Required for Framer Motion and interactivity

import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react"; // Using Lucide React for icons

// Define types for the plan data
interface Plan {
  name: string;
  price: string;
  description: string; // Added description
  features: string[];
  isCurrent?: boolean; // Flag to indicate if this is the current plan
}

const plans: Plan[] = [
  {
    name: "Starter",
    price: "$9.99",
    description: "Perfect for individuals getting started with small projects.",
    features: ["10 Projects", "Basic Support", "1GB Storage", "Email Assistance"],
  },
  {
    name: "Pro",
    price: "$29.99",
    description: "Ideal for growing teams and advanced features.",
    features: [
      "Unlimited Projects",
      "Priority Support",
      "10GB Storage",
      "Dedicated Account Manager",
    ],
    isCurrent: true, // Mark this as the current plan
  },
  {
    name: "Elite",
    price: "$99.99",
    description: "Best for large enterprises with high demands.",
    features: [
      "Unlimited Projects",
      "24/7 Support",
      "100GB Storage",
      "Custom Integrations",
    ],
  },
];

// Custom SVG for decorative design
const PlanCardDecoration = () => (
  <svg
    className="absolute inset-0 z-10 w-full h-full"
    viewBox="0 0 500 500"
    preserveAspectRatio="none"
  >
    <path
      d="M0,100 C150,200 350,0 500,100 L500,500 L0,500 Z"
      className="fill-current dark:text-black text-white opacity-90"
    />
  </svg>
);

export default function SubscriptionPlans() {
  return (
    <div className="min-h-screen w-full mt-3">
      <div className="mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
          Choose Your Plan
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`relative p-8 rounded-lg shadow-2xl bg-gradient-to-br border dark:border-white border-black from-primary to-secondary transform dark:bg-[#4aaeff] bg-[#addaff]`}
            >
              {/* Decorative SVG */}
              <PlanCardDecoration />

              {/* Current Plan Badge */}
              {plan.isCurrent && (
                <div className="absolute top-4 right-4 bg-white text-gray-900 px-3 py-1 rounded-full text-sm font-semibold">
                  Current Plan
                </div>
              )}

              <h2 className="text-2xl font-bold mb-4 text-center relative z-20 dark:text-white text-black">{plan.name}</h2>
              <p className="text-4xl font-bold mb-6 text-center relative z-20 text-dark dark:text-white text-black">{plan.price}</p>
              <p className="dark:text-gray-300 text-gray-500 text-center mb-6 relative z-20">{plan.description}</p>
              <ul className="mb-8 space-y-3">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center space-x-2 relative z-20">
                    <CheckCircle className="w-5 h-5 text-primary relative z-20 dark:text-white" /> {/* Bullet point icon */}
                    <span className="dark:text-white text-black">{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                className="w-full py-3 px-6 dark:bg-white bg-gray-900 text-white dark:text-gray-900 hover:bg-gray-100font-semibold rounded-lg transition-all relative z-20"
              >
                {plan.isCurrent ? "Manage Plan" : "Get Started"}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}