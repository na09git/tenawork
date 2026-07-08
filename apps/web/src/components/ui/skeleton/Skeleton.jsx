import { cn } from "@/utils/cn";

function Skeleton({ className = "", ...props }) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-neutral-200", className)}
      {...props}
    />
  );
}

export default Skeleton;
