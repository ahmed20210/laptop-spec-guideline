export interface CommandItem {
  id: string;
  label: string;
  description?: string;
  icon?: string;
  group: string;
  shortcut?: string;
  children?: CommandItem[];          // nested commands
  workflow?: WorkflowStep[];        // multi-step workflow
  action?: () => void;              // direct action
}

export interface WorkflowStep {
  prompt: string;
  resolver?: () => Promise<CommandItem[]>;   // returns selectable items
  action?: (...args: any[]) => void;
}

export interface CommandGroup {
  id: string;
  label: string;
  items: CommandItem[];
}

export interface SearchResult {
  score: number;
  item: CommandItem;
  matchedPath?: string[];  // for nested commands
}

export interface PaletteState {
  open: boolean;
  search: string;
  results: SearchResult[];
  selectedIndex: number;
  workflow: {          // current workflow state
    active: boolean;
    steps: WorkflowStep[];
    currentStep: number;
    collectedData: any[];
  } | null;
  history: CommandItem[];   // recent actions
}
