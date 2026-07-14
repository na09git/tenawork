import { motion } from "framer-motion";
import SectionHeader from "@/components/sections/SectionHeader";
import AnimatedCounter from "@/components/sections/AnimatedCounter";

/**
 * StatisticsSection — Display key metrics with animated counters.
 *
 * Palette locked to HeroSection: brand-600/700 for the background
 * (inverted section — white text on brand color, used once on the page
 * as a deliberate change of pace, not repeated elsewhere), brand-100
 * for secondary text on the dark background.
 *
 * ⚠️ TODO before shipping: the values below (1000, 500, 5000, 2500) are
 * placeholders carried over from the original file — they are not real
 * numbers. Since the backend is already built, wire these to a real
 * endpoint (e.g. GET /api/stats returning professional/institution/
 * job/match counts) rather than hardcoding them. Shipping invented
 * numbers on a live product is a credibility risk if anyone checks —
 * if real counts aren't ready yet, better to cut this section entirely
 * for now than publish numbers that aren't true.
 */
const stats = [
  { value: 1000, suffix: "+", label: "Healthcare professionals" },
  { value: 500, suffix: "+", label: "Hospitals & clinics" },
  { value: 5000, suffix: "+", label: "Jobs posted" },
  { value: 2500, suffix: "+", label: "Successful matches" },
];

export default function StatisticsSection() {
  return (
    <section className="bg-gradient-to-br from-brand-600 to-brand-700 py-20 text-white sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          subtitle="Statistics"
          title="A growing community"
          description="Healthcare professionals and institutions finding real matches, not just listings."
          align="center"
          className="text-white"
        />

        <div className="mt-12 grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="text-center"
            >
              <div className="font-mono text-4xl font-semibold sm:text-5xl">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <p className="mt-2 font-sans text-brand-100">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
