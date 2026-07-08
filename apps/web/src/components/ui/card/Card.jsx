import { cn } from "@/utils/cn";

function Card({ className = "", children, ...props }) {
  return (
    <div
      className={cn(
        "rounded-xl border border-neutral-200 bg-white shadow-sm",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

function CardHeader({ className = "", children, ...props }) {
  return (
    <div className={cn("flex flex-col gap-1 p-6", className)} {...props}>
      {children}
    </div>
  );
}

function CardTitle({ className = "", children, ...props }) {
  return (
    <h3
      className={cn("text-lg font-semibold text-neutral-900", className)}
      {...props}
    >
      {children}
    </h3>
  );
}

function CardDescription({ className = "", children, ...props }) {
  return (
    <p className={cn("text-sm text-neutral-600", className)} {...props}>
      {children}
    </p>
  );
}

function CardContent({ className = "", children, ...props }) {
  return (
    <div className={cn("px-6 pb-6", className)} {...props}>
      {children}
    </div>
  );
}

function CardFooter({ className = "", children, ...props }) {
  return (
    <div
      className={cn(
        "flex items-center justify-between border-t border-neutral-200 px-6 py-4",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export { CardHeader, CardTitle, CardDescription, CardContent, CardFooter };
export default Card;
