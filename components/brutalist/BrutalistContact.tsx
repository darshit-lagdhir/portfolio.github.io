"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useScene } from "@/context/SceneContext";
import { useState, useEffect, useRef } from "react";
import { ScrollMoment, ChoreographedSection, MagneticButton, LAYOUT, SectionHeader } from "@/components/brutalist/SystemComponents";



// TEXT SCRAMBLE HOOK — PHASE 4
const useScramble = (text: string, active: boolean) => {
    const [display, setDisplay] = useState(text);
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_//";

    useEffect(() => {
        if (!active) return;
        let iteration = 0;
        const interval = setInterval(() => {
            setDisplay(prev => prev.split("").map((_, i) => {
                if (i < iteration) return text[i];
                return chars[Math.floor(Math.random() * chars.length)];
            }).join(""));

            if (iteration >= text.length) clearInterval(interval);
            iteration += 1 / 3;
        }, 20); // Maintain fast rhythm for scramble
        return () => clearInterval(interval);
    }, [active, text, chars]);

    return display;
};

export default function BrutalistContact() {
    const { setActiveSection, isMobile } = useScene();
    const [isHovered, setIsHovered] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const inView = useInView(containerRef, { amount: 0.1 });
    const scrambledTitle = useScramble("CONNECT_PROTOCOL", inView);

    // PHASE 9 STEP 3: SECTION BREATHING
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });
    const breathPadding = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [isMobile ? "4rem" : "8rem", isMobile ? "6rem" : "10rem", isMobile ? "6rem" : "10rem", isMobile ? "4rem" : "8rem"]);

    return (
        <ChoreographedSection
            id="contact"
        >
            <div
                ref={containerRef}
                onPointerEnter={() => setActiveSection("contact")}
                className="relative min-h-[90vh] flex flex-col items-center justify-center bg-white text-black"
            >
                {/* PHASE 39 STEP 4: GRID ALIGNMENT CORRECTION (Section Number) */}
                <div className={`${LAYOUT.CONTAINER} absolute inset-0 flex flex-col justify-center pointer-events-none z-0`}>
                    <span className="text-[20vw] font-heading font-black leading-none text-black opacity-[0.02] select-none translate-y-[-10%]">
                        04
                    </span>
                </div>

                <motion.div style={{ paddingTop: breathPadding, paddingBottom: breathPadding }} className="flex flex-col items-center justify-center w-full relative z-10">

                    <div className={`${LAYOUT.CONTAINER} flex flex-col items-start gap-12 relative z-10`}>

                        {/* MASSIVE CONNECT — PHASE 4 + PHASE 15 EMPHASIS */}
                        {/* SECTION HEADING — PHASE 42 DNA PATTERN */}
                        <ScrollMoment>
                            <SectionHeader 
                                label="04_TERMINATION" 
                                title={scrambledTitle} 
                                subtitle="Initialize Communication Protocol" 
                                theme="light"
                                discoveryHint="PROTOCOL_END"
                            />
                        </ScrollMoment>
 
                        {/* EMAIL INTERACTION — PHASE 34: MAGNETIC & PRESSURE FEEDBACK */}
                        <div className="flex flex-col items-start w-full">
                            <motion.div
                                onMouseEnter={() => setIsHovered(true)}
                                onMouseLeave={() => setIsHovered(false)}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                            >
                                <MagneticButton
                                    className="relative py-12 px-8 border border-black/10 group shadow-sm hover:shadow-xl transition-all"
                                >
                                    <a
                                        href="mailto:darshitlagdhir@gmail.com"
                                        className="text-base md:text-lg font-heading font-bold italic text-black uppercase tracking-tight"
                                    >
                                        DARSHITLAGDHIR@GMAIL.COM
                                    </a>
                                    <motion.div
                                        initial={{ scaleX: 0 }}
                                        animate={{ scaleX: isHovered ? 1 : 0 }}
                                        className="absolute bottom-10 left-6 right-6 h-[4px] bg-black origin-left"
                                    />
                                </MagneticButton>
                            </motion.div>
                        </div>
 
                        <div className="flex gap-16 mt-12 dna-line-motif light">
                            {[
                                { label: "GH", link: "https://github.com/darshit-lagdhir" },
                                { label: "LI", link: "https://www.linkedin.com/in/darshitlagdhir/" },
                            ].map((social, i) => (
                                <MagneticButton key={social.label}>
                                    <motion.a
                                        href={social.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        initial={{ opacity: 0 }}
                                        whileInView={{ opacity: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.8, delay: 0.8 + i * 0.1 }}
                                        className="text-caption hover:text-black/40 transition-all font-ui font-bold tracking-[0.4em]"
                                    >
                                        {social.label}
                                    </motion.a>
                                </MagneticButton>
                            ))}
                        </div>

                    </div>
                </motion.div>

                {/* EXIT CUE — PHASE 3 */}
                <div className="absolute bottom-12 flex flex-col items-center gap-6 w-[200px]">
                    <span className="text-caption">EOT</span>
                </div>

                {/* CORNER ACCENTS REMOVED */}

            </div>
        </ChoreographedSection>
    );
}
