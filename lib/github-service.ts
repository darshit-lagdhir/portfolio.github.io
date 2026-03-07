/**
 * ARCHITECTURAL MANIFEST — PHASE 33: GITHUB DATA SERVICE
 * 
 * Provides high-speed, cached access to GitHub repository metadata.
 * Implements a strict B&W editorial data pipeline.
 */

export interface GitHubRepoData {
  stargazers_count: number;
  updated_at: string;
  size: number;
  license?: {
    spdx_id: string;
  };
  language: string;
  languages: Record<string, number>;
  commitCount_approx: number;
  weeklyActivity: number[];
}

const CACHE_KEY_PREFIX = "gh_cache_";
const CACHE_DURATION = 1000 * 60 * 60 * 24; // 24 hours

export async function fetchGitHubData(repoName: string): Promise<GitHubRepoData | null> {
  const cacheKey = `${CACHE_KEY_PREFIX}${repoName}`;
  
  if (typeof window !== "undefined") {
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      const { data, timestamp } = JSON.parse(cached);
      if (Date.now() - timestamp < CACHE_DURATION) {
        return data;
      }
    }
  }

  try {
    const [repoRes, langRes, activityRes] = await Promise.all([
      fetch(`https://api.github.com/repos/darshit-lagdhir/${repoName}`),
      fetch(`https://api.github.com/repos/darshit-lagdhir/${repoName}/languages`),
      fetch(`https://api.github.com/repos/darshit-lagdhir/${repoName}/stats/commit_activity`)
    ]);

    if (!repoRes.ok) {
      console.warn(`GitHub API: Failed to fetch repo ${repoName}. Status: ${repoRes.status}`);
      return null;
    }
    
    const repoData = await repoRes.json();
    const languages = await langRes.json();
    const activity = activityRes.ok ? await activityRes.json() : [];

    const data: GitHubRepoData = {
      stargazers_count: repoData.stargazers_count,
      updated_at: repoData.updated_at,
      size: repoData.size,
      license: repoData.license,
      language: repoData.language,
      languages: languages,
      commitCount_approx: Array.isArray(activity) ? activity.reduce((acc: number, week: any) => acc + week.total, 0) : 0,
      weeklyActivity: Array.isArray(activity) ? activity.slice(-12).map((w: any) => w.total) : [] // Last 12 weeks
    };

    if (typeof window !== "undefined") {
      localStorage.setItem(cacheKey, JSON.stringify({ data, timestamp: Date.now() }));
    }

    return data;
  } catch (error) {
    console.error(`GitHub API Error for ${repoName}:`, error);
    return null;
  }
}

export function getProjectStatus(updatedAt: string): "Active" | "Recent" | "Archived" {
  const lastUpdate = new Date(updatedAt).getTime();
  const now = Date.now();
  const diffDays = (now - lastUpdate) / (1000 * 60 * 60 * 24);

  if (diffDays < 30) return "Active";
  if (diffDays < 90) return "Recent";
  return "Archived";
}
