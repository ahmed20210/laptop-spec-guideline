import { create } from "zustand";
import { BudgetTier, SpecProfile } from "@/types/domain";

interface DecisionState {
  useCaseId: string;
  budgetTier: BudgetTier;
  mobility: "desktop-replacement" | "portable" | "balanced";
  priority: "performance" | "battery" | "balanced";
  profile: SpecProfile | null;
  reset: () => void;
}

const initialState = {
  useCaseId: "",
  budgetTier: "mid" as BudgetTier,
  mobility: "balanced" as const,
  priority: "balanced" as const,
  profile: null as SpecProfile | null,
};

export const useDecisionStore = create<DecisionState>((set) => ({
  ...initialState,
  reset: () => set(initialState),
}));

// Convenience setter actions (to be used in components)
export const setUseCase = (id: string) =>
  useDecisionStore.setState({ useCaseId: id });
export const setBudgetTier = (tier: BudgetTier) =>
  useDecisionStore.setState({ budgetTier: tier });
export const setMobility = (mobility: DecisionState["mobility"]) =>
  useDecisionStore.setState({ mobility });
export const setPriority = (priority: DecisionState["priority"]) =>
  useDecisionStore.setState({ priority });
export const setProfile = (profile: SpecProfile | null) =>
  useDecisionStore.setState({ profile });
