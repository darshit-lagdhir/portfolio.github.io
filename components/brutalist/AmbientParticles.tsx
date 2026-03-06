"use client";

import { useEffect, useRef, useCallback } from "react";
import { useScene } from "@/context/SceneContext";

// PHASE 12 STEP 1, 2, 7, 10, 12, 13: AMBIENT PARTICLE FIELD
// Canvas-based for maximum performance. Particles are tiny, low opacity, slow.
// They respond to cursor (Step 2), fade in white sections (Step 7),
// accelerate with scroll (Step 10), and reduce on mobile (Step 13).

interface Particle {
    x: number;
    y: number;
    baseX: number;
    baseY: number;
    vx: number;
    vy: number;
    size: number;
    opacity: number;
    depth: number; // 1 = background, 2 = mid, 3 = foreground
}

export default function AmbientParticles() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouseRef = useRef({ x: -1000, y: -1000 });
    const scrollVelRef = useRef(0);
    const lastScrollRef = useRef(0);
    const particlesRef = useRef<Particle[]>([]);
    const rafRef = useRef<number>(0);
    const isWhiteSectionRef = useRef(false);

    // PHASE 16 STEP 12 & 13: SYSTEM IDLE STATE
    const { isIdle } = useScene();
    const isIdleRef = useRef(isIdle);
    useEffect(() => { isIdleRef.current = isIdle; }, [isIdle]);

    const initParticles = useCallback((width: number, height: number) => {
        // PHASE 28 STEP 6: PARTICLE ATMOSPHERE REFINEMENT (Ambient Dust)
        const isMobile = width < 768;
        const count = isMobile ? 12 : 30; // Reduced count
        const particles: Particle[] = [];

        for (let i = 0; i < count; i++) {
            const x = Math.random() * width;
            const y = Math.random() * height;
            // PHASE 24 STEP 9: DEPTH LAYERS ATTRIBUTES
            const depth = Math.random() > 0.7 ? 3 : Math.random() > 0.4 ? 2 : 1;

            particles.push({
                x,
                y,
                baseX: x,
                baseY: y,
                // PHASE 28 STEP 6: Extremely slow ambient drift
                vx: (Math.random() - 0.5) * 0.05 * depth,
                vy: ((Math.random() - 0.5) * 0.04 + 0.01) * (depth * 0.5),
                size: (Math.random() * 0.8 + 0.2) * depth,
                // PHASE 28 STEP 6: Drastically lowered opacity for cinematic feel
                opacity: (Math.random() * 0.02 + 0.005) * depth,
                depth
            });
        }
        particlesRef.current = particles;
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            if (particlesRef.current.length === 0) {
                initParticles(canvas.width, canvas.height);
            }
        };
        resize();
        window.addEventListener("resize", resize);

        // Track mouse
        const onMouseMove = (e: MouseEvent) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };
            // Step 7: Detect if cursor is over white section
            const target = e.target as HTMLElement;
            isWhiteSectionRef.current = !!target.closest(".bg-white");
        };
        window.addEventListener("mousemove", onMouseMove, { passive: true });

        // Step 10: Track scroll velocity
        const onScroll = () => {
            const current = window.scrollY;
            scrollVelRef.current = Math.abs(current - lastScrollRef.current);
            lastScrollRef.current = current;
        };
        window.addEventListener("scroll", onScroll, { passive: true });

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Step 7: Fade particles in white sections
            const globalFade = isWhiteSectionRef.current ? 0.15 : 1;

            const { x: mx, y: my } = mouseRef.current;
            // Step 10: Scroll velocity boost + PHASE 16 STEP 12 & 13: IDLE REDUCTION
            const idleMultiplier = isIdleRef.current ? 0.3 : 1;
            const scrollBoost = (1 + Math.min(scrollVelRef.current * 0.01, 2)) * idleMultiplier;
            scrollVelRef.current *= 0.95; // Decay

            particlesRef.current.forEach((p) => {
                // Move particles
                p.x += p.vx * scrollBoost;
                p.y += p.vy * scrollBoost;

                // Step 2 + PHASE 24 STEP 4: Cursor disturbance — spatial depth response
                const dx = p.x - mx;
                const dy = p.y - my;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 120 * p.depth) {
                    const force = (120 * p.depth - dist) / (120 * p.depth);
                    p.x += (dx / dist) * force * p.depth;
                    p.y += (dy / dist) * force * p.depth;
                }

                // Wrap around screen edges
                if (p.x < -10) p.x = canvas.width + 10;
                if (p.x > canvas.width + 10) p.x = -10;
                if (p.y < -10) p.y = canvas.height + 10;
                if (p.y > canvas.height + 10) p.y = -10;

                // PHASE 18 STEP 5: PARTICLE LIGHT RESPONSE
                const lightDist = Math.sqrt(dx * dx + dy * dy);
                const lightBoost = lightDist < 300 ? (1 - lightDist / 300) * 0.4 : 0;

                // Draw
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${(p.opacity + lightBoost) * globalFade})`;
                ctx.fill();
            });

            rafRef.current = requestAnimationFrame(animate);
        };

        rafRef.current = requestAnimationFrame(animate);

        return () => {
            cancelAnimationFrame(rafRef.current);
            window.removeEventListener("resize", resize);
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("scroll", onScroll);
        };
    }, [initParticles]);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-[35]"
            style={{ mixBlendMode: "screen" }}
        />
    );
}
