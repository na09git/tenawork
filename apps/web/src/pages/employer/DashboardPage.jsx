import { Link } from "react-router-dom";
import { PlusCircle, Users, Mail, ArrowRight } from "lucide-react";
import Card, { CardContent } from "@/components/ui/card/Card";
import Button from "@/components/ui/button/Button";

export default function EmployerDashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Employer Workspace</h1>
        <p className="mt-2 text-slate-600">Manage your postings and connect with healthcare professionals.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-100 shadow-sm transition-all hover:shadow-md">
          <CardContent className="p-6">
            <div className="mb-4 inline-flex rounded-lg bg-white p-3 text-indigo-600 shadow-sm">
              <PlusCircle className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900">Post a Job</h3>
            <p className="mt-2 text-sm text-slate-600">Create a new posting and instantly find AI matches.</p>
            <Link to="/dashboard/employer/post-job" className="mt-4 inline-block">
              <span className="flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-700">
                Create Posting <ArrowRight className="ml-1 h-4 w-4" />
              </span>
            </Link>
          </CardContent>
        </Card>

        <Card className="transition-all hover:shadow-md">
          <CardContent className="p-6">
            <div className="mb-4 inline-flex rounded-lg bg-slate-100 p-3 text-slate-600">
              <Users className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900">Candidates</h3>
            <p className="mt-2 text-sm text-slate-600">Browse AI-recommended professionals for your institution.</p>
            <Link to="/dashboard/employer/matches" className="mt-4 inline-block">
              <span className="flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-700">
                View Matches <ArrowRight className="ml-1 h-4 w-4" />
              </span>
            </Link>
          </CardContent>
        </Card>

        <Card className="transition-all hover:shadow-md">
          <CardContent className="p-6">
            <div className="mb-4 inline-flex rounded-lg bg-slate-100 p-3 text-slate-600">
              <Mail className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900">Outreach</h3>
            <p className="mt-2 text-sm text-slate-600">Track candidates you've contacted.</p>
            <Link to="/dashboard/employer/contacts" className="mt-4 inline-block">
              <span className="flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-700">
                View Outreach <ArrowRight className="ml-1 h-4 w-4" />
              </span>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Active Jobs Preview */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900">Recent Postings</h2>
          <Link to="/dashboard/employer/post-job">
            <Button variant="outline" size="sm">New Post</Button>
          </Link>
        </div>
        <Card>
          <CardContent className="flex min-h-[200px] flex-col items-center justify-center p-8 text-center">
            <div className="mb-4 rounded-full bg-slate-100 p-4">
              <Users className="h-8 w-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-medium text-slate-900">No active postings</h3>
            <p className="mt-2 max-w-md text-slate-500">
              You haven't posted any jobs yet. Create your first listing to start finding candidates.
            </p>
            <Link to="/dashboard/employer/post-job" className="mt-6">
              <Button className="bg-indigo-600 hover:bg-indigo-700">Create First Job</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
