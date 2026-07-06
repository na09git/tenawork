export default function HomePage() {
  return (
    <section className="space-y-6">
      <div className="rounded-3xl bg-gradient-to-br from-sky-600 to-indigo-700 p-8 text-white shadow-lg">
        <h1 className="text-4xl font-semibold">Welcome to TenaWork</h1>
        <p className="mt-3 max-w-2xl text-sky-50">
          A modern AI-powered recruitment platform for healthcare professionals
          and employers.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold">For Health Professionals</h2>
          <p className="mt-2 text-slate-600">
            Discover roles that match your skills, preferences, and location.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold">For Employers</h2>
          <p className="mt-2 text-slate-600">
            Find qualified candidates faster with AI-assisted recommendations.
          </p>
        </div>
      </div>
    </section>
  );
}
