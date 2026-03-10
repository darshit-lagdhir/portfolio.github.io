"use client";

import { motion } from "framer-motion";
import { identity } from "@/data/identity";

export default function Hero() {
  return (
    <section className="min-h-[90vh] flex flex-col justify-center relative py-sys-128">
      <div className="grid-12">
        <div className="col-span-12 lg:col-span-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-sys-12 mb-sys-48"
          >
            <span className="status-dot active" />
            <div className="type-metadata">
              <span className="eng-bracket">ESTABLISHED_IDENTITY</span>
              <span>{identity.name.toUpperCase()}</span>
            </div>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="type-identity mb-sys-64"
          >
            ARCHITECTING <br />
            <span className="text-secondary">SYSTEMS_THAT_ENDURE</span>
          </motion.h1>

          <div className="grid-12">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="col-span-12 md:col-span-7"
            >
              <p className="type-body text-xl md:text-2xl leading-relaxed mb-sys-48 text-primary">
                A {identity.positioning} building high-performance digital environments through the lens of systems thinking and structural integrity.
              </p>
              
              <div className="flex flex-wrap gap-sys-24">
                <button className="btn-primary">EXPLORE_SYSTEMS</button>
                <button className="btn-primary opacity-40">VIEW_DOCUMENTATION</button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Subtle architectural visual element */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-10 pointer-events-none hidden lg:block">
        <svg width="400" height="400" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
          <motion.rect 
            x="50" y="50" width="300" height="300" stroke="currentColor" strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
          />
          <motion.path 
            d="M50 200H350M200 50V350" stroke="currentColor" strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2.5, ease: "easeInOut", repeat: Infinity, repeatType: "reverse", delay: 0.5 }}
          />
          <circle cx="200" cy="200" r="4" fill="currentColor" />
          <motion.circle 
            cx="200" cy="200" r="100" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, ease: "linear", repeat: Infinity }}
          />
        </svg>
      </div>
    </section>
  );
}
