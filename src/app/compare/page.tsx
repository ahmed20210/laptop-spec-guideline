import { ComparisonTool } from "@/components/compare/comparison-tool";
import { getComparisonConfigs } from "@/lib/data/guide-repository";

export default function ComparePage(): JSX.Element {
  const configs = getComparisonConfigs();

  return (
    <section className="space-y-4 animate-rise">
      <div className="section-shell">
        <h1 className="font-[var(--font-heading)] text-3xl font-bold headline-gradient">Comparison Tool | أداة المقارنة</h1>
        <p className="mt-2 text-slate-700 dark:text-slate-300">
          Compare up to three configuration profiles and quickly identify CPU, RAM, GPU, and storage differences.
          | قارن حتى ثلاثة تكوينات واكتشف فروقات المعالج والذاكرة وكرت الشاشة والتخزين بسرعة.
        </p>
      </div>
      <ComparisonTool options={configs} />
    </section>
  );
}
