"use client";
import Link from "next/link";
import { ThemeToggle } from "@/components/navigation/theme-toggle";
import { BrandLogo } from "@/components/navigation/brand-logo";
import { CommandPalette } from "@/components/command-palette/command-palette";
import  useCommandPalette from "@/hooks/useCommandPalette";
import { Kbd } from "@/components/ui/kbd"; // optional: we can define a simple kbd

const links = [
  { href: "/", label: "Home | الرئيسية" },
  { href: "/interactive", label: "Interactive | الدليل التفاعلي" },
  { href: "/knowledge", label: "Knowledge | القاعدة المعرفية" },
  { href: "/use-cases", label: "Use Cases | الاستخدامات" },
  { href: "/compare", label: "Compare | المقارنة" },
  { href: "/checklist", label: "Checklist | التحقق" }
];

export function TopNav(): JSX.Element {
  const { open, toggle, close } = useCommandPalette();

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-white/10 bg-gradient-to-r from-slate-900/90 via-cyan-950/90 to-slate-900/90 backdrop-blur-xl dark:border-slate-700/50">
        <nav
          role="navigation"
          aria-label="Main navigation"
          className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-6 py-3 text-sm"
        >
          <Link href="/" className="group flex items-center gap-2 text-base font-bold tracking-[0.06em] text-white">
            <BrandLogo size={34} className="rounded-lg transition-transform duration-300 group-hover:scale-110" />
            <span className="hidden sm:inline bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">Laptop Spec Advisor | مستشار مواصفات اللابتوب</span>
            <span className="sm:hidden">LSA</span>
          </Link>
          <ul className="flex flex-wrap items-center gap-1.5">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="relative rounded-full px-3 py-1.5 text-slate-200 transition-all duration-200 hover:bg-white/10 hover:text-white hover:shadow-[0_0_15px_rgba(20,184,166,0.3)] active:scale-95"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="ml-2">
              <ThemeToggle />
            </li>
            <li>
              <button
                onClick={toggle}
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-slate-200 hover:bg-white/10 hover:text-white transition-all duration-200"
                aria-label="Open command palette (Cmd+K)"
              >
                <span>⌘</span>
                <span className="hidden sm:inline text-xs font-medium">K</span>
              </button>
            </li>
          </ul>
        </nav>
      </header>
      {open && <CommandPalette onClose={close} />}
    </>
  );
}
      
