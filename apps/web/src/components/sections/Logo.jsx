/**
 * Logo - Displays organization/brand logos
 */
export default function Logo({ name, className = "h-12 w-auto" }) {
  // Placeholder SVG logos for healthcare organizations
  const logos = {
    Hospital: (
      <svg viewBox="0 0 100 100" className={className}>
        <rect
          x="20"
          y="20"
          width="60"
          height="60"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          rx="4"
        />
        <line
          x1="40"
          y1="20"
          x2="40"
          y2="80"
          stroke="currentColor"
          strokeWidth="2"
        />
        <line
          x1="60"
          y1="20"
          x2="60"
          y2="80"
          stroke="currentColor"
          strokeWidth="2"
        />
        <line
          x1="20"
          y1="40"
          x2="80"
          y2="40"
          stroke="currentColor"
          strokeWidth="2"
        />
        <line
          x1="20"
          y1="60"
          x2="80"
          y2="60"
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>
    ),
    Clinic: (
      <svg viewBox="0 0 100 100" className={className}>
        <path
          d="M 30 70 L 30 20 Q 30 10 40 10 L 60 10 Q 70 10 70 20 L 70 70"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
        <rect
          x="35"
          y="30"
          width="10"
          height="15"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
        <rect
          x="55"
          y="30"
          width="10"
          height="15"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
        <rect
          x="35"
          y="50"
          width="10"
          height="15"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
        <rect
          x="55"
          y="50"
          width="10"
          height="15"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
        <line
          x1="20"
          y1="70"
          x2="80"
          y2="70"
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>
    ),
    NGO: (
      <svg viewBox="0 0 100 100" className={className}>
        <circle
          cx="50"
          cy="40"
          r="20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          d="M 35 65 Q 50 75 65 65"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
        <circle
          cx="35"
          cy="50"
          r="8"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
        <circle
          cx="65"
          cy="50"
          r="8"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>
    ),
    University: (
      <svg viewBox="0 0 100 100" className={className}>
        <polygon
          points="50,10 10,40 10,80 90,80 90,40"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
        <line
          x1="50"
          y1="10"
          x2="50"
          y2="50"
          stroke="currentColor"
          strokeWidth="2"
        />
        <rect
          x="20"
          y="45"
          width="15"
          height="20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
        <rect
          x="65"
          y="45"
          width="15"
          height="20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>
    ),
    HealthCenter: (
      <svg viewBox="0 0 100 100" className={className}>
        <rect
          x="20"
          y="30"
          width="60"
          height="50"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          rx="4"
        />
        <line
          x1="45"
          y1="20"
          x2="45"
          y2="80"
          stroke="currentColor"
          strokeWidth="2"
        />
        <line
          x1="15"
          y1="55"
          x2="85"
          y2="55"
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>
    ),
  };

  return (
    <div className="inline-flex items-center justify-center text-neutral-600">
      {logos[name] || <span className="text-sm font-medium">{name}</span>}
    </div>
  );
}
