import { EngineeringDomain } from "@/types/project";

export const engineeringDomains: EngineeringDomain[] = [
    {
        id: "systems_engineering",
        name: "Systems Engineering",
        description: "Studying how complex software systems behave internally — exploring service communication, failure points, and the internal mechanics of applications.",
        relatedDomains: ["backend_systems", "programming_languages", "security_linux"],
        relatedTech: ["Node.js Internals", "Clang Tooling", "Architecture Patterns"],
        relatedProjects: ["PFCV", "MoveX"]
    },
    {
        id: "programming_languages",
        name: "Programming Languages",
        description: "Exploring language-level mechanics and deep data structures using C++, Java, and Python. Investigating cross-language boundaries and memory safety.",
        relatedDomains: ["systems_engineering", "security_linux"],
        relatedTech: ["C", "C++", "Java", "Python", "Rust"],
        relatedProjects: ["PFCV"]
    },
    {
        id: "backend_systems",
        name: "Backend Systems",
        description: "Designing server-side architectures, API structures, and session-based authentication workflows for operational scale.",
        relatedDomains: ["systems_engineering", "data_systems"],
        relatedTech: ["Node.js", "Express", "REST APIs", "JWT", "Session Auth"],
        relatedProjects: ["MoveX"]
    },
    {
        id: "data_systems",
        name: "Data Systems",
        description: "Managing operational data persistence and exploring how database schemas and storage engines function under the hood.",
        relatedDomains: ["backend_systems", "ai_exploration"],
        relatedTech: ["PostgreSQL", "MySQL", "MongoDB", "SQLite"],
        relatedProjects: ["MoveX", "UIDAI"]
    },
    {
        id: "ai_exploration",
        name: "AI Exploration",
        description: "Experimenting with artificial intelligence and pattern detection using Python to highlight signals in large datasets. This is an active learning area.",
        relatedDomains: ["data_systems", "programming_languages"],
        relatedTech: ["Python", "Pandas", "Scikit-Learn", "NumPy"],
        relatedProjects: ["UIDAI"]
    },
    {
        id: "security_linux",
        name: "Security & Linux",
        description: "Exploring Linux environments and system security concepts to understand how boundaries are enforced and where systems fail.",
        relatedDomains: ["systems_engineering", "programming_languages"],
        relatedTech: ["Linux Internals", "Security Boundaries", "Resource Management"],
        relatedProjects: []
    }
];
