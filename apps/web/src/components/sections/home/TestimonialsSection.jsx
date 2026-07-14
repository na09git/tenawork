import SectionHeader from "@/components/sections/SectionHeader";
import TestimonialCard from "@/components/sections/TestimonialCard";

/**
 * TestimonialsSection — Display user testimonials as a dual-direction
 * marquee: top row drifts left, bottom row drifts right, both looping
 * seamlessly. Common pattern on sites like Linear/Vercel for testimonial
 * or logo walls — it lets you show more cards than fit on screen without
 * a carousel's next/prev UI.
 *
 * Accessibility:
 * - Animation fully disabled under prefers-reduced-motion (CSS media
 *   query, not JS — so it can't miss a state change).
 * - Paused on hover/focus so a reader can actually stop and read a card.
 * - Content is duplicated per row purely for the seamless loop illusion;
 *   screen readers should ignore the animation and just read the cards
 *   in order, so no aria-hidden here (unlike purely decorative elements).
 *
 * Palette locked to HeroSection: bg-canvas, ink for headings.
 *
 * ⚠️ STILL UNRESOLVED FROM LAST REVIEW: the testimonials below are
 * fabricated (invented names, hospitals, and quotes) under a heading
 * that claims they're real. See the previous message for why that's a
 * hard blocker before launch, not a styling issue. This marquee layout
 * is ready to go the moment you swap in real testimonials — do not
 * ship it with the placeholder content still in place.
 */
const testimonials = [
  {
    name: "Dr. Sarah Johnson",
    role: "Nurse Practitioner",
    organization: "Metro General Hospital",
    review:
      "TenaWork found me the perfect position in just 2 weeks. The AI matching was incredibly accurate to my preferences.",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "Hospital Administrator",
    organization: "City Medical Center",
    review:
      "We reduced our hiring time significantly using TenaWork. The candidates recommended by the AI are exactly what we need.",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    role: "Physician",
    organization: "Central Clinic",
    review:
      "The process was seamless, and the matches were highly relevant. I found a role that aligns perfectly with my values.",
    rating: 5,
  },
];

// Two different orderings so the top and bottom rows don't feel like a
// literal mirror of each other. With only 3 real testimonials this is
// thin — once you have 6+ real ones, split them properly instead of
// reusing the same 3 in both rows.
const rowTop = [...testimonials, ...testimonials];
const rowBottom = [
  ...[...testimonials].reverse(),
  ...[...testimonials].reverse(),
];

function MarqueeRow({ items, direction, ariaLabel }) {
  return (
    <div className="marquee-viewport" role="group" aria-label={ariaLabel}>
      <div
        className={`marquee-track ${direction === "left" ? "marquee-left" : "marquee-right"}`}
      >
        {items.map((testimonial, idx) => (
          <div
            key={`${testimonial.name}-${idx}`}
            className="w-80 shrink-0 sm:w-96"
          >
            <TestimonialCard {...testimonial} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function TestimonialsSection() {
  return (
    <section className="bg-canvas py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          subtitle="Testimonials"
          title="What our users say"
          description="Real stories from healthcare professionals and employers."
        />
      </div>

      <div className="mx-auto mt-12 max-w-7xl space-y-6 px-4 sm:px-6 lg:px-8">
        <MarqueeRow
          items={rowTop}
          direction="left"
          ariaLabel="Testimonials, row 1"
        />
        <MarqueeRow
          items={rowBottom}
          direction="right"
          ariaLabel="Testimonials, row 2"
        />
      </div>

      <style>{`
        .marquee-viewport {
          overflow: hidden;
          width: 100%;
          mask-image: linear-gradient(to right, transparent, black 8%, black 92%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 8%, black 92%, transparent);
        }

        .marquee-track {
          display: flex;
          gap: 1.5rem;
          width: max-content;
          padding: 0.5rem 0;
        }

        .marquee-left {
          animation: marquee-left 40s linear infinite;
        }

        .marquee-right {
          animation: marquee-right 40s linear infinite;
        }

        .marquee-track:hover,
        .marquee-track:focus-within {
          animation-play-state: paused;
        }

        @keyframes marquee-left {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        @keyframes marquee-right {
          from { transform: translateX(-50%); }
          to { transform: translateX(0); }
        }

        @media (prefers-reduced-motion: reduce) {
          .marquee-track {
            animation: none !important;
          }
          .marquee-viewport {
            overflow-x: auto;
          }
        }
      `}</style>
    </section>
  );
}
