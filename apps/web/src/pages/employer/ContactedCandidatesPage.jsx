import { useState } from "react";
import { Link } from "react-router-dom";
import { UserSquare2, Mail, MapPin, Briefcase } from "lucide-react";
import Button from "@/components/ui/button/Button";
import Card, { CardContent } from "@/components/ui/card/Card";
import Badge from "@/components/ui/badge/Badge";

/**
 * ContactedCandidatesPage — palette/type locked to match the rest of the
 * site. Same indigo drift as EmployerDashboardPage (indigo-100/600/200),
 * now brand teal throughout so the employer side stays visually
 * consistent with itself and with the professional side.
 *
 * - text-ink for headings, text-slate-500 for secondary text
 * - border-slate-300 → border-slate-100 (custom scale reasoning as before)
 * - font-display on h1, font-sans/semibold on card titles
 * - contact date set in font-mono, matching how data values are styled
 *   elsewhere (dates, salary, scores)
 * - Button colors use `!important` (confirmed Button.jsx bug)
 *
 * Same mock-data note as MyApplicationsPage: fine as a dev placeholder
 * since it's not a public-facing claim, but swap for the real endpoint
 * before shipping.
 */
export default function ContactedCandidatesPage() {
  // Mock data for v1 since no backend endpoint exists
  const [contacts] = useState([
    {
      id: "c1",
      email: "nurse.pro@example.com",
      location: "Addis Ababa",
      preferredType: "Full-time",
      jobTitle: "Senior Registered Nurse",
      contactDate: "2024-02-16",
      status: "Awaiting Reply",
    },
    {
      id: "c2",
      email: "doctor.specialist@example.com",
      location: "Hawassa",
      preferredType: "Contract",
      jobTitle: "Pediatric Specialist",
      contactDate: "2024-02-10",
      status: "Replied",
    },
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-medium text-ink">
          Contacted candidates
        </h1>
        <p className="mt-2 font-sans text-slate-500">
          Professionals you have reached out to for your job postings.
        </p>
      </div>

      <div className="grid gap-4">
        {contacts.length > 0 ? (
          contacts.map((contact) => (
            <Card
              key={contact.id}
              className="transition-colors hover:border-brand-100"
            >
              <CardContent className="p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-start gap-4">
                    <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-700 sm:flex">
                      <UserSquare2 className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <h3 className="font-sans text-lg font-semibold text-ink">
                          {contact.email}
                        </h3>
                        <Badge
                          variant={
                            contact.status === "Replied" ? "success" : "warning"
                          }
                        >
                          {contact.status}
                        </Badge>
                      </div>
                      <div className="flex flex-wrap items-center gap-4 font-sans text-sm text-slate-500">
                        <div className="flex items-center gap-1.5 font-medium text-brand-600">
                          For: {contact.jobTitle}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <MapPin className="h-4 w-4" aria-hidden="true" />{" "}
                          {contact.location}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Briefcase className="h-4 w-4" aria-hidden="true" />{" "}
                          {contact.preferredType}
                        </div>
                      </div>
                      <div className="font-mono text-xs text-slate-400">
                        Contacted on {contact.contactDate}
                      </div>
                    </div>
                  </div>
                  <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                    <Link to={`/dashboard/candidates/${contact.id}`}>
                      <Button
                        variant="outline"
                        className="w-full border-brand-600 font-sans font-medium !text-brand-700 hover:bg-brand-50 sm:w-auto"
                      >
                        View profile
                      </Button>
                    </Link>
                    <Button className="w-full !bg-brand-600 font-sans font-medium !text-white hover:!bg-brand-700 sm:w-auto">
                      <Mail className="mr-2 h-4 w-4" aria-hidden="true" /> Send
                      email
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="rounded-xl border border-dashed border-slate-100 p-12 text-center">
            <h3 className="font-sans text-lg font-medium text-ink">
              No contacts yet
            </h3>
            <p className="mt-2 font-sans text-slate-500">
              You haven't reached out to any candidates.
            </p>
            <Link to="/dashboard/employer/matches">
              <Button className="mt-4 !bg-brand-600 font-sans font-medium !text-white hover:!bg-brand-700">
                Find candidates
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
