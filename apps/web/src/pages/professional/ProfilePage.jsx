import { useState } from "react";
import Button from "@/components/ui/button/Button";
import Input from "@/components/ui/input/Input";
import { useAuth } from "@/contexts/AuthContext";
import Card, { CardHeader, CardTitle, CardContent } from "@/components/ui/card/Card";

export default function ProfilePage() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      // alert("Profile updated!"); // we would use toast here
    }, 1000);
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Account Settings</h1>
        <p className="mt-2 text-slate-600">Manage your basic account details.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Profile Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                label="Email Address"
                value={user?.email || ""}
                disabled
              />
              <p className="mt-1 text-xs text-slate-500">Email cannot be changed at this time.</p>
            </div>
            
            <div className="grid gap-4 sm:grid-cols-2">
              <Input label="First Name" placeholder="First name" />
              <Input label="Last Name" placeholder="Last name" />
            </div>

            <Button type="submit" loading={isLoading} className="mt-4">
              Save Changes
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
