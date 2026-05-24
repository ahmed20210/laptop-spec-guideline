import { PropsWithChildren } from "react";
import { cn } from "@/lib/utils";

interface CardProps extends PropsWithChildren {
  className?: string;
}

export function Card({ className, children }: CardProps): JSX.Element {
  return (
    <article
      className={cn(
        "rounded-2xl border border-slate-200/70 bg-[var(--surface)] p-5 shadow-soft backdrop-blur-md transition hover:-translate-y-0.5 dark:border-slate-700/60",
        className
      )}
    >
      {children}
    </article>
  );
}

export function CardTitle({ children, className }: CardProps): JSX.Element {
  return <h3 className={cn("text-lg font-semibold tracking-tight text-ink", className)}>{children}</h3>;
}

export function CardDescription({ children, className }: CardProps): JSX.Element {
  return <p className={cn("mt-2 text-sm leading-6 text-[var(--text-muted)]", className)}>{children}</p>;
}
