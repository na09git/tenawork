import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Building2, Wallet, Sparkles } from "lucide-react";
import { getEmployeeMatches } from "@/services/matchService";
import Button from "@/components/ui/button/Button";
import Card, { CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card/Card";
import Badge from "@/components/ui/badge/Badge";

const ScoreBadge = ({ score }) => {
  const percentage = Math.round((score || 0) * 100);
  let colorClass = "bg-green-100 text-green-700";
  
  if (percentage < 60) {
    colorClass = "bg-rose-100 text-rose-700";
  } else if (percentage < 80) {
    colorClass = "bg-amber-100 text-amber-700";
  }

  return (
    <div className={`flex items-center gap-1 rounded-full px-3 py-1 font-bold ${colorClass}`}>
      <Sparkles className="h-4 w-4" />
      {percentage}% Match
    </div>
  );
};

export default function MatchResultsPage() {
  const [matches, setMatches] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const data = await getEmployeeMatches();
        setMatches(data);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to load AI matches.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMatches();
  }, []);

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center space-y-6">
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-tr from-sky-400 to-indigo-500 shadow-xl"
        >
          <Sparkles className="h-10 w-10 text-white" />
        </motion.div>
        <div className="text-center">
          <h2 className="text-xl font-semibold text-slate-800">AI is finding your perfect matches</h2>
          <p className="mt-2 text-slate-500">Analyzing your preferences against active jobs...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-rose-200 bg-rose-50 p-6 text-center">
        <h3 className="text-lg font-medium text-rose-800">Oops, something went wrong</h3>
        <p className="mt-2 text-rose-600">{error}</p>
        <Button onClick={() => window.location.reload()} className="mt-4" variant="outline">
          Try Again
        </Button>
      </div>
    );
  }

  if (matches.length === 0) {
    return (
      <div className="flex min-h-[40vh] flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <div className="mb-4 rounded-full bg-slate-100 p-4">
          <Sparkles className="h-8 w-8 text-slate-400" />
        </div>
        <h3 className="text-lg font-semibold">No perfect matches yet</h3>
        <p className="mt-2 max-w-md text-slate-500">
          We couldn't find any jobs that strongly align with your current preferences. Try broadening your criteria.
        </p>
        <Link to="/dashboard/professional/preferences" className="mt-6">
          <Button>Update Preferences</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Your Top Matches</h1>
        <p className="mt-2 text-slate-600">
          Based on your profile, here are the best opportunities available right now.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {matches.map((job, idx) => (
          <motion.div
            key={job.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <Card className="flex h-full flex-col hover:border-sky-200 hover:shadow-md transition-all">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <Badge>{job.work_type}</Badge>
                  <ScoreBadge score={job.score} />
                </div>
                <CardTitle className="mt-4 text-xl">{job.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-1 space-y-4">
                <div className="space-y-2 text-sm text-slate-600">
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4" />
                    <span>{job.institution_type}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Wallet className="h-4 w-4" />
                    <span>
                      {job.salary_min?.toLocaleString()} - {job.salary_max?.toLocaleString()} ETB
                    </span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {job.health_priorities?.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="default" className="bg-slate-100 text-slate-600 text-xs font-normal">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex gap-3">
                <Link to={`/dashboard/jobs/${job.id}`} className="flex-1">
                  <Button variant="outline" fullWidth>Details</Button>
                </Link>
                <Button className="flex-1">Apply Now</Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
