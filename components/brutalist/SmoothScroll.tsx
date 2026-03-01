"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";

export default function SmoothScroll() {
    const lenisRef = useRef<Lenis>(null);

    useEffect(() => {
        // PHASE 3: SMOOTH INERTIA CALIBRATION (WEIGHTED SCROLL)
        const lenis = new Lenis({
            duration: 1.5, // Increased for "Heavier" feel
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential decay
            touchMultiplier: 1.5,
            wheelMultiplier: 1.1, // Slight boost for precision
            infinite: false,
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

        // PHASE 11: SECTION SNAP INTEGRATION (SOFT SNAP)
        const snapLinks = document.querySelectorAll('a[href^="#"]');
        const handleSnap = (e: Event) => {
            e.preventDefault();
            const anchor = e.currentTarget as HTMLAnchorElement;
            const id = anchor.getAttribute("href")?.slice(1);
            if (id) {
                const target = document.getElementById(id);
                if (target) {
                    lenis.scrollTo(target, {
                        offset: 0,
                        duration: 1.4,
                        easing: (t: number) => t === 1 ? 1 : 1 - Math.pow(2, -10 * t) // Cinematic snap
                    });
                }
            }
        };
        snapLinks.forEach((anchor) => anchor.addEventListener("click", handleSnap));

        return () => {
            snapLinks.forEach((anchor) => anchor.removeEventListener("click", handleSnap));
            cancelAnimationFrame(rafId);
            lenis.destroy();
        };
    }, []);

    return null;
}
