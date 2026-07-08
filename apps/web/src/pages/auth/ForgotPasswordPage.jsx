import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "@/components/ui/button/Button";
import Input from "@/components/ui/input/Input";

export default function ForgotPasswordPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-2xl font-semibold">Reset password</h2>
        <p className="mt-1 text-sm text-slate-600">
          Enter your email to receive a password reset link
        </p>
      </div>

      {isSubmitted ? (
        <div className="rounded-lg bg-green-50 p-4 text-green-700 border border-green-200">
          <p className="text-sm font-medium">Check your email</p>
          <p className="mt-1 text-sm">
            We sent a password reset link to your email address.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              type="email"
              label="Email"
              placeholder="you@example.com"
              required
            />
          </div>
          <Button type="submit" fullWidth>
            Send reset link
          </Button>
        </form>
      )}

      <p className="text-sm text-slate-600">
        Remember your password?{" "}
        <Link to="/auth/login" className="font-semibold text-sky-600">
          Sign in
        </Link>
      </p>
    </div>
  );
}
