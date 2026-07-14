import { Link } from "react-router-dom";
import { Mail, MapPin, Phone } from "lucide-react";

/**
 * Footer — Reusable footer component for all pages.
 *
 * Palette locked to HeroSection, but inverted: bg-ink (the same near-black
 * used for text everywhere else) instead of a generic neutral-900 gray —
 * ties the darkest surface on the site back to the brand rather than a
 * default Tailwind gray. Links hover to brand-100 (a light mint) instead
 * of plain white, so even the footer carries the brand color, not just
 * the hero and CTA.
 *
 * Note: several links below still point to "#" (Blog, Careers, Guides,
 * Documentation, API, Support, social links) — not a credibility issue
 * like fabricated stats, just unbuilt pages. Worth swapping to real
 * routes or removing the links before launch so nothing dead-ends.
 */
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-ink text-white/70">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Company Info */}
          <div>
            <h3 className="font-display text-lg font-medium text-white">
              TenaWork
            </h3>
            <p className="mt-4 font-sans text-sm">
              AI-powered healthcare job matching platform connecting
              professionals with institutions.
            </p>
            <div className="mt-6 space-y-3 font-sans text-sm">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-brand-100" aria-hidden="true" />
                <a
                  href="mailto:info@tenawork.com"
                  className="transition-colors hover:text-brand-100"
                >
                  info@tenawork.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-brand-100" aria-hidden="true" />
                <a
                  href="tel:+256706123456"
                  className="transition-colors hover:text-brand-100"
                >
                  +256 706 123 456
                </a>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-brand-100" aria-hidden="true" />
                <span>Kampala, Uganda</span>
              </div>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-sans font-semibold text-white">Company</h4>
            <ul className="mt-4 space-y-2 font-sans text-sm">
              <li>
                <Link
                  to="/about"
                  className="transition-colors hover:text-brand-100"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="transition-colors hover:text-brand-100"
                >
                  Contact
                </Link>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-brand-100">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-brand-100">
                  Careers
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-sans font-semibold text-white">Resources</h4>
            <ul className="mt-4 space-y-2 font-sans text-sm">
              <li>
                <a href="#" className="transition-colors hover:text-brand-100">
                  Guides
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-brand-100">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-brand-100">
                  API
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-brand-100">
                  Support
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-sans font-semibold text-white">Legal</h4>
            <ul className="mt-4 space-y-2 font-sans text-sm">
              <li>
                <Link
                  to="/privacy"
                  className="transition-colors hover:text-brand-100"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="transition-colors hover:text-brand-100"
                >
                  Terms &amp; Conditions
                </Link>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-brand-100">
                  Cookie Policy
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-brand-100">
                  Sitemap
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 border-t border-white/10" />

        {/* Bottom footer */}
        <div className="flex flex-col items-center justify-between gap-4 font-sans sm:flex-row">
          <p className="text-sm">
            © {currentYear} TenaWork. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="transition-colors hover:text-brand-100">
              Twitter
            </a>
            <a href="#" className="transition-colors hover:text-brand-100">
              LinkedIn
            </a>
            <a href="#" className="transition-colors hover:text-brand-100">
              Facebook
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
