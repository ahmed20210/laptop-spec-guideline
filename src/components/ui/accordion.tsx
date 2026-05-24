"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
}

export function Accordion({ items }: AccordionProps): JSX.Element {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);

  return (
    <div className="space-y-3">
      {items.map((item) => {
        const open = openId === item.id;
        return (
          <div key={item.id} className="overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900/80">
            <button
              type="button"
              onClick={() => setOpenId(open ? null : item.id)}
              className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-semibold text-ink dark:text-slate-100"
            >
              {item.title}
              <span className={cn("transition", open ? "rotate-180" : "rotate-0")}>⌄</span>
            </button>
            {open ? (
              <div className="border-t border-slate-100 px-4 py-3 text-sm text-slate-700 dark:border-slate-700 dark:text-slate-300">
                {item.content}
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
