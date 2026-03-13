import { EngineeringDomain } from "@/types/project";

export const engineeringDomains: EngineeringDomain[] = [
    {
        domain_id: "systems_engineering",
        name: "Systems Engineering",
        description: "Focusing on how complex software systems behave internally and how architectural decisions affect long-term stability and resilience.",
        connected_domains: ["programming_languages", "linux_security"],
        technologies: ["Node.js Internals", "System Architecture", "Observation Patterns"],
        related_projects: ["PFCV", "MoveX"]
    },
    {
        domain_id: "programming_languages",
        name: "Programming Languages",
        description: "Studying language internals and exploring deep data structures using C, C++, and Java to understand low-level execution and memory behavior.",
        connected_domains: ["systems_engineering"],
        technologies: ["C", "C++", "Java", "Python", "JavaScript", "TypeScript"],
        related_projects: ["PFCV"]
    },
    {
        domain_id: "backend_systems",
        name: "Backend Systems",
        description: "Designing reliable server-side architectures, API structures, and session-based authentication workflows using Node.js and Express.",
        connected_domains: ["data_systems"],
        technologies: ["Node.js", "Express", "REST APIs", "Session Auth", "Middlewares"],
        related_projects: ["MoveX"]
    },
    {
        domain_id: "data_systems",
        name: "Data Systems",
        description: "Designing robust database schemas and understanding how structured data persistence supports high-assurance application state.",
        connected_domains: ["backend_systems", "ai_exploration"],
        technologies: ["PostgreSQL", "MySQL", "MongoDB", "SQLite"],
        related_projects: ["MoveX", "UIDAI"]
    },
    {
        domain_id: "ai_exploration",
        name: "Artificial Intelligence Exploration",
        description: "Researching how advisory AI systems can support human decision-making and exploring basic machine learning concepts using Python.",
        connected_domains: ["data_systems"],
        technologies: ["Python", "Data Analysis Tools", "NumPy", "Pandas"],
        related_projects: ["UIDAI"]
    },
    {
        domain_id: "linux_security",
        name: "Linux and Security",
        description: "Investigating operating system internals, Linux environments, and studying foundational cybersecurity concepts and system boundaries.",
        connected_domains: ["systems_engineering"],
        technologies: ["Linux Environments", "System Configuration", "Security Fundamentals"],
        related_projects: []
    }
];
