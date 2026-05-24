export type BudgetTier = "entry" | "mid" | "high" | "premium";

export type UserPriority = "battery" | "balanced" | "performance";

export type MobilityNeed = "portable" | "balanced" | "desktop-replacement";

export interface SpecProfile {
  cpu: string;
  ram: string;
  gpu: string;
  storage: string;
  notes: string[];
}

export interface UseCase {
  id: string;
  nameAr: string;
  nameEn: string;
  description: string;
  minimum: SpecProfile;
  recommended: SpecProfile;
  tags: string[];
  budgetTier: BudgetTier;
}

export interface RecommendationInput {
  useCaseId: string;
  budgetTier: BudgetTier;
  priority: UserPriority;
  mobility: MobilityNeed;
}

export interface RecommendationResult {
  profile: SpecProfile;
  reasoning: string[];
  sourceUseCase: UseCase;
}

export interface ComparisonConfig {
  id: string;
  label: string;
  profile: SpecProfile;
  category: "minimum" | "recommended";
}

export interface KnowledgeSection {
  id: string;
  title: string;
  level: "beginner" | "intermediate" | "advanced";
  overview: string;
  details: string[];
}
