import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { loginSchema } from "@/validations/auth.validation";
import { loginUser } from "@/services/authService";
import { useAuth } from "@/contexts/AuthContext";
import Button from "@/components/ui/button/Button";
import Input from "@/components/ui/input/Input";

/**
 * LoginPage — palette/type locked to match the public site:
 * text-ink for headings, text-slate-500 for secondary text, brand-600/700
 * for the link (was text-sky-600, an old pre-rebrand default), font-display
 * on the h2, font-sans everywhere else.
 */
export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const from = location.state?.from?.pathname || "/dashboard";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      const { user, accessToken } = await loginUser(data);
      login(user, accessToken);
      toast.success("Successfully logged in!");

      // Navigate to role specific dashboard
      if (user.role === "EMPLOYEE") {
        navigate(from === "/dashboard" ? "/dashboard/professional" : from, {
          replace: true,
        });
      } else if (user.role === "EMPLOYER") {
        navigate(from === "/dashboard" ? "/dashboard/employer" : from, {
          replace: true,
        });
      } else {
        navigate(from, { replace: true });
      }
    } catch (error) {
      toast.error(
        error.response?.data?.error ||
          "Failed to login. Please check your credentials.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-5">
      <div>
        <h2 className="font-display text-2xl font-medium text-ink">Sign in</h2>
        <p className="mt-1 font-sans text-sm text-slate-500">
          Access your TenaWork workspace
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
        <Button
          type="submit"
          fullWidth
          loading={isLoading}
          className="bg-brand-600 font-sans font-medium hover:bg-brand-700"
        >
          Continue
        </Button>
      </form>
      <p className="font-sans text-sm text-slate-500">
        No account yet?{" "}
        <Link
          to="/auth/register"
          className="font-semibold text-brand-600 transition-colors hover:text-brand-700"
        >
          Create one
        </Link>
      </p>
    </div>
  );
}
