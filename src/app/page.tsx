import Link from "next/link";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getGuideOverview, getQuickShortcuts } from "@/lib/data/guide-repository";
import { BrandLogo } from "@/components/navigation/brand-logo";

export default function HomePage(): JSX.Element {
  const overview = getGuideOverview();
  const shortcuts = getQuickShortcuts();

  return (
    <div className="space-y-8 animate-rise">
      <section className="relative overflow-hidden rounded-3xl border border-cyan-100/50 bg-gradient-to-br from-slate-900 via-cyan-950 to-emerald-950 p-8 text-white shadow-soft">
        <div className="pointer-events-none absolute -right-14 -top-14 h-52 w-52 rounded-full bg-cyan-300/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 left-10 h-56 w-56 rounded-full bg-emerald-300/15 blur-3xl" />
        <div className="flex items-center gap-3">
          <BrandLogo size={52} className="rounded-lg" />
          <Badge tone="accent">Version {overview.version} | الإصدار</Badge>
        </div>
        <h1 className="mt-4 font-[var(--font-heading)] text-4xl font-bold tracking-tight sm:text-5xl">
          Laptop Specification Reference System | نظام مرجعي لمواصفات اللابتوب
        </h1>
        <p className="mt-4 max-w-3xl text-slate-200">{overview.purpose}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/interactive"
            className="rounded-full bg-gradient-to-r from-cyan-500 to-emerald-500 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-cyan-900/20"
          >
            Start Interactive Guide | ابدأ الدليل التفاعلي
          </Link>
          <Link
            href="/compare"
            className="rounded-full border border-white/30 bg-white/10 px-5 py-2 text-sm font-semibold backdrop-blur"
          >
            Compare Configurations | قارن التكوينات
          </Link>
        </div>
      </section>

      <section className="section-shell space-y-4">
        <h2 className="font-[var(--font-heading)] text-2xl font-semibold headline-gradient">
          Quick Decision Shortcuts | اختصارات قرار سريعة
        </h2>
        <div className="grid-cards">
          {shortcuts.map((shortcut) => (
            <Card key={shortcut.title} className="border-cyan-100/70 bg-white/85">
              <CardTitle>{shortcut.title}</CardTitle>
              <CardDescription>{shortcut.summary}</CardDescription>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
