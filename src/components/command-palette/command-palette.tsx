'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { registry } from '@/lib/command-palette/registry';
import { fuzzySearch } from '@/lib/command-palette/search';
import { recentActions } from '@/lib/command-palette/history';
import { navigate } from '@/lib/command-palette/navigation';
import { startWorkflow } from '@/lib/command-palette/workflow';
import type { CommandItem, PaletteState, SearchResult, WorkflowState } from '@/lib/command-palette/types';
import { CommandItem as CmdItem } from './command-item';
import { CommandGroup } from './command-group';
import { WorkflowPanel } from './workflow-panel';

type View = 'palette' | 'history' | 'workflow';

interface Props {
  onClose: () => void;
}

export function CommandPalette({ onClose }: Props) {
  const [state, setState] = useState<PaletteState>({
    open: true,
    search: '',
    results: [],
    selectedIndex: 0,
    workflow: null,
    history: recentActions.getRecent()
  });
  const [view, setView] = useState<View>('palette');
  const [workflowState, setWorkflowState] = useState<WorkflowState | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Register default commands (could be moved to app init)
  useEffect(() => {
    if (registry.getAllCommands().length === 0) {
      registry.register({
        id: 'change-theme',
        label: 'Change Theme',
        icon: '🎨',
        group: 'appearance',
        children: [
          { id: 'theme-dark', label: 'Dark', group: 'appearance', action: () => document.documentElement.classList.add('dark') },
          { id: 'theme-light', label: 'Light', group: 'appearance', action: () => document.documentElement.classList.remove('dark') }
        ]
      });

      registry.register({
        id: 'move-issue',
        label: 'Move Issue',
        icon: '📌',
        group: 'actions',
        workflow: [
          { prompt: 'Select Team', resolver: async () => [{ id: 'team-a', label: 'Frontend', group: 'team' }, { id: 'team-b', label: 'Backend', group: 'team' }] },
          { prompt: 'Select Sprint', resolver: async () => [{ id: 'sprint-1', label: 'Sprint 23', group: 'sprint' }, { id: 'sprint-2', label: 'Sprint 24', group: 'sprint' }] },
          { action: (team, sprint) => console.log('Move issue to', team, sprint) }
        ]
      });
    }
  }, []);

  // Search effect
  useEffect(() => {
    const query = state.search.trim();
    let results: SearchResult[] = [];
    if (view === 'palette') {
      const commands = registry.getAllCommands();
      results = fuzzySearch(commands, query);
    } else if (view === 'history') {
      results = recentActions.getRecent().map((item) => ({ score: 1, item }));
    }
    setState((prev) => ({ ...prev, results, selectedIndex: 0 }));
  }, [state.search, view]);

  // Keyboard handler
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      e.preventDefault();
      setState((prev) => navigate(prev, e.key as any));
      return;
    }
    if (e.key === 'Enter') {
      e.preventDefault();
      const selected = state.results[state.selectedIndex]?.item;
      if (selected) executeCommand(selected);
    }
    if (e.key === 'Escape') {
      if (workflowState) {
        // Confirm cancel? For now just close workflow
        setWorkflowState(null);
        return;
      }
      onClose();
    }
  };

  const executeCommand = useCallback((item: CommandItem) => {
    // Check for children => show nested
    if (item.children && item.children.length > 0) {
      setState((prev) => ({
        ...prev,
        search: '', // clear search to show children
        results: item.children!.map((child) => ({ score: 1, item: child })),
        selectedIndex: 0
      }));
      return;
    }

    // Check for workflow
    if (item.workflow) {
      const wf = startWorkflow(item);
      if (wf) {
        setWorkflowState(wf);
        setView('workflow');
        return;
      }
    }

    // Direct action
    try {
      item.action?.();
      recentActions.add(item);
      onClose();
    } catch (error) {
      console.error('Command execution error:', error);
    }
  }, [onClose]);

  const handleWorkflowComplete = (data: any) => {
    // Final action already executed, just close
    onClose();
  };

  const handleWorkflowCancel = () => {
    setWorkflowState(null);
    setView('palette');
  };

  const toggleHistory = () => {
    setView((prev) => (prev === 'history' ? 'palette' : 'history'));
    setState((prev) => ({ ...prev, search: '' }));
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh] bg-black/50 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
    >
      <div
        className="w-full max-w-xl bg-white dark:bg-slate-900 rounded-xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-700 animate-rise"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-200 dark:border-slate-700">
          <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            placeholder="Type a command or search..."
            className="flex-1 bg-transparent outline-none text-sm"
            value={state.search}
            onChange={(e) => setState((prev) => ({ ...prev, search: e.target.value }))}
            onKeyDown={handleKeyDown}
            autoFocus
          />
          <button
            onClick={toggleHistory}
            className="text-xs text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
          >
            {view === 'history' ? 'Search' : 'History'}
          </button>
        </div>

        <div className="max-h-80 overflow-y-auto">
          {workflowState ? (
            <WorkflowPanel
              state={workflowState}
              onComplete={handleWorkflowComplete}
              onCancel={handleWorkflowCancel}
            />
          ) : (
            <>
              {state.results.length === 0 && (
                <div className="p-4 text-sm text-slate-500 text-center">
                  No results found.
                </div>
              )}
              {view === 'history' ? (
                <div>
                  <CommandGroup
                    group={{ id: 'recent', label: 'Recently Used', items: state.history }}
                    selectedId={state.results[state.selectedIndex]?.item.id || null}
                    onItemClick={executeCommand}
                  />
                </div>
              ) : (
                state.results.map((result) => (
                  <CmdItem
                    key={result.item.id}
                    item={result.item}
                    isSelected={state.results[state.selectedIndex]?.item.id === result.item.id}
                    onClick={() => executeCommand(result.item)}
                  />
                ))
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
