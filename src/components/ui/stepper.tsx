import { cn } from "@/lib/utils";

interface StepperProps {
  steps: string[];
  currentIndex: number;
}

export function Stepper({ steps, currentIndex }: StepperProps): JSX.Element {
  return (
    <ol className="grid gap-3 sm:grid-cols-4">
      {steps.map((step, index) => {
        const state = index < currentIndex ? "done" : index === currentIndex ? "active" : "idle";
        return (
          <li
            key={step}
            className={cn(
              "rounded-xl border px-3 py-2 text-sm",
              state === "done" && "border-ocean bg-ocean/10 text-ocean",
              state === "active" && "border-ember bg-ember/10 text-ember",
              state === "idle" && "border-slate-200 bg-white text-slate-500 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-300"
            )}
          >
            <span className="mr-2 font-semibold">{index + 1}.</span>
            {step}
          </li>
        );
      })}
    </ol>
  );
}
