import guideEn from "../../../guide.json";
import guideAr from "../../../guide2.json";
import { kebabCase } from "@/lib/utils";
import {
  BudgetTier,
  ComparisonConfig,
  KnowledgeSection,
  SpecProfile,
  UseCase
} from "@/types/domain";

const arGuide = guideAr as Record<string, unknown>;

const arRoot =
  (arGuide["دليل_اختيار_مواصفات_اللابتوب_حسب_الاستخدام"] as Record<string, unknown> | undefined) ??
  (arGuide["دليل_الحد_الأدنى_والموصى_به_لمواصفات_اللابتوب"] as Record<string, unknown> | undefined) ??
  {};
const enRoot = guideEn.laptop_specification_reference_guide;

const useCaseNameMap: Record<string, string> = {
  التصفح_والأعمال_المكتبية_العادية: "Browsing & Office",
  البرمجة_وتطوير_الويب_الشامل: "Full-Stack Development",
  تطوير_وبرمجة_الذكاء_الاصطناعي: "AI Development",
  التصميم_الجرافيكي_وتحرير_الفيديو: "Design & Video Editing",
  الألعاب_والتصميم_ثلاثي_الأبعاد: "Gaming & 3D"
};

function toSpecProfile(raw: Record<string, unknown>): SpecProfile {
  const notes = [
    ...(Array.isArray(raw["ملاحظات"]) ? (raw["ملاحظات"] as string[]) : []),
    ...(Array.isArray(raw["الأولوية"]) ? (raw["الأولوية"] as string[]) : [])
  ];

  return {
    cpu: String(raw["المعالج_CPU"] ?? raw["المعالج"] ?? ""),
    ram: String(raw["الذاكرة_RAM"] ?? raw["الذاكرة"] ?? ""),
    gpu: String(raw["كرت_الشاشة_GPU"] ?? raw["كرت_الشاشة"] ?? ""),
    storage: String(raw["التخزين_Storage"] ?? raw["التخزين"] ?? ""),
    notes
  };
}

function inferBudgetTier(recommended: SpecProfile): BudgetTier {
  const text = `${recommended.gpu} ${recommended.ram} ${recommended.cpu}`.toLowerCase();
  if (text.includes("4090") || text.includes("4080") || text.includes("64gb")) {
    return "premium";
  }
  if (text.includes("4070") || text.includes("32gb") || text.includes("hx")) {
    return "high";
  }
  if (text.includes("4060") || text.includes("1tb") || text.includes("16gb")) {
    return "mid";
  }
  return "entry";
}

function inferTags(id: string, description: string): string[] {
  const lookup = `${id} ${description}`.toLowerCase();
  const tags: string[] = [];
  if (lookup.includes("برمجة") || lookup.includes("development")) tags.push("development");
  if (lookup.includes("ذكاء") || lookup.includes("ai")) tags.push("ai");
  if (lookup.includes("ألعاب") || lookup.includes("gaming")) tags.push("gaming");
  if (lookup.includes("تصميم") || lookup.includes("video")) tags.push("design");
  if (lookup.includes("مكتبية") || lookup.includes("office")) tags.push("office");
  return tags;
}

export function getUseCases(): UseCase[] {
  const useCases = arRoot["حالات_الاستخدام"] as Record<string, Record<string, unknown>>;

  return Object.entries(useCases).map(([rawKey, data]) => {
    const min = toSpecProfile(data["الحد_الأدنى"] as Record<string, unknown>);
    const rec = toSpecProfile(data["الموصى_به"] as Record<string, unknown>);
    const nameEn = useCaseNameMap[rawKey] ?? rawKey;
    const useCaseHints = Array.isArray(data["يناسب"]) ? (data["يناسب"] as string[]) : [];
    const description = String(data["الوصف"] ?? useCaseHints.join("، ") ?? "");

    return {
      id: kebabCase(nameEn),
      nameAr: rawKey.replaceAll("_", " "),
      nameEn,
      description,
      minimum: min,
      recommended: rec,
      tags: inferTags(rawKey, description),
      budgetTier: inferBudgetTier(rec)
    };
  });
}

export function getQuickShortcuts(): Array<{ title: string; summary: string }> {
  const summary =
    (arRoot["قاعدة_سريعة"] as Record<string, string> | undefined) ??
    (arRoot["ملخص_سريع_للاختيار"] as Record<string, string> | undefined) ??
    (arRoot["ملخص_نهائي"] as Record<string, string> | undefined) ??
    {};

  return Object.entries(summary).map(([k, v]) => ({
    title: k.replaceAll("_", " "),
    summary: v
  }));
}

