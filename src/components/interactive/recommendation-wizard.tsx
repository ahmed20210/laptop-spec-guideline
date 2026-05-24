"use client";

import { useMemo, useState } from "react";
import { recommendSpecs } from "@/lib/decision/decision-engine";
import { RecommendationInput, UseCase } from "@/types/domain";
import { Stepper } from "@/components/ui/stepper";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface RecommendationWizardProps {
  useCases: UseCase[];
}

const steps = ["Use Case | الاستخدام", "Budget | الميزانية", "Priority | الأولوية", "Mobility | التنقل"];

export function RecommendationWizard({ useCases }: RecommendationWizardProps): JSX.Element {
  const [input, setInput] = useState<RecommendationInput>({
    useCaseId: useCases[0]?.id ?? "",
    budgetTier: "mid",
    priority: "balanced",
    mobility: "balanced"
  });

  const recommendation = useMemo(() => recommendSpecs(input), [input]);

  return (
    <div className="space-y-6">
      <Stepper steps={steps} currentIndex={3} />

      <div className="section-shell grid gap-4 md:grid-cols-2">
        <label className="space-y-2">
          <span className="text-sm font-semibold">Use Case | نوع الاستخدام</span>
          <select
            value={input.useCaseId}
            onChange={(event) => setInput((prev) => ({ ...prev, useCaseId: event.target.value }))}
            className="field-control"
          >
            {useCases.map((useCase) => (
              <option key={useCase.id} value={useCase.id}>
                {useCase.nameEn}
              </option>
            ))}
          </select>
        </label>

        <label className="space-y-2">
          <span className="text-sm font-semibold">Budget Tier | فئة الميزانية</span>
          <select
            value={input.budgetTier}
            onChange={(event) =>
              setInput((prev) => ({ ...prev, budgetTier: event.target.value as RecommendationInput["budgetTier"] }))
            }
            className="field-control"
          >
            <option value="entry">Entry | اقتصادية</option>
            <option value="mid">Mid | متوسطة</option>
            <option value="high">High | عالية</option>
            <option value="premium">Premium | احترافية</option>
          </select>
        </label>

        <label className="space-y-2">
          <span className="text-sm font-semibold">Priority | الأولوية</span>
          <select
            value={input.priority}
            onChange={(event) =>
              setInput((prev) => ({ ...prev, priority: event.target.value as RecommendationInput["priority"] }))
            }
            className="field-control"
          >
            <option value="battery">Battery Life | البطارية</option>
            <option value="balanced">Balanced | متوازن</option>
            <option value="performance">Performance | الأداء</option>
          </select>
        </label>

        <label className="space-y-2">
          <span className="text-sm font-semibold">Mobility | قابلية التنقل</span>
          <select
            value={input.mobility}
            onChange={(event) =>
              setInput((prev) => ({ ...prev, mobility: event.target.value as RecommendationInput["mobility"] }))
            }
            className="field-control"
          >
            <option value="portable">Portable | محمول</option>
            <option value="balanced">Balanced | متوازن</option>
            <option value="desktop-replacement">Desktop Replacement | بديل مكتبي</option>
          </select>
        </label>
      </div>

      <Card className="animate-rise border-cyan-100/70 bg-white/90 dark:border-cyan-900/40 dark:bg-slate-900/75">
        <div className="flex items-center justify-between gap-3">
          <CardTitle>Recommended Configuration | المواصفات المقترحة</CardTitle>
          <Badge tone="accent">{recommendation.sourceUseCase.nameEn}</Badge>
        </div>
        <div className="mt-4 grid gap-3 rounded-2xl border border-cyan-100/70 bg-cyan-50/60 p-4 sm:grid-cols-2 dark:border-cyan-900/40 dark:bg-cyan-950/25">
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">CPU</h4>
            <p className="text-sm text-slate-800 dark:text-slate-100">{recommendation.profile.cpu}</p>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">RAM</h4>
            <p className="text-sm text-slate-800 dark:text-slate-100">{recommendation.profile.ram}</p>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">GPU</h4>
            <p className="text-sm text-slate-800 dark:text-slate-100">{recommendation.profile.gpu}</p>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Storage</h4>
            <p className="text-sm text-slate-800 dark:text-slate-100">{recommendation.profile.storage}</p>
          </div>
        </div>

        <CardDescription className="mt-4">
          This result is generated directly from your structured JSON plus deterministic rule tuning.
          | النتيجة مبنية مباشرة من ملف JSON مع قواعد توصية واضحة.
        </CardDescription>

        <div className="mt-4 space-y-2 text-sm text-slate-700 dark:text-slate-300">
          <h4 className="font-semibold text-ink">Reasoning | سبب التوصية</h4>
          <ul className="list-disc space-y-1 pl-5">
            {recommendation.reasoning.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </div>
      </Card>
    </div>
  );
}
