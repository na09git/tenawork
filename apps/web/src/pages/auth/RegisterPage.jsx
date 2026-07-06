import { Link } from "react-router-dom";

export default function RegisterPage() {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-2xl font-semibold">Create account</h2>
        <p className="mt-1 text-sm text-slate-600">
          Join TenaWork as a professional or employer
        </p>
      </div>
      <form className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium">Full name</label>
          <input
            className="w-full rounded-lg border border-slate-300 px-3 py-2"
            placeholder="Your name"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Email</label>
          <input
            className="w-full rounded-lg border border-slate-300 px-3 py-2"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Role</label>
          <select className="w-full rounded-lg border border-slate-300 px-3 py-2">
            <option>Professional</option>
            <option>Employer</option>
          </select>
        </div>
        <button className="w-full rounded-lg bg-sky-600 px-4 py-2 font-medium text-white">
          Create account
        </button>
      </form>
      <p className="text-sm text-slate-600">
        Already have an account?{" "}
        <Link to="/auth/login" className="font-semibold text-sky-600">
          Sign in
        </Link>
      </p>
    </div>
  );
}
