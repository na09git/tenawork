import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Button from "@/components/ui/button/Button";
import { cn } from "@/utils/cn";

/**
 * CTASection - Reusable Call-to-Action section component
 */
export default function CTASection({
  title,
  description,
  primaryAction,
  secondaryAction,
  className = "",
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={cn(
        "rounded-2xl bg-gradient-to-br from-primary-600 to-primary-700 px-8 py-16 text-white sm:px-12 sm:py-20",
        className,
      )}
    >
      <div className="mx-auto max-w-3xl text-center">
        {title && <h2 className="text-3xl font-bold sm:text-4xl">{title}</h2>}
        {description && (
          <p className="mt-4 text-lg text-primary-100">{description}</p>
        )}
        {(primaryAction || secondaryAction) && (
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
            {primaryAction && (
              <Button
                as={Link}
                to={primaryAction.href}
                variant="primary"
                className="bg-white text-primary-600 hover:bg-neutral-50"
              >
                {primaryAction.label}
              </Button>
            )}
            {secondaryAction && (
              <Button
                as={Link}
                to={secondaryAction.href}
                variant="outline"
                className="border-white bg-transparent text-white hover:bg-primary-600"
              >
                {secondaryAction.label}
              </Button>
            )}
          </div>
        )}
      </div>
    </motion.section>
  );
}
