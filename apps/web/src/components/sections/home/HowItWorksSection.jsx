import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import SectionHeader from "@/components/sections/SectionHeader";

/**
 * HowItWorksSection — Explain the process for professionals and employers.
 *
 * Palette locked to HeroSection: ink / canvas / brand-* / accent-* / slate-*.
 *
 * Design note: this content is a genuine ordered sequence (step 1 must
 * happen before step 2), so numbered markers earn their place here —
 * unlike a repeated checkmark icon, a number actually encodes the order
 * the reader needs. The final step in each column gets the gold accent
 * treatment instead of a number, marking it as the payoff/completion
 * moment — the same gold used for the match score in the hero, so it
 * reads as "this is the result" both places it appears.
 */
const professionalSteps = [
  "Create your profile",
  "Set your preferences",
  "Receive your top 3 matches",
];

const employerSteps = [
  "Create your company profile",
  "Post your job",
  "Get your top 10 candidates",
];

function StepList({ steps, direction }) {
  return (
    <div className="mt-8 space-y-4">
      {steps.map((step, idx) => {
        const isLast = idx === steps.length - 1;
        return (
          <motion.div
            key={step}
            initial={{ opacity: 0, x: direction === "left" ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            className="flex items-center gap-4"
          >
            <div
              className={
                isLast
                  ? "flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent-500"
                  : "flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-brand-100 bg-brand-50"
              }
            >
              {isLast ? (
                <CheckCircle2
                  className="h-5 w-5 text-white"
                  aria-hidden="true"
                />
              ) : (
                <span className="font-mono text-sm font-semibold text-brand-600">
                  {String(idx + 1).padStart(2, "0")}
                </span>
              )}
            </div>
            <p
              className={
                isLast
                  ? "font-sans font-semibold text-ink"
                  : "font-sans font-medium text-ink"
              }
            >
              {step}
            </p>
          </motion.div>
        );
      })}
    </div>
  );
}

export default function HowItWorksSection() {
  return (
    <section className="bg-canvas py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          subtitle="Process"
          title="How it works"
          description="Simple steps to find your perfect match."
        />

        <div className="mt-16 grid grid-cols-1 gap-16 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="font-display text-2xl font-medium text-ink">
              For health professionals
            </h3>
            <StepList steps={professionalSteps} direction="left" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="font-display text-2xl font-medium text-ink">
              For employers
            </h3>
            <StepList steps={employerSteps} direction="right" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
