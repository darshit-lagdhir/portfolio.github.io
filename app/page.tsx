import Hero from "@/components/hero/Hero";
import SystemModules from "@/components/projects/SystemModules";
import EngineeringDomains from "@/components/home/EngineeringDomains";
import EngineeringPhilosophy from "@/components/home/EngineeringPhilosophy";
import About from "@/components/about/About";
import TerminalContact from "@/components/contact/TerminalContact";
import SectionContainer from "@/components/shared/SectionContainer";

export default function Home() {
  return (
    <main className="flex flex-col">
      {/* PHASE 2: HERO SECTION */}
      <SectionContainer id="hero" noPadding>
        <Hero />
      </SectionContainer>

      {/* PHASE 4: SYSTEMS */}
      <SectionContainer id="systems">
        <SystemModules />
      </SectionContainer>

      {/* NEW: ENGINEERING DOMAINS */}
      <SectionContainer id="domains">
        <EngineeringDomains />
      </SectionContainer>

      {/* NEW: ENGINEERING PHILOSOPHY */}
      <SectionContainer id="philosophy">
        <EngineeringPhilosophy />
      </SectionContainer>

      {/* PHASE 6: ABOUT (NARRATIVE) */}
      <SectionContainer id="about">
        <About />
      </SectionContainer>

      {/* PHASE 7: CONTACT */}
      <SectionContainer id="contact">
        <TerminalContact />
      </SectionContainer>

      {/* FOOTER */}
      <footer className="py-sys-48 border-t border-border-dim opacity-20">
        <div className="system-container flex justify-between items-center">
          <div className="type-metadata text-[0.5rem]">
            &copy; {new Date().getFullYear()} DARSHIT_LAGDHIR // ARCHITECTURAL_MANIFEST_V2
          </div>
          <div className="type-metadata text-[0.5rem]">
            LATENCY: 0.04MS // BUFFER: 1024KB
          </div>
        </div>
      </footer>

      {/* Visual Anchor Metadata */}
      <div className="fixed bottom-sys-32 left-sys-32 pointer-events-none z-50">
        <div className="type-metadata opacity-10 text-[0.5rem] bg-bg-primary/80 backdrop-blur-sm p-1 eng-bracket">
          COORDS: 12.97°N 77.59°E // BENGALURU_SYSTEMS
        </div>
      </div>
    </main>
  );
}
