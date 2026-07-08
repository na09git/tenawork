import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { LogOut, Menu, X, User } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Button from "@/components/ui/button/Button";

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

  const handleLogout = () => {
    logout();
    navigate("/auth/login");
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Top Header */}
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-8">
            <div className="text-xl font-bold tracking-tight text-sky-600">
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
                    `text-sm font-medium transition-colors hover:text-sky-600 ${
                      isActive ? "text-sky-600" : "text-slate-600"
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
              <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500">
                  <User className="h-4 w-4" />
                </div>
                <span>{user?.email?.split('@')[0]}</span>
              </div>
              <Button variant="ghost" size="sm" onClick={handleLogout} className="text-slate-500">
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
            
            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6 text-slate-600" />
              ) : (
                <Menu className="h-6 w-6 text-slate-600" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMobileMenuOpen && (
          <div className="border-t border-slate-200 bg-white px-4 py-4 md:hidden">
            <nav className="flex flex-col gap-4">
              {links.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.exact}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `text-base font-medium ${
                      isActive ? "text-sky-600" : "text-slate-600"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              <div className="mt-4 border-t border-slate-100 pt-4">
                <Button variant="ghost" fullWidth className="justify-start text-slate-600" onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" /> Sign out
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
