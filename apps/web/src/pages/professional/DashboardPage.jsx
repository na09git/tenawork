import { Link } from "react-router-dom";
import { Sparkles, FileText, Settings, ArrowRight } from "lucide-react";
import Card, { CardContent } from "@/components/ui/card/Card";
import Button from "@/components/ui/button/Button";

export default function ProfessionalDashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Welcome Back</h1>
        <p className="mt-2 text-slate-600">Here is an overview of your TenaWork professional workspace.</p>
      </div>

      {/* Quick Actions / Stats */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="bg-gradient-to-br from-sky-50 to-indigo-50 border-sky-100 shadow-sm transition-all hover:shadow-md">
          <CardContent className="p-6">
            <div className="mb-4 inline-flex rounded-lg bg-white p-3 text-sky-600 shadow-sm">
              <Sparkles className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900">AI Matches</h3>
            <p className="mt-2 text-sm text-slate-600">Find jobs tailored to your unique preferences.</p>
            <Link to="/dashboard/professional/matches" className="mt-4 inline-block">
              <span className="flex items-center text-sm font-medium text-sky-600 hover:text-sky-700">
                View Matches <ArrowRight className="ml-1 h-4 w-4" />
              </span>
            </Link>
          </CardContent>
        </Card>

        <Card className="transition-all hover:shadow-md">
          <CardContent className="p-6">
            <div className="mb-4 inline-flex rounded-lg bg-slate-100 p-3 text-slate-600">
              <FileText className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900">Applications</h3>
            <p className="mt-2 text-sm text-slate-600">Track the status of your active job applications.</p>
            <Link to="/dashboard/professional/applications" className="mt-4 inline-block">
              <span className="flex items-center text-sm font-medium text-sky-600 hover:text-sky-700">
                View Tracker <ArrowRight className="ml-1 h-4 w-4" />
              </span>
            </Link>
          </CardContent>
        </Card>

        <Card className="transition-all hover:shadow-md">
          <CardContent className="p-6">
            <div className="mb-4 inline-flex rounded-lg bg-slate-100 p-3 text-slate-600">
              <Settings className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900">Preferences</h3>
            <p className="mt-2 text-sm text-slate-600">Update your criteria to improve AI matching accuracy.</p>
            <Link to="/dashboard/professional/preferences" className="mt-4 inline-block">
              <span className="flex items-center text-sm font-medium text-sky-600 hover:text-sky-700">
                Edit Preferences <ArrowRight className="ml-1 h-4 w-4" />
              </span>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity Section */}
      <div>
        <h2 className="mb-4 text-xl font-bold text-slate-900">Next Steps</h2>
        <Card>
          <CardContent className="p-8 text-center sm:p-12">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-sky-100 text-sky-600">
              <Sparkles className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900">Complete your profile</h3>
            <p className="mx-auto mt-2 max-w-md text-slate-600">
              To get the most accurate job recommendations, make sure your preferences are fully filled out.
            </p>
            <Link to="/dashboard/professional/preferences" className="mt-6 inline-block">
              <Button>Complete Profile</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
