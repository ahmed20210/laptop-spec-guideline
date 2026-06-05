'use client';

import { cn } from '@/lib/utils';
import type { CommandItem as CommandItemType } from '@/lib/command-palette/types';

interface Props {
  item: CommandItemType;
  isSelected: boolean;
  onClick: () => void;
}

export function CommandItem({ item, isSelected, onClick }: Props) {
  return (
    <div
      role="option"
      aria-selected={isSelected}
      onClick={onClick}
      className={cn(
        'flex items-center gap-3 px-4 py-2 cursor-pointer rounded-lg transition-colors',
        isSelected ? 'bg-ocean/10 text-ocean' : 'hover:bg-slate-100 dark:hover:bg-slate-800'
      )}
    >
      {item.icon && <span className="text-lg">{item.icon}</span>}
      <div className="flex-1">
        <span className="text-sm font-medium">{item.label}</span>
        {item.description && (
          <span className="ml-2 text-xs text-slate-500 dark:text-slate-400">{item.description}</span>
        )}
      </div>
      {item.children && <span className="text-sm text-slate-400">→</span>}
      {item.shortcut && (
        <kbd className="px-1.5 py-0.5 text-xs bg-slate-200 dark:bg-slate-700 rounded">{item.shortcut}</kbd>
      )}
    </div>
  );
}
