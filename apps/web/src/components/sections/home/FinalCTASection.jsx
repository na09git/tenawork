import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Button from "@/components/ui/button/Button";

/**
 * FinalCTASection — Final call-to-action before footer.
 *
 * Built self-contained rather than through the shared CTASection
 * component: that component's internal text/background colors are
 * still unknown (likely leftover light-on-light from before the
 * rebrand), which is why it was rendering invisible. This version
 * guarantees contrast by using a solid brand-colored card with white
 * text/buttons — no dependency on unseen defaults.
 *
 * Once you share CTASection.jsx, it's worth fixing at the source so
 * every page that uses it benefits, not just this one — but this
 * unblocks you immediately.
 */
export default function FinalCTASection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="bg-canvas py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={shouldReduceMotion ? undefined : { opacity: 0, y: 20 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-600 to-brand-900 px-6 py-16 text-center sm:px-16 sm:py-20"
        >
          {/* Subtle decorative glow, hidden from assistive tech */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-accent-500 opacity-10 blur-3xl"
          />

          <h2 className="font-display text-3xl font-medium text-white sm:text-4xl">
            Ready to find your perfect match?
          </h2>
          <p className="mx-auto mt-4 max-w-xl font-sans text-lg text-brand-100">
            Set your preferences and let TenaWork's AI find healthcare roles —
            or candidates — that actually fit.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link to="/auth/register">
              <Button
                size="lg"
                className="flex items-center gap-2 !bg-white font-sans font-medium !text-brand-700 hover:!bg-brand-50"
              >
                Get started{" "}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
            </Link>
            <Link to="/about">
              <Button
                size="lg"
                variant="outline"
                className="border-white font-sans font-medium text-[#000] hover:bg-white/10 hover:text-white"
              >
                Learn more
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
