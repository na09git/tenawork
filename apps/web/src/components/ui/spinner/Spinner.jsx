import { Loader2 } from "lucide-react";
import { cn } from "@/utils/cn";

const sizeClasses = {
  sm: "h-4 w-4",
  md: "h-6 w-6",
  lg: "h-8 w-8",
};

function Spinner({ className = "", size = "md" }) {
  return (
    <Loader2
      className={cn(
        "animate-spin text-primary-600",
        sizeClasses[size],
        className,
      )}
    />
  );
}

export default Spinner;
