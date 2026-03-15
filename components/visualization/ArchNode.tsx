"use client";

import React, { memo } from "react";
import { motion } from "framer-motion";
import { DiagramNode } from "@/types/project";
import { cn } from "@/lib/utils";
import { useScene } from "@/context/SceneContext";

interface ArchNodeProps {
  node: DiagramNode;
  isActive: boolean;
  isDimmed: boolean;
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

const TYPE_COLORS = {
  service: "text-accent",
  database: "text-accent-dim",
  pipeline: "text-accent",
  interface: "text-accent-dim",
  logic: "text-accent",
  client: "text-accent-dim"
};

const TYPE_LABELS = {
  service: "SERVICE_MODULE",
  database: "DATA_STORE",
  pipeline: "PROCESS_FLOW",
  interface: "SYSTEM_INTERFACE",
  logic: "CORE_LOGIC",
  client: "USER_INTERFACE"
};

function ArchNode({ node, isActive, isDimmed, onClick, onMouseEnter, onMouseLeave }: ArchNodeProps) {
  const { isMobile } = useScene();
  return (
    <motion.div
      role="button"
      tabIndex={0}
      aria-pressed={isActive}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      whileHover={!isMobile ? { scale: isDimmed ? 1 : 1.02 } : {}}
      className={cn(
        "relative p-4 border transition-all duration-300 cursor-pointer select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-accent min-w-0 w-full",
        isActive 
          ? "border-accent bg-accent/10 ring-1 ring-accent/30 z-20" 
          : "border-border-dim bg-bg-secondary/80 hover:border-border-bright",
        isDimmed && !isActive && "opacity-20 grayscale scale-[0.98]"
      )}
      style={{ willChange: "transform" }}
    >
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-start">
          <span className={cn("type-metadata text-[0.35rem] leading-tight uppercase font-bold break-words", TYPE_COLORS[node.type])}>
            {TYPE_LABELS[node.type]}
          </span>
          {isActive && (
            <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          )}
        </div>
        <h4 className="type-label text-xs tracking-tight group-hover:text-accent transition-colors break-words">
          {node.label}
        </h4>
      </div>
      
      {/* Decorative Diagnostic Pattern */}
      <div className="absolute bottom-1 right-1 opacity-[0.05] pointer-events-none">
        <div className="grid grid-cols-2 gap-0.5">
          <div className="w-0.5 h-0.5 bg-white" />
          <div className="w-0.5 h-0.5 bg-white" />
          <div className="w-0.5 h-0.5 bg-white" />
          <div className="w-0.5 h-0.5 bg-white" />
        </div>
      </div>
    </motion.div>
  );
}

export default memo(ArchNode);
