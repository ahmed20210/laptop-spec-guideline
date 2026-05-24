import { BuyingChecklist } from "@/components/checklist/buying-checklist";

export default function ChecklistPage(): JSX.Element {
  return (
    <section className="space-y-4">
      <h1 className="font-[var(--font-heading)] text-3xl font-bold">Quick Checklist | قائمة التحقق السريعة</h1>
      <p className="text-slate-700 dark:text-slate-300">
        Final verification checklist before buying. Use this to avoid common spec mismatches and marketing traps.
        | قائمة تحقق نهائية قبل الشراء لتجنب أخطاء المواصفات والعروض التسويقية المضللة.
      </p>
      <BuyingChecklist />
    </section>
  );
}
