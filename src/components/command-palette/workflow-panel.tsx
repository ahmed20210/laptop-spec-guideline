'use client';

import { useEffect, useState } from 'react';
import { getStepOptions, executeWorkflowStep } from '@/lib/command-palette/workflow';
import type { WorkflowState, CommandItem } from '@/lib/command-palette/types';
import { CommandItem as CmdItem } from './command-item';

interface Props {
  state: WorkflowState;
  onComplete: (finalResult: any) => void;
  onCancel: () => void;
}

export function WorkflowPanel({ state, onComplete, onCancel }: Props) {
  const [options, setOptions] = useState<CommandItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [workflowState, setWorkflowState] = useState(state);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    getStepOptions(workflowState)
      .then(setOptions)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [workflowState]);

  const handleSelect = async (item: CommandItem) => {
    try {
      const result = await executeWorkflowStep(workflowState, item);
      if (result.complete) {
        onComplete(result.collectedData);
      } else {
        setWorkflowState((prev) => ({
          ...prev,
          currentStep: result.currentStep ?? prev.currentStep + 1,
          collectedData: result.collectedData ?? prev.collectedData
        }));
      }
    } catch (e: any) {
      setError(e.message);
    }
  };

  const stepPrompt = workflowState.steps[workflowState.currentStep]?.prompt || 'Select';

  return (
    <div className="p-4">
      <div className="flex justify-between mb-4">
        <h3 className="font-semibold">{stepPrompt}</h3>
        <button onClick={onCancel} className="text-sm text-slate-500 hover:text-slate-700 dark:hover:text-slate-300">
          Cancel
        </button>
      </div>
      {loading && <p className="text-sm text-slate-500">Loading options...</p>}
      {error && <p className="text-sm text-red-500">{error}</p>}
      {!loading && !error && (
        <div className="space-y-1">
          {options.map((opt) => (
            <CmdItem
              key={opt.id}
              item={opt}
              isSelected={false}
              onClick={() => handleSelect(opt)}
            />
          ))}
        </div>
      )}
      <div className="mt-4 text-xs text-slate-500">
        Step {workflowState.currentStep + 1} of {workflowState.steps.length}
      </div>
    </div>
  );
}
