export interface RecommendationPrompt {
  userContext: {
    useCase: string;
    budgetTier: string;
    mobility: string;
    priority: string;
  };
  baselineRecommendation: {
    cpu: string;
    ram: string;
    gpu: string;
    storage: string;
  };
  reasoning: string[];
}

export type AIError =
  | { type: "NOT_CONFIGURED"; message: string }
  | { type: "API_ERROR"; status: number; message: string; retryAfter?: number }
  | { type: "TIMEOUT"; duration: number; message: string };

export class AIAdvisorError extends Error {
  constructor(public aiError: AIError) {
    super(aiError.message);
    this.name = "AIAdvisorError";
  }
}

export interface AIAdvisor {
  explainRecommendation(prompt: RecommendationPrompt): Promise<string>;
}

export class NotConfiguredAIAdvisor implements AIAdvisor {
  async explainRecommendation(): Promise<string> {
    throw new AIAdvisorError({
      type: "NOT_CONFIGURED",
      message:
        "AI advisor is not configured yet. Attach a provider adapter (OpenAI, Azure OpenAI, or local model) to enable narrative insights."
    });
  }
}
