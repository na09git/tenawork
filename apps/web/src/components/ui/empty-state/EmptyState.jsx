import { Inbox } from "lucide-react";
import Button from "@/components/ui/button/Button";
import { cn } from "@/utils/cn";

function EmptyState({
  title = "No items yet",
  description = "Nothing is available right now. Try again soon.",
  actionLabel,
  onAction,
  className = "",
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-xl border border-dashed border-neutral-300 bg-neutral-50 px-8 py-12 text-center",
        className,
      )}
    >
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm">
        <Inbox className="h-6 w-6 text-neutral-500" />
      </div>
      <h3 className="text-lg font-semibold text-neutral-900">{title}</h3>
      <p className="mt-2 max-w-md text-sm text-neutral-600">{description}</p>
      {actionLabel ? (
        <Button className="mt-6" onClick={onAction}>
          {actionLabel}
        </Button>
      ) : null}
    </div>
  );
}

export default EmptyState;
