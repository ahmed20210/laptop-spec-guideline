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

export interface AIAdvisor {
  explainRecommendation(prompt: RecommendationPrompt): Promise<string>;
}

export class NotConfiguredAIAdvisor implements AIAdvisor {
  async explainRecommendation(): Promise<string> {
    return "AI advisor is not configured yet. Attach a provider adapter (OpenAI, Azure OpenAI, or local model) to enable narrative insights.";
  }
}
