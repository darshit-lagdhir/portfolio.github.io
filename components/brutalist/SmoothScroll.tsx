"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";

export default function SmoothScroll() {
    const lenisRef = useRef<Lenis>(null);

    useEffect(() => {
        // PHASE 2 — CORE SCROLL ENGINE (INERTIA FIRST)
        const lenis = new Lenis({
            duration: 1.5, // Cinematic duration
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            touchMultiplier: 1.5,
            wheelMultiplier: 1.2,
            lerp: 0.08, // Extra fluid
            smoothWheel: true,
            syncTouch: true,
        });

        lenisRef.current = lenis;

        // PHASE 26 STEP 2: SECTION SNAP STRUCTURE
        // Note: Logic to handle precise snapping to section IDs
        const handleSnap = () => {
            const sections = ['hero', 'projects', 'about', 'contact'];
            let closestSection = '';
            let minDistance = Infinity;

            sections.forEach(id => {
                const el = document.getElementById(id);
                if (el) {
                    const distance = Math.abs(el.getBoundingClientRect().top);
                    if (distance < minDistance && distance < window.innerHeight / 3) {
                        minDistance = distance;
                        closestSection = id;
                    }
                }
            });

            if (closestSection && minDistance > 10 && minDistance < 150) {
                const target = document.getElementById(closestSection);
                if (target) {
                    lenis.scrollTo(target, {
                        duration: 1.2,
                        easing: (t) => 1 - Math.pow(2, -10 * t)
                    });
                }
            }
        };

        let rafId: number;
        let snapTimeout: any;

        function raf(time: number) {
            lenis.raf(time);

            // Sync scroll progress
            const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
            if (totalScroll > 0) {
                const scrollPercent = (lenis.scroll / totalScroll) * 100;
                document.documentElement.style.setProperty("--scroll-percent", `${scrollPercent}%`);
            }

            rafId = requestAnimationFrame(raf);
        }

        rafId = requestAnimationFrame(raf);

        // STEP 11: VELOCITY MONITORING for Snap
        lenis.on('scroll', () => {
            clearTimeout(snapTimeout);
            if (Math.abs(lenis.velocity) < 0.1) {
                snapTimeout = setTimeout(handleSnap, 150);
            }
        });

        // Standard smooth anchor scroll
        const scrollLinks = document.querySelectorAll('a[href^="#"]');
        const handleLinkClick = (e: Event) => {
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
        scrollLinks.forEach((anchor) => anchor.addEventListener("click", handleLinkClick));

        return () => {
            scrollLinks.forEach((anchor) => anchor.removeEventListener("click", handleLinkClick));
            cancelAnimationFrame(rafId);
            lenis.destroy();
        };
    }, []);

    return null;
}
