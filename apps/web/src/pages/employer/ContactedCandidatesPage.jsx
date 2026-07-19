import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { UserSquare2, Mail, MapPin, Briefcase, ArrowRight } from "lucide-react";
import { getContactedCandidates } from "@/services/candidateService";
import Button from "@/components/ui/button/Button";
import Badge from "@/components/ui/badge/Badge";

export default function ContactedCandidatesPage() {
  const shouldReduceMotion = useReducedMotion();
  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const data = await getContactedCandidates();
        setContacts(data);
      } catch (err) {
        setError(
          err.response?.data?.error || "Failed to load contacted candidates.",
        );
      } finally {
        setIsLoading(false);
      }
    };
    fetchContacts();
  }, []);

  if (isLoading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <div
          className="h-8 w-8 animate-spin rounded-full border-4 border-brand-600 border-t-transparent"
          role="status"
          aria-label="Loading contacted candidates"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-rose-200 bg-rose-50 p-6 text-center">
        <h3 className="font-sans text-lg font-medium text-rose-800">
          Oops, something went wrong
        </h3>
        <p className="mt-2 font-sans text-rose-600">{error}</p>
        <Button
          onClick={() => window.location.reload()}
          className="mt-4 font-sans"
          variant="outline"
        >
          Try again
        </Button>
      </div>
    );
  }

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

      {contacts.length === 0 ? (
        <div className="flex min-h-[40vh] flex-col items-center justify-center rounded-2xl border border-slate-100 bg-white p-8 text-center shadow-sm">
          <div className="mb-4 rounded-full bg-slate-50 p-4">
            <UserSquare2
              className="h-8 w-8 text-slate-400"
              aria-hidden="true"
            />
          </div>
          <h3 className="font-sans text-lg font-semibold text-ink">
            No contacts yet
          </h3>
          <p className="mt-2 max-w-md font-sans text-slate-500">
            You haven't reached out to any candidates. Browse your AI-matched
            candidates to get started.
          </p>
          <Link to="/dashboard/employer/matches" className="mt-6">
            <Button className="!bg-brand-600 font-sans font-medium !text-white hover:!bg-brand-700">
              Find candidates
            </Button>
          </Link>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px] border-collapse text-left">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50">
                  <th className="px-6 py-3 font-sans text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Candidate
                  </th>
                  <th className="px-4 py-3 font-sans text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Applied for
                  </th>
                  <th className="px-4 py-3 font-sans text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Location
                  </th>
                  <th className="px-4 py-3 font-sans text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Status
                  </th>
                  <th className="px-4 py-3 font-sans text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Contacted
                  </th>
                  <th className="px-6 py-3 text-right font-sans text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {contacts.map((contact, idx) => (
                  <motion.tr
                    key={contact.id}
                    initial={
                      shouldReduceMotion ? undefined : { opacity: 0, y: 10 }
                    }
                    animate={
                      shouldReduceMotion ? undefined : { opacity: 1, y: 0 }
                    }
                    transition={{ delay: idx * 0.05 }}
                    className="transition-colors hover:bg-slate-50"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-700">
                          <UserSquare2
                            className="h-4.5 w-4.5"
                            aria-hidden="true"
                          />
                        </div>
                        <div>
                          <div className="font-sans font-semibold text-ink">
                            {contact.email}
                          </div>
                          <div className="flex items-center gap-1.5 font-sans text-xs text-slate-500">
                            <Briefcase className="h-3 w-3" aria-hidden="true" />
                            {contact.preferredType}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 font-sans text-sm font-medium text-brand-600">
                      {contact.jobTitle}
                    </td>
                    <td className="px-4 py-4 font-sans text-sm text-slate-500">
                      <div className="flex items-center gap-1.5">
                        <MapPin
                          className="h-3.5 w-3.5 text-slate-400"
                          aria-hidden="true"
                        />
                        {contact.location}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <Badge
                        variant={
                          contact.status === "Replied" ? "success" : "warning"
                        }
                      >
                        {contact.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-4 font-mono text-xs text-slate-400">
                      {contact.contactDate}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link to={`/dashboard/candidates/${contact.id}`}>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-brand-600 font-sans font-medium !text-brand-700 hover:bg-brand-50"
                          >
                            Profile{" "}
                            <ArrowRight
                              className="ml-1 h-3.5 w-3.5"
                              aria-hidden="true"
                            />
                          </Button>
                        </Link>
                        <Button
                          size="sm"
                          className="!bg-brand-600 font-sans font-medium !text-white hover:!bg-brand-700"
                        >
                          <Mail
                            className="mr-1.5 h-3.5 w-3.5"
                            aria-hidden="true"
                          />{" "}
                          Email
                        </Button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
