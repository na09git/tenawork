import { motion } from "framer-motion";
import SectionHeader from "@/components/sections/SectionHeader";
import AnimatedCounter from "@/components/sections/AnimatedCounter";

/**
 * StatisticsSection - Display key metrics with animated counters
 */
const stats = [
  { value: 1000, suffix: "+", label: "Healthcare Professionals" },
  { value: 500, suffix: "+", label: "Hospitals & Clinics" },
  { value: 5000, suffix: "+", label: "Jobs Posted" },
  { value: 2500, suffix: "+", label: "Successful Matches" },
];

export default function StatisticsSection() {
  return (
    <section className="bg-gradient-to-br from-primary-600 to-primary-700 py-16 text-white sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          subtitle="Statistics"
          title="Growing Community"
          description="Join thousands who have found their perfect healthcare job match"
          align="center"
          className="text-white"
        />

        <div className="mt-12 grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl font-bold sm:text-5xl">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <p className="mt-2 text-primary-100">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
