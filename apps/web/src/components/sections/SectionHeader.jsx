import { motion } from "framer-motion";
import { cn } from "@/utils/cn";

/**
 * SectionHeader - Reusable section heading component
 * Used to display consistent section titles, subtitles, and descriptions
 */
export default function SectionHeader({
  title,
  subtitle,
  description,
  align = "center",
  className = "",
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={cn(
        "space-y-4",
        align === "center" && "text-center",
        align === "left" && "text-left",
        className,
      )}
    >
      {subtitle && (
        <p className="text-sm font-semibold uppercase tracking-wide text-primary-600">
          {subtitle}
        </p>
      )}
      {title && (
        <h2 className="text-3xl font-bold text-neutral-900 sm:text-4xl">
          {title}
        </h2>
      )}
      {description && (
        <p className="mx-auto max-w-2xl text-lg text-neutral-600">
          {description}
        </p>
      )}
    </motion.div>
  );
}
