"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import HeroIdentity from "./HeroIdentity";
import HeroArchitecture from "./HeroArchitecture";

export default function Hero() {
  const { scrollY } = useScroll();
  
  // Subtle scroll transitions for the hero section
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  const y = useTransform(scrollY, [0, 400], [0, -50]);

  return (
    <section className="min-h-[85vh] flex flex-col justify-center relative py-sys-64 overflow-hidden">
      <motion.div 
        style={{ opacity, y }}
        className="grid-12 items-center"
      >
        {/* IDENTITY LAYER */}
        <div className="col-span-12 lg:col-span-7 z-10">
          <HeroIdentity />
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mt-sys-64"
          >
            <div className="flex flex-wrap gap-sys-24">
              <button className="btn-primary">EXPLORE_SYSTEMS</button>
              <button className="btn-primary opacity-40">VIEW_LOGS</button>
            </div>
          </motion.div>
        </div>

        {/* VISUALIZATION LAYER */}
        <div className="col-span-12 lg:col-span-5 flex justify-center lg:justify-end mt-sys-64 lg:mt-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <HeroArchitecture />
          </motion.div>
        </div>
      </motion.div>

      {/* SCROLL INDICATOR ENGINE */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-sys-32 left-1/2 -translate-x-1/2 flex flex-col items-center gap-sys-12"
      >
        <span className="type-metadata text-[0.5rem] opacity-30 tracking-[0.3em]">SCROLL_FOR_TELEMETRY</span>
        <div className="w-[1px] h-sys-48 bg-border-dim relative overflow-hidden">
          <motion.div 
            className="absolute top-0 left-0 w-full h-1/2 bg-accent opacity-60"
            animate={{ top: ["-50%", "100%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>

      {/* Background Section Identifier */}
      <div className="absolute top-0 right-0 p-sys-32 opacity-[0.03] select-none pointer-events-none">
        <span className="type-identity text-[10rem] leading-none">00</span>
      </div>
    </section>
  );
}
