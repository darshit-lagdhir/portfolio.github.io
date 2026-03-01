"use client";

import { motion } from "framer-motion";

export default function BrutalistContact() {
    const ease = [0.16, 1, 0.3, 1] as const;

    return (
        <section className="snap-section" id="contact">
            <div className="grid-layout items-end">
                {/* Identification Label (Grid Zone 1) */}
                <div className="col-span-12 mb-20 lg:mb-32">
                    <span className="font-wide text-step--1 text-muted uppercase tracking-micro font-bold">
                        05 CONNECT
                    </span>
                </div>

                {/* Primary Anchor (Grid Zone 1-12) */}
                <div className="col-span-12 lg:col-span-10 flex flex-col gap-10">
                    <h2 className="font-title text-step-5 text-white uppercase tracking-tight-title">
                        CONNECT.
                    </h2>
                </div>

                {/* Structural Footer (Grid Zone 1-12) */}
                <div className="col-span-12 border-t border-border pt-12 mt-40 lg:mt-64 pb-8">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-baseline w-full">
                        {/* Selector Context (Grid Zone 1-7) */}
                        <div className="md:col-span-12 lg:col-span-7">
                            <span className="font-wide text-step--1 text-muted uppercase tracking-micro font-bold">
                                DARSHIT LAGDHIR // ARCHITECTURAL INDEX
                            </span>
                        </div>

                        {/* Network Channels (Grid Zone 9-12: R-Aligned) */}
                        <div className="md:col-span-12 lg:col-span-4 lg:col-start-9 flex justify-end gap-12 lg:gap-16">
                            {[
                                { name: "GITHUB", url: "https://github.com/darshit-lagdhir" },
                                { name: "LINKEDIN", url: "https://linkedin.com/in/darshit-lagdhir" }
                            ].map((l, i) => (
                                <a
                                    key={i}
                                    href={l.url}
                                    target="_blank"
                                    className="font-wide text-step-0 text-muted uppercase tracking-micro hover:text-white transition-colors duration-200 font-bold"
                                >
                                    {l.name}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
