import { Project } from "@/types/project";

export const projects: Project[] = [
    {
        slug: "movex",
        title: "MoveX",
        shortDescription: "Modern Logistics System. Security-heavy, role-based modular backend.",
        techStack: ["Node.js", "Express", "PostgreSQL", "JWT"],
        techGroups: [
            { role: "Backend Services", items: ["Node.js", "Express", "TypeScript"] },
            { role: "Database Layer", items: ["PostgreSQL", "Prisma ORM", "Redis"] },
            { role: "Security & Auth", items: ["JWT", "Bcrypt", "RBAC Policy Engine"] },
            { role: "Infrastructure", items: ["Docker", "Heroku", "AWS S3"] }
        ],
        tier: 1,
        githubRepoName: "movex",
        githubUrl: "https://github.com/darshit-lagdhir/movex",
        status: "COMPLETE",
        overview: "MoveX is a full-scale logistics management system designed to handle the complexities of franchise-based shipping, staffing, and fleet coordination. The system prioritizes strict access control and reliable state preservation across the entire delivery lifecycle.",
        problem: "Traditional logistics software often suffers from monolithic coupling where a breach in one role (e.g., customer) can escalate to administrative control. MoveX was built to solve this through rigid role-based session isolation.",
        engineeringFocus: "Systems Architecture & Role Isolation",
        technicalMeta: {
            systemType: "Web Application",
            architectureStyle: "Modular Monolith",
            storageType: "Relational (ACID-compliant)",
        },
        architecture: "The MoveX architecture utilizes a modular controller pattern where each logistics role (Admin, Staff, Franchisee, Customer) is treated as a separate micro-service interface within a consolidated runtime. This ensures shared data integrity while maintaining strict boundary separation.",
        internalComponents: [
            { name: "Shipment Lifecycle Manager", description: "State machine responsible for tracking status transitions from 'Initiated' to 'Delivered' with atomic database updates." },
            { name: "RBAC Middleware", description: "Security layer that verifies identity and permissions at the route level, preventing horizontal privilege escalation." },
            { name: "Geographic Routing Hub", description: "Service for calculating hub-to-hub transfers and franchisee proximity for staff assignment." }
        ],
        challenges: [
            { title: "Race Conditions in Staff Assignment", description: "Ensuring that multiple franchisees cannot claim the same staffing request simultaneously required the implementation of row-level locking in PostgreSQL." },
            { title: "Session Integrity", description: "Preventing token replay attacks across different role subdomains while keeping the UX seamless for multi-role users." }
        ],
        future: [
            { title: "AI-Driven Route Optimization", description: "Integrating graph-based algorithms to minimize transit time between hubs." },
            { title: "Real-time Telemetry", description: "Implementing WebSocket-based tracking for fleet movement." }
        ]
    },
    {
        slug: "uidai",
        title: "UIDAI Advisory System",
        shortDescription: "Advisory intelligence system for pattern detection and human-in-the-loop oversight.",
        techStack: ["Python", "FastAPI", "Data Pipeline"],
        techGroups: [
            { role: "Core Language", items: ["Python 3.10+"] },
            { role: "API Gateway", items: ["FastAPI", "Uvicorn"] },
            { role: "Processing Engine", items: ["Pandas", "Scikit-Learn"] },
            { role: "State Management", items: ["PostgreSQL", "Redis Caching"] }
        ],
        tier: 1,
        githubRepoName: "uidai-advisory",
        githubUrl: "https://github.com/darshit-lagdhir/uidai-advisory-system",
        status: "DEVELOPMENT",
        overview: "The UIDAI Advisory System is a diagnostic platform built to assist human operators in detecting anomalies and patterns within large-scale identity datasets. It emphasizes 'Advisory Intelligence'—where the system suggests rather than decides.",
        problem: "Identifying subtle fraud patterns at a national scale requires a system that can process high volumes of data without eliminating the nuance that human operators provide. Automation alone often results in high false-positives.",
        engineeringFocus: "Human-in-the-loop Pattern Detection",
        technicalMeta: {
            systemType: "Advisory Engine",
            architectureStyle: "Sequential Pipeline",
            storageType: "Structured & Vectorized",
        },
        architecture: "The system is structured as a non-blocking diagnostic pipeline. Data enters through high-throughput ingestors, is processed by a suite of pattern-detection models, and is then presented as prioritized alerts to an advisory interface.",
        internalComponents: [
            { name: "Anomaly Detection Engine", description: "ML-backed service that scans for statistical outliers in authentication requests." },
            { name: "Human Review Interface", description: "Interface allowing operators to confirm or reject system suggestions, feeding data back into the learning loop." },
            { name: "Pattern Aggregator", description: "Module that correlates individual anomalies into larger, structural risk clusters." }
        ],
        challenges: [
            { title: "Latency in High-Volume Ingestion", description: "Processing millions of records while maintaining sub-second latency for the advisory dashboard required the move to asynchronous task queues." },
            { title: "The 'Advice' UX", description: "Designing an interface that communicates system uncertainty to human operators without causing decision fatigue." }
        ],
        future: [
            { title: "Vectorized Pattern Search", description: "Storing fraud patterns in a vector database for faster semantic similarity lookups." }
        ]
    },
    {
        slug: "pfcv",
        title: "Polyglot FFI Verifier",
        shortDescription: "Cross-Language Safety. Formal contract synthesis and memory verification.",
        techStack: ["C++", "Rust", "Python", "Clang"],
        techGroups: [
            { role: "Core Verification", items: ["C++", "LLVM/Clang Tooling"] },
            { role: "Safety Logic", items: ["Rust", "cxx-bridge"] },
            { role: "Analysis Layer", items: ["Python", "Z3 Solver"] },
            { role: "Runtime", items: ["Clang/LLVM", "PyBind11"] }
        ],
        tier: 1,
        githubRepoName: "polyglot-ffi-verifier",
        githubUrl: "https://github.com/darshit-lagdhir/polyglot-ffi-verifier",
        status: "COMPLETE",
        overview: "The Polyglot FFI Contract Verifier (PFCV) is a core systems tool designed to ensure memory safety and contract integrity when bridging code between different programming languages (e.g., Python calling C++).",
        problem: "Foreign Function Interfaces (FFI) are notorious for creating 'safety gaps' where the compiler's guarantees from one language vanish when calling another, leading to silent memory corruption and exploitable vulnerabilities.",
        engineeringFocus: "Formal Contract Synthesis",
        technicalMeta: {
            systemType: "Systems Tooling",
            architectureStyle: "8-Module Universal IR Pipeline",
            storageType: "In-Memory AST State",
        },
        architecture: "The PFCV handles verification through an 8-stage pipeline. It extracts Abstract Syntax Trees (ASTs) from the source languages, synthesizes a common 'Universal Intermediate Representation' (UIR), and then uses formal logic solvers to verify memory boundary safety.",
        internalComponents: [
            { name: "AST Extraction Module", description: "Utilizes Clang and Tree-Sitter to generate precise semantic maps of the target functions." },
            { name: "UIR Synthesizer", description: "Maps heterogeneous language types (e.g., Python lists to C++ vectors) into a common, verifiable format." },
            { name: "Boundary Solver", description: "Employs formal verification techniques to ensure that memory pointers never escape their sandbox during the FFI call." }
        ],
        challenges: [
            { title: "Heterogeneous Type Mapping", description: "Ensuring that dynamic Python types match strict C++ memory layouts without manual binding boilerplate." },
            { title: "LLVM Integration", description: "Working directly with LLVM's IR to verify assembly-level stability required deep-diving into compiler internals." }
        ],
        future: [
            { title: "Auto-Generation of Bridges", description: "Automatically synthesizing the FFI bridge code based on verified contracts." }
        ]
    }
];
