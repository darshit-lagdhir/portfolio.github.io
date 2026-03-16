"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * --- SCROLL BEHAVIOR ---
 * Optimized scroll tracking with requestAnimationFrame.
 */
export function useScrollPosition() {
  const [scrollPos, setScrollPos] = useState({ x: 0, y: 0 });
  const lastPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    let ticking = false;

    const updatePosition = () => {
      const x = window.scrollX;
      const y = window.scrollY;
      
      // Only update state if position changed significantly to reduce re-renders
      if (Math.abs(y - lastPos.current.y) > 0.5 || Math.abs(x - lastPos.current.x) > 0.5) {
        setScrollPos({ x, y });
        lastPos.current = { x, y };
      }
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updatePosition);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    updatePosition();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return scrollPos;
}

/**
 * Calculates scroll progress and scrolled state.
 */
export function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const { y } = useScrollPosition();

  useEffect(() => {
    const docElement = document.documentElement;
    const scrollHeight = docElement.scrollHeight - window.innerHeight;
    
    if (scrollHeight > 0) {
      const p = parseFloat((y / scrollHeight).toFixed(3));
      setProgress(p);
    }
    
    setIsScrolled(y > 100);
  }, [y]);

  return { progress, isScrolled };
}

/**
 * --- VISIBILITY DETECTION ---
 * Higher performance viewport observation using IntersectionObserver.
 */
export function useIntersectionObserver(
  options: IntersectionObserverInit = { threshold: 0.1, rootMargin: "0px" }
) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const elementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, options);

    observer.observe(el);
    return () => {
      observer.disconnect();
    };
  }, [options.threshold, options.rootMargin]);

  return [elementRef, isIntersecting] as const;
}

/**
 * --- CURSOR INTERACTION ---
 * Centralized mouse tracking with mobile detection and performance guards.
 */
export function useMousePosition() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const [hasMoved, setHasMoved] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 1024);
    };

    if (typeof window === "undefined") return;
    checkMobile();

    const handleMouseMove = (e: MouseEvent) => {
      if (isMobile) return;
      
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!hasMoved) setHasMoved(true);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", checkMobile);
    };
  }, [isMobile, hasMoved]);

  return { ...mousePosition, isMobile, hasMoved };
}

/**
 * --- HOVER TRACKING ---
 * Reusable utility to detect interaction states for specific elements.
 */
export function useHoverState() {
  const [hoverType, setHoverType] = useState<"default" | "hover" | "active">("default");

  const onMouseEnter = useCallback(() => setHoverType("hover"), []);
  const onMouseLeave = useCallback(() => setHoverType("default"), []);
  const onMouseDown = useCallback(() => setHoverType("active"), []);
  const onMouseUp = useCallback(() => setHoverType("hover"), []);

  return { 
    hoverType, 
    bind: { onMouseEnter, onMouseLeave, onMouseDown, onMouseUp } 
  };
}

/**
 * --- NAVIGATION STATE ---
 * Detects the active section based on scroll offset.
 */
export function useActiveSection(sectionIds: string[], offsetMargin = "-25% 0px -40% 0px") {
  const [activeSection, setActiveSection] = useState<string>(sectionIds[0]);
  const isScrollingRef = useRef(false);
  
  useEffect(() => {
    // Increase threshold granularity for high-resolution tracking
    const observer = new IntersectionObserver((entries) => {
      // Find the entry with the largest intersection ratio if multiple intersect
      const intersecting = entries.filter(e => e.isIntersecting);
      if (intersecting.length > 0) {
        // Sort by how much of the section is visible
        const mostVisible = intersecting.reduce((prev, current) => 
          (prev.intersectionRatio > current.intersectionRatio) ? prev : current
        );
        setActiveSection(mostVisible.target.id);
      }
    }, { 
      rootMargin: offsetMargin, 
      threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5] 
    });

    const handleScroll = () => {
      // Immediate reset for very top of page
      if (window.scrollY < 100) {
        setActiveSection(sectionIds[0]);
      }
      
      // Bottom of page safety: force last section if at the very bottom
      if ((window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 50) {
        setActiveSection(sectionIds[sectionIds.length - 1]);
      }
    };

    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [sectionIds, offsetMargin]);

  return activeSection;
}

/**
 * --- MOTION ORCHESTRATION ---
 * Centralizes spring and transition configurations for consistent UI behavior.
 */
export function useInteractionMotion() {
  const shouldReduceMotion = useReducedMotion();
  
  const getSpringConfig = (type: 'snappy' | 'smooth' | 'cinematic') => {
    if (shouldReduceMotion) return { duration: 0, bounce: 0 };
    
    switch (type) {
      case 'snappy': return { stiffness: 400, damping: 30, mass: 1 };
      case 'smooth': return { stiffness: 100, damping: 20, mass: 1 };
      case 'cinematic': return { stiffness: 50, damping: 15, mass: 1 };
    }
  };

  const getTransition = (type: 'snappy' | 'smooth' | 'cinematic') => {
    if (shouldReduceMotion) return { duration: 0 };
    
    switch (type) {
      case 'snappy': return { duration: 0.2, ease: [0.2, 0, 0, 1] };
      case 'smooth': return { duration: 0.4, ease: [0.4, 0, 0.2, 1] };
      case 'cinematic': return { duration: 0.8, ease: [0.16, 1, 0.3, 1] };
    }
  };

  return { shouldReduceMotion, getSpringConfig, getTransition };
}

/**
 * Detects focus visibility for accessibility.
 */
export function useFocusVisible() {
  const [isFocusVisible, setIsFocusVisible] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') setIsFocusVisible(true);
    };
    const handleMouseDown = () => setIsFocusVisible(false);

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('mousedown', handleMouseDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);

  return isFocusVisible;
}

/**
 * --- PERFORMANCE DETECTION ---
 */
export function usePerformanceDetection() {
  const [isLowPerf, setIsLowPerf] = useState(false);

  useEffect(() => {
    if (typeof navigator !== 'undefined') {
      const cores = navigator.hardwareConcurrency || 4;
      // @ts-expect-error - deviceMemory is not standard
      const memory = navigator.deviceMemory || 8;
      const isSlow = cores <= 4 || memory <= 4;
      setIsLowPerf(isSlow);
    }
  }, []);

  return isLowPerf;
}
