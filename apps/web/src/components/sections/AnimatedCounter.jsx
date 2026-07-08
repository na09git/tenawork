import { useState, useEffect } from "react";
import { motion } from "framer-motion";

/**
 * AnimatedCounter - Animates a number from 0 to target value
 * Useful for statistics and metrics
 */
export default function AnimatedCounter({ value, suffix = "", duration = 2 }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let startTime = null;
    const animate = (currentTime) => {
      if (startTime === null) startTime = currentTime;
      const progress = (currentTime - startTime) / (duration * 1000);

      if (progress < 1) {
        setDisplayValue(Math.floor(value * progress));
        requestAnimationFrame(animate);
      } else {
        setDisplayValue(value);
      }
    };

    requestAnimationFrame(animate);
  }, [value, duration]);

  return (
    <motion.span
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {displayValue.toLocaleString()}
      {suffix}
    </motion.span>
  );
}
