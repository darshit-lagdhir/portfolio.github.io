export interface LaboratoryExploration {
    id: string;
    title: string;
    description: string;
    field: string;
    tech: string[];
    relatedProject?: string;
}

export const laboratoryExplorations: LaboratoryExploration[] = [
    {
        id: "data-structures",
        title: "Deep Data Structures",
        description: "Studying advanced algorithm design and performance optimization using Java and C++ to understand memory layout and execution complexity.",
        field: "Algorithms",
        tech: ["Java", "C++", "DSA"]
    },
    {
        id: "system-internals",
        title: "System Internals & JVM",
        description: "Exploring how systems behave internally, including memory management, process interaction, and JVM failure patterns.",
        field: "Systems",
        tech: ["JVM", "Linux", "Memory Diagnostics"]
    },
    {
        id: "cross-language",
        title: "Cross-Language Interfaces",
        description: "Investigating how high-level languages like Python and Rust interact with native C/C++ libraries via FFI, and how safety issues arise at these boundaries.",
        field: "FFI Safety",
        tech: ["Rust", "Python", "Clang AST"],
        relatedProject: "pfcv"
    },
    {
        id: "db-systems",
        title: "Database Architectures",
        description: "Understanding how storage engines persist information and how relational schemas support complex operational workflows.",
        field: "Data Systems",
        tech: ["PostgreSQL", "SQLAlchemy"],
        relatedProject: "movex"
    },
    {
        id: "linux-security",
        title: "Linux & System Security",
        description: "Exploring cybersecurity boundaries, access control mechanisms, and internal Linux mechanics to build resilient system perimeters.",
        field: "Security",
        tech: ["Linux", "Bash", "Access Control"]
    },
    {
        id: "ai-ml-loops",
        title: "AI & ML Processing",
        description: "Beginning to explore pattern detection loops and statistical data models using Python to extract advisory insights.",
        field: "AI / ML",
        tech: ["Python", "Pandas", "Scikit-Learn"],
        relatedProject: "uidai"
    }
];
