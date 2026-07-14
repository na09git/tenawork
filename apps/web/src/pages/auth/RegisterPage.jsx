import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { registerSchema } from "@/validations/auth.validation";
import { registerUser } from "@/services/authService";
import { useAuth } from "@/contexts/AuthContext";
import Button from "@/components/ui/button/Button";
import Input from "@/components/ui/input/Input";

/**
 * RegisterPage — palette/type locked to match LoginPage and the rest of
 * the site: text-ink for headings, text-slate-500 for secondary text,
 * brand-600/700 for links and focus states (was sky-500/600, a leftover
 * pre-rebrand default), font-display on the h2, font-sans everywhere else.
 *
 * The error text (text-rose-500) is left as-is deliberately — errors
 * should stay a distinct semantic red rather than the brand color, so
 * they're never mistaken for a normal UI state.
 */
export default function RegisterPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const defaultRole =
    searchParams.get("role") === "Employer" ? "Employer" : "Professional";

  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      role: defaultRole,
    },
  });

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      // Map frontend roles to backend roles
      const apiRole = data.role === "Employer" ? "EMPLOYER" : "EMPLOYEE";

      const { user, accessToken } = await registerUser({
        email: data.email,
        password: data.password,
        role: apiRole,
      });

      login(user, accessToken);
      toast.success("Account created successfully!");

      if (apiRole === "EMPLOYEE") {
        navigate("/dashboard/professional", { replace: true });
      } else {
        navigate("/dashboard/employer", { replace: true });
      }
    } catch (error) {
      toast.error(
        error.response?.data?.error ||
          "Failed to create account. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-5">
      <div>
        <h2 className="font-display text-2xl font-medium text-ink">
          Create account
        </h2>
        <p className="mt-1 font-sans text-sm text-slate-500">
          Join TenaWork as a professional or employer
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Input
            label="Full name"
            placeholder="Your name"
            error={errors.fullName?.message}
            {...register("fullName")}
          />
        </div>
        <div>
          <Input
            label="Email"
            placeholder="you@example.com"
            error={errors.email?.message}
            {...register("email")}
          />
        </div>
        <div>
          <Input
            type="password"
            label="Password"
            placeholder="••••••"
            error={errors.password?.message}
            {...register("password")}
          />
        </div>
        <div>
          <label className="mb-1 block font-sans text-sm font-medium text-slate-700">
            Role
          </label>
          <select
            className="w-full rounded-lg border border-slate-100 px-3 py-2 font-sans text-ink focus:border-brand-600 focus:outline-none focus:ring-1 focus:ring-brand-600"
            {...register("role")}
          >
            <option value="Professional">Health Professional</option>
            <option value="Employer">Employer</option>
          </select>
          {errors.role && (
            <p className="mt-1 font-sans text-sm text-rose-500">
              {errors.role.message}
            </p>
          )}
        </div>
        <Button
          type="submit"
          fullWidth
          loading={isLoading}
          className="bg-brand-600 font-sans font-medium hover:bg-brand-700"
        >
          Create account
        </Button>
      </form>
      <p className="font-sans text-sm text-slate-500">
        Already have an account?{" "}
        <Link
          to="/auth/login"
          className="font-semibold text-brand-600 transition-colors hover:text-brand-700"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}
