import { UseCaseGrid } from "@/components/use-cases/use-case-grid";
import { getUseCases } from "@/lib/data/guide-repository";

export default function UseCasesPage(): JSX.Element {
  const useCases = getUseCases();

  return (
    <section className="space-y-4">
      <h1 className="font-[var(--font-heading)] text-3xl font-bold">Use Cases | حالات الاستخدام</h1>
      <p className="text-slate-700 dark:text-slate-300">
        Browse workload-specific cards with minimum and recommended specs. Filter by budget and search by topic.
        | تصفح بطاقات الاستخدام مع الحد الأدنى والموصى به، مع فلترة حسب الميزانية والموضوع.
      </p>
      <UseCaseGrid useCases={useCases} />
    </section>
  );
}
