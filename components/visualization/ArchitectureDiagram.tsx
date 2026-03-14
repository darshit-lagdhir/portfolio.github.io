"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DiagramNode, DiagramConnection } from "@/types/project";
import ArchNode from "./ArchNode";
import ArchConnection from "./ArchConnection";
import { cn } from "@/lib/utils";
import { useScene } from "@/context/SceneContext";

interface ArchitectureDiagramProps {
  layout: "layered" | "pipeline";
  nodes: DiagramNode[];
  connections: DiagramConnection[];
  highlightedNodes?: string[];
}

export default function ArchitectureDiagram({ layout, nodes, connections, highlightedNodes = [] }: ArchitectureDiagramProps) {
  const { isMobile } = useScene();
  const [activeNodeId, setActiveNodeId] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const [nodeRects, setNodeRects] = useState<{ [key: string]: DOMRect | null }>({});
  const [parentRect, setParentRect] = useState<DOMRect | null>(null);
  const resizeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Measure nodes and parent for connections
  const updateRects = () => {
    if (containerRef.current) {
      setParentRect(containerRef.current.getBoundingClientRect());
      
      const newRects: { [key: string]: DOMRect | null } = {};
      Object.keys(nodeRefs.current).forEach(id => {
        newRects[id] = nodeRefs.current[id]?.getBoundingClientRect() || null;
      });
      setNodeRects(newRects);
    }
  };

  useEffect(() => {
    // Visibility observer to halt processing when not on screen
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) observer.observe(containerRef.current);

    const debouncedUpdate = () => {
      if (resizeTimeoutRef.current) clearTimeout(resizeTimeoutRef.current);
      resizeTimeoutRef.current = setTimeout(updateRects, 100);
    };

    if (isVisible) {
      updateRects();
      window.addEventListener("resize", debouncedUpdate);
    }

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", debouncedUpdate);
      if (resizeTimeoutRef.current) clearTimeout(resizeTimeoutRef.current);
    };
  }, [nodes, connections, isVisible]);

  const activeNode = nodes.find(n => n.id === activeNodeId);

  return (
    <div className="relative w-full py-sys-32">
      <div 
        ref={containerRef}
        className={cn(
          "relative grid gap-x-12 transition-opacity duration-500",
          isMobile 
            ? "grid-cols-1 gap-y-12" 
            : cn(
                "gap-y-16 lg:gap-y-24",
                layout === "pipeline" 
                  ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-4" 
                  : "grid-cols-1 md:grid-cols-3"
              )
        )}
      >
        {/* Connection Layer */}
        {connections.map((conn, idx) => {
          const isFromActive = conn.from === activeNodeId;
          const isToActive = conn.to === activeNodeId;
          const isPathActive = isFromActive || isToActive;
          
          return (
            <ArchConnection
              key={`${conn.from}-${conn.to}-${idx}`}
              fromRect={nodeRects[conn.from]}
              toRect={nodeRects[conn.to]}
              parentRect={parentRect}
              layout={layout}
              isActive={isPathActive}
            />
          );
        })}

        {/* Nodes Layer */}
        {nodes.map((node) => {
          const isHighlighted = highlightedNodes.includes(node.id);
          const isSelected = activeNodeId === node.id;
          const isAnyHighlighted = highlightedNodes.length > 0;
          const isAnySelected = !!activeNodeId;

          return (
            <motion.div 
              key={node.id}
              ref={(el) => { nodeRefs.current[node.id] = el; }}
              className="z-10"
              whileTap={{ scale: 0.98 }}
            >
              <ArchNode
                node={node}
                isActive={isHighlighted || isSelected}
                isDimmed={(isAnyHighlighted && !isHighlighted) || (isAnySelected && !isSelected && !isHighlighted)}
                onClick={() => setActiveNodeId(activeNodeId === node.id ? null : node.id)}
              />
            </motion.div>
          );
        })}
      </div>

      {/* Node Detail Reveal - INTERACTIVE SYSTEM EXPLORATION LAYER */}
      <AnimatePresence mode="wait">
        {activeNode && (
          <motion.div
            key={activeNode.id}
            initial={{ opacity: 0, scale: 0.98, y: 5 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -5 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={cn(
               "mt-sys-64 border border-border-dim bg-bg-secondary relative overflow-hidden group",
               isMobile ? "p-8" : "p-sys-48"
            )}
          >
            <div className="absolute top-0 left-0 w-1 h-full bg-accent" />
            
            <div className={cn("grid-12", isMobile ? "flex flex-col gap-8" : "gap-sys-32")}>
               <div className={cn("col-span-12 lg:col-span-6 space-y-6")}>
                  <div>
                    <div className="type-metadata text-[0.45rem] text-accent mb-2">COMPONENT_SPECIFICATION</div>
                    <h3 className="type-emphasis text-xl md:text-2xl tracking-tighter">{activeNode.label}</h3>
                  </div>
                  <span className="type-display text-8xl text-text-primary/5 uppercase select-none pointer-events-none">
                    {activeNode.label}
                  </span>
                  <p className="type-body text-sm leading-relaxed text-text-secondary">
                    {activeNode.description}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-4">
                     {activeNode.tech?.map((t: string) => (
                        <span key={t} className="type-metadata text-[0.4rem] px-2 py-1 bg-bg-primary border border-border-dim text-text-muted uppercase">
                          {t}
                        </span>
                     ))}
                  </div>
               </div>

               <div className={cn("col-span-12 lg:col-span-5 lg:col-start-8 space-y-8")}>
                  {activeNode.responsibilities && (
                    <div>
                       <div className="type-metadata text-[0.45rem] text-text-muted mb-4">CORE_RESPONSIBILITIES</div>
                       <ul className="space-y-3">
                          {activeNode.responsibilities.map((res: string, i: number) => (
                            <li key={i} className="flex gap-3 items-start group/li">
                               <span className="type-metadata text-[0.4rem] text-accent mt-1.5 opacity-40 group-hover/li:opacity-100 transition-opacity">0{i+1}</span>
                               <span className="type-body text-xs text-text-muted group-hover/li:text-text-secondary transition-colors italic">{res}</span>
                            </li>
                          ))}
                       </ul>
                    </div>
                  )}
               </div>
            </div>
            
            {/* Background Identifier */}
            {!isMobile && (
              <div className="absolute -bottom-12 -right-12 opacity-[0.03] select-none pointer-events-none group-hover:opacity-[0.05] transition-opacity duration-300">
                     <span className="type-display text-[12rem] text-accent opacity-10 uppercase">
                       {activeNode.id}
                     </span>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-6 flex justify-between items-center opacity-20">
         <div className="type-metadata text-[0.4rem]">VIS_ENGINE_v1.0 // LAYOUT_{layout.toUpperCase()}</div>
         <div className="type-metadata text-[0.4rem]">SELECT_NODE_FOR_TELEMETRY</div>
      </div>
    </div>
  );
}
