import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import SectionHeader from "@/components/sections/SectionHeader";

/**
 * HowItWorksSection - Explain the process for professionals and employers
 */
const professionalSteps = [
  "Create Your Profile",
  "Set Your Preferences",
  "Receive Top 3 Matches",
];

const employerSteps = [
  "Create Your Company",
  "Post Your Job",
  "Get Top 10 Candidates",
];

export default function HowItWorksSection() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          subtitle="Process"
          title="How It Works"
          description="Simple steps to find your perfect match"
        />

        <div className="mt-16 grid grid-cols-1 gap-16 lg:grid-cols-2">
          {/* For Professionals */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold text-neutral-900">
              For Health Professionals
            </h3>
            <div className="mt-8 space-y-4">
              {professionalSteps.map((step, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-100">
                    <CheckCircle2 className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-neutral-900">{step}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* For Employers */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold text-neutral-900">
              For Employers
            </h3>
            <div className="mt-8 space-y-4">
              {employerSteps.map((step, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-100">
                    <CheckCircle2 className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-neutral-900">{step}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
