import { cn } from '@/lib/utils';

export function Kbd({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <kbd className={cn('px-1.5 py-0.5 text-xs bg-slate-200 dark:bg-slate-700 rounded font-mono', className)}>
      {children}
    </kbd>
  );
}
