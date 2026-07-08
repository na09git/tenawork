import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Button from "@/components/ui/button/Button";
import { ArrowRight, Zap } from "lucide-react";

/**
 * HeroSection - Main landing page hero with CTA buttons
 */
export default function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-primary-50 via-white to-primary-50 pt-20 sm:pt-32">
      {/* Animated background elements */}
      <motion.div
        className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-primary-100 opacity-20 blur-3xl"
        animate={{ y: [0, 40, 0], x: [0, 20, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-primary-200 opacity-20 blur-3xl"
        animate={{ y: [0, -40, 0], x: [0, -20, 0] }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-8">
          {/* Left side - Text content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-center space-y-8"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 rounded-full border border-primary-200 bg-primary-50 px-4 py-2 w-fit"
            >
              <Zap className="h-4 w-4 text-primary-600" />
              <span className="text-sm font-medium text-primary-700">
                AI-Powered Matching
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl font-bold leading-tight text-neutral-900 sm:text-6xl"
            >
              Find Your Perfect Healthcare Job Match
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-neutral-600"
            >
              TenaWork uses advanced AI to connect healthcare professionals with
              institutions that match their skills, preferences, and values.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col gap-4 sm:flex-row sm:gap-6"
            >
              <Link to="/auth/register?role=Professional">
                <Button className="flex items-center gap-2" size="lg">
                  Find Jobs <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/auth/register?role=Employer">
                <Button variant="outline" size="lg">
                  Hire Professionals
                </Button>
              </Link>
            </motion.div>

            {/* Social proof */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="pt-4 text-sm text-neutral-600"
            >
              ✓ Join 1000+ healthcare professionals and institutions
            </motion.div>
          </motion.div>

          {/* Right side - Illustration */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="hidden lg:flex items-center justify-center"
          >
            <div className="relative h-96 w-96">
              {/* Animated healthcare illustration placeholder */}
              <motion.div
                className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary-200 to-primary-100 opacity-20"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
              <svg viewBox="0 0 400 400" className="h-full w-full">
                {/* Healthcare professional silhouette */}
                <circle cx="200" cy="120" r="40" fill="#0284C7" opacity="0.8" />
                <path
                  d="M 200 160 L 160 220 L 200 240 L 240 220 Z"
                  fill="#0284C7"
                  opacity="0.8"
                />

                {/* Hospital building */}
                <rect
                  x="80"
                  y="280"
                  width="80"
                  height="100"
                  fill="#0284C7"
                  opacity="0.6"
                  rx="8"
                />
                <rect
                  x="240"
                  y="280"
                  width="80"
                  height="100"
                  fill="#0284C7"
                  opacity="0.6"
                  rx="8"
                />

                {/* Connection lines with animation */}
                <motion.line
                  x1="200"
                  y1="280"
                  x2="120"
                  y2="320"
                  stroke="#0284C7"
                  strokeWidth="3"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <motion.line
                  x1="200"
                  y1="280"
                  x2="280"
                  y2="320"
                  stroke="#0284C7"
                  strokeWidth="3"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </svg>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
