import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { getGuideOverview, getQuickShortcuts, getUseCases } from "@/lib/data/guide-repository";
import { BrandLogo } from "@/components/navigation/brand-logo";

const categoryIcons: Record<string, string> = {
  "Browsing & Office": "💼",
  "Full-Stack Development": "💻",
  "AI Development": "🤖",
  "Design & Video Editing": "🎨",
  "Gaming & 3D": "🎮"
};

export default function HomePage(): JSX.Element {
  const overview = getGuideOverview();
  const shortcuts = getQuickShortcuts();
  const useCases = getUseCases();

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950">
      {/* Background Image & Creative Overlays */}
      <div className="absolute inset-0 z-0">
        <div
          className="h-full w-full bg-cover bg-center opacity-60"
          style={{ backgroundImage: "url('/assets/laptop-bg.png')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/95 via-slate-900/85 to-slate-950/95 backdrop-blur-sm" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-cyan-500/20 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-emerald-500/15 via-transparent to-transparent" />
        
        {/* Floating Orbs for Depth */}
        <div className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-cyan-400/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-emerald-400/15 blur-3xl" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 mx-auto max-w-6xl space-y-12 px-4 py-12 sm:px-6 sm:py-16 animate-rise">
        {/* Hero Section */}
        <section className="rounded-3xl border border-white/10 bg-white/5 p-8 text-white shadow-2xl backdrop-blur-xl sm:p-12">
          <div className="flex items-center gap-3">
            <BrandLogo size={52} className="rounded-lg" />
            <Badge tone="accent">Version {overview.version} | الإصدار</Badge>
          </div>
          <h1 className="mt-6 font-[var(--font-heading)] text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-white to-emerald-300 sm:text-6xl">
            Laptop Specification Reference System
            <br />
            <span className="text-2xl sm:text-4xl text-white/80">نظام مرجعي لمواصفات اللابتوب</span>
          </h1>
          <p className="mt-6 max-w-3xl text-lg text-slate-200/90 leading-relaxed">{overview.purpose}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/interactive"
              className="group relative inline-flex items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-emerald-500 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/25 transition-all hover:scale-105 hover:shadow-cyan-400/40"
            >
              Start Interactive Guide | ابدأ الدليل التفاعلي
            </Link>
            <Link
              href="/compare"
              className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-8 py-3 text-sm font-semibold text-white backdrop-blur-md transition-all hover:bg-white/20 hover:scale-105"
            >
              Compare Configurations | قارن التكوينات
            </Link>
          </div>
        </section>

        {/* Categories Grid */}
        <section className="space-y-6">
          <h2 className="font-[var(--font-heading)] text-3xl font-semibold text-white/90">
            Browse by Category <span className="text-cyan-400">|</span> تصفح حسب الفئة
          </h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {useCases.map((useCase) => (
              <Link key={useCase.id} href={`/guides/${useCase.id}`} className="group block">
                <div className="h-full rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/30 hover:bg-white/10 hover:shadow-lg hover:shadow-cyan-500/10">
                  <div className="flex items-start gap-4">
                    <span className="text-3xl" role="img" aria-label={useCase.nameEn}>
                      {categoryIcons[useCase.nameEn] ?? "📦"}
                    </span>
                    <div>
                      <h3 className="text-lg font-semibold text-white group-hover:text-cyan-300 transition-colors">{useCase.nameEn}</h3>
                      <p className="mt-2 text-sm text-slate-300/80">{useCase.description}</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Shortcuts Grid */}
        <section className="space-y-6">
          <h2 className="font-[var(--font-heading)] text-3xl font-semibold text-white/90">
            Quick Decision Shortcuts <span className="text-emerald-400">|</span> اختصارات قرار سريعة
          </h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {shortcuts.map((shortcut) => (
              <div key={shortcut.title} className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md transition-all hover:bg-white/10 hover:-translate-y-1">
                <h3 className="text-lg font-semibold text-white">{shortcut.title}</h3>
                <p className="mt-2 text-sm text-slate-300/80">{shortcut.summary}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
