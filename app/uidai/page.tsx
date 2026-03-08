"use client";

import { useScene } from "@/context/SceneContext";
import {
    ProjectEntryLoader,
    SystemHeaderBar,
    SystemGridOverlay,
    ProjectMetadata,
    ProjectTimeline,
    CodeBlockVisual,
    StoryBlock,
    ScrollMoment
} from "@/components/brutalist/SystemComponents";
import { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import ProjectCredibility from "@/components/brutalist/ProjectCredibility";

const GLOBAL_EASE = [0.25, 1, 0.5, 1] as [number, number, number, number];

export default function UIDAIPage() {
    const { setActiveSection } = useScene();

    useEffect(() => {
        setActiveSection("projects");
    }, [setActiveSection]);

    return (
        <div className="min-h-screen w-full bg-black text-white relative py-40 px-[5vw] font-sans selection:bg-white selection:text-black">
            <ProjectEntryLoader />
            <SystemHeaderBar current="MOD_UIDAI" />
            <SystemGridOverlay />

            <div className="max-w-[1800px] mx-auto flex flex-col gap-y-40">

                {/* PROJECT HEADER — PHASE 3 */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, ease: GLOBAL_EASE }}
                    className="grid grid-cols-12 gap-10"
                >
                    <div className="col-span-12 lg:col-span-8 flex flex-col gap-12">
                        <span className="text-micro font-bold text-white tracking-[0.8em]">
                            02_INTELLIGENCE // PATTERN_SYNC
                        </span>
                        <motion.h1
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1.5, ease: GLOBAL_EASE }}
                            className="text-large md:text-massive italic text-white font-heading leading-[0.85] uppercase tracking-tight-title origin-left glitch-safe flex flex-wrap"
                        >
                            {"UIDAI_SYSTEM".split("").map((char, i) => (
                                <motion.span
                                    key={i}
                                    initial={{ y: 60, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ duration: 1.2, delay: 0.4 + i * 0.04, ease: [0.33, 1, 0.68, 1] }}
                                    className="inline-block"
                                >
                                    {char === "_" ? <span>&nbsp;</span> : char}
                                </motion.span>
                            ))}
                        </motion.h1>
                        <p className="text-short-body text-white/40 italic">
                            Advisory intelligence system for biometric pattern detection and enrollment anomaly clustering.
                        </p>
                    </div>
                </motion.div>

                {/* PHASE 38 STEP 3: CHOREOGRAPHED ENTRY SEQUENCING */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.8, ease: GLOBAL_EASE }}
                >
                    <ProjectMetadata
                        type="Advisory Inference Tool"
                        language="Python / PyTorch"
                        arch="Anomaly Detection Model"
                        tech={["OpenCV", "Scikit", "Biometric Math", "NumPy"]}
                    />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 1.2, ease: GLOBAL_EASE }}
                >
                    <ProjectCredibility repoName="uidai-advisory-system" githubUrl="https://github.com/darshit-lagdhir/uidai-advisory-system" status="Research" />
                </motion.div>

                {/* PHASE 14 STEP 5: PROJECT FLOW TIMELINE */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 1.5, ease: GLOBAL_EASE }}
                >
                    <ProjectTimeline steps={["Data Ingestion", "Pattern Match", "Cluster Generation", "Advisory Flag"]} />
                </motion.div>

                {/* PHASE 15 NARRATIVE STORY BLOCKS */}
                <div className="flex flex-col gap-12 pointer-events-auto relative z-20 w-full pb-40">
                    <StoryBlock title="01_OVERVIEW">
                        <h2 className="text-medium text-white font-heading uppercase tracking-widest leading-tight">
                            Pattern Recognition Framework
                        </h2>
                        <p className="text-base text-white/50 leading-relaxed">
                            A human-in-the-loop advisory tool designed to identify biometric registration drifts. It clusters anomalies into risk categories to support decision-making without autonomous determination.
                        </p>
                    </StoryBlock>

                    <StoryBlock title="02_DETECTION">
                        <h2 className="text-medium text-white font-heading uppercase tracking-widest leading-tight">
                            Biometric Drift
                        </h2>
                        <p className="text-base text-white/50 leading-relaxed mb-4">
                            Detection of variants in fingerprint and iris telemetry. Grouping of registration signals into risk vectors enables assisted validation scoring for manual human-in-the-loop review cycles. Raw data is safely isolated from advisory outputs.
                        </p>
                    </StoryBlock>

                    <StoryBlock title="03_INFERENCE">
                        <p className="text-base text-white/50 leading-relaxed">
                            Algorithmic mapping determines standard deviation and drift without persistent storage of the biometric source.
                        </p>

                        <ScrollMoment>
                            <CodeBlockVisual code={[
                                'def evaluate_drift_vector(source, target):',
                                '    deviation = np.abs(source.matrix - target.matrix)',
                                '    if np.mean(deviation) > THRESHOLD_ALPHA:',
                                '        return flag_anomaly("BIOMETRIC_DRIFT")',
                                '    ',
                                '    return calculate_confidence(deviation)'
                            ]} />
                        </ScrollMoment>
                    </StoryBlock>
                </div>

                {/* SYSTEM EXIT NAVIGATION — PHASE 3 */}
                <div className="col-span-12 border-t border-white pt-32 pb-20 flex justify-between items-baseline">
                    <Link href="/" className="text-micro font-bold text-white/40 tracking-[0.6em] hover:text-white transition-all">
                        00_INDEX
                    </Link>
                    <Link href="/pfcv" className="text-micro font-bold text-white/40 tracking-[0.6em] hover:text-white transition-all group flex items-center gap-4">
                        NEXT_SYSTEM <span className="group-hover:translate-x-2 transition-transform">&rarr;</span>
                    </Link>
                </div>

            </div>
        </div>
    );
}
