import { motion } from "framer-motion";
import { cn } from "@/utils/cn";

/**
 * PageHero - Reusable hero section for non-home pages (About, Contact, etc.)
 */
export default function PageHero({ title, description, className = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={cn(
        "rounded-2xl bg-gradient-to-br from-primary-600 to-primary-700 px-8 py-16 text-white sm:px-12 sm:py-20",
        className,
      )}
    >
      <div className="mx-auto max-w-3xl">
        {title && <h1 className="text-4xl font-bold sm:text-5xl">{title}</h1>}
        {description && (
          <p className="mt-4 text-lg text-primary-100 sm:text-xl">
            {description}
          </p>
        )}
      </div>
    </motion.div>
  );
}
