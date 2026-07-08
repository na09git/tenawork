import { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Input = forwardRef(function Input(
  { className = "", error = false, ...props },
  ref,
) {
  return (
    <input
      ref={ref}
      className={cn(
        "w-full rounded-lg border border-neutral-300 bg-white px-3 py-2.5 text-sm text-neutral-900 shadow-sm outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-100 disabled:cursor-not-allowed disabled:bg-neutral-50",
        error && "border-error-500 focus:border-error-500 focus:ring-error-100",
        className,
      )}
      {...props}
    />
  );
});

export default Input;