export function getGuideOverview(): { purpose: string; version: string; language: string } {
  return {
    purpose: enRoot.purpose,
    version: enRoot.version,
    language: enRoot.language
  };
}

export function getKnowledgeSections(): KnowledgeSection[] {
  return [
    {
      id: "cpu",
      title: "CPU Suffixes and Performance Classes | لواحق المعالج وفئات الأداء",
      level: "beginner",
      overview: enRoot.cpu_suffixes.overview,
      details: enRoot.cpu_suffixes.buyer_advice
    },
    {
      id: "gpu",
      title: "GPU: Integrated vs Dedicated | الرسوميات المدمجة مقابل المنفصلة",
      level: "intermediate",
      overview: enRoot.gpu_graphics.overview,
      details: [
        ...enRoot.gpu_graphics.integrated_graphics.advantages,
        ...enRoot.gpu_graphics.dedicated_graphics.best_for
      ]
    },
    {
      id: "ram",
      title: "RAM Capacity and Memory Type | سعة الرام ونوع الذاكرة",
      level: "beginner",
      overview: enRoot.ram.overview,
      details: enRoot.ram.buyer_advice
    },
    {
      id: "cache",
      title: "CPU Cache (L1/L2/L3) | كاش المعالج",
      level: "advanced",
      overview: enRoot.cpu_cache.simple_explanation,
      details: enRoot.cpu_cache.why_it_matters
    },
    {
      id: "storage",
      title: "Storage Strategy | استراتيجية التخزين",
      level: "beginner",
      overview:
        "Use NVMe SSD as baseline. Capacity choice should match your software stack and asset size, not only OS requirements.",
      details: [
        "256GB works for light users but fills quickly.",
        "512GB is practical for most users.",
        "1TB is recommended for development, games, media work, and AI datasets.",
        "Prefer laptops with a second SSD slot when possible."
      ]
    }
  ];
}

export function getComparisonConfigs(): ComparisonConfig[] {
  return getUseCases().flatMap((useCase) => [
    {
      id: `${useCase.id}-min`,
      label: `${useCase.nameEn} (Minimum)`,
      profile: useCase.minimum,
      category: "minimum" as const
    },
    {
      id: `${useCase.id}-rec`,
      label: `${useCase.nameEn} (Recommended)`,
      profile: useCase.recommended,
      category: "recommended" as const
    }
  ]);
}

export interface GuideCategory {
  id: string;
  nameAr: string;
  nameEn: string;
  description: string;
  compatibleTasks: string[];
  priorities: string[];
  avoid: string[];
  minimum: SpecProfile;
  recommended: SpecProfile;
}

export function getGuideCategories(): string[] {
  const useCases = arRoot["حالات_الاستخدام"] as Record<string, Record<string, unknown>>;
  return Object.keys(useCases).map((rawKey) => {
    const nameEn = useCaseNameMap[rawKey] ?? rawKey;
    return kebabCase(nameEn);
  });
}

export function getCategoryGuide(slug: string): GuideCategory | undefined {
  const useCases = arRoot["حالات_الاستخدام"] as Record<string, Record<string, unknown>>;
  for (const [rawKey, data] of Object.entries(useCases)) {
    const nameEn = useCaseNameMap[rawKey] ?? rawKey;
    if (kebabCase(nameEn) === slug) {
      const min = toSpecProfile(data["الحد_الأدنى"] as Record<string, unknown>);
      const rec = toSpecProfile(data["الموصى_به"] as Record<string, unknown>);
      const compatibleTasks = Array.isArray(data["يناسب"]) ? (data["يناسب"] as string[]) : [];
      const priorities = Array.isArray(data["الأولوية"]) ? (data["الأولوية"] as string[]) : [];
      const avoid = Array.isArray(data["تجنب"]) ? (data["تجنب"] as string[]) : [];
      return {
        id: slug,
        nameAr: rawKey.replaceAll("_", " "),
        nameEn,
        description: String(data["الوصف"] ?? compatibleTasks.join("، ") ?? ""),
        compatibleTasks,
        priorities,
        avoid,
        minimum: min,
        recommended: rec,
      };
    }
  }
  return undefined;
}
