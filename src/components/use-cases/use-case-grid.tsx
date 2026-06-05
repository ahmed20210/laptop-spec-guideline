"use client";

import { useMemo, useState } from "react";
import { BudgetTier, UseCase } from "@/types/domain";
import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";

interface UseCaseGridProps {
  useCases: UseCase[];
}

export function UseCaseGrid({ useCases }: UseCaseGridProps): JSX.Element {
  const [budget, setBudget] = useState<BudgetTier | "all">("all");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return useCases.filter((item) => {
      const budgetMatch = budget === "all" || item.budgetTier === budget;
      const q = search.toLowerCase().trim();
      const textMatch =
        !q ||
        item.nameEn.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.tags.some((tag) => tag.includes(q));
      return budgetMatch && textMatch;
    });
  }, [budget, search, useCases]);

  return (
    <div className="space-y-5">
      <div className="section-shell grid gap-3 sm:grid-cols-2">
        <label className="space-y-2">
          <span className="text-sm font-semibold">Filter by Budget | فلترة حسب الميزانية</span>
          <select
            value={budget}
            onChange={(event) => setBudget(event.target.value as BudgetTier | "all")}
            className="field-control"
          >
            <option value="all">All budgets | كل الميزانيات</option>
            <option value="entry">Entry | اقتصادية</option>
            <option value="mid">Mid | متوسطة</option>
            <option value="high">High | عالية</option>
            <option value="premium">Premium | احترافية</option>
          </select>
        </label>

        <label className="space-y-2">
          <span className="text-sm font-semibold">Search by keyword | بحث بالكلمات</span>
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="ai, gaming, office | ذكاء، ألعاب، برمجة"
            className="field-control"
          />
        </label>
      </div>

      <div className="grid-cards">
        {filtered.map((useCase) => (
          <Card key={useCase.id} className="border-cyan-100/80 bg-white/90 dark:border-cyan-900/40 dark:bg-slate-900/75">
            <div className="flex items-center justify-between gap-3">
              <CardTitle>{useCase.nameEn}</CardTitle>
              <Badge tone="accent">{useCase.budgetTier}</Badge>
            </div>
            <CardDescription className="text-slate-700 dark:text-gray-00">{useCase.description}</CardDescription>

            <div className="mt-4 space-y-2 rounded-xl border border-slate-200/80 bg-slate-50/80 p-3 text-sm text-slate-700 dark:border-slate-700 dark:bg-slate-800/60 dark:text-slate-300">
              <h4 className="font-semibold text-ink">Minimum | الحد الأدنى</h4>
              <p>CPU: {useCase.minimum.cpu}</p>
              <p>RAM: {useCase.minimum.ram}</p>
              <p>GPU: {useCase.minimum.gpu}</p>
              <p>Storage: {useCase.minimum.storage}</p>
            </div>

            <div className="mt-4 space-y-2 rounded-xl border border-cyan-100 bg-cyan-50/60 p-3 text-sm text-slate-700 dark:border-cyan-900/40 dark:bg-cyan-950/25 dark:text-slate-300">
              <h4 className="font-semibold text-ink">Recommended | الموصى به</h4>
              <p>CPU: {useCase.recommended.cpu}</p>
              <p>RAM: {useCase.recommended.ram}</p>
              <p>GPU: {useCase.recommended.gpu}</p>
              <p>Storage: {useCase.recommended.storage}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
