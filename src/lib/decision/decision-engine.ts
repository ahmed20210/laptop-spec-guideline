import {
  RecommendationInput,
  RecommendationResult,
  SpecProfile,
  UseCase
} from "@/types/domain";
import { getUseCases } from "@/lib/data/guide-repository";

function cloneProfile(profile: SpecProfile): SpecProfile {
  return {
    cpu: profile.cpu,
    ram: profile.ram,
    gpu: profile.gpu,
    storage: profile.storage,
    notes: [...profile.notes]
  };
}

function applyMobilityTuning(profile: SpecProfile, mobility: RecommendationInput["mobility"]): void {
  if (mobility === "portable") {
    profile.cpu = profile.cpu.replace(/H\/?HX|HX|H/g, "U/HS");
    if (profile.gpu.toLowerCase().includes("rtx 4080") || profile.gpu.toLowerCase().includes("rtx 4090")) {
      profile.gpu = "Nvidia RTX 4060 8GB (portable-friendly baseline)";
    }
  }

  if (mobility === "desktop-replacement" && !profile.cpu.toLowerCase().includes("hx")) {
    profile.cpu = `${profile.cpu} (prefer HX-tier chassis when available)`;
  }
}

function applyPriorityTuning(profile: SpecProfile, priority: RecommendationInput["priority"]): void {
  if (priority === "battery") {
    profile.ram = profile.ram.includes("64") ? "32GB" : profile.ram;
    if (!profile.cpu.includes("U") && !profile.cpu.includes("HS")) {
      profile.cpu = `${profile.cpu} (look for U or HS variants for battery life)`;
    }
  }

  if (priority === "performance") {
    if (!profile.ram.includes("32") && !profile.ram.includes("64")) {
      profile.ram = "32GB";
    }
    if (profile.storage.includes("512GB")) {
      profile.storage = "1TB NVMe SSD";
    }
  }
}

function pickBaseProfile(useCase: UseCase, input: RecommendationInput): SpecProfile {
  if (input.budgetTier === "entry") return cloneProfile(useCase.minimum);
  if (input.budgetTier === "premium") return cloneProfile(useCase.recommended);

  if (input.priority === "performance") return cloneProfile(useCase.recommended);
  if (input.priority === "battery" && input.budgetTier === "mid") return cloneProfile(useCase.minimum);

  return cloneProfile(useCase.recommended);
}

export function recommendSpecs(input: RecommendationInput): RecommendationResult {
  const useCases = getUseCases();
  const selected = useCases.find((item) => item.id === input.useCaseId) ?? useCases[0];
  const profile = pickBaseProfile(selected, input);

  applyMobilityTuning(profile, input.mobility);
  applyPriorityTuning(profile, input.priority);

  const reasoning: string[] = [
    `Started from ${selected.nameEn} ${input.budgetTier === "entry" ? "minimum" : "recommended"} profile in the source JSON.`,
    `Applied ${input.priority} priority tuning to favor the user goal.`,
    `Adjusted recommendation for ${input.mobility} mobility preference.`,
    "Preserved JSON guidance around CPU class, RAM floor, and GPU suitability for the selected workload."
  ];

  if (selected.tags.includes("ai") && !profile.gpu.toLowerCase().includes("rtx")) {
    profile.gpu = "Nvidia RTX 4060 8GB minimum (CUDA ecosystem compatibility)";
    reasoning.push("AI workload detected; enforced Nvidia RTX baseline for broader framework compatibility.");
  }

  return {
    profile,
    reasoning,
    sourceUseCase: selected
  };
}
