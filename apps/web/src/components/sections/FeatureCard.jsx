import { motion } from "framer-motion";
import { cn } from "@/utils/cn";

/**
 * FeatureCard - Reusable card for displaying features with icon, title, and description
 */
export default function FeatureCard({
  icon: Icon,
  title,
  description,
  className = "",
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      whileHover={{ y: -8 }}
      className={cn(
        "rounded-xl border border-neutral-200 bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-md",
        className,
      )}
    >
      {Icon && (
        <div className="mb-4 inline-flex rounded-lg bg-primary-100 p-3">
          <Icon className="h-6 w-6 text-primary-600" />
        </div>
      )}
      {title && (
        <h3 className="text-lg font-semibold text-neutral-900">{title}</h3>
      )}
      {description && <p className="mt-2 text-neutral-600">{description}</p>}
    </motion.div>
  );
}
