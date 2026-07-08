import { useState } from "react";
import { Link } from "react-router-dom";
import { UserSquare2, Mail, MapPin, Briefcase } from "lucide-react";
import Button from "@/components/ui/button/Button";
import Card, { CardContent } from "@/components/ui/card/Card";
import Badge from "@/components/ui/badge/Badge";

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
        <h1 className="text-3xl font-bold text-slate-900">Contacted Candidates</h1>
        <p className="mt-2 text-slate-600">Professionals you have reached out to for your job postings.</p>
      </div>

      <div className="grid gap-4">
        {contacts.length > 0 ? (
          contacts.map((contact) => (
            <Card key={contact.id} className="hover:border-indigo-200 transition-colors">
              <CardContent className="p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-start gap-4">
                    <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-indigo-700 sm:flex">
                      <UserSquare2 className="h-6 w-6" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-bold text-slate-900">{contact.email}</h3>
                        <Badge variant={contact.status === "Replied" ? "success" : "warning"}>
                          {contact.status}
                        </Badge>
                      </div>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600">
                        <div className="flex items-center gap-1.5 font-medium text-indigo-600">
                          For: {contact.jobTitle}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <MapPin className="h-4 w-4" /> {contact.location}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Briefcase className="h-4 w-4" /> {contact.preferredType}
                        </div>
                      </div>
                      <div className="text-xs text-slate-400">
                        Contacted on {contact.contactDate}
                      </div>
                    </div>
                  </div>
                  <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                    <Link to={`/dashboard/candidates/${contact.id}`}>
                      <Button variant="outline" className="w-full sm:w-auto">View Profile</Button>
                    </Link>
                    <Button className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700">
                      <Mail className="mr-2 h-4 w-4" /> Send Email
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="rounded-xl border border-dashed border-slate-300 p-12 text-center">
            <h3 className="text-lg font-medium text-slate-900">No contacts yet</h3>
            <p className="mt-2 text-slate-500">You haven't reached out to any candidates.</p>
            <Link to="/dashboard/employer/matches">
              <Button className="mt-4 bg-indigo-600 hover:bg-indigo-700">Find Candidates</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
