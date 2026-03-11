import { EngineeringDomain } from "@/types/project";

export const engineeringDomains: EngineeringDomain[] = [
    {
        id: "backend_arch",
        name: "Backend Architecture",
        description: "Focuses on building robust, scalable server-side systems with clear boundary separation and strict state management.",
        relatedDomains: ["distributed_systems", "security_engineering"]
    },
    {
        id: "data_intelligence",
        name: "Data Intelligence",
        description: "Engines designed for pattern detection, anomaly discovery, and human-in-the-loop diagnostic pipelines.",
        relatedDomains: ["backend_arch", "distributed_systems"]
    },
    {
        id: "systems_verification",
        name: "Systems Verification",
        description: "The science of ensuring safety gaps are closed through formal logic, AST analysis, and memory boundary validation.",
        relatedDomains: ["security_engineering", "backend_arch"]
    },
    {
        id: "distributed_systems",
        name: "Distributed Systems",
        description: "Architecture for high-throughput stream processing and non-blocking asynchronous task execution at scale.",
        relatedDomains: ["data_intelligence", "backend_arch"]
    },
    {
        id: "security_engineering",
        name: "Security Engineering",
        description: "Implementing role-based isolation, cryptographically secure handshakes, and hardened system perimeters.",
        relatedDomains: ["backend_arch", "systems_verification"]
    }
];
