"use client";

import { useState, useEffect } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Hook to track scroll position with high performance
 */
export function useScrollPosition() {
  const [scrollPos, setScrollPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let ticking = false;

    const updatePosition = () => {
      setScrollPos({ x: window.scrollX, y: window.scrollY });
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
 * Detect if an element is in view with a specific offset
 */
export function useInView(ref: React.RefObject<HTMLElement | null>, offset = "0px") {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { rootMargin: offset }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, offset]);

  return isInView;
}

/**
 * Interaction State Management for transient UI states
 */
export function useInteractionState<T>(initialValue: T, resetDelay = 1000) {
  const [state, setState] = useState<T>(initialValue);

  const setWithReset = (newValue: T) => {
    setState(newValue);
    setTimeout(() => setState(initialValue), resetDelay);
  };

  return [state, setWithReset] as const;
}

/**
 * Centralized Motion Orchestrator (Phase 1 & 9)
 * Detects reduced motion preferences and provides consistent timing logic.
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
 * Detects focus visibility for high-fidelity accessibility (Phase 8)
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
