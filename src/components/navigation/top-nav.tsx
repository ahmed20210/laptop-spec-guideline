import Link from "next/link";
import { ThemeToggle } from "@/components/navigation/theme-toggle";
import { BrandLogo } from "@/components/navigation/brand-logo";

const links = [
  { href: "/", label: "Home | الرئيسية" },
  { href: "/interactive", label: "Interactive | الدليل التفاعلي" },
  { href: "/knowledge", label: "Knowledge | القاعدة المعرفية" },
  { href: "/use-cases", label: "Use Cases | الاستخدامات" },
  { href: "/compare", label: "Compare | المقارنة" },
  { href: "/checklist", label: "Checklist | التحقق" }
];

export function TopNav(): JSX.Element {
  return (
    <header className="sticky top-0 z-20 border-b border-cyan-100/40 bg-gradient-to-r from-slate-900 via-cyan-950 to-slate-900/95 backdrop-blur-lg dark:border-slate-700/70">
      <nav className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-6 py-4 text-sm">
        <Link href="/" className="flex items-center gap-2 text-base font-bold tracking-[0.06em] text-white">
          <BrandLogo size={34} className="rounded-md" />
          <span className="hidden sm:inline">Laptop Spec Advisor | مستشار مواصفات اللابتوب</span>
          <span className="sm:hidden">LSA</span>
        </Link>
        <ul className="flex flex-wrap items-center gap-2">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="rounded-full border border-transparent px-3 py-1 text-slate-100 transition hover:border-cyan-200/40 hover:bg-cyan-400/10 hover:text-white"
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <ThemeToggle />
          </li>
        </ul>
      </nav>
    </header>
  );
}
