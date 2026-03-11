import Hero from "@/components/hero/Hero";
import SystemModules from "@/components/projects/SystemModules";
import ExplorationArchive from "@/components/home/ExplorationArchive";
import EngineeringDomains from "@/components/home/EngineeringDomains";
import EngineeringPhilosophy from "@/components/home/EngineeringPhilosophy";
import SystemComparison from "@/components/home/SystemComparison";
import FinalReflection from "@/components/home/FinalReflection";
import About from "@/components/about/About";
import TerminalContact from "@/components/contact/TerminalContact";
import SectionContainer from "@/components/shared/SectionContainer";

export default function Home() {
  return (
    <div className="flex flex-col gap-sys-128 lg:gap-sys-192 pb-sys-128">
      {/* 
         MANIFEST_NODE_00: IDENTITY_PROBE
      */}
      <SectionContainer id="hero" noPadding className="pt-0">
        <Hero />
      </SectionContainer>

      {/* 
         MANIFEST_NODE_01: SYSTEM_CATALOGUE
      */}
      <SectionContainer id="systems">
        <SystemModules />
      </SectionContainer>

      {/* 
         MANIFEST_NODE_02: RESEARCH_ARCHIVE
      */}
      <SectionContainer id="archive">
        <ExplorationArchive />
      </SectionContainer>

      {/* 
         MANIFEST_NODE_03: INTELLECTUAL_DOMAINS
      */}
      <SectionContainer id="domains">
        <EngineeringDomains />
      </SectionContainer>

      {/* 
         MANIFEST_NODE_04: TECHNICAL_MINDSET
      */}
      <SectionContainer id="philosophy">
        <EngineeringPhilosophy />
      </SectionContainer>

      {/* 
         MANIFEST_NODE_05: COMPARATIVE_ANALYSIS
      */}
      <SectionContainer id="comparison">
        <SystemComparison />
      </SectionContainer>

      {/* 
         MANIFEST_NODE_06: HUMAN_CONSTRUCT
      */}
      <SectionContainer id="about">
        <About />
      </SectionContainer>

      {/* 
         MANIFEST_NODE_07: SYSTEM_REFLECTIONS
      */}
      <SectionContainer id="reflections" noPadding>
        <FinalReflection />
      </SectionContainer>

      {/* 
         MANIFEST_NODE_08: CONNECTION_BUS
      */}
      <SectionContainer id="contact">
        <TerminalContact />
      </SectionContainer>

      <footer className="system-container py-sys-64 border-t border-border-dim/30">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 opacity-30 text-[0.6rem] font-mono tracking-widest">
           <span>© 2026 DARSHIT_LAGDHIR_SYSTEMS</span>
           <div className="flex gap-8">
              <span>LATENCY: 0.00ms</span>
              <span>STATE: STABLE</span>
              <span>VER: 3.1.2</span>
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
