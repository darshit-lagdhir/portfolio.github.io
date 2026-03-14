import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { projects } from "@/data/projects";
import { Project } from "@/types/project";

/**
 * --- CORE UTILITIES ---
 * Standard tailwind class merging utility.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Detects if the current device supports touch interactions.
 */
export const isTouchDevice = () => {
  if (typeof window === 'undefined') return false;
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
};

/**
 * --- STRING UTILITIES ---
 */

/**
 * Converts slugs or snake_case IDs to human-readable labels.
 * Example: "backend_systems" -> "Backend Systems"
 */
export function unslugify(str: string): string {
  return str
    .replace(/_/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Standardizes technical labels.
 */
export function formatLabel(label: string): string {
  return label.toUpperCase();
}

/**
 * --- DATA UTILITIES: PROJECTS ---
 */

/**
 * Retrieves a project by its slug.
 */
export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find(p => p.slug === slug);
}

/**
 * Returns projects filtered by their tier classification.
 */
export function getTierProjects(tier: number): Project[] {
  return projects.filter(p => p.tier === tier);
}

/**
 * Finds the index of a project in the global manifest.
 */
export function getProjectIndex(slug: string): number {
  return projects.findIndex(p => p.slug === slug);
}

/**
 * Returns the next project in the manifest for sequential exploration.
 */
export function getNextProject(slug: string): Project {
  const currentIndex = getProjectIndex(slug);
  return projects[(currentIndex + 1) % projects.length];
}

/**
 * Maps project status strings to visual metadata.
 */
export function getStatusMetadata(status: string) {
  const s = status.toLowerCase();
  
  if (s.includes("complete")) {
    return { color: "bg-green-500/50", label: "COMPLETE" };
  }
  if (s.includes("active") || s.includes("development")) {
    return { color: "bg-yellow-500/50 pulse", label: "ACTIVE_DEVELOPMENT" };
  }
  if (s.includes("hackathon")) {
    return { color: "bg-blue-400/50", label: "HACKATHON_PROJECT" };
  }
  
  return { color: "bg-yellow-500/50 pulse", label: "IN_DEVELOPMENT" };
}

/**
 * --- URL UTILITIES ---
 */

/**
 * Generates the internal routing path for a project node.
 * Pulls directly from the centralized route definition in data/projects.ts.
 */
export function getProjectUrl(slug: string): string {
  const project = getProjectBySlug(slug);
  return project?.route || `/${slug}`;
}
