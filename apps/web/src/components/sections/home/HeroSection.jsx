import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import Button from "@/components/ui/button/Button";
import { ArrowRight, MapPin, Languages, CheckCircle2 } from "lucide-react";

/**
 * HeroSection — Landing page hero.
 *
 * Color: brand teal for anything interactive; gold accent appears in
 * exactly one place (the score ring) so it reads as a deliberate
 * signature rather than decoration. Backgrounds stay near-white/canvas
 * with brand tints, not a busy gradient.
 * Type: font-display (Fraunces) on the headline only, font-sans (Inter)
 * for everything readable, font-mono (Space Grotesk) reserved for the
 * score digit and small uppercase data labels.
 */
export default function HeroSection() {
  const shouldReduceMotion = useReducedMotion();
  const [score, setScore] = useState(0);

  // Count the match score up once on mount. Skipped entirely (renders
  // final value immediately) if the user prefers reduced motion.
  useEffect(() => {
    if (shouldReduceMotion) {
      setScore(94);
      return;
    }
    const target = 94;
    const duration = 1200;
    const start = performance.now();

    let frame;
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      setScore(Math.round(target * progress));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [shouldReduceMotion]);

  const circumference = 2 * Math.PI * 54;
  const dashOffset = circumference - (score / 100) * circumference;

  return (
    <section className="relative min-h-screen overflow-hidden bg-canvas pt-20 sm:pt-32">
      {/* Decorative background — hidden from assistive tech, static
          (no animate prop) when the user prefers reduced motion. */}
      <div aria-hidden="true">
        <motion.div
          className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-brand-100 opacity-30 blur-3xl"
          animate={
            shouldReduceMotion ? undefined : { y: [0, 40, 0], x: [0, 20, 0] }
          }
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-brand-50 opacity-60 blur-3xl"
          animate={
            shouldReduceMotion ? undefined : { y: [0, -40, 0], x: [0, -20, 0] }
          }
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-8">
          {/* Left side — copy */}
          <motion.div
            initial={shouldReduceMotion ? undefined : { opacity: 0, x: -40 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-center space-y-8"
          >
            <motion.div
              initial={shouldReduceMotion ? undefined : { opacity: 0, y: 20 }}
              animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-brand-50 px-4 py-2 w-fit"
            >
              <CheckCircle2
                className="h-4 w-4 text-brand-600"
                aria-hidden="true"
              />
              <span className="font-sans text-sm font-medium tracking-wide text-brand-700">
                Matched by AI, not sorted by keyword
              </span>
            </motion.div>

            <motion.h1
              initial={shouldReduceMotion ? undefined : { opacity: 0, y: 20 }}
              animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="font-display text-5xl font-medium leading-[1.1] tracking-tight text-ink sm:text-6xl"
            >
              Find your perfect
              <br />
              healthcare job match
            </motion.h1>

            <motion.p
              initial={shouldReduceMotion ? undefined : { opacity: 0, y: 20 }}
              animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="max-w-md font-sans text-xl leading-relaxed text-slate-500"
            >
              Tell TenaWork what matters to you — salary, location, culture,
              specialty — and get matched with institutions that actually fit.
            </motion.p>

            <motion.div
              initial={shouldReduceMotion ? undefined : { opacity: 0, y: 20 }}
              animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col gap-4 sm:flex-row sm:gap-6"
            >
              <Link to="/auth/register?role=Professional">
                <Button
                  size="lg"
                  className="flex items-center gap-2 bg-brand-600 font-sans font-medium hover:bg-brand-700"
                >
                  Find jobs{" "}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Button>
              </Link>
              <Link to="/auth/register?role=Employer">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-brand-600 font-sans font-medium text-brand-700 hover:bg-brand-50"
                >
                  Hire professionals
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right side — live match preview card (the signature element) */}
          <motion.div
            initial={shouldReduceMotion ? undefined : { opacity: 0, x: 40 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="hidden lg:flex items-center justify-center"
            aria-hidden="true"
          >
            <div className="relative w-full max-w-sm">
              {/* Main card */}
              <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-xl shadow-brand-900/5">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-mono text-xs font-medium uppercase tracking-wider text-slate-400">
                      Top match
                    </p>
                    <h3 className="mt-1 font-display text-lg font-medium text-ink">
                      Cedar Grove Medical Center
                    </h3>
                    <p className="font-sans text-sm text-slate-500">
                      Pediatric Nurse · Full-time
                    </p>
                  </div>

                  {/* Score ring — the one deliberate place the gold accent appears */}
                  <div className="relative h-16 w-16 shrink-0">
                    <svg viewBox="0 0 120 120" className="h-16 w-16 -rotate-90">
                      <circle
                        cx="60"
                        cy="60"
                        r="54"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="10"
                        className="text-brand-50"
                      />
                      <circle
                        cx="60"
                        cy="60"
                        r="54"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="10"
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        strokeDashoffset={dashOffset}
                        className="text-accent-500"
                      />
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center font-mono text-sm font-semibold text-ink">
                      {score}%
                    </span>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-slate-50 px-3 py-1 font-sans text-xs font-medium text-slate-500">
                    <MapPin className="h-3 w-3" /> Nairobi, Kenya
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-slate-50 px-3 py-1 font-sans text-xs font-medium text-slate-500">
                    <Languages className="h-3 w-3" /> English, Swahili
                  </span>
                </div>

                <div className="mt-5 border-t border-slate-100 pt-4 font-sans text-sm text-slate-500">
                  Matches your salary range, pediatric focus, and preference for
                  mid-size institutions.
                </div>
              </div>

              {/* Floating secondary chip */}
              <motion.div
                initial={shouldReduceMotion ? undefined : { opacity: 0, y: 10 }}
                animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                transition={{ delay: 1.4, duration: 0.5 }}
                className="absolute -bottom-5 -left-6 flex items-center gap-2 rounded-xl border border-slate-100 bg-white px-4 py-3 shadow-lg shadow-brand-900/5"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-50">
                  <CheckCircle2 className="h-4 w-4 text-brand-600" />
                </span>
                <div className="leading-tight">
                  <p className="font-sans text-xs font-semibold text-ink">
                    2 more matches
                  </p>
                  <p className="font-sans text-xs text-slate-500">
                    ready to view
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
