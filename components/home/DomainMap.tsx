"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { engineeringDomains } from "@/data/domains";
import { cn } from "@/lib/utils";
import { useScene } from "@/context/SceneContext";

interface DomainMapProps {
  activeDomainId: string | null;
  onDomainClick: (id: string) => void;
  simplified?: boolean;
}

export default function DomainMap({ activeDomainId, onDomainClick, simplified = false }: DomainMapProps) {
  const { isLowPerf, isMobile } = useScene();
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  
  const activeDomain = activeDomainId ? engineeringDomains.find(d => d.domain_id === activeDomainId) : null;
  const hoveredDomain = hoveredId ? engineeringDomains.find(d => d.domain_id === hoveredId) : null;
  
  // Dynamic positions that expand on mobile to avoid overlap
  const nodePositions: { [key: string]: { x: number; y: number } } = {
    systems_engineering: { x: 50, y: simplified ? 20 : 30 },
    backend_systems: { x: simplified ? 85 : 80, y: simplified ? 40 : 45 },
    data_systems: { x: simplified ? 80 : 75, y: simplified ? 80 : 75 },
    programming_languages: { x: simplified ? 15 : 20, y: simplified ? 40 : 45 },
    linux_security: { x: simplified ? 20 : 25, y: simplified ? 80 : 75 },
    ai_exploration: { x: 50, y: simplified ? 90 : 85 }
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

            const isActive = activeDomainId === domain.domain_id || activeDomainId === relId;
            const isHovered = hoveredId === domain.domain_id || hoveredId === relId;

            // Simplified mode: hide irrelevant lines to reduce clutter
            if (simplified && !isActive && !isHovered) return null;

            return (
              <motion.line
                key={`${domain.domain_id}-${relId}`}
                x1={start.x}
                y1={start.y}
                x2={end.x}
                y2={end.y}
                stroke="currentColor"
                strokeWidth={isActive ? (simplified ? "0.4" : "0.2") : (isHovered ? "0.15" : "0.05")}
                className={cn(
                  "transition-all duration-200",
                   isActive ? "text-accent" : (isHovered ? "text-accent/60" : "text-border-dim opacity-50")
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
          const isHovered = hoveredId === domain.domain_id;
          const isRelatedToActive = activeDomain?.connected_domains.includes(domain.domain_id);
          const isRelatedToHovered = hoveredDomain?.connected_domains.includes(domain.domain_id);

          return (
            <g 
              key={domain.domain_id} 
              className="cursor-pointer"
              onClick={() => onDomainClick(domain.domain_id)}
              onMouseEnter={() => !useScene().isMobile && setHoveredId(domain.domain_id)}
              onMouseLeave={() => !useScene().isMobile && setHoveredId(null)}
            >
              <motion.circle
                cx={pos.x}
                cy={pos.y}
                r={isActive ? (simplified ? "3.5" : "2") : (isHovered ? "1.8" : (simplified ? "1.5" : "1"))}
                className={cn(
                  "transition-all duration-200",
                  isActive 
                    ? "fill-accent" 
                    : (isHovered || isRelatedToHovered || isRelatedToActive ? "fill-accent-dim" : "fill-border-dim")
                )}
                whileHover={!isMobile ? { r: 2 } : {}}
              />
              {/* Optional: Glow Effect for Active Node */}
              {isActive && !isLowPerf && (
                <motion.circle
                  cx={pos.x}
                  cy={pos.y}
                  r={simplified ? "6" : "4"}
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
