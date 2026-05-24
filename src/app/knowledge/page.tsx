import { KnowledgeBase } from "@/components/knowledge/knowledge-base";
import { getKnowledgeSections } from "@/lib/data/guide-repository";

export default function KnowledgePage(): JSX.Element {
  const sections = getKnowledgeSections();

  return (
    <section className="space-y-4">
      <h1 className="font-[var(--font-heading)] text-3xl font-bold">Technical Knowledge Base | القاعدة المعرفية</h1>
      <p className="text-slate-700 dark:text-slate-300">
        Structured explanations from beginner to advanced topics, designed for both quick learning and deep comparison.
        | شروحات منظمة من المبتدئ إلى المتقدم للتعلم السريع والمقارنة العميقة.
      </p>
      <KnowledgeBase sections={sections} />
    </section>
  );
}
