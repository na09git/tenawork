import { Link } from "react-router-dom";
import { Sparkles, FileText, Settings, ArrowRight } from "lucide-react";
import Card, { CardContent } from "@/components/ui/card/Card";
import Button from "@/components/ui/button/Button";

/**
 * ProfessionalDashboardPage — palette locked to match the public site.
 *
 * Notes on choices specific to a dashboard (vs. the marketing pages):
 * - font-display is reserved for the two page-level headings (h1, h2)
 *   only. Card titles (h3) stay font-sans/semibold — a dashboard is a
 *   dense product UI, not a marketing page, so the serif accent is used
 *   more sparingly here than on the landing page.
 * - The featured "AI Matches" card previously used a sky-to-indigo
 *   gradient — indigo isn't in the palette at all, and two unrelated
 *   hues competing in one card read as unintentional. Replaced with a
 *   single-hue brand-50→brand-100 tint so it reads as "the highlighted
 *   card" without introducing a color that exists nowhere else on site.
 */
export default function ProfessionalDashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-medium text-ink">
          Welcome back
        </h1>
        <p className="mt-2 font-sans text-slate-500">
          Here's an overview of your TenaWork professional workspace.
        </p>
      </div>

      {/* Quick Actions / Stats */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="border-brand-100 bg-gradient-to-br from-brand-50 to-brand-100/60 shadow-sm transition-all hover:shadow-md">
          <CardContent className="p-6">
            <div className="mb-4 inline-flex rounded-lg bg-white p-3 text-brand-600 shadow-sm">
              <Sparkles className="h-6 w-6" aria-hidden="true" />
            </div>
            <h3 className="font-sans text-lg font-semibold text-ink">
              AI matches
            </h3>
            <p className="mt-2 font-sans text-sm text-slate-500">
              Find jobs tailored to your unique preferences.
            </p>
            <Link
              to="/dashboard/professional/matches"
              className="mt-4 inline-block"
            >
              <span className="flex items-center font-sans text-sm font-medium text-brand-600 transition-colors hover:text-brand-700">
                View matches{" "}
                <ArrowRight className="ml-1 h-4 w-4" aria-hidden="true" />
              </span>
            </Link>
          </CardContent>
        </Card>

        <Card className="shadow-sm transition-all hover:shadow-md">
          <CardContent className="p-6">
            <div className="mb-4 inline-flex rounded-lg bg-slate-50 p-3 text-slate-500">
              <FileText className="h-6 w-6" aria-hidden="true" />
            </div>
            <h3 className="font-sans text-lg font-semibold text-ink">
              Applications
            </h3>
            <p className="mt-2 font-sans text-sm text-slate-500">
              Track the status of your active job applications.
            </p>
            <Link
              to="/dashboard/professional/applications"
              className="mt-4 inline-block"
            >
              <span className="flex items-center font-sans text-sm font-medium text-brand-600 transition-colors hover:text-brand-700">
                View tracker{" "}
                <ArrowRight className="ml-1 h-4 w-4" aria-hidden="true" />
              </span>
            </Link>
          </CardContent>
        </Card>

        <Card className="shadow-sm transition-all hover:shadow-md">
          <CardContent className="p-6">
            <div className="mb-4 inline-flex rounded-lg bg-slate-50 p-3 text-slate-500">
              <Settings className="h-6 w-6" aria-hidden="true" />
            </div>
            <h3 className="font-sans text-lg font-semibold text-ink">
              Preferences
            </h3>
            <p className="mt-2 font-sans text-sm text-slate-500">
              Update your criteria to improve AI matching accuracy.
            </p>
            <Link
              to="/dashboard/professional/preferences"
              className="mt-4 inline-block"
            >
              <span className="flex items-center font-sans text-sm font-medium text-brand-600 transition-colors hover:text-brand-700">
                Edit preferences{" "}
                <ArrowRight className="ml-1 h-4 w-4" aria-hidden="true" />
              </span>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Next Steps Section */}
      <div>
        <h2 className="mb-4 font-display text-xl font-medium text-ink">
          Next steps
        </h2>
        <Card>
          <CardContent className="p-8 text-center sm:p-12">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-brand-50 text-brand-600">
              <Sparkles className="h-8 w-8" aria-hidden="true" />
            </div>
            <h3 className="font-sans text-lg font-semibold text-ink">
              Complete your profile
            </h3>
            <p className="mx-auto mt-2 max-w-md font-sans text-slate-500">
              To get the most accurate job recommendations, make sure your
              preferences are fully filled out.
            </p>
            <Link
              to="/dashboard/professional/preferences"
              className="mt-6 inline-block"
            >
              <Button className="bg-brand-600 font-sans font-medium hover:bg-brand-700">
                Complete profile
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
