import SectionHeader from "@/components/sections/SectionHeader";
import FAQAccordion from "@/components/sections/FAQAccordion";

/**
 * FAQSection — Frequently asked questions.
 *
 * Palette locked to HeroSection: bg-slate-50 (keeps the canvas/tint
 * rhythm going after the canvas-background TestimonialsSection above).
 *
 * ⚠️ Same fabricated-stat issue as the Statistics section, just smaller:
 * the "How accurate are the recommendations?" answer below claims a
 * specific "92% match accuracy rate based on user satisfaction surveys."
 * That's a checkable, specific claim — if no such survey exists, this
 * is the same credibility risk as the fake testimonials, just easier to
 * miss because it's buried in an FAQ answer instead of a headline stat.
 * Either replace it with something true (e.g. describe HOW matching
 * works, not a number you can't back up), or wire it to a real
 * satisfaction-survey number once you're collecting one.
 */
const faqItems = [
  {
    question: "How does AI matching work?",
    answer:
      "Our AI analyzes your profile, preferences, and experience to find healthcare positions that match your skills and career goals. It weighs both candidate and job requirements to rank the closest fits.",
  },
  {
    question: "Is registration free?",
    answer:
      "Yes, TenaWork is free for healthcare professionals to use. Employers get a free trial period, with optional premium features available.",
  },
  {
    question: "Who can use TenaWork?",
    answer:
      "Healthcare professionals — including doctors, nurses, therapists, and other medical staff — can join as professionals. Hospitals, clinics, and NGOs can register as employers.",
  },
  {
    question: "How accurate are the recommendations?",
    answer:
      "Matches are ranked by how closely they align with what you specify — salary, location, culture, specialty, and more. The more detail you provide, the more precise your recommendations become.",
  },
  {
    question: "Can employers contact candidates?",
    answer:
      "Yes. Once you receive a match, you can reach out directly through the platform's secure messaging.",
  },
];

export default function FAQSection() {
  return (
    <section className="bg-slate-50 py-20 sm:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          subtitle="FAQ"
          title="Frequently asked questions"
          description="Find answers to common questions about TenaWork."
        />

        <div className="mt-12">
          <FAQAccordion items={faqItems} />
        </div>
      </div>
    </section>
  );
}
