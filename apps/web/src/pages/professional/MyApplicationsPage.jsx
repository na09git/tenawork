import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Building2,
  MapPin,
  Clock,
  Calendar,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import Button from "@/components/ui/button/Button";
import Card, {
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card/Card";
import Badge from "@/components/ui/badge/Badge";
import { getMyApplications } from "@/services/applicationService";

/**
 * MyApplicationsPage — palette/type locked to match the rest of the site.
 *
 * - text-ink for headings, text-slate-500 for secondary text, brand-100
 *   for hover states (was sky-200/sky-500, pre-rebrand leftovers).
 * - border-slate-300 → border-slate-100, same custom-scale reasoning as
 *   the other pages (your slate scale only defines 50/100/400/500/700).
 * - font-display on the page h1, font-sans/semibold on card titles
 *   (dashboard convention — same as ProfessionalDashboardPage).
 * - Applied-date set in font-mono, matching how data values are treated
 *   elsewhere (salary, match score, stats).
 *
 * Note (not a styling issue, flagging anyway): the mock application data
 * below is fine as dev placeholder — it's only visible to a logged-in
 * user, not a public marketing claim like the testimonials were — but
 * make sure it's fully swapped for the real endpoint before this ships,
 * same as any other mock data still in the app.
 */
export default function MyApplicationsPage() {
  const [applications, setApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const data = await getMyApplications();
        // date formatting (optional but good practice)
        const formatted = data.map(app => ({
          ...app,
          dateApplied: new Date(app.dateApplied).toLocaleDateString()
        }));
        setApplications(formatted);
      } catch (error) {
        console.error("Failed to load applications:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchApplications();
  }, []);

  const getStatusBadge = (status) => {
    switch (status) {
      case "Reviewing":
        return (
          <Badge variant="warning">
            <Clock className="mr-1 h-3 w-3" aria-hidden="true" /> Reviewing
          </Badge>
        );
      case "Interviewing":
        return (
          <Badge variant="primary">
            <Calendar className="mr-1 h-3 w-3" aria-hidden="true" />{" "}
            Interviewing
          </Badge>
        );
      case "Accepted":
        return (
          <Badge variant="success">
            <CheckCircle2 className="mr-1 h-3 w-3" aria-hidden="true" />{" "}
            Accepted
          </Badge>
        );
      case "Rejected":
        return (
          <Badge variant="danger">
            <XCircle className="mr-1 h-3 w-3" aria-hidden="true" /> Closed
          </Badge>
        );
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-medium text-ink">
          My applications
        </h1>
        <p className="mt-2 font-sans text-slate-500">
          Track the status of jobs you have applied for.
        </p>
      </div>

      <div className="grid gap-4">
        {isLoading ? (
          <div className="flex h-32 items-center justify-center">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-brand-600 border-t-transparent" />
          </div>
        ) : applications.length > 0 ? (
          applications.map((app) => (
            <Card
              key={app.id}
              className="transition-colors hover:border-brand-100"
            >
              <CardContent className="p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <h3 className="font-sans text-lg font-semibold text-ink">
                        {app.jobTitle}
                      </h3>
                      {getStatusBadge(app.status)}
                    </div>
                    <div className="flex flex-wrap items-center gap-4 font-sans text-sm text-slate-500">
                      <div className="flex items-center gap-1.5">
                        <Building2 className="h-4 w-4" aria-hidden="true" />{" "}
                        {app.institution}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin className="h-4 w-4" aria-hidden="true" />{" "}
                        {app.location}
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-400">
                        <Calendar className="h-4 w-4" aria-hidden="true" />{" "}
                        Applied:{" "}
                        <span className="font-mono">{app.dateApplied}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <Link to={`/dashboard/jobs/${app.jobId}`}>
                      <Button
                        variant="outline"
                        className="border-brand-600 font-sans font-medium text-brand-700 hover:bg-brand-50"
                      >
                        View job
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="rounded-xl border border-dashed border-slate-100 p-12 text-center">
            <h3 className="font-sans text-lg font-medium text-ink">
              No applications yet
            </h3>
            <p className="mt-2 font-sans text-slate-500">
              You haven't applied to any jobs.
            </p>
            <Link to="/dashboard/professional/matches">
              <Button className="mt-4 bg-brand-600 font-sans font-medium hover:bg-brand-700">
                Find jobs
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
