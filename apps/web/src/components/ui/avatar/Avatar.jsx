import { cn } from "@/utils/cn";

const sizeClasses = {
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-12 w-12 text-base",
};

function Avatar({
  className = "",
  src,
  alt = "",
  name = "",
  size = "md",
  ...props
}) {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div
      className={cn(
        "flex items-center justify-center overflow-hidden rounded-full bg-neutral-200 font-semibold text-neutral-700",
        sizeClasses[size],
        className,
      )}
      {...props}
    >
      {src ? (
        <img src={src} alt={alt} className="h-full w-full object-cover" />
      ) : (
        initials || "U"
      )}
    </div>
  );
}

export default Avatar;
