"use client";

import { ComparisonConfig } from "@/types/domain";
import { Card, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useComparison } from "@/hooks/useComparison";

interface ComparisonToolProps {
  options: ComparisonConfig[];
}

export function ComparisonTool({ options }: ComparisonToolProps): JSX.Element {
  const { selected, first, second, third, setFirst, setSecond, setThird } = useComparison(options);

  const rows = [
    { key: "cpu", label: "CPU | المعالج" },
    { key: "ram", label: "RAM | الذاكرة" },
    { key: "gpu", label: "GPU | كرت الشاشة" },
    { key: "storage", label: "Storage | التخزين" }
  ] as const;

  return (
    <div className="space-y-6">
      <div className="section-shell grid gap-3 sm:grid-cols-3">
        {[first, second, third].map((value, index) => (
          <label key={index} className="space-y-2">
            <span className="text-sm font-semibold">Configuration {index + 1} | التكوين {index + 1}</span>
            <select
              value={value}
              onChange={(event) => {
                const setter = [setFirst, setSecond, setThird][index];
                setter(event.target.value);
              }}
              className="field-control"
            >
              {options.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        ))}
      </div>

      <Card className="border-cyan-100/80 bg-white/90 dark:border-cyan-900/40 dark:bg-slate-900/75">
        <CardTitle>Side-by-Side Difference Table | جدول الفروقات</CardTitle>
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full border-collapse text-sm">
            <thead>
              <tr>
                <th className="border-b border-slate-200 bg-slate-50 p-2 text-left dark:border-slate-700 dark:bg-slate-800">Spec | المواصفة</th>
                {selected.map((item) => (
                  <th key={item.id} className="border-b border-slate-200 bg-slate-50 p-2 text-left dark:border-slate-700 dark:bg-slate-800">
                    <div className="flex items-center gap-2">
                      {item.label}
                      <Badge tone={item.category === "recommended" ? "accent" : "neutral"}>{item.category}</Badge>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.key}>
                  <td className="border-b border-slate-100 bg-slate-50/60 p-2 font-semibold dark:border-slate-700 dark:bg-slate-800/70">
                    {row.label}
                  </td>
                  {selected.map((item) => (
                    <td key={`${item.id}-${row.key}`} className="border-b border-slate-100 p-2 text-slate-700 dark:border-slate-700 dark:text-slate-300">
                      {item.profile[row.key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
