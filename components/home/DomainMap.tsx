"use client";

import { motion } from "framer-motion";
import { engineeringDomains } from "@/data/domains";
import { cn } from "@/lib/utils";
import { useScene } from "@/context/SceneContext";

interface DomainMapProps {
  activeDomainId: string | null;
  onDomainClick: (id: string) => void;
}

export default function DomainMap({ activeDomainId, onDomainClick }: DomainMapProps) {
  const { isLowPerf } = useScene();
  const activeDomain = activeDomainId ? engineeringDomains.find(d => d.domain_id === activeDomainId) : null;
  
  // Fixed positions for a controlled conceptual layout
  const nodePositions: { [key: string]: { x: number; y: number } } = {
    systems_engineering: { x: 50, y: 25 },
    backend_systems: { x: 80, y: 40 },
    data_systems: { x: 75, y: 70 },
    programming_languages: { x: 20, y: 40 },
    linux_security: { x: 25, y: 70 },
    ai_exploration: { x: 50, y: 80 }
  };

  return (
    <div className="absolute inset-0 z-0">
      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        {/* Connection Lines */}
        {engineeringDomains.map(domain => 
          domain.connected_domains.map(relId => {
            const start = nodePositions[domain.domain_id];
            const end = nodePositions[relId];
            if (!start || !end) return null;

            const isHighlighted = activeDomainId === domain.domain_id || activeDomainId === relId;

            return (
              <motion.line
                key={`${domain.domain_id}-${relId}`}
                x1={start.x}
                y1={start.y}
                x2={end.x}
                y2={end.y}
                stroke="currentColor"
                strokeWidth={isHighlighted ? "0.2" : "0.05"}
                className={cn(
                  "transition-all duration-500",
                  isHighlighted ? "text-accent" : "text-border-dim opacity-30"
                )}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: isLowPerf ? 0 : 1.5, ease: "easeInOut" }}
              />
            );
          })
        )}

        {/* Nodes */}
        {engineeringDomains.map(domain => {
          const pos = nodePositions[domain.domain_id];
          const isActive = activeDomainId === domain.domain_id;
          const isRelated = activeDomain?.connected_domains.includes(domain.domain_id);

          return (
            <g 
              key={domain.domain_id} 
              className="cursor-pointer"
              onClick={() => onDomainClick(domain.domain_id)}
            >
              <motion.circle
                cx={pos.x}
                cy={pos.y}
                r={isActive ? "2" : "1"}
                className={cn(
                  "transition-all duration-300",
                  isActive ? "fill-accent" : (isRelated ? "fill-accent-dim" : "fill-border-dim")
                )}
                whileHover={{ r: 2.5 }}
              />
              {/* Optional: Glow Effect for Active Node */}
              {isActive && !isLowPerf && (
                <motion.circle
                  cx={pos.x}
                  cy={pos.y}
                  r="4"
                  className="fill-accent-dim opacity-20"
                  animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.5, 0.2] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
