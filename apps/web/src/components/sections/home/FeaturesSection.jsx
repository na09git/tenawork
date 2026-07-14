import { Sparkles, Search, Zap, Lock, Heart, UserCheck } from "lucide-react";
import SectionHeader from "@/components/sections/SectionHeader";
import FeatureCard from "@/components/sections/FeatureCard";

/**
 * FeaturesSection — Showcase key platform features.
 *
 * Palette locked to match HeroSection: ink / canvas / brand-* / accent-*
 * / slate-* only. No other colors introduced anywhere in this file.
 * Background: bg-slate-50, one step off the hero's bg-canvas, to create
 * page rhythm (white → tint → white) as you scroll.
 */
const features = [
  {
    icon: Sparkles,
    title: "AI job matching",
    description:
      "Advanced AI analyzes your profile to find the most compatible positions.",
  },
  {
    icon: Search,
    title: "Smart candidate search",
    description:
      "Find ideal candidates for your healthcare positions instantly.",
  },
  {
    icon: Zap,
    title: "Fast recommendations",
    description: "Get your top matches within seconds, not days.",
  },
  {
    icon: Lock,
    title: "Secure by default",
    description: "Enterprise-grade security protects your sensitive data.",
  },
  {
    icon: Heart,
    title: "Built for healthcare",
    description:
      "Designed specifically for healthcare professionals and institutions.",
  },
  {
    icon: UserCheck,
    title: "Personalized matching",
    description:
      "Preferences and values ensure a genuine fit, not just a keyword match.",
  },
];

export default function FeaturesSection() {
  return (
    <section className="bg-slate-50 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          subtitle="Features"
          title="Everything you need to find the right fit"
          description="The tools that make matching faster and more accurate for both sides of healthcare hiring."
        />

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
