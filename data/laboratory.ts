export interface LaboratoryExploration {
    id: string;
    title: string;
    context: string;
    insight: string;
    field: string;
    tech: string[];
    relatedProject?: string;
}

export const laboratoryExplorations: LaboratoryExploration[] = [
    {
        id: "jvm-internals",
        title: "JVM Memory Behavior",
        context: "Investigating unexpected memory usage while studying Java runtime behavior and high-performance backend patterns.",
        insight: "Learned how heap allocation, garbage collection cycles, and object references influence application stability and execution latency.",
        field: "Systems",
        tech: ["Java", "JVM", "Diagnostics"]
    },
    {
        id: "session-auth",
        title: "Session Management Security",
        context: "Exploring how session systems function and how login tokens can be securely handled in multi-role applications.",
        insight: "Decided to implement database-backed sessions over stateless JWTs to allow immediate revocation and better control over concurrent role-based access.",
        field: "Security",
        tech: ["Session Auth", "JWT", "Express"],
        relatedProject: "movex"
    },
    {
        id: "db-schema",
        title: "Relational Schema Integrity",
        context: "Experimenting with PostgreSQL relationships and indexing while designing the MoveX logistics workflow.",
        insight: "Discovered that database-level constraints are far more reliable than application-level validation for tracking complex temporal state transitions.",
        field: "Data Systems",
        tech: ["PostgreSQL", "SQL", "Relational Mapping"],
        relatedProject: "movex"
    },
    {
        id: "ffi-boundaries",
        title: "FFI Boundary Exploration",
        context: "Investigating how high-level languages like Python and Rust interact with native C/C++ libraries through Foreign Function Interfaces.",
        insight: "Identified that most FFI crashes stem from misaligned memory ownership assumptions and inconsistent function signatures across compilation boundaries.",
        field: "FFI Safety",
        tech: ["Rust", "PyBind11", "Clang AST"],
        relatedProject: "pfcv"
    },
    {
        id: "pattern-detection",
        title: "Statistical Pattern Detection",
        context: "Exploring how to identify signals in large enrollment datasets as part of the UIDAI hackathon challenge.",
        insight: "Learned that establishing historical baselines for regional data is more effective for signal detection than using hard-coded volume thresholds.",
        field: "Data Analysis",
        tech: ["Python", "Pandas", "Scikit-Learn"],
        relatedProject: "uidai"
    },
    {
        id: "system-failures",
        title: "Debugging System Failures",
        context: "A recurring investigation into unexpected system behaviors and tracing how information flows through failing architectures.",
        insight: "Reinforced the philosophy that debugging is a primary learning tool; understanding the 'why' of a failure is more valuable than the immediate patch.",
        field: "Resilience",
        tech: ["Linux", "Log Analysis", "Tracing"]
    }
];
