import CTASection from "@/components/sections/CTASection";

/**
 * FinalCTASection - Final call-to-action before footer
 */
export default function FinalCTASection() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <CTASection
          title="Ready to Find Your Perfect Match?"
          description="Join thousands of healthcare professionals and institutions using TenaWork today."
          primaryAction={{
            label: "Get Started Now",
            href: "/auth/register",
          }}
          secondaryAction={{
            label: "Learn More",
            href: "/about",
          }}
        />
      </div>
    </section>
  );
}
