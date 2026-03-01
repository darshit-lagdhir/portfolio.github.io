"use client";

import { motion } from "framer-motion";

const skills = [
    "AUTONOMOUS SYSTEMS", "SIGNAL RECOVERY", "ZERO-TRUST", "FORMAL VERIFICATION",
    "SPATIAL UI", "BENTO ARCHITECTURE", "HUD LAYERING", "VELOCITY SCROLL",
    "GEOMETRIC LOGIC", "ADAPTIVE MODES", "SYSTEM INTEGRITY", "FFI BOUNDARIES"
];

export default function InfiniteMarquee() {
    return (
        <div className="w-full py-20 border-y border-border bg-background relative overflow-hidden select-none">
            <div className="marquee-container">
                <div className="marquee-content flex items-center">
                    {/* First Set */}
                    {skills.map((skill, i) => (
                        <div key={i} className="flex items-center gap-12">
                            <span className="font-title text-step-2 text-white uppercase italic tracking-tight-title opacity-40 hover:opacity-100 transition-opacity">
                                {skill}
                            </span>
                            <div className="w-2 h-2 bg-white/20 rotate-45" />
                        </div>
                    ))}
                    {/* Repeating Set for seamless loop */}
                    {skills.map((skill, i) => (
                        <div key={`dup-${i}`} className="flex items-center gap-12">
                            <span className="font-title text-step-2 text-white uppercase italic tracking-tight-title opacity-40 hover:opacity-100 transition-opacity">
                                {skill}
                            </span>
                            <div className="w-2 h-2 bg-white/20 rotate-45" />
                        </div>
                    ))}
                </div>
            </div>

            {/* FLOATING COORDINATES (PHASE 1) */}
            <div className="absolute top-2 left-6 opacity-10 font-mono text-[9px] tracking-widest">
                MARQUEE_STRIP // PERSISTENT_STREAM
            </div>
            <div className="absolute bottom-2 right-6 opacity-10 font-mono text-[9px] tracking-widest">
                DATA_FLOW: STABLE
            </div>
        </div>
    );
}
