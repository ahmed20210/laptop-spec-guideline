"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";

const checklistItems = [
  "Confirm your primary workload (office, development, AI, gaming, design). | حدد استخدامك الأساسي (مكتبي، برمجة، ذكاء اصطناعي، ألعاب، تصميم).",
  "Set realistic minimum RAM and storage from your workflow, not marketing labels. | حدد حدًا أدنى واقعيًا للرام والتخزين حسب عملك.",
  "Verify GPU tier and TGP for dedicated graphics laptops. | تحقق من فئة كرت الشاشة وقيمة TGP.",
  "Check CPU suffix (U, P, H, HX) against your battery vs performance priority. | راجع لاحقة المعالج وفق أولوية البطارية أو الأداء.",
  "Check whether RAM is upgradeable or soldered. | تأكد هل الذاكرة قابلة للترقية أم ملحومة.",
  "Validate screen quality (resolution, color coverage, refresh rate) for your use case. | راجع جودة الشاشة (الدقة، الألوان، معدل التحديث).",
  "Read thermal/noise and sustained performance reviews for the exact model. | راجع اختبارات الحرارة والضجيج والأداء المستمر لنفس الموديل.",
  "Compare warranty and service quality before final purchase. | قارن الضمان وجودة خدمة ما بعد البيع قبل الشراء."
];

export function BuyingChecklist(): JSX.Element {
  const [checked, setChecked] = useState<boolean[]>(checklistItems.map(() => false));
  const done = checked.filter(Boolean).length;

  return (
    <Card>
      <h2 className="font-[var(--font-heading)] text-2xl font-semibold">Pre-Purchase Checklist | قائمة قبل الشراء</h2>
      <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">
        Progress | التقدم: {done} / {checklistItems.length}
      </p>
      <ul className="mt-4 space-y-2">
        {checklistItems.map((item, index) => (
          <li key={item} className="flex items-start gap-3 rounded-lg border border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-900/70">
            <input
              id={`check-${index}`}
              type="checkbox"
              checked={checked[index]}
              onChange={(event) => {
                setChecked((prev) => {
                  const copy = [...prev];
                  copy[index] = event.target.checked;
                  return copy;
                });
              }}
              className="mt-1 h-4 w-4 rounded border-slate-300 dark:border-slate-600"
            />
            <label htmlFor={`check-${index}`} className="text-sm text-slate-700 dark:text-slate-300">
              {item}
            </label>
          </li>
        ))}
      </ul>
    </Card>
  );
}
