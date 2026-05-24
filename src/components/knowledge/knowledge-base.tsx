"use client";

import { useMemo, useState } from "react";
import { KnowledgeSection } from "@/types/domain";
import { Tabs } from "@/components/ui/tabs";
import { Accordion } from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";

interface KnowledgeBaseProps {
  sections: KnowledgeSection[];
}

export function KnowledgeBase({ sections }: KnowledgeBaseProps): JSX.Element {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const normalized = query.toLowerCase().trim();
    if (!normalized) return sections;

    return sections.filter(
      (section) =>
        section.title.toLowerCase().includes(normalized) ||
        section.overview.toLowerCase().includes(normalized) ||
        section.details.some((detail) => detail.toLowerCase().includes(normalized))
    );
  }, [query, sections]);

  const beginner = filtered.filter((item) => item.level === "beginner");
  const advanced = filtered.filter((item) => item.level !== "beginner");

  return (
    <div className="space-y-5">
      <label className="block">
        <span className="mb-2 block text-sm font-semibold">Search Topics | ابحث في المواضيع</span>
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Try: GPU, cache, DDR5 | مثال: GPU أو RAM"
          className="field-control"
        />
      </label>

      <Tabs
        items={[
          {
            id: "beginner",
            label: "Beginner | مبتدئ",
            content: (
              <Accordion
                items={beginner.map((section) => ({
                  id: section.id,
                  title: section.title,
                  content: (
                    <div className="space-y-3">
                      <p>{section.overview}</p>
                      <ul className="list-disc space-y-1 pl-5">
                        {section.details.map((detail) => (
                          <li key={detail}>{detail}</li>
                        ))}
                      </ul>
                    </div>
                  )
                }))}
              />
            )
          },
          {
            id: "advanced",
            label: "Intermediate + Advanced | متوسط + متقدم",
            content: (
              <Accordion
                items={advanced.map((section) => ({
                  id: section.id,
                  title: section.title,
                  content: (
                    <div className="space-y-3">
                      <p>{section.overview}</p>
                      <ul className="list-disc space-y-1 pl-5">
                        {section.details.map((detail) => (
                          <li key={detail}>{detail}</li>
                        ))}
                      </ul>
                    </div>
                  )
                }))}
              />
            )
          }
        ]}
      />

      {!filtered.length ? (
        <Card>
          <p className="text-sm text-slate-700 dark:text-slate-300">
            No topics matched your search. Try broader terms. | لا توجد نتائج مطابقة، جرب كلمات أوسع.
          </p>
        </Card>
      ) : null}
    </div>
  );
}
