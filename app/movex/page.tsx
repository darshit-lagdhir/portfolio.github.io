"use client";

import { useScene } from "@/context/SceneContext";
import {
    ProjectEntryLoader,
    SystemHeaderBar,
    SystemGridOverlay,
    ProjectPanel,
    ProjectMetadata,
    ProjectTimeline,
    ArchitectureVisual,
    CodeBlockVisual,
    StoryBlock,
    ScrollMoment
} from "@/components/brutalist/SystemComponents";
import { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import ProjectCredibility from "@/components/brutalist/ProjectCredibility";

const GLOBAL_EASE = [0.25, 1, 0.5, 1] as [number, number, number, number];

export default function MoveXPage() {
    const { setActiveSection } = useScene();

    useEffect(() => {
        setActiveSection("projects");
    }, [setActiveSection]);

    return (
        <div className="min-h-screen w-full bg-black text-white relative py-40 px-[5vw] font-sans selection:bg-white selection:text-black">
            <ProjectEntryLoader />
            <SystemHeaderBar current="MOD_MOVEX" />
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
                            01_LOGISTICS // MECHANICAL_SYNC
                        </span>
                        <motion.h1
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1.5, ease: GLOBAL_EASE }}
                            className="text-large md:text-massive italic text-white font-heading leading-[0.85] uppercase tracking-tight-title origin-left glitch-safe flex flex-wrap"
                        >
                            {"MOVEX_SYSTEM".split("").map((char, i) => (
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
                            Modular backend infrastructure for role-isolated logistics management. Built with Node.js and PostgreSQL.
                        </p>
                    </div>
                </motion.div>

                {/* PHASE 14 STEP 6: PROJECT METADATA */}
                <ProjectMetadata
                    type="Backend / UI Integration"
                    language="TypeScript"
                    arch="Modular Monolith"
                    tech={["Node.js", "Express", "PostgreSQL", "React"]}
                />
                <ProjectCredibility repoName="movex" githubUrl="https://github.com/darshit-lagdhir/movex" status="Production" />

                {/* PHASE 14 STEP 5: PROJECT FLOW TIMELINE */}
                <ProjectTimeline steps={["Design", "Architecture", "Isolation", "Rollout"]} />

                {/* PHASE 15 STEP 5 & 8: NARRATIVE STORY BLOCKS */}
                <div className="flex flex-col gap-12 pointer-events-auto relative z-20 w-full pb-40">
                    <StoryBlock title="01_OVERVIEW">
                        <h2 className="text-medium text-white font-heading uppercase tracking-widest leading-tight">
                            Secure Logistics Pathway
                        </h2>
                        <p className="text-base text-white/50 leading-relaxed">
                            MoveX implements strict role-based pathway isolation, ensuring that interactions are secure and auditable. The architecture focuses on data access integrity and zero-trust reliability within supply chain operations.
                        </p>
                    </StoryBlock>

                    <StoryBlock title="02_ARCHITECTURE">
                        <h2 className="text-medium text-white font-heading uppercase tracking-widest leading-tight">
                            Isolated Dashboards
                        </h2>
                        <p className="text-base text-white/50 leading-relaxed mb-4">
                            UI/UX separation based on verified role signatures. Session propagation utilizes JWTs with rotating secret validation. Core components interact via type-safe abstractions.
                        </p>

                        {/* PHASE 15 STEP 11: SCROLL MOMENT EMPHASIS */}
                        <ScrollMoment>
                            <ArchitectureVisual />
                        </ScrollMoment>
                    </StoryBlock>

                    <StoryBlock title="03_IMPLEMENTATION">
                        <p className="text-base text-white/50 leading-relaxed">
                            Immutable state-change ledger records all transaction activities securely across the database boundary.
                        </p>

                        <ScrollMoment>
                            <CodeBlockVisual code={[
                                'async function verifyPathway(req, res) {',
                                '  const token = req.headers["x-sys-auth"];',
                                '  if (!token) throw new AuthError("NO_SIG");',
                                '  ',
                                '  const decoded = await JwtUtil.verify(token);',
                                '  if (decoded.role !== "ADMIN") return drop();',
                                '  ',
                                '  return next();',
                                '}'
                            ]} />
                        </ScrollMoment>
                    </StoryBlock>
                </div>

                {/* SYSTEM EXIT NAVIGATION — PHASE 3 */}
                <div className="col-span-12 border-t border-white pt-32 pb-20 flex justify-between items-baseline">
                    <Link href="/" className="text-micro font-bold text-white/40 tracking-[0.6em] hover:text-white transition-all">
                        00_INDEX
                    </Link>
                    <Link href="/uidai" className="text-micro font-bold text-white/40 tracking-[0.6em] hover:text-white transition-all group flex items-center gap-4">
                        NEXT_SYSTEM <span className="group-hover:translate-x-2 transition-transform">&rarr;</span>
                    </Link>
                </div>

            </div>
        </div>
    );
}
