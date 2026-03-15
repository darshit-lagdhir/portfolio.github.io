"use client";

import { motion } from "framer-motion";
import { laboratoryExplorations } from "@/data/laboratory";
import { cn, unslugify, getProjectUrl } from "@/lib/utils";
import Link from "next/link";

export default function ExplorationArchive() {
  const completedExplorations = laboratoryExplorations.filter(
    l => l.status === "completed"
  );

  return (
    <div className="w-full">
      <div className="relative mb-sys-48 opacity-30 flex items-center">
        <div className="absolute -left-6 w-1.5 h-1.5 border border-accent rotate-45" />
        <span className="type-metadata text-[0.45rem] tracking-[0.4em] font-mono uppercase break-words hyphens-auto max-w-[250px] leading-tight">Completed_Investigation_Archive</span>
      </div>

      <div className="grid-12 gap-y-sys-32">
        {completedExplorations.map((item, index) => (
          <motion.div
            key={item.investigation_id}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="module-frame group flex flex-col h-full min-h-[460px] !p-sys-32 hover:border-accent/30 col-span-full md:col-span-6 lg:col-span-4"
          >
            <div className="flex justify-between items-start mb-sys-24">
              <span className="type-metadata text-[0.35rem] opacity-30 uppercase font-mono">
                {unslugify(item.related_domains[0])}
              </span>
              <div className={cn(
                "w-2 h-2 rounded-full border border-border-dim transition-all duration-300 group-hover:bg-accent/40 group-hover:scale-110 group-hover:border-accent/40"
              )} />
            </div>

            <h3 className="type-h3 mb-sys-16 group-hover:text-accent transition-colors">
              {item.title}
            </h3>

            <p className="type-body text-xs opacity-40 mb-sys-32 line-clamp-3 leading-relaxed">
              {item.description}
            </p>

            <div className="mt-auto space-y-sys-24">
              <div className="border-t border-border-dim/30">
                <h4 className="type-metadata text-[0.35rem] opacity-20 mb-sys-12 tracking-widest uppercase italic">Key_Insight</h4>
                <p className="type-body text-[0.7rem] text-text-primary/80 italic leading-relaxed">
                  &quot;{item.insight}&quot;
                </p>
              </div>

              <div className="flex flex-wrap gap-x-sys-12 gap-y-sys-8">
                {item.related_domains.map(domain => (
                  <span key={domain} className="type-metadata text-[0.35rem] opacity-20 border border-border-dim/50 px-sys-8 py-1 uppercase tracking-tighter">
                    {unslugify(domain)}
                  </span>
                ))}
              </div>

              {item.related_projects && item.related_projects.length > 0 && (
                <div className="flex gap-sys-16">
                  {item.related_projects.map(project => (
                    <Link 
                      key={project}
                      href={getProjectUrl(project)}
                      className="type-metadata text-[0.35rem] text-accent/40 hover:text-accent transition-colors uppercase font-mono"
                    >
                      // {project}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
