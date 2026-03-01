"use client";

import { motion } from "framer-motion";

export default function BrutalistContact() {
    const ease = [0.16, 1, 0.3, 1] as const;

    return (
        <section className="snap-section" id="contact">
            <div className="grid-layout items-end">
                {/* Conclusion Identifier */}
                <div className="col-span-12 mb-20 lg:mb-32">
                    <span className="font-wide text-step--1 text-muted uppercase tracking-micro font-bold">
                        NETWORK CHANNEL // SELECTION
                    </span>
                </div>

                {/* Signature Statement */}
                <div className="col-span-12 lg:col-span-10 flex flex-col gap-10">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease }}
                        viewport={{ once: true, margin: "-10%" }}
                        className="font-title text-step-5 text-white uppercase tracking-tight-title"
                        style={{ willChange: "transform, opacity" }}
                    >
                        CONNECT.
                    </motion.h2>
                    <p className="font-body text-step-1 text-muted font-light max-w-[45ch] leading-relaxed">
                        Systems are active. Logic is priority. <br />
                        Archive is always open for modular collaboration and high-authority engineering.
                    </p>
                </div>

                {/* Final Architectural Footer */}
                <div className="col-span-12 border-t border-border pt-16 lg:pt-24 mt-32 lg:mt-48">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-baseline w-full">
                        <div className="md:col-span-7">
                            <span className="font-wide text-step--1 text-muted uppercase tracking-micro font-bold">
                                DARSHIT LAGDHIR // ARCHITECTURAL INDEX
                            </span>
                        </div>
                        <div className="md:col-span-5 flex justify-end gap-12 lg:gap-16">
                            {[
                                { name: "GITHUB", url: "https://github.com/darshit-lagdhir" },
                                { name: "LINKEDIN", url: "https://linkedin.com/in/darshit-lagdhir" }
                            ].map((l, i) => (
                                <a
                                    key={i}
                                    href={l.url}
                                    target="_blank"
                                    className="font-wide text-step-0 text-white uppercase tracking-micro hover:text-muted transition-colors duration-200 font-bold"
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




