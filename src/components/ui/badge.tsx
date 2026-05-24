import { PropsWithChildren } from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends PropsWithChildren {
  tone?: "neutral" | "accent" | "warning";
}

export function Badge({ tone = "neutral", children }: BadgeProps): JSX.Element {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold",
        tone === "neutral" && "border-slate-200 bg-slate-100/80 text-slate-700 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200",
        tone === "accent" && "border-cyan-200 bg-cyan-100/90 text-cyan-800 dark:border-cyan-800 dark:bg-cyan-900/40 dark:text-cyan-200",
        tone === "warning" && "border-amber-200 bg-amber-100/90 text-amber-800 dark:border-amber-700 dark:bg-amber-900/40 dark:text-amber-200"
      )}
    >
      {children}
    </span>
  );
}
