import { LaboratoryInvestigation } from "@/types/laboratory";

export const laboratoryExplorations: LaboratoryInvestigation[] = [
    {
        investigation_id: "jvm-memory-behavior",
        title: "JVM Memory Behavior",
        description: "An investigation into heap allocation and garbage collection to understand runtime performance bottlenecks.",
        context: "While studying Java runtime behavior, I became curious about how heap memory behaves and why unexpected memory usage occurs in high-concurrency environments.",
        insight: "Understanding heap allocation and garbage collection is essential for debugging runtime issues. It revealed the importance of object lifecycle management in preventing memory leaks.",
        related_domains: ["programming_languages", "systems_engineering"],
        status: "completed"
    },
    {
        investigation_id: "session-management-systems",
        title: "Session Management Systems",
        description: "Exploring the security trade-offs between stateless JWTs and database-backed session storage.",
        context: "While building MoveX, I had to design a session system to manage authentication across multiple distinct dashboards for various user roles.",
        insight: "Session security, token management, and database-backed sessions are critical for backend applications. Implementing server-side session invalidation significantly improved the system's security posture.",
        related_projects: ["movex"],
        related_domains: ["backend_systems", "systems_engineering"],
        status: "completed"
    },
    {
        investigation_id: "database-schema-design",
        title: "Database Schema Design",
        description: "A deep dive into relational integrity and schema optimization for complex operational workflows.",
        context: "Building the MoveX logistics system required designing relational schemas that support shipments, organizations, and users while ensuring data consistency.",
        insight: "Database design directly affects system reliability and performance. Using database-level constraints instead of just application-level logic ensured high-assurance state tracking.",
        related_projects: ["movex"],
        related_domains: ["data_systems"],
        status: "completed"
    },
    {
        investigation_id: "ffi-boundaries",
        title: "Foreign Function Interface Boundaries",
        description: "Investigating memory safety and ABI compatibility when bridging high-level languages with native C/C++ libs.",
        context: "While working on the PFCV project, I explored how high-level languages interact with native libraries and where the most common failure points occur.",
        insight: "Incorrect memory ownership and pointer handling across language boundaries can cause catastrophic crashes. Rigorous contract verification at the AST level is necessary for cross-language safety.",
        related_projects: ["pfcv"],
        related_domains: ["programming_languages", "systems_engineering"],
        status: "ongoing"
    },
    {
        investigation_id: "debugging-system-failures",
        title: "Debugging System Failures",
        description: "A continuous study of post-mortem analysis and tracing techniques for complex architectural failures.",
        context: "Many development cycles involved tracing failures that occurred during system development, leading to a more structured approach to debugging.",
        insight: "Debugging often reveals deeper architectural issues that were not obvious during initial design. It is a vital tool for reverse-engineering system assumptions.",
        related_domains: ["systems_engineering"],
        status: "ongoing"
    }
];
