/**
 * ARCHITECTURAL MANIFEST — PHASE 33: PROJECT CREDIBILITY SYSTEM
 * 
 * A high-density, minimal visualization layer that connects portfolio
 * systems to real-world engineering telemetry.
 * 
 * Design: Editorial, B&W, High-precision.
 */

"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fetchGitHubData, getProjectStatus, GitHubRepoData } from "@/lib/github-service";

interface ProjectCredibilityProps {
  repoName: string;
  githubUrl: string;
  status?: "Production" | "Prototype" | "Research" | "Experimental";
}

export default function ProjectCredibility({ repoName, githubUrl, status = "Prototype" }: ProjectCredibilityProps) {
  const [data, setData] = useState<GitHubRepoData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function init() {
      const result = await fetchGitHubData(repoName);
      setData(result);
      setLoading(false);
    }
    init();
  }, [repoName]);

  const activityStatus = data ? getProjectStatus(data.updated_at) : "Archived";

  return (
    <div className="mt-12 py-8 border-t border-white/10 flex flex-col gap-8">
      {/* STEP 2: METADATA GRID */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="flex flex-col gap-1">
          <span className="text-[10px] text-white/40 uppercase tracking-widest">Repository</span>
          <a 
            href={githubUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-xs hover:line-through transition-all"
          >
            github.com/{repoName}
          </a>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-[10px] text-white/40 uppercase tracking-widest">Active Status</span>
          <div className="flex items-center gap-2">
            <span className={`w-1.5 h-1.5 rounded-full ${
              activityStatus === "Active" ? "bg-white" : 
              activityStatus === "Recent" ? "bg-white/60" : "bg-white/20"
            }`} />
            <span className="text-xs">{activityStatus}</span>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-[10px] text-white/40 uppercase tracking-widest">Primary Language</span>
          <span className="text-xs">{data?.language || "—"}</span>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-[10px] text-white/40 uppercase tracking-widest">Project Maturity</span>
          <span className="text-xs uppercase tracking-tighter italic">{status}</span>
        </div>
      </div>

      {/* STEP 4 & 5: ACTIVITY AND LANGUAGES */}
      <div className="flex flex-col md:flex-row gap-12 justify-between">
        {/* COMMIT TIMELINE */}
        <div className="flex-1">
          <span className="text-[10px] text-white/40 uppercase tracking-widest block mb-4">Engineering Velocity (Last 12 Weeks)</span>
          <div className="flex items-end gap-1 h-8">
            {loading ? (
              Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="flex-1 bg-white/5 h-1" />
              ))
            ) : (
              data?.weeklyActivity.map((count, i) => (
                <motion.div
                  key={i}
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex-1 bg-white/20 hover:bg-white transition-colors origin-bottom"
                  style={{ height: `${Math.min(100, (count / 5) * 100)}%`, minHeight: '2px' }}
                />
              ))
            )}
          </div>
        </div>

        {/* LANGUAGES */}
        <div className="flex-1">
          <span className="text-[10px] text-white/40 uppercase tracking-widest block mb-4">Core Technology Breakdown</span>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            {data ? Object.keys(data.languages).slice(0, 4).map(lang => (
              <div key={lang} className="flex items-center gap-2">
                <span className="text-[11px] font-mono">{lang}</span>
                <span className="text-[9px] text-white/30">{Math.round((data.languages[lang] / Object.values(data.languages).reduce((a,b)=>a+b, 0)) * 100)}%</span>
              </div>
            )) : <span className="text-xs text-white/20">— Telemetry Loading —</span>}
          </div>
        </div>
      </div>

      {/* STEP 13: FALLBACK DATA IS BUILT-IN VIA OPTIONAL CHAINING */}
    </div>
  );
}
