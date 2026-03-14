import dynamic from "next/dynamic";
import Hero from "@/components/hero/Hero";
import SystemModules from "@/components/projects/SystemModules";
import SectionContainer from "@/components/shared/SectionContainer";

// --- LAZY-LOADED ARCHITECTURAL NODES ---
// We use dynamic imports to reduce initial bundle size and execution time.
// Loading skeletons match the engineering aesthetic of the portal.
const SystemLaboratory = dynamic(() => import("@/components/home/SystemLaboratory"), {
  loading: () => <div className="w-full h-[500px] border border-border-dim bg-bg-secondary/10 flex items-center justify-center type-metadata opacity-20">BOOTING_LAB_ENVIRONMENT...</div>
});

const EngineeringDomains = dynamic(() => import("@/components/home/EngineeringDomains"), {
  loading: () => <div className="w-full h-[600px] border border-border-dim flex items-center justify-center type-metadata opacity-20">MAPPING_TECHNICAL_TERRITORY...</div>
});

const EngineeringPhilosophy = dynamic(() => import("@/components/home/EngineeringPhilosophy"));
const SystemComparison = dynamic(() => import("@/components/home/SystemComparison"), {
  loading: () => <div className="w-full h-[500px] border border-border-dim flex items-center justify-center type-metadata opacity-20">COMPUTING_SYSTEM_MATRICES...</div>
});

const FinalReflection = dynamic(() => import("@/components/home/FinalReflection"));
const About = dynamic(() => import("@/components/about/About"));
const Capabilities = dynamic(() => import("@/components/shared/Capabilities"));
const TerminalContact = dynamic(() => import("@/components/contact/TerminalContact"));

export default function Home() {
  return (
    <div className="flex flex-col pb-sys-128">
      {/* 
         MANIFEST_NODE_00: IDENTITY_PROBE
      */}
      <SectionContainer id="hero" noPadding className="pt-0">
        <Hero />
      </SectionContainer>

      {/* 
         MANIFEST_NODE_01: HUMAN_CONSTRUCT
      */}
      <SectionContainer id="about">
        <About />
      </SectionContainer>

      {/* 
         MANIFEST_NODE_02: INTELLECTUAL_DOMAINS
      */}
      <SectionContainer id="domains">
        <EngineeringDomains />
      </SectionContainer>

      {/* 
         MANIFEST_NODE_03: SYSTEM_CATALOGUE
      */}
      <SectionContainer id="systems">
        <SystemModules />
      </SectionContainer>

      {/* 
         MANIFEST_NODE_04: COMPARATIVE_ANALYSIS
      */}
      <SectionContainer id="comparison">
        <SystemComparison />
      </SectionContainer>

      {/* 
         MANIFEST_NODE_05: TECHNICAL_EXPLORATIONS
      */}
      <SectionContainer id="exploration">
        <Capabilities />
      </SectionContainer>

      {/* 
         MANIFEST_NODE_06: SYSTEM_ARCHIVE
      */}
      <SectionContainer id="archive">
        <SystemLaboratory />
      </SectionContainer>

      {/* 
         MANIFEST_NODE_07: TECHNICAL_MINDSET
      */}
      <SectionContainer id="philosophy">
        <EngineeringPhilosophy />
      </SectionContainer>

      {/* 
         MANIFEST_NODE_08: SYSTEM_REFLECTIONS
      */}
      <SectionContainer id="reflections" noPadding>
        <FinalReflection />
      </SectionContainer>

      {/* 
         MANIFEST_NODE_09: CONNECTION_BUS
      */}
      <SectionContainer id="contact">
        <TerminalContact />
      </SectionContainer>

      <footer className="system-container py-sys-96 md:py-sys-128 border-t border-border-dim/20">
        <div className="flex flex-col md:flex-row justify-between items-center gap-12 text-center md:text-left">
           <div className="space-y-2 opacity-30">
              <span className="type-metadata text-[0.6rem] font-mono tracking-[0.4em]">© 2026 DARSHIT_LAGDHIR_SYSTEMS</span>
              <p className="type-metadata text-[0.45rem] opacity-50">Exploration of Architectural Rigor & Systems Thinking</p>
           </div>
           
           <div className="flex gap-12 font-mono text-[0.55rem] tracking-[0.3em] opacity-30">
              <div className="flex items-center gap-2">
                 <div className="w-1.5 h-1.5 bg-green-500/40 rounded-full animate-pulse" />
                 <span>LATENCY: 0.00ms</span>
              </div>
              <div className="flex items-center gap-2">
                 <div className="w-1.5 h-1.5 bg-accent/40 rounded-full" />
                 <span>STATE: STABLE</span>
              </div>
              <span>VER: 3.4.0_EXP</span>
           </div>
        </div>
      </footer>

      {/* Visual Anchor Metadata */}
      <div className="fixed bottom-sys-32 left-sys-32 pointer-events-none z-50">
        <div className="type-metadata opacity-10 text-[0.5rem] bg-bg-primary/80 backdrop-blur-sm p-1 eng-bracket">
          COORDS: 12.97°N 77.59°E // BENGALURU_SYSTEMS
        </div>
      </div>
    </div>
  );
}
