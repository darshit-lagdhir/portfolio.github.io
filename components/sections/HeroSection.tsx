"use client";

import { useRef } from "react";
import Container from "@/components/layout/Container";
import { motion, useScroll, useTransform } from "framer-motion";
import { motionConfig } from "@/lib/motion";

export default function HeroSection() {
    const ref = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });

    const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.3]);
    const y = useTransform(scrollYProgress, [0, 1], [0, 40]);
    const scale = useTransform(scrollYProgress, [0, 1], [1, 0.97]);

    return (
        <section ref={ref} className="py-24">
            <Container>
                <motion.div
                    style={{ opacity, y, scale }}
                    className="max-w-3xl"
                >
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: motionConfig.medium,
                            ease: motionConfig.ease,
                        }}
                    >
                        <h1 className="text-5xl md:text-6xl font-semibold tracking-[-0.02em]">
                            Darshit Lagdhir
                        </h1>

                        <p className="mt-6 text-xl md:text-2xl text-neutral-600 dark:text-neutral-400">
                            Systems-Focused Developer
                        </p>

                        <p className="mt-6 text-base md:text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed">
                            Focused on backend systems, clean architecture, and practical
                            execution under real constraints.
                        </p>

                        <div className="mt-10 flex flex-col sm:flex-row gap-4">
                            <a
                                href="#projects"
                                className="px-6 py-3 rounded-md bg-black text-white dark:bg-white dark:text-black text-sm font-medium transition-transform hover:scale-[1.02] active:scale-[0.98] text-center"
                            >
                                View Systems
                            </a>

                            <a
                                href="/resume.pdf"
                                className="px-6 py-3 rounded-md border border-neutral-400 dark:border-neutral-600 text-sm font-medium transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800 text-center"
                            >
                                Download Resume
                            </a>
                        </div>
                    </motion.div>
                </motion.div>
            </Container>
        </section>
    );
}
