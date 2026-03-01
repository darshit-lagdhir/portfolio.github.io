"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const projects = [
    {
        name: "MoveX",
        slug: "/movex",
        descriptor: "Secure Backend Logistics Architecture",
        index: "ARC-001"
    },
    {
        name: "UIDAI SYSTEM",
        slug: "/uidai",
        descriptor: "Advisory Intelligence Pattern Detection",
        index: "ARC-002"
    },
    {
        name: "POLYGLOT FFI",
        slug: "/pfcv",
        descriptor: "Cross-Language Contract Verifier",
        index: "ARC-003"
    }
];

export default function BrutalistProjectsPreview() {
    const ease = [0.16, 1, 0.3, 1] as const;

    return (
        <section className="snap-section" id="projects">
            <div className="grid-layout">
                {/* Selector Label */}
                <div className="col-span-12 mb-16 lg:mb-24">
                    <span className="font-wide text-step--1 text-muted uppercase tracking-micro font-bold">
                        SYSTEMS ARCHIVE // SELECTION
                    </span>
                </div>

                {/* 3 Physical Panels */}
                <div className="col-span-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                    {projects.map((p, i) => (
                        <Link key={i} href={p.slug} className="group flex">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: i * 0.1, ease }}
                                viewport={{ once: true }}
                                whileHover={{ y: -4 }}
                                className="w-full min-h-[520px] border border-border bg-surface p-12 flex flex-col justify-between hover:border-muted transition-all duration-300"
                            >
                                <div className="flex flex-col gap-10">
                                    <span className="font-wide text-step--1 text-muted uppercase tracking-micro">
                                        INDEX // {p.index}
                                    </span>
                                    <h3 className="font-title text-step-3 text-white uppercase tracking-tight-title group-hover:text-muted transition-colors duration-300">
                                        {p.name}
                                    </h3>
                                    <p className="font-body text-step-0 text-muted font-light leading-snug max-w-[22ch]">
                                        {p.descriptor}
                                    </p>
                                </div>

                                <div className="border-t border-border pt-10 flex items-center group-hover:border-muted transition-colors duration-300">
                                    <span className="font-wide text-step--1 text-white uppercase tracking-micro font-bold">
                                        ENTER SYSTEM &rarr;
                                    </span>
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}


