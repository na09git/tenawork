import {
  Brain,
  Stethoscope,
  Clock,
  Users,
  TrendingUp,
  Shield,
} from "lucide-react";
import SectionHeader from "@/components/sections/SectionHeader";
import FeatureCard from "@/components/sections/FeatureCard";

/**
 * WhyChooseTenaWorkSection — Benefits and value propositions.
 *
 * Palette locked to HeroSection: ink / canvas / brand-* / accent-* / slate-*.
 */
const benefits = [
  {
    icon: Brain,
    title: "AI-powered",
    description:
      "Machine learning finds compatible matches in seconds, not weeks of manual screening.",
  },
  {
    icon: Stethoscope,
    title: "Healthcare specialized",
    description:
      "Built around real healthcare roles and credentials, not a generic hiring template.",
  },
  {
    icon: Clock,
    title: "Faster hiring",
    description: "Move from posting to shortlist in days instead of weeks.",
  },
  {
    icon: Users,
    title: "Verified institutions",
    description: "Every employer profile is reviewed before jobs go live.",
  },
  {
    icon: TrendingUp,
    title: "Career growth in mind",
    description:
      "Matches weigh your stated career goals, not just your current title.",
  },
  {
    icon: Shield,
    title: "Privacy-first",
    description:
      "You control what's visible to employers until you choose to apply.",
  },
];

export default function WhyChooseTenaWorkSection() {
  return (
    <section className="bg-slate-50 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          subtitle="Why TenaWork"
          title="Matching that actually understands healthcare"
          description="Not a generic job board with a filter — a system built around how healthcare hiring really works."
        />

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit) => (
            <FeatureCard
              key={benefit.title}
              icon={benefit.icon}
              title={benefit.title}
              description={benefit.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
