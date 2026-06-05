import type { CommandItem, CommandGroup } from './types';

class CommandRegistry {
  private commands: Map<string, CommandItem> = new Map();
  private groups: Map<string, CommandGroup> = new Map();

  register(item: CommandItem): void {
    this.commands.set(item.id, item);
    const group = this.groups.get(item.group) || { id: item.group, label: item.group, items: [] };
    group.items.push(item);
    this.groups.set(item.group, group);
  }

  getCommand(id: string): CommandItem | undefined {
    return this.commands.get(id);
  }

  getAllCommands(): CommandItem[] {
    return Array.from(this.commands.values());
  }

  getGroupedCommands(): CommandGroup[] {
    return Array.from(this.groups.values());
  }

  resolveNestedCommand(chain: string[]): CommandItem | undefined {
    if (chain.length === 0) return undefined;
    let current = this.commands.get(chain[0]);
    for (let i = 1; i < chain.length && current?.children; i++) {
      current = current.children.find((c) => c.id === chain[i]);
    }
    return current;
  }

  reset(): void {
    this.commands.clear();
    this.groups.clear();
  }
}

export const registry = new CommandRegistry();
