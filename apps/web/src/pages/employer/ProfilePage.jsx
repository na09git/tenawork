import { useState } from "react";
import Button from "@/components/ui/button/Button";
import Input from "@/components/ui/input/Input";
import { useAuth } from "@/contexts/AuthContext";
import Card, { CardHeader, CardTitle, CardContent } from "@/components/ui/card/Card";

export default function EmployerProfilePage() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Employer Settings</h1>
        <p className="mt-2 text-slate-600">Manage your company account details.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Company Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                label="Account Email"
                value={user?.email || ""}
                disabled
              />
            </div>
            
            <Input label="Company Name" placeholder="e.g. Addis General Hospital" />
            <Input label="Company Website" placeholder="https://" />

            <Button type="submit" loading={isLoading} className="mt-4">
              Save Company Profile
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
