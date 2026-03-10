"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * Lightweight Architectural Visualization
 * Renders a grid of nodes with subtle data flow lines.
 */
export default function HeroArchitecture() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <div className="relative w-full aspect-square max-w-[500px] opacity-20">
      <svg viewBox="0 0 400 400" className="w-full h-full text-accent">
        {/* Connection Lines (Static Background) */}
        <path 
            d="M100 100 L300 100 L300 300 L100 300 Z M100 100 L300 300 M300 100 L100 300" 
            stroke="currentColor" 
            strokeWidth="0.5" 
            className="opacity-20"
        />

        {/* Data Flow Lines (Animated) */}
        {[
            "M100 100 L300 100",
            "M300 100 L300 300",
            "M300 300 L100 300",
            "M100 300 L100 100",
            "M100 100 L300 300",
            "M300 100 L100 300"
        ].map((d, i) => (
            <motion.path
                key={`flow-${i}`}
                d={d}
                stroke="currentColor"
                strokeWidth="1.5"
                strokeDasharray="4 20"
                initial={{ strokeDashoffset: 100 }}
                animate={{ strokeDashoffset: 0 }}
                transition={{ 
                    duration: 4 + i, 
                    repeat: Infinity, 
                    ease: "linear" 
                }}
            />
        ))}

        {/* Nodes */}
        {[
            { x: 100, y: 100, label: "MOD_A" },
            { x: 300, y: 100, label: "MOD_B" },
            { x: 300, y: 300, label: "MOD_C" },
            { x: 100, y: 300, label: "MOD_D" }
        ].map((node, i) => (
            <g key={`node-${i}`}>
                <motion.circle 
                    cx={node.x} 
                    cy={node.y} 
                    r="4" 
                    fill="currentColor"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1 + i * 0.2 }}
                />
                <motion.circle 
                    cx={node.x} 
                    cy={node.y} 
                    r="8" 
                    stroke="currentColor" 
                    fill="transparent"
                    strokeWidth="0.5"
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 3, repeat: Infinity, delay: i }}
                />
                <text 
                    x={node.x + 12} 
                    y={node.y + 4} 
                    className="type-metadata text-[6px] fill-current opacity-40 font-mono"
                >
                    {node.label}
                </text>
            </g>
        ))}

        {/* Subtle Central Data Pool */}
        <motion.circle 
            cx="200" 
            cy="200" 
            r="30" 
            stroke="currentColor" 
            strokeWidth="0.5" 
            strokeDasharray="2 4"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <text 
            x="200" 
            y="200" 
            textAnchor="middle" 
            alignmentBaseline="middle"
            className="type-metadata text-[5px] fill-current opacity-20"
        >
            CORE_RESOURCES
        </text>
      </svg>
    </div>
  );
}
