"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import HeroIdentity from "./HeroIdentity";
import HeroArchitecture from "./HeroArchitecture";
import { identity } from "@/data/identity";
import DiscoveryHint from "@/components/shared/DiscoveryHint";
import { useScene } from "@/context/SceneContext";

export default function Hero() {
  const { prefersReducedMotion } = useScene();
  const { scrollY } = useScroll();

  // Subtle scroll transitions for the hero section, disabled for reduced motion
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  const y = useTransform(scrollY, [0, 400], [0, prefersReducedMotion ? 0 : -50]);

  return (
    <section className="min-h-[85vh] flex flex-col justify-center relative pt-sys-96 pb-sys-48 md:py-sys-96 overflow-hidden">
      <motion.div
        style={{ opacity, y }}
        className="grid-12 items-center"
      >
        {/* IDENTITY LAYER */}
        <div className="col-span-full lg:col-span-7 z-10">
          <HeroIdentity />

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mt-sys-64"
          >
            <button 
              onClick={() => {
                const el = document.getElementById('about');
                if (el) el.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
              }}
              aria-label="Initiate identity probe and scroll to about section"
              className="btn-primary opacity-80 hover:opacity-100 transition-opacity"
            >
              INITIATE_IDENTITY_PROBE
            </button>
          </motion.div>
        </div>

        {/* VISUALIZATION LAYER */}
        <div className="col-span-full lg:col-span-5 flex justify-center lg:justify-end mt-sys-64 lg:mt-0 opacity-40">
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
      <div className="absolute top-sys-16 right-sys-16 p-sys-32 opacity-[0.02] select-none pointer-events-none hidden md:block">
        <span className="type-display text-[8rem] leading-none">00</span>
      </div>
    </section>
  );
}
