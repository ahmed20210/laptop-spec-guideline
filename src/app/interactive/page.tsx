import { RecommendationWizard } from "@/components/interactive/recommendation-wizard";
import { getUseCases } from "@/lib/data/guide-repository";

export default function InteractivePage(): JSX.Element {
  const useCases = getUseCases();

  return (
    <section className="space-y-4">
      <h1 className="font-[var(--font-heading)] text-3xl font-bold">Interactive Guide Wizard | الدليل التفاعلي</h1>
      <p className="text-slate-700 dark:text-slate-300">
        Answer four quick questions and the decision engine will map your preferences to a recommendation sourced from
        your JSON rules. | اجب عن أربع أسئلة سريعة ليقترح النظام المواصفات الأنسب من قواعد JSON.
      </p>
      <RecommendationWizard useCases={useCases} />
    </section>
  );
}
