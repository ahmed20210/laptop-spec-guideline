"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface TabItem {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface TabsProps {
  items: TabItem[];
  defaultTab?: string;
}

export function Tabs({ items, defaultTab }: TabsProps): JSX.Element {
  const [active, setActive] = useState(defaultTab ?? items[0]?.id);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2" role="tablist">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            id={`tab-${item.id}`}
            aria-selected={active === item.id}
            aria-controls={`tabpanel-${item.id}`}
            onClick={() => setActive(item.id)}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-medium transition",
              active === item.id
                ? "border-ocean bg-ocean text-white"
                : "border-slate-300 bg-white text-slate-700 hover:border-ocean dark:border-slate-600 dark:bg-slate-900 dark:text-slate-200"
            )}
          >
            {item.label}
          </button>
        ))}
      </div>

      {items.map((item) =>
        item.id === active ? (
          <section key={item.id} className="animate-rise">
            {item.content}
          </section>
        ) : null
      )}
    </div>
  );
}
