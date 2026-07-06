import { Link } from "react-router-dom";

export default function LoginPage() {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-2xl font-semibold">Sign in</h2>
        <p className="mt-1 text-sm text-slate-600">
          Access your TenaWork workspace
        </p>
      </div>
      <form className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium">Email</label>
          <input
            className="w-full rounded-lg border border-slate-300 px-3 py-2"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Password</label>
          <input
            type="password"
            className="w-full rounded-lg border border-slate-300 px-3 py-2"
            placeholder="••••••"
          />
        </div>
        <button className="w-full rounded-lg bg-sky-600 px-4 py-2 font-medium text-white">
          Continue
        </button>
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
