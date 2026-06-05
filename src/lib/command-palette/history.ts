import type { CommandItem } from './types';

const STORAGE_KEY = 'command-palette-history';
const MAX_HISTORY = 10;

type HistoryEntry = { id: string; timestamp: number };

export class RecentActionsStore {
  private entries: HistoryEntry[] = [];
  private itemMap: Map<string, CommandItem> = new Map();

  constructor(private storage: Storage = typeof window !== 'undefined' ? localStorage : (null as any)) {
    if (this.storage) {
      const stored = this.storage.getItem(STORAGE_KEY);
      if (stored) {
        try {
          this.entries = JSON.parse(stored);
        } catch {}
      }
    }
  }

  add(item: CommandItem): void {
    this.entries = this.entries.filter((e) => e.id !== item.id);
    this.entries.unshift({ id: item.id, timestamp: Date.now() });
    if (this.entries.length > MAX_HISTORY) this.entries.pop();
    if (this.storage) this.storage.setItem(STORAGE_KEY, JSON.stringify(this.entries));
    this.itemMap.set(item.id, item);
  }

  getRecent(): CommandItem[] {
    return this.entries
      .map((e) => this.itemMap.get(e.id) || ({} as CommandItem))
      .filter((i) => i.id);
  }

  clear(): void {
    this.entries = [];
    this.itemMap.clear();
    if (this.storage) this.storage.removeItem(STORAGE_KEY);
  }
}

export const recentActions = new RecentActionsStore();
