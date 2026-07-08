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
        navigate(from === "/dashboard" ? "/dashboard/professional" : from, { replace: true });
      } else if (user.role === "EMPLOYER") {
        navigate(from === "/dashboard" ? "/dashboard/employer" : from, { replace: true });
      } else {
        navigate(from, { replace: true });
      }
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to login. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-2xl font-semibold">Sign in</h2>
        <p className="mt-1 text-sm text-slate-600">
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
        <Button type="submit" fullWidth loading={isLoading}>
          Continue
        </Button>
      </form>
      <p className="text-sm text-slate-600">
        No account yet?{" "}
        <Link to="/auth/register" className="font-semibold text-sky-600">
          Create one
        </Link>
      </p>
    </div>
  );
}
