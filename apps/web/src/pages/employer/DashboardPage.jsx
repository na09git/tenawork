import { Link } from "react-router-dom";
import { PlusCircle, Users, Mail, ArrowRight } from "lucide-react";
import Card, { CardContent } from "@/components/ui/card/Card";
import Button from "@/components/ui/button/Button";

/**
 * EmployerDashboardPage — palette locked to match ProfessionalDashboardPage
 * and the rest of the site.
 *
 * This file had the widest color drift of anything reviewed so far:
 * indigo-50/purple-50 gradient, indigo-600 text/buttons throughout —
 * neither indigo nor purple exist anywhere in the actual palette. This
 * was effectively a third, unrelated color scheme living on the
 * employer side of the app while the professional side used sky. Both
 * are now brand teal, so the two dashboards actually look like the same
 * product.
 *
 * Button color overrides use the `!` important modifier — confirmed
 * necessary after the Next Step / Final CTA button bug, applied
 * proactively here rather than waiting to hit it again.
 */
export default function EmployerDashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-medium text-ink">
          Employer workspace
        </h1>
        <p className="mt-2 font-sans text-slate-500">
          Manage your postings and connect with healthcare professionals.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="border-brand-100 bg-gradient-to-br from-brand-50 to-brand-100/60 shadow-sm transition-all hover:shadow-md">
          <CardContent className="p-6">
            <div className="mb-4 inline-flex rounded-lg bg-white p-3 text-brand-600 shadow-sm">
              <PlusCircle className="h-6 w-6" aria-hidden="true" />
            </div>
            <h3 className="font-sans text-lg font-semibold text-ink">
              Post a job
            </h3>
            <p className="mt-2 font-sans text-sm text-slate-500">
              Create a new posting and instantly find AI matches.
            </p>
            <Link
              to="/dashboard/employer/post-job"
              className="mt-4 inline-block"
            >
              <span className="flex items-center font-sans text-sm font-medium text-brand-600 transition-colors hover:text-brand-700">
                Create posting{" "}
                <ArrowRight className="ml-1 h-4 w-4" aria-hidden="true" />
              </span>
            </Link>
          </CardContent>
        </Card>

        <Card className="shadow-sm transition-all hover:shadow-md">
          <CardContent className="p-6">
            <div className="mb-4 inline-flex rounded-lg bg-slate-50 p-3 text-slate-500">
              <Users className="h-6 w-6" aria-hidden="true" />
            </div>
            <h3 className="font-sans text-lg font-semibold text-ink">
              Candidates
            </h3>
            <p className="mt-2 font-sans text-sm text-slate-500">
              Browse AI-recommended professionals for your institution.
            </p>
            <Link
              to="/dashboard/employer/matches"
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
              <Mail className="h-6 w-6" aria-hidden="true" />
            </div>
            <h3 className="font-sans text-lg font-semibold text-ink">
              Outreach
            </h3>
            <p className="mt-2 font-sans text-sm text-slate-500">
              Track candidates you've contacted.
            </p>
            <Link
              to="/dashboard/employer/contacts"
              className="mt-4 inline-block"
            >
              <span className="flex items-center font-sans text-sm font-medium text-brand-600 transition-colors hover:text-brand-700">
                View outreach{" "}
                <ArrowRight className="ml-1 h-4 w-4" aria-hidden="true" />
              </span>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Active Jobs Preview */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-xl font-medium text-ink">
            Recent postings
          </h2>
          <Link to="/dashboard/employer/post-job">
            <Button
              variant="outline"
              size="sm"
              className="border-brand-600 font-sans font-medium !text-brand-700 hover:bg-brand-50"
            >
              New post
            </Button>
          </Link>
        </div>
        <Card>
          <CardContent className="flex min-h-[200px] flex-col items-center justify-center p-8 text-center">
            <div className="mb-4 rounded-full bg-slate-50 p-4">
              <Users className="h-8 w-8 text-slate-400" aria-hidden="true" />
            </div>
            <h3 className="font-sans text-lg font-medium text-ink">
              No active postings
            </h3>
            <p className="mt-2 max-w-md font-sans text-slate-500">
              You haven't posted any jobs yet. Create your first listing to
              start finding candidates.
            </p>
            <Link to="/dashboard/employer/post-job" className="mt-6">
              <Button className="!bg-brand-600 font-sans font-medium !text-white hover:!bg-brand-700">
                Create first job
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
