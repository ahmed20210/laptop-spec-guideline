import type { CommandItem, SearchResult } from './types';

// Simple Levenshtein distance for fuzzy matching
function levenshtein(a: string, b: string): number {
  const alen = a.length;
  const blen = b.length;
  const matrix: number[][] = [];
  for (let i = 0; i <= alen; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= blen; j++) {
    matrix[0][j] = j;
  }
  for (let i = 1; i <= alen; i++) {
    for (let j = 1; j <= blen; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + cost
      );
    }
  }
  return matrix[alen][blen];
}

function fuzzyScore(query: string, target: string): number {
  const q = query.toLowerCase();
  const t = target.toLowerCase();
  if (t.startsWith(q)) return 100; // prefix match
  if (t.includes(q)) return 80;    // substring match
  const dist = levenshtein(q, t);
  const maxLen = Math.max(q.length, t.length);
  return (1 - dist / maxLen) * 50; // normalized score 0-50
}

export function fuzzySearch(
  commands: CommandItem[],
  query: string,
  maxResults = 10
): SearchResult[] {
  if (!query.trim()) return [];
  const results: SearchResult[] = [];
  for (const item of commands) {
    const score = fuzzyScore(query, item.label);
    if (score > 0) {
      results.push({ score, item });
    }
    // also search children (flat search)
    if (item.children) {
      for (const child of item.children) {
        const childScore = fuzzyScore(query, child.label);
        if (childScore > 0) {
          results.push({ score: childScore, item: child, matchedPath: [item.label] });
        }
      }
    }
  }
  results.sort((a, b) => b.score - a.score);
  return results.slice(0, maxResults);
}

export class AsyncSearchEngine {
  private abortController: AbortController | null = null;
  async search(
    commands: CommandItem[],
    query: string
  ): Promise<SearchResult[]> {
    this.abortController?.abort();
    this.abortController = new AbortController();
    const signal = this.abortController.signal;
    // Simulate async operation (debounce can be added in hook)
    return new Promise((resolve) => {
      setTimeout(() => {
        if (signal.aborted) return;
        resolve(fuzzySearch(commands, query));
      }, 0);
    });
  }
}
