import { useState } from "react";
import { Link } from "react-router-dom";
import { Building2, MapPin, Clock, Calendar, CheckCircle2, XCircle } from "lucide-react";
import Button from "@/components/ui/button/Button";
import Card, { CardHeader, CardTitle, CardContent } from "@/components/ui/card/Card";
import Badge from "@/components/ui/badge/Badge";

export default function MyApplicationsPage() {
  // Mock data for v1 since no backend endpoint exists
  const [applications] = useState([
    {
      id: "1",
      jobTitle: "Senior Registered Nurse",
      institution: "Addis General Hospital",
      location: "Addis Ababa",
      dateApplied: "2024-02-15",
      status: "Reviewing",
    },
    {
      id: "2",
      jobTitle: "Pediatric Specialist",
      institution: "Hawassa Health Center",
      location: "Hawassa",
      dateApplied: "2024-02-10",
      status: "Interviewing",
    },
    {
      id: "3",
      jobTitle: "General Practitioner",
      institution: "Dire Dawa Clinic",
      location: "Dire Dawa",
      dateApplied: "2024-01-20",
      status: "Rejected",
    },
  ]);

  const getStatusBadge = (status) => {
    switch (status) {
      case "Reviewing":
        return <Badge variant="warning"><Clock className="mr-1 h-3 w-3" /> Reviewing</Badge>;
      case "Interviewing":
        return <Badge variant="primary"><Calendar className="mr-1 h-3 w-3" /> Interviewing</Badge>;
      case "Accepted":
        return <Badge variant="success"><CheckCircle2 className="mr-1 h-3 w-3" /> Accepted</Badge>;
      case "Rejected":
        return <Badge variant="danger"><XCircle className="mr-1 h-3 w-3" /> Closed</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">My Applications</h1>
        <p className="mt-2 text-slate-600">Track the status of jobs you have applied for.</p>
      </div>

      <div className="grid gap-4">
        {applications.length > 0 ? (
          applications.map((app) => (
            <Card key={app.id} className="hover:border-sky-200 transition-colors">
              <CardContent className="p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-bold text-slate-900">{app.jobTitle}</h3>
                      {getStatusBadge(app.status)}
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600">
                      <div className="flex items-center gap-1.5">
                        <Building2 className="h-4 w-4" /> {app.institution}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin className="h-4 w-4" /> {app.location}
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-400">
                        <Calendar className="h-4 w-4" /> Applied: {app.dateApplied}
                      </div>
                    </div>
                  </div>
                  <div>
                    <Link to={`/dashboard/jobs/${app.id}`}>
                      <Button variant="outline">View Job</Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="rounded-xl border border-dashed border-slate-300 p-12 text-center">
            <h3 className="text-lg font-medium text-slate-900">No applications yet</h3>
            <p className="mt-2 text-slate-500">You haven't applied to any jobs.</p>
            <Link to="/dashboard/professional/matches">
              <Button className="mt-4">Find Jobs</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
