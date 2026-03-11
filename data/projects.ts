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
        domains: ["backend_arch", "security_engineering"],
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
        ],
        diagram: {
            layout: "layered",
            nodes: [
                { 
                    id: "client", 
                    label: "CLIENT_UI", 
                    type: "client", 
                    description: "React-based interface for customers and staff.",
                    responsibilities: ["Session management", "Shipment booking interface", "Role-based view rendering"],
                    tech: ["React", "Framer Motion", "TailwindCSS"]
                },
                { 
                    id: "gateway", 
                    label: "API_GATEWAY", 
                    type: "interface", 
                    description: "Express-based entry point with session validation.",
                    responsibilities: ["Request routing", "JWT verification", "Rate limiting"],
                    tech: ["Express", "JWT", "Helmet.js"]
                },
                { 
                    id: "rbac", 
                    label: "RBAC_ENGINE", 
                    type: "logic", 
                    description: "Strict role-based isolation policy enforcer.",
                    responsibilities: ["Permission mapping", "Resource-level access control", "Audit logging"],
                    tech: ["Custom Middleware", "Policy-as-Code"]
                },
                { 
                    id: "logistics", 
                    label: "LOGISTICS_SRV", 
                    type: "service", 
                    description: "Core shipment and fleet management logic.",
                    responsibilities: ["Shipment state machine", "Fleet assignment algorithms", "Distance calculations"],
                    tech: ["Node.js", "Clustered Worker Threads"]
                },
                { 
                    id: "db", 
                    label: "POSTGRES_DB", 
                    type: "database", 
                    description: "ACID-compliant relational data store.",
                    responsibilities: ["Persistent storage", "Atomic shipment updates", "Relational integrity"],
                    tech: ["PostgreSQL", "B-Tree Indexing"]
                }
            ],
            connections: [
                { from: "client", to: "gateway" },
                { from: "gateway", to: "rbac" },
                { from: "rbac", to: "logistics" },
                { from: "logistics", to: "db" }
            ]
        },
        evolution: [
            { milestone: "Initial Prototype", description: "Basic Express server with simple JSON file persistence.", date: "WEEK_01" },
            { milestone: "Architecture Pivot", description: "Moved to a layered service architecture to handle complex business rules separate from routing.", date: "WEEK_03" },
            { milestone: "Stability Phase", description: "Implemented PostgreSQL with strict ACID transactions for delivery consistency.", date: "WEEK_06" }
        ],
        architectureDecisions: [
            {
                title: "Layered Service Isolation",
                problem: "Coupling logistics logic (distance calculation, fleet assign) with API routes created a maintenance nightmare.",
                approach: "Extracted all business logic into dedicated service classes independent of the web framework.",
                reasoning: "Allows for unit testing of core logic without mocking HTTP req/res objects and simplifies logic reuse.",
                alternatives: ["Hexagonal Architecture", "Monolithic Controllers"]
            },
            {
                title: "ACID over Eventual Consistency",
                problem: "Tracking shipment states required perfectly accurate horizontal lookups.",
                approach: "Used PostgreSQL transactions for all shipment updates.",
                reasoning: "In logistics, eventual consistency can lead to double-booked fleet members or lost parcels.",
                alternatives: ["MongoDB with manual locking"]
            }
        ],
        tradeoffs: [
            {
                title: "Maintainability over Hyper-Optimization",
                description: "Chose clear, readable service layers over handwritten SQL optimizations for minor performance gains.",
                impact: "MAINTAINABILITY"
            }
        ],
        storyFlow: [
            {
                id: "ingestion",
                title: "Inbound Request Handshake",
                description: "The system receives a shipment request through the encrypted Client UI. The API Gateway immediately initiates a security handshake to verify the origin.",
                activeNodes: ["client", "gateway"]
            },
            {
                id: "verification",
                title: "RBAC Security Check",
                description: "The request is passed to the RBAC Engine, which validates session integrity and ensures the user has appropriate permissions for the requested shipment action.",
                activeNodes: ["gateway", "rbac"]
            },
            {
                id: "transition",
                title: "State Machine Update",
                description: "The Logistics Service processes the business logic, transitioning the shipment through the state machine and calculating hub assignments.",
                activeNodes: ["logistics"]
            },
            {
                id: "persistence",
                title: "Relational Commitment",
                description: "Finally, the system performs an atomic commit to the PostgreSQL database, ensuring the new system state is persistent and auditable.",
                activeNodes: ["logistics", "db"]
            }
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
        domains: ["data_intelligence", "distributed_systems"],
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
        ],
        diagram: {
            layout: "pipeline",
            nodes: [
                { 
                    id: "ingestor", 
                    label: "DATA_INGESTOR", 
                    type: "pipeline", 
                    description: "High-throughput asynchronous data entry.",
                    responsibilities: ["Raw request normalization", "Async queue management", "Ingestion rate monitoring"],
                    tech: ["Redis Queue", "Celery", "Pydantic"]
                },
                { 
                    id: "engine", 
                    label: "PATTERN_ENGINE", 
                    type: "logic", 
                    description: "Statistical and ML-based anomaly scanners.",
                    responsibilities: ["Statistical outlier detection", "ML inference", "Pattern synthesis"],
                    tech: ["Scikit-Learn", "NumPy", "Pandas"]
                },
                { 
                    id: "aggregator", 
                    label: "ALERT_HUB", 
                    type: "service", 
                    description: "Correlates individual events into risk clusters.",
                    responsibilities: ["Anomaly grouping", "Severity score calculation", "Historical pattern matching"],
                    tech: ["PostgreSQL", "SQLAlchemy"]
                },
                { 
                    id: "dashboard", 
                    label: "ADVISORY_UI", 
                    type: "client", 
                    description: "Human-in-the-loop diagnostic interface.",
                    responsibilities: ["Real-time alert rendering", "Expert fallback triggers", "Decision record logging"],
                    tech: ["React", "WebSockets", "D3.js"]
                }
            ],
            connections: [
                { from: "ingestor", to: "engine" },
                { from: "engine", to: "aggregator" },
                { from: "aggregator", to: "dashboard" }
            ]
        },
        evolution: [
            { milestone: "Engine Alpha", description: "Simple rule-based outlier detection for auth requests.", date: "PHASE_01" },
            { milestone: "The Human Filter", description: "Implemented the advisory interface to allow expert feedback on false positives.", date: "PHASE_02" }
        ],
        architectureDecisions: [
            {
                title: "Asynchronous Pipeline",
                problem: "Large identity datasets caused request timeouts during synchronous analysis.",
                approach: "Implemented a Redis-backed Celery pipeline for non-blocking analysis.",
                reasoning: "Identity verification doesn't always need instant feedback, but it MUST handle burst traffic without failure.",
                alternatives: ["Kafka", "Vertical Scaling"]
            }
        ],
        tradeoffs: [
            {
                title: "Precision over Speed",
                description: "Sacrificed near-instant alerts for deep-packet matching to reduce false alarms for operators.",
                impact: "SCALABILITY"
            }
        ],
        storyFlow: [
            {
                id: "ingestion",
                title: "High-Throughput Stream",
                description: "Raw identity data streams into the system through asynchronous ingestors, being normalized and queued for analysis.",
                activeNodes: ["ingestor"]
            },
            {
                id: "inference",
                title: "Pattern Detection",
                description: "The Pattern Engine runs statistical and ML models on the queued data to identify outliers and potential fraud vectors.",
                activeNodes: ["engine"]
            },
            {
                id: "aggregation",
                title: "Risk Synthesis",
                description: "Detected anomalies are aggregated into prioritized risk clusters within the Alert Hub for structured investigation.",
                activeNodes: ["aggregator"]
            },
            {
                id: "advisory",
                title: "Human Oversight",
                description: "The Advisory Dashboard presents the synthesis to a human operator, who provides the final resolution based on system advice.",
                activeNodes: ["dashboard"]
            }
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
        domains: ["systems_verification", "security_engineering"],
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
        ],
        diagram: {
            layout: "pipeline",
            nodes: [
                { 
                    id: "analyser", 
                    label: "SOURCE_ANALYSER", 
                    type: "pipeline", 
                    description: "Multi-language static code analysis.",
                    responsibilities: ["Source file parsing", "Tokenization", "Contextual metadata extraction"],
                    tech: ["Python", "Tree-Sitter"]
                },
                { 
                    id: "ast", 
                    label: "AST_EXTRACTOR", 
                    type: "logic", 
                    description: "Precise semantic mapping using Clang/Tree-Sitter.",
                    responsibilities: ["AST tree generation", "Type signature extraction", "Memory layout analysis"],
                    tech: ["Clang Tooling", "C++"]
                },
                { 
                    id: "uir", 
                    label: "UIR_SYNTHESIZER", 
                    type: "logic", 
                    description: "Universal IR generation for cross-lang contracts.",
                    responsibilities: ["Type normalization", "Contract synthesis", "IR lowering"],
                    tech: ["Rust", "cxx-bridge"]
                },
                { 
                    id: "solver", 
                    label: "FORMAL_SOLVER", 
                    type: "service", 
                    description: "Z3-backed memory boundary verification.",
                    responsibilities: ["Constraint generation", "Formal proof solving", "Memory safety validation"],
                    tech: ["Z3 Solver", "Formal Logic"]
                },
                { 
                    id: "report", 
                    label: "SAFETY_REPORT", 
                    type: "interface", 
                    description: "Final validation status and audit trail.",
                    responsibilities: ["Safety metric aggregation", "Violation reporting", "Contract export"],
                    tech: ["JSON", "Markdown Generator"]
                }
            ],
            connections: [
                { from: "analyser", to: "ast" },
                { from: "ast", to: "uir" },
                { from: "uir", to: "solver" },
                { from: "solver", to: "report" }
            ]
        },
        evolution: [
            { milestone: "Core Synthesizer", description: "First successful mapping of Rust memory to C++ void pointers.", date: "BUILD_02" },
            { milestone: "Clang Integration", description: "Switched to libtooling for AST extraction to ensure 100% type reliability.", date: "BUILD_09" }
        ],
        architectureDecisions: [
            {
                title: "Rust for Safety Logic",
                problem: "Writing verification logic in C++ led to too many 'verifier-at-fault' memory leaks.",
                approach: "Ported the entire synthesis engine to Rust.",
                reasoning: "The code verifying safety should be inherently safe; Rust ensures the synthesizer itself is memory-secure.",
                alternatives: ["Standard C++ Smart Pointers"]
            }
        ],
        tradeoffs: [
            {
                title: "Simplicity over Runtime Performance",
                description: "Chose exhaustive AST walkthroughs over optimized bytecode analysis to ensure absolute verification correctness.",
                impact: "SIMPLICITY"
            }
        ],
        storyFlow: [
            {
                id: "probing",
                title: "Static Source Probing",
                description: "The verifier first probes the target source files in multiple languages, tokenizing and extracting raw contextual metadata.",
                activeNodes: ["analyser"]
            },
            {
                id: "extraction",
                title: "Semantic Mapping",
                description: "Using the Clang frontend, the system extracts high-precision ASTs to map the exact memory layout of foreign functions.",
                activeNodes: ["ast"]
            },
            {
                id: "synthesis",
                title: "Universal IR Synthesis",
                description: "The system normalizes heterogeneous language types into a common Universal Intermediate Representation to enable cross-lang verification.",
                activeNodes: ["uir"]
            },
            {
                id: "verification",
                title: "Formal Proof Engine",
                description: "Finally, the Z3-backed logic solver verifies the memory safety of the contract and generates a comprehensive safety report.",
                activeNodes: ["solver", "report"]
            }
        ]
    }
];
