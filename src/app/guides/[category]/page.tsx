import { notFound } from 'next/navigation';
import { getCategoryGuide, getGuideCategories, type GuideCategory } from '@/lib/data/guide-repository';
import type { SpecProfile } from '@/types/domain';

export async function generateStaticParams() {
  const categories = getGuideCategories();
  return categories.map((slug) => ({ category: slug }));
}

export default function GuideCategoryPage({ params }: { params: { category: string } }) {
  const { category } = params;
  const guide: GuideCategory | undefined = getCategoryGuide(category);

  if (!guide) {
    notFound();
  }

  return (
    <article className="space-y-8 animate-rise">
      <header className="space-y-2">
        <h1 className="font-[var(--font-heading)] text-3xl font-bold">
          {guide.nameEn} &mdash; {guide.nameAr}
        </h1>
        <p className="text-lg text-slate-700 dark:text-slate-300">{guide.description}</p>
      </header>

      <section className="space-y-2">
        <h2 className="font-[var(--font-heading)] text-2xl font-semibold">
          What This Use Case Covers | يغطي هذا الاستخدام
        </h2>
        <ul className="list-disc list-inside space-y-1 text-slate-800 dark:text-slate-200">
          {guide.compatibleTasks.map((task, idx) => (
            <li key={idx}>{task}</li>
          ))}
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className="font-[var(--font-heading)] text-2xl font-semibold">Priorities | الأولويات</h2>
        <ul className="list-disc list-inside space-y-1 text-slate-800 dark:text-slate-200">
          {guide.priorities.map((p, idx) => (
            <li key={idx}>{p}</li>
          ))}
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className="font-[var(--font-heading)] text-2xl font-semibold">Avoid | تجنب</h2>
        <ul className="list-disc list-inside space-y-1 text-slate-800 dark:text-slate-200">
          {guide.avoid.map((a, idx) => (
            <li key={idx}>{a}</li>
          ))}
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="font-[var(--font-heading)] text-2xl font-semibold">
          Minimum Specifications | الحد الأدنى
        </h2>
        <SpecDisplay profile={guide.minimum} />
      </section>

      <section className="space-y-3">
        <h2 className="font-[var(--font-heading)] text-2xl font-semibold">
          Recommended Specifications | الموصى به
        </h2>
        <SpecDisplay profile={guide.recommended} />
      </section>
    </article>
  );
}

function SpecDisplay({ profile }: { profile: SpecProfile }) {
  return (
    <div className="rounded-xl bg-white/60 dark:bg-slate-800/80 p-5 shadow-soft backdrop-blur-sm ring-1 ring-slate-200 dark:ring-slate-700">
      <dl className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        <div>
          <dt className="font-semibold text-slate-600 dark:text-slate-400">CPU</dt>
          <dd className="text-slate-900 dark:text-slate-100">{profile.cpu || '—'}</dd>
        </div>
        <div>
          <dt className="font-semibold text-slate-600 dark:text-slate-400">RAM</dt>
          <dd className="text-slate-900 dark:text-slate-100">{profile.ram || '—'}</dd>
        </div>
        <div>
          <dt className="font-semibold text-slate-600 dark:text-slate-400">GPU</dt>
          <dd className="text-slate-900 dark:text-slate-100">{profile.gpu || '—'}</dd>
        </div>
        <div>
          <dt className="font-semibold text-slate-600 dark:text-slate-400">Storage</dt>
          <dd className="text-slate-900 dark:text-slate-100">{profile.storage || '—'}</dd>
        </div>
      </dl>
      {profile.notes.length > 0 && (
        <div className="mt-4 border-t border-slate-200 dark:border-slate-700 pt-3">
          <p className="font-semibold text-slate-600 dark:text-slate-400 mb-1">Notes / Notes</p>
          <ul className="list-disc list-inside space-y-1 text-sm text-slate-700 dark:text-slate-300">
            {profile.notes.map((note, i) => (
              <li key={i}>{note}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
