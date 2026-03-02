"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";

export default function SmoothScroll() {
    const lenisRef = useRef<Lenis>(null);

    useEffect(() => {
        // PHASE 2 — CORE SCROLL ENGINE (INERTIA FIRST)
        const lenis = new Lenis({
            duration: 1.2, // Silky, fast response
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            touchMultiplier: 2,
            wheelMultiplier: 1,
            lerp: 0.1, // Controlled fluid movement
            smoothWheel: true,
            syncTouch: true,
        });

        lenisRef.current = lenis;

        let rafId: number;

        function raf(time: number) {
            lenis.raf(time);

            // Sync current scroll position for parallax components
            const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
            if (totalScroll > 0) {
                const scrollPercent = (lenis.scroll / totalScroll) * 100;
                document.documentElement.style.setProperty("--scroll-percent", `${scrollPercent}%`);
            }

            rafId = requestAnimationFrame(raf);
        }

        rafId = requestAnimationFrame(raf);

        // Standard smooth anchor scroll
        const scrollLinks = document.querySelectorAll('a[href^="#"]');
        const handleScroll = (e: Event) => {
            e.preventDefault();
            const anchor = e.currentTarget as HTMLAnchorElement;
            const id = anchor.getAttribute("href")?.slice(1);
            if (id) {
                const target = document.getElementById(id);
                if (target) {
                    lenis.scrollTo(target, {
                        offset: 0,
                        duration: 1.2,
                        easing: (t: number) => t === 1 ? 1 : 1 - Math.pow(2, -10 * t)
                    });
                }
            }
        };
        scrollLinks.forEach((anchor) => anchor.addEventListener("click", handleScroll));

        return () => {
            scrollLinks.forEach((anchor) => anchor.removeEventListener("click", handleScroll));
            cancelAnimationFrame(rafId);
            lenis.destroy();
        };
    }, []);

    return null;
}
