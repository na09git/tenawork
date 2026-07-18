import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { getEmployeeProfile } from "@/services/employeeService";
import Button from "@/components/ui/button/Button";
import Card, { CardHeader, CardTitle, CardContent } from "@/components/ui/card/Card";
import Badge from "@/components/ui/badge/Badge";

export default function ProfilePage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getEmployeeProfile();
        setProfile(data);
      } catch (error) {
        // If 404, it means no profile created yet, which is fine
        if (error.response?.status !== 404) {
          console.error("Failed to fetch profile:", error);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-ink">Profile & Preferences</h1>
        <p className="mt-2 font-sans text-slate-500">Manage your account and matching criteria.</p>
      </div>

      <Card className="border-slate-100">
        <CardHeader>
          <CardTitle className="font-sans text-lg font-semibold text-ink">Account</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700">Email Address</label>
            <div className="mt-1 font-sans text-ink">{user?.email || "N/A"}</div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">Account Type</label>
            <div className="mt-1 font-sans text-ink">{user?.role || "EMPLOYEE"}</div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-slate-100">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="font-sans text-lg font-semibold text-ink">Saved Preferences</CardTitle>
          <Button 
            onClick={() => navigate("/dashboard/professional/preferences")}
            className="!bg-brand-600 font-sans font-medium !text-white hover:!bg-brand-700"
          >
            Edit Preferences
          </Button>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex h-32 items-center justify-center">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-brand-600 border-t-transparent" />
            </div>
          ) : profile ? (
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-slate-700">Work Type</label>
                <div className="mt-1 font-sans text-ink">{profile.work_type || "Any"}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Location</label>
                <div className="mt-1 font-sans text-ink">{profile.location || "Anywhere"}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Salary Range</label>
                <div className="mt-1 font-mono text-ink">
                  {profile.salary_min ? `${profile.salary_min.toLocaleString()} ETB` : "0 ETB"} - {profile.salary_max ? `${profile.salary_max.toLocaleString()} ETB` : "Any"}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Institution Type</label>
                <div className="mt-1 font-sans text-ink">{profile.institution_type || "Any"}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Culture</label>
                <div className="mt-1">
                  {profile.culture ? (
                    <Badge variant="primary" className="font-sans">{profile.culture}</Badge>
                  ) : (
                    <span className="font-sans text-ink">Any</span>
                  )}
                </div>
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-slate-700">Health Priorities</label>
                <div className="mt-1 flex flex-wrap gap-2">
                  {profile.health_priorities && profile.health_priorities.length > 0 ? (
                    profile.health_priorities.map(p => (
                      <Badge key={p} variant="success" className="font-sans">{p}</Badge>
                    ))
                  ) : (
                    <span className="font-sans text-ink">None specified</span>
                  )}
                </div>
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-slate-700">Languages</label>
                <div className="mt-1 flex flex-wrap gap-2">
                  {profile.languages && profile.languages.length > 0 ? (
                    profile.languages.map(l => (
                      <Badge key={l} variant="success" className="font-sans">{l}</Badge>
                    ))
                  ) : (
                    <span className="font-sans text-ink">None specified</span>
                  )}
                </div>
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-slate-700">Additional Notes</label>
                <div className="mt-1 font-sans text-ink">
                  {profile.free_text || "None"}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center space-y-4 rounded-xl border border-dashed border-slate-200 bg-slate-50 py-12">
              <p className="font-sans text-slate-500">You haven't set your preferences yet.</p>
              <Button 
                onClick={() => navigate("/dashboard/professional/preferences")}
                className="!bg-brand-600 font-sans font-medium !text-white hover:!bg-brand-700"
              >
                Set Preferences
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
