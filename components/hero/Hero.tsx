"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import HeroIdentity from "./HeroIdentity";
import HeroArchitecture from "./HeroArchitecture";
import { identity } from "@/data/identity";
import DiscoveryHint from "@/components/shared/DiscoveryHint";

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
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mt-sys-64"
          >
            <button 
              onClick={() => {
                const el = document.getElementById('systems');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn-primary opacity-60 hover:opacity-100 transition-opacity"
            >
              EXPLORE_SYSTEM_BUILDS
            </button>
          </motion.div>
        </div>

        {/* VISUALIZATION LAYER */}
        <div className="col-span-12 lg:col-span-5 flex justify-center lg:justify-end mt-sys-64 lg:mt-0 opacity-40">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
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
        <div className="w-[1px] h-sys-48 bg-border-dim relative overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 w-full h-[20%] bg-accent opacity-30"
            animate={{ top: ["-20%", "100%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
        </div>
      </motion.div>

      {/* Interface Intelligence Hint */}
      <div className="absolute bottom-sys-32 right-sys-32 hidden lg:block opacity-40">
        <DiscoveryHint 
          label={identity.discovery_hints.toAbout.label}
          href="#about"
          description={identity.discovery_hints.toAbout.description}
          orientation="right"
        />
      </div>
      {/* Background Section Identifier */}
      <div className="absolute top-0 right-0 p-sys-32 opacity-[0.03] select-none pointer-events-none">
        <span className="type-display text-[10rem] leading-none">00</span>
      </div>
    </section>
  );
}
