"use client";

import { motion } from "framer-motion";
import { engineeringDomains } from "@/data/domains";
import { cn } from "@/lib/utils";

interface DomainMapProps {
  activeDomainId: string | null;
  onDomainClick: (id: string) => void;
}

export default function DomainMap({ activeDomainId, onDomainClick }: DomainMapProps) {
  // Fixed positions for a controlled conceptual layout
  const nodePositions: { [key: string]: { x: number; y: number } } = {
    systems_engineering: { x: 50, y: 25 },
    backend_systems: { x: 80, y: 40 },
    data_systems: { x: 75, y: 70 },
    programming_languages: { x: 20, y: 40 },
    security_linux: { x: 25, y: 70 },
    ai_exploration: { x: 50, y: 80 }
  };

  return (
    <div className="absolute inset-0 z-0">
      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        {/* Connection Lines */}
        {engineeringDomains.map(domain => 
          domain.relatedDomains.map(relId => {
            const start = nodePositions[domain.id];
            const end = nodePositions[relId];
            if (!start || !end) return null;

            const isHighlighted = activeDomainId === domain.id || activeDomainId === relId;

            return (
              <motion.line
                key={`${domain.id}-${relId}`}
                x1={start.x}
                y1={start.y}
                x2={end.x}
                y2={end.y}
                stroke="currentColor"
                strokeWidth={isHighlighted ? "0.2" : "0.05"}
                className={cn(
                  "transition-all duration-500",
                  isHighlighted ? "text-accent opacity-40" : "text-border-dim opacity-20"
                )}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />
            );
          })
        )}

        {/* Nodes */}
        {engineeringDomains.map(domain => {
          const pos = nodePositions[domain.id];
          const isActive = activeDomainId === domain.id;
          const isRelated = activeDomainId && engineeringDomains.find(d => d.id === activeDomainId)?.relatedDomains.includes(domain.id);

          return (
            <g 
              key={domain.id} 
              className="cursor-pointer"
              onClick={() => onDomainClick(domain.id)}
            >
              <motion.circle
                cx={pos.x}
                cy={pos.y}
                r={isActive ? "2" : "1"}
                className={cn(
                  "transition-all duration-300",
                  isActive ? "fill-accent" : (isRelated ? "fill-accent/40" : "fill-border-dim")
                )}
                whileHover={{ r: 2.5 }}
              />
              {/* Optional: Glow Effect for Active Node */}
              {isActive && (
                <motion.circle
                  cx={pos.x}
                  cy={pos.y}
                  r="4"
                  className="fill-accent/10"
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
