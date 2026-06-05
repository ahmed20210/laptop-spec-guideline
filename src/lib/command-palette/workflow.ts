import type { CommandItem, WorkflowStep } from './types';
import { registry } from './registry';

export interface WorkflowState {
  currentStep: number;
  steps: WorkflowStep[];
  collectedData: any[];
}

export function startWorkflow(item: CommandItem): WorkflowState | null {
  if (!item.workflow || item.workflow.length === 0) return null;
  return {
    currentStep: 0,
    steps: item.workflow,
    collectedData: []
  };
}

export async function executeWorkflowStep(
  state: WorkflowState,
  selectedValue: any
): Promise<Partial<WorkflowState> & { complete: boolean }> {
  const step = state.steps[state.currentStep];
  if (!step) throw new Error('Invalid workflow state');

  // If step has resolver, we expect to select one of the returned items
  if (step.resolver && selectedValue) {
    const newCollected = [...state.collectedData, selectedValue];
    const nextStep = state.currentStep + 1;
    if (nextStep >= state.steps.length) {
      // execute final action with all data
      await step.action?.(...newCollected);
      return { collectedData: newCollected, complete: true };
    }
    return { currentStep: nextStep, collectedData: newCollected, complete: false };
  }

  // If step has no resolver, we might be collecting input
  const newCollected = [...state.collectedData, selectedValue];
  const nextStep = state.currentStep + 1;
  if (nextStep >= state.steps.length) {
    const finalStep = state.steps[state.steps.length - 1];
    await finalStep.action?.(...newCollected);
    return { collectedData: newCollected, complete: true };
  }
  return { currentStep: nextStep, collectedData: newCollected, complete: false };
}

// Helper to get the current step's options (if any)
export async function getStepOptions(state: WorkflowState): Promise<CommandItem[]> {
  const step = state.steps[state.currentStep];
  if (step?.resolver) {
    return await step.resolver();
  }
  return [];
}
