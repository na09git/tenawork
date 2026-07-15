import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { LogOut, Menu, X, User, ChevronRight } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Button from "@/components/ui/button/Button";

/**
 * DashboardLayout — palette/type locked to match the rest of the site.
 *
 * - text-ink for headings, text-slate-500 for secondary text, brand-600
 *   for active/interactive states (was sky-600, pre-rebrand leftover).
 * - border-slate-200 → border-slate-100, same custom-scale reasoning as
 *   the other dashboard pages.
 * - Wordmark set in font-display to match the Footer's treatment of the
 *   same wordmark — the two should look like the same brand.
 * - Nav links font-sans.
 *
 * Functional change: the profile block (avatar + email) is now a real
 * link to /settings — previously it was static text with no way to
 * reach account/profile setup from the nav at all. Added on both the
 * desktop header and the mobile menu, plus a visible hover state and
 * chevron so it actually reads as clickable, not just decorative.
 */
const employeeLinks = [
  { to: "/dashboard/professional", label: "Overview", exact: true },
  { to: "/dashboard/professional/matches", label: "Job Matches" },
  { to: "/dashboard/professional/applications", label: "My Applications" },
  { to: "/dashboard/professional/preferences", label: "Preferences" },
];

const employerLinks = [
  { to: "/dashboard/employer", label: "Overview", exact: true },
  { to: "/dashboard/employer/post-job", label: "Post a Job" },
  { to: "/dashboard/employer/matches", label: "Candidates" },
  { to: "/dashboard/employer/contacts", label: "Outreach" },
];

export default function DashboardLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const links = user?.role === "EMPLOYER" ? employerLinks : employeeLinks;
  const profilePath =
    user?.role === "EMPLOYER"
      ? "/dashboard/employer/settings"
      : "/dashboard/professional/settings";

  const handleLogout = () => {
    logout();
    navigate("/auth/login");
  };

  return (
    <div className="min-h-screen bg-slate-50 text-ink">
      {/* Top Header */}
      <header className="sticky top-0 z-30 border-b border-slate-100 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-8">
            <div className="font-display text-xl font-medium tracking-tight text-brand-600">
              TenaWork
            </div>
            {/* Desktop Nav */}
            <nav className="hidden md:flex md:gap-6">
              {links.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.exact}
                  className={({ isActive }) =>
                    `font-sans text-sm font-medium transition-colors hover:text-brand-600 ${
                      isActive ? "text-brand-600" : "text-slate-500"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex md:items-center md:gap-4">
              <NavLink
                to={profilePath}
                className="group flex items-center gap-2 rounded-full py-1 pl-1 pr-3 font-sans text-sm font-medium text-ink transition-colors hover:bg-slate-50"
                aria-label="Go to profile settings"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-50 text-slate-500 transition-colors group-hover:bg-brand-50 group-hover:text-brand-600">
                  <User className="h-4 w-4" aria-hidden="true" />
                </div>
                <span>{user?.email?.split("@")[0]}</span>
                <ChevronRight
                  className="h-3.5 w-3.5 text-slate-400 opacity-0 transition-opacity group-hover:opacity-100"
                  aria-hidden="true"
                />
              </NavLink>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="font-sans text-slate-500 hover:text-ink"
              >
                <LogOut className="h-4 w-4" aria-hidden="true" />
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6 text-slate-500" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6 text-slate-500" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMobileMenuOpen && (
          <div className="border-t border-slate-100 bg-white px-4 py-4 md:hidden">
            <nav className="flex flex-col gap-4">
              <NavLink
                to={profilePath}
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 rounded-lg bg-slate-50 px-3 py-2 font-sans text-base font-medium text-ink"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-slate-500">
                  <User className="h-4 w-4" aria-hidden="true" />
                </div>
                <span className="flex-1">{user?.email?.split("@")[0]}</span>
                <ChevronRight
                  className="h-4 w-4 text-slate-400"
                  aria-hidden="true"
                />
              </NavLink>

              {links.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.exact}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `font-sans text-base font-medium ${
                      isActive ? "text-brand-600" : "text-slate-500"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              <div className="mt-4 border-t border-slate-100 pt-4">
                <Button
                  variant="ghost"
                  fullWidth
                  className="justify-start font-sans text-slate-500"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" aria-hidden="true" /> Sign
                  out
                </Button>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
}
