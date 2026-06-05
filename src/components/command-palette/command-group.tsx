'use client';

import type { CommandGroup as CommandGroupType } from '@/lib/command-palette/types';
import { CommandItem } from './command-item';

interface Props {
  group: CommandGroupType;
  selectedId: string | null;
  onItemClick: (item: CommandGroupType['items'][0]) => void;
}

export function CommandGroup({ group, selectedId, onItemClick }: Props) {
  if (!group.items.length) return null;
  return (
    <div role="group" aria-label={group.label}>
      <div className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
        {group.label}
      </div>
      {group.items.map((item) => (
        <CommandItem
          key={item.id}
          item={item}
          isSelected={item.id === selectedId}
          onClick={() => onItemClick(item)}
        />
      ))}
    </div>
  );
}
