import { Project } from "@/types/project";

export const projects: Project[] = [
    {
        id: "movex",
        name: "MoveX",
        slug: "movex",
        route: "/movex",
        shortDescription: "An experiment in operational backend architecture exploring role-based workflows, session isolation, and shipment state coordination.",
        longDescription: "MoveX is a backend architecture exploration designed to solve the coordination challenges of a multi-role logistics environment. Rather than focusing on UI complexity, the system investigates how to reliably manage interactions between Administrators, Franchise Branches, Staff, and Customers. The project serves as a laboratory for testing authentication boundaries, relational database integrity under operational load, and secure session management in a distributed environment.",
        category: "Operational Backend System",
        techStack: ["Node.js", "Express", "PostgreSQL", "Vanilla JS"],
        status: "Completed",
        learningOutcomes: ["Backend Architecture", "Role-Based Access Control", "Relational Schema Design"],
        techGroups: [
            { role: "Backend Services", items: ["Node.js", "Express"] },
            { role: "Database Layer", items: ["PostgreSQL"] },
            { role: "Security & Auth", items: ["JWT", "Bcrypt", "Session Management", "Rate Limiting"] },
            { role: "Storage", items: ["Supabase Storage", "Cloudflare"] }
        ],
        tier: 1,
        engineeringFocus: "Backend Architecture & Operational Workflow Design",
        technicalMeta: {
            systemType: "Operational backend system",
            architectureStyle: "Modular Monolith",
            storageType: "Relational (PostgreSQL)",
        },
        authority: {
            complexityScore: 7,
            architectureDepth: "ROLE_ISO_HNDL",
            researchFocus: "Session Isolation and Operational State Preservation",
            primaryDomain: "Backend Development",
            experimentationAreas: ["Role-Based Access Control", "Session Revocation", "Relational Schema Integrity"],
            deepDives: [
                {
                    type: "DISCOVERY",
                    title: "Security & Authentication Design",
                    content: "MoveX implements a robust security layer involving Bcrypt password hashing, session-based authentication, and request rate limiting. Input validation is enforced at the API boundary, while CORS protection and secure header management defend against common web-based vulnerabilities."
                },
                {
                    type: "OPTIMIZATION",
                    title: "PostgreSQL Database Architecture",
                    content: "The system uses a highly structured PostgreSQL schema with tables for 'users', 'organizations', 'sessions', 'shipments', and 'password_resets'. This relational design ensures data integrity across complex workflows, allowing for strict foreign key constraints and optimized query performance for operational reporting."
                },
                {
                    type: "REDESIGN",
                    title: "Session Persistence and Revocation",
                    content: "One major architectural deep dive was the creation of a session management system where login states are persistent across server restarts but can be immediately revoked by administrators. This ensures unauthorized dashboard access is prevented even if a user's role is modified in real-time."
                }
            ],
            experimentationNotes: [
                {
                    title: "Authentication under Operational Load",
                    content: "Observed how authentication systems behave under real-world workflows, specifically the latency introduced by hashing and the importance of caching session verification steps."
                },
                {
                    title: "Relational Mapping of Logistics",
                    content: "Discovered that relational database design is the backbone of logistics systems; clear schema definitions determine the simplicity or complexity of every operational module upstream."
                },
                {
                    title: "API Coordination Logic",
                    content: "Learned that backend APIs must act as a 'choreographer' for operational logic, ensuring that state transitions (e.g., from 'booked' to 'dispatched') remain consistent and reversible where necessary."
                }
            ],
            recurringPatterns: ["Modular Route Separation", "Database-Level State Tracking", "Role-Based Middleware Isolation"]
        },
        problem: "Managing logistics requires precise coordination between multiple participants: admins managing branches, franchise staff handling parcels, and customers requesting pickups. Without a centralized system, authentication becomes fragmented, workflows become disconnected, and shipment tracking becomes unreliable. MoveX was built as an exploration into solving these coordination challenges through a unified backend architecture.",
        challenges: [
            { title: "Session Security Isolation", description: "Ensuring that users cannot access unauthorized dashboards required implementing strict middleware barriers and a session system that validates role permissions on every request." },
            { title: "Temporal State Preservation", description: "Tracking a shipment's lifecycle required a state model capable of preserving timestamps and actor IDs at every transition: from booking to final delivery confirmation." },
            { title: "Defending the API Boundary", description: "Building defense-in-depth through rate limiting and strict validation was necessary to protect the operational core from malicious or malformed input." }
        ],
        layout: "layered",
        domains: ["backend_systems", "data_systems"],
        architecture_nodes: [
            { 
                id: "frontend", 
                label: "Frontend Dashboards", 
                type: "interface", 
                description: "Modular user interfaces for administrators, franchise branches, staff, and customers.",
                responsibilities: ["Role-specific rendering", "Operational input", "Activity reporting"],
                tech: ["Vanilla JS", "HTML", "CSS"]
            },
            { 
                id: "api", 
                label: "API Server (Node + Express)", 
                type: "service", 
                description: "The central business logic engine handling authentication, pricing, and shipment operations.",
                responsibilities: ["Logic orchestration", "Authorization checks", "Business rule enforcement"],
                tech: ["Node.js", "Express"]
            },
            { 
                id: "session", 
                label: "Session Layer", 
                type: "logic", 
                description: "Manages persistent login states and role-based access tokens with revocation support.",
                responsibilities: ["Token management", "Session storage", "Access revocation"],
                tech: ["JWT", "Database Middleware"]
            },
            { 
                id: "db", 
                label: "PostgreSQL Database", 
                type: "database", 
                description: "Primary relational storage for users, organizations, shipments, and session records.",
                responsibilities: ["Relational integrity", "Workflow persistence", "Operational data storage"],
                tech: ["PostgreSQL"]
            },
            { 
                id: "storage", 
                label: "Storage Layer", 
                type: "database", 
                description: "Cloud-based asset storage for delivery confirmation photos and shipment files.",
                responsibilities: ["Evidence storage", "Asset hosting", "Secure file access"],
                tech: ["Supabase Storage"]
            }
        ],
        architecture_connections: [
            { from: "frontend", to: "api", label: "REST_INVOCATION" },
            { from: "api", to: "session", label: "VERIFY_IDENTITY" },
            { from: "api", to: "db", label: "PERSIST_STATE" },
            { from: "api", to: "storage", label: "UPLOAD_EVIDENCE" }
        ],
        evolution: [
            { milestone: "Core API Architecture", description: "Established the Node.js/Express baseline and defined the modular route structure for multi-role support.", date: "PHASE_01" },
            { milestone: "Relational Schema Design", description: "Implemented the PostgreSQL database layer, focusing on foreign key integrity for shipment tracking.", date: "PHASE_02" },
            { milestone: "Session Guard Implementation", description: "Developed the security and session layer to manage role-based isolation and secure authentication.", date: "PHASE_03" },
            { milestone: "Operational Workflow Completion", description: "Finalized the end-to-end shipment lifecycle, from customer booking to delivery proof storage.", date: "PHASE_04" }
        ],
        architectureDecisions: [
            {
                title: "PostgreSQL Relational Schema",
                problem: "Logistics data is highly connected; a loss of relational integrity can lead to orphans or double-booked shipments.",
                approach: "Utilized a strict PostgreSQL schema with enforced foreign keys between organizations, users, and shipments.",
                reasoning: "A relational database ensures that business rules are validated at the physical layer, not just in application code.",
                alternatives: ["Document Database", "Key-Value Store"]
            },
            {
                title: "Session-Based Authentication",
                problem: "Stateless tokens are difficult to revoke if a staff member's permissions are suddenly removed.",
                approach: "Implemented database-backed session management that permits instantaneous revocation of access.",
                reasoning: "In operational systems, security must be reactive and precise. Session storage allows for immediate control over active logins.",
                alternatives: ["Pure JWTs", "OAuth2 Proxy"]
            },
            {
                title: "Role-Isolated Route Middleware",
                problem: "Spaghetti code in route handlers makes it easy to accidentally leak data from one role to another.",
                approach: "Created a middleware chain that validates role IDs before any controller logic is executed.",
                reasoning: "Isolating access at the routing layer prevents developers from leaking organizational data through simple coding errors.",
                alternatives: ["Inline role checks", "Frontend-only access control"]
            }
        ],
        tradeoffs: [
            {
                title: "Monolith over Microservices",
                description: "Chose a modular monolith architecture for simplicity and lower deployment overhead. Slower horizontal scale potential but easier to manage as a developer investigation.",
                impact: "SIMPLICITY"
            }
        ],
        development_story: [
            {
                id: "booking",
                title: "Parcel Booking",
                description: "The workflow begins when a customer or staff member creates a shipment record, calculating cost based on weight and destination metrics.",
                activeNodes: ["frontend", "api"]
            },
            {
                id: "pickup",
                title: "Pickup & Dispatch",
                description: "The system assigns the shipment to a pickup task, where staff members confirm possession and move the record to the 'In Transit' state.",
                activeNodes: ["db", "api"]
            },
            {
                id: "delivery",
                title: "Delivery & Tracking",
                description: "As the parcel moves through hubs, status updates are broadcast. Upon final delivery, a confirmation photo is uploaded as immutable proof.",
                activeNodes: ["storage", "db"]
            },
            {
                id: "audit",
                title: "Audit & Reporting",
                description: "Administrators review the session logs and shipment reports to ensure operational health across all franchise branches.",
                activeNodes: ["frontend", "api", "session", "db"]
            }
        ],
        storyTitle: "Shipment Lifecycle",
        internalComponents: [
            { name: "User Management", description: "Handles account creation, secure login sessions, and role-based assignment for all participants." },
            { name: "Franchise and Staff Operations", description: "Enables administrators to manage branch hierarchies and assign staff members to specific nodes." },
            { name: "Customer Booking and Pricing", description: "Processes shipment requests and calculates dynamic delivery costs based on regional metrics." },
            { name: "Pickup and Dispatch Management", description: "Coordinates parcel collection tasks and handles the handoff between hub staff and drivers." },
            { name: "Shipment Tracking and Delivery", description: "Governs the lifecycle of a parcel, managing real-time status updates and delivery confirmations." },
            { name: "Reports and Analytics", description: "Aggregates operational data into dashboards for reviewing branch performance and shipment volume." }
        ],
        future: [
            { title: "Automated Dispatch Logic", description: "Refining the backend to suggest optimal delivery routes based on destination density scores." },
            { title: "Real-Time Event Stream", description: "Integrating WebSockets for live status propagation across terminal dashboards." }
        ]
    },
    {
        id: "uidai",
        name: "UIDAI Advisory System",
        slug: "uidai",
        route: "/uidai",
        shortDescription: "A hackathon project analyzing aggregated Aadhaar enrollment data to identify regional patterns and provide contextual advisory insights to human operators.",
        longDescription: "The UIDAI Advisory Intelligence System was developed for a hackathon focused on analyzing aggregated Aadhaar enrollment data. The system monitors enrollment counts across thousands of locations to identify patterns that may require human attention. It is designed as a purely advisory tool; it identifies patterns and provides contextual explanations so that officials can interpret data more effectively. The system highlights trends with confidence scores but never makes autonomous decisions.",
        category: "Advisory Data Analysis System",
        techStack: ["Python", "FastAPI", "Pandas", "Scikit-Learn"],
        status: "Hackathon Project",
        learningOutcomes: ["Statistical Pattern Detection", "Advisory Signal Design", "Privacy-by-Aggregation"],
        techGroups: [
            { role: "Core Engine", items: ["Python", "Pandas", "NumPy"] },
            { role: "API Layer", items: ["FastAPI", "Uvicorn"] },
            { role: "Analysis Stage", items: ["Scikit-Learn", "Statistical Scanners"] },
            { role: "Data Management", items: ["PostgreSQL", "Aggregated Datasets"] }
        ],
        tier: 1,
        engineeringFocus: "Advisory Pattern Detection & Ethical Design",
        technicalMeta: {
            systemType: "Data analysis and advisory system",
            architectureStyle: "Sequential Data Pipeline",
            storageType: "Aggregated Pincode-Level Data",
        },
        authority: {
            complexityScore: 8,
            architectureDepth: "ADVISORY_PIPELINE",
            researchFocus: "Non-Intrusive Pattern Identification",
            primaryDomain: "Data Engineering",
            experimentationAreas: ["Confidence Scoring Logic", "Baseline Pattern Synthesis"],
            deepDives: [
                {
                    type: "DISCOVERY",
                    title: "Signal Types & Contextual Flags",
                    content: "The system identifies specific enrollment signals like 'High Stress' (volume spikes), 'Ghost Zones' (sudden activity drops), 'Volatility Flags' (unstable counts), and 'Trend Shifters' (direction changes). Each signal is designed to prompt human investigation rather than trigger autonomous responses."
                },
                {
                    type: "OPTIMIZATION",
                    title: "Regional Baseline Synthesis",
                    content: "To detect anomalies without hard-coded thresholds, the system synthesizes historical norms for each region. Comparative analysis against these baselines allows for the identification of demographic shifts—like 'Baby Boom' or 'Employment Magnet' zones—with high statistical precision."
                },
                {
                    type: "REDESIGN",
                    title: "The Advisory Boundary",
                    content: "The system architecture enforces a strict 'Read-Only' boundary. It provides spatial visualizations and explanatory metadata but is physically incapable of issuing field instructions or ranking centers, ensuring that officials retain 100% of the operational authority."
                }
            ],
            experimentationNotes: [
                {
                    title: "Communicating Uncertainty",
                    content: "Iterated on a three-tier confidence system (HIGH/MEDIUM/LOW). Learned that exposing the system's own uncertainty is more valuable than a high-precision guess, as it prevents officials from over-relying on automated signals during edge cases."
                },
                {
                    title: "Privacy by Aggregation",
                    content: "Proven that significant administrative insights can be extracted entirely from aggregated pincode counts. By discarding individual identifiers (PII/Biometrics) at the ingestion point, the system achieves privacy-by-design."
                },
                {
                    title: "Human Contextual Advantage",
                    content: "Discovered that many statistical anomalies were actually local festivals or network outages. This confirmed that no algorithm can fully replace the human official's local contextual knowledge."
                }
            ],
            recurringPatterns: ["Baseline-vs-Current Analysis", "Advisory Signal Propagation", "Privacy-by-Aggregation"]
        },
        problem: "Monitoring national enrollment patterns manually across thousands of centers is functionally impossible. Officials struggle to detect regional spikes, 'Ghost Zones', or subtle trend shifts without a central signal layer. The UIDAI Advisory System explores how statistical analysis and spatial visualization can highlight these patterns for human review while maintaining individual privacy.",
        challenges: [
            { title: "National-Scale Normalization", description: "Balancing data across thousands of locations while accounting for regional holidays and network volatility that cause false-positive signals." },
            { title: "Strict Advisory Architecture", description: "Designing an interface that provides maximum context without suggesting specific actions, preserving the human official's decision-making agency." },
            { title: "Privacy-Locked Ingestion", description: "Ensuring that the analysis pipeline remains physically separated from sensitive biometric and personal identifiable information (PII)." }
        ],
        layout: "pipeline",
        domains: ["data_systems", "ai_exploration"],
        architecture_nodes: [
            { 
                id: "data_source", 
                label: "Aggregated Source", 
                type: "database", 
                description: "Regional enrollment records stripped of PII, organized by pincode and temporal stamps.",
                responsibilities: ["Raw count ingestion", "Pincode aggregation", "Temporal partitioning"],
                tech: ["PostgreSQL"]
            },
            { 
                id: "processor", 
                label: "Baseline Engine", 
                type: "logic", 
                description: "Synthesizes historical norms for each region to serve as a comparative baseline for anomaly detection.",
                responsibilities: ["Data normalization", "Historical synthesis", "Outlier cleaning"],
                tech: ["Python", "Pandas"]
            },
            { 
                id: "engine", 
                label: "Signal Generator", 
                type: "service", 
                description: "Compares current counts against baselines to identify 'High Stress' or 'Ghost Zone' activity.",
                responsibilities: ["Anomaly detection", "Pattern classification", "Confidence scoring"],
                tech: ["Scikit-Learn"]
            },
            { 
                id: "dashboard", 
                label: "Advisory Interface", 
                type: "interface", 
                description: "Spatial heatmaps and signal logs that provide signals and context to human operators.",
                responsibilities: ["Pattern visualization", "Metadata reporting", "Spatial alerts"],
                tech: ["Vanilla JS", "D3.js"]
            },
            { 
                id: "human", 
                label: "Human Authority", 
                type: "logic", 
                description: "The final decision layer where officials interpret signals using local contextual knowledge.",
                responsibilities: ["Signal interpretation", "Contextual verification", "Operational decision-making"],
                tech: ["Human Analysis"]
            }
        ],
        architecture_connections: [
            { from: "data_source", to: "processor", label: "INGEST_STATS" },
            { from: "processor", to: "engine", label: "COMPARE_NORMS" },
            { from: "engine", to: "dashboard", label: "PROPAGATE_SIGNAL" },
            { from: "dashboard", to: "human", label: "ADVISORY_LOOP" }
        ],
        evolution: [
            { milestone: "Data Model Partitioning", description: "Refining the system to focus strictly on regional demographic counts to ensure privacy-by-aggregation.", date: "PHASE_01" },
            { milestone: "Baseline Synthesis", description: "Developing the engine capable of establishing historical enrollment norms for thousands of locations.", date: "PHASE_02" },
            { milestone: "Signal Classification", description: "Defining the logic for specific flags like 'Baby Boom' zones and 'High Stress' enrollment spikes.", date: "PHASE_03" },
            { milestone: "Advisory Dashboard", description: "Building the spatial visualization layer to present signals to officials for manual review.", date: "PHASE_04" }
        ],
        architectureDecisions: [
            {
                title: "Advisory vs Decision Systems",
                problem: "Automated decisions in high-stakes governance systems can lead to massive false-positive impacts.",
                approach: "Created a reporting-only architecture where all outputs are advisory signals, not instructions.",
                reasoning: "Ensures the system empowers human officials with context rather than replacing them with opaque rules.",
                alternatives: ["Automated Alerting", "Hard-coded Response Rules"]
            },
            {
                title: "Privacy-Locked Aggregated Data",
                problem: "Using individual biometrics or names for analysis creates unacceptable security risks and privacy loss.",
                approach: "Performed all analysis on aggregated pincode counts, stripping individual IDs at the entry point.",
                reasoning: "Aggregation provides actionable insights into regional trends while maintaining total anonymity for individuals.",
                alternatives: ["Data Masking", "Encryption at Rest"]
            }
        ],
        tradeoffs: [
            {
                title: "Human Oversight over Action Speed",
                description: "Sacrificed the speed of automated alerts to ensure every signal remains a prompt for mandatory human contextual review.",
                impact: "MAINTAINABILITY"
            },
            {
                title: "Statistical Signal over Raw Data",
                description: "Focusing on summarized signals and patterns rather than exposing raw data streams, which reduces operator fatigue.",
                impact: "SIMPLICITY"
            }
        ],
        development_story: [
            {
                id: "ingestion",
                title: "Data Ingestion",
                description: "Enrollment records are collected and organized by location, date, and demographic group, ensuring all PII is discarded immediately.",
                activeNodes: ["data_source"]
            },
            {
                id: "analysis",
                title: "Baseline Analysis",
                description: "The system analyzes years of historical data to determine 'normal' enrollment activity for every specific region in the dataset.",
                activeNodes: ["processor"]
            },
            {
                id: "detection",
                title: "Anomaly Detection",
                description: "Current enrollment data is compared against historical baselines to identify unusual activity like 'Ghost Zones' or 'Baby Boom' spikes.",
                activeNodes: ["engine"]
            },
            {
                id: "visualization",
                title: "Signal Visualization",
                description: "Finally, officials review color-coded signals on a spatial dashboard, interpreting automated patterns with their own local knowledge.",
                activeNodes: ["dashboard", "human"]
            }
        ],
        storyTitle: "Advisory Pipeline",
        internalComponents: [
            { name: "Enrollment Data Aggregator", description: "Ingests raw regional counts and organizes them into spatial datasets for temporal analysis." },
            { name: "Regional Baseline Synthesis", description: "Generates historical enrollment norms to serve as moving reference points for anomaly detection." },
            { name: "Pattern Detection Modules", description: "Identifies specific zones such as 'Baby Booms', 'School Ready', or 'Employment Magnets'." },
            { name: "Signal Propagation Layer", description: "Translates anomalies into specific, context-rich flags like 'High Stress' or 'Volatility'." },
            { name: "Official Advisory Dashboard", description: "The interface designed to present signals to humans without triggering automated responses." },
            { name: "Privacy Ingestion Barrier", description: "The architecture-level guard that prevents PII or biometric data from entering the analysis flow." }
        ],
        future: [
            { title: "Multi-Source Correlation", description: "Integrating external event data (festivals, policy changes) to automatically explain common signals." },
            { title: "Temporal Trend Forecasting", description: "Expanding the baseline model to suggest future seasonal spikes based on multi-year cyclic patterns." }
        ]
    },
    {
        id: "pfcv",
        name: "Polyglot FFI Verifier",
        slug: "pfcv",
        route: "/pfcv",
        shortDescription: "A systems engineering research prototype exploring cross-language safety at dangerous FFI boundaries between high-level runtimes and native code.",
        longDescription: "PFCV (Polyglot FFI Contract Verifier) is a verification pipeline designed to investigate the fragility of Foreign Function Interfaces. Modern systems frequently rely on native C/C++ libraries for performance, but the boundary between languages is often unprotected, leading to catastrophic memory failures and undefined behavior. PFCV explores an automated approach to this problem: extracting interface metadata, generating formal safety contracts, and enforcing those rules at runtime to prevent cross-language crashes. It is a research-first prototype aimed at making systems programming more predictable.",
        category: "Verification Pipeline",
        techStack: ["C++", "Rust", "Python", "Clang"],
        status: "Active Development",
        learningOutcomes: ["Language Interoperability", "Compiler Tooling (Clang)", "Contract-Driven Verification"],
        techGroups: [
            { role: "Core Verification", items: ["C++", "Clang Tooling", "LLVM"] },
            { role: "Safety Logic", items: ["Rust"] },
            { role: "Analysis Layer", items: ["Python", "Z3 Solver"] },
            { role: "Runtime", items: ["ABI Interface", "Memory Shims"] }
        ],
        tier: 1,
        engineeringFocus: "Cross-Language Safety & Pipeline Verification",
        technicalMeta: {
            systemType: "Systems engineering research prototype",
            architectureStyle: "Multi-Stage Verification Pipeline",
            storageType: "In-Memory AST State & IR Streams",
        },
        authority: {
            complexityScore: 9,
            architectureDepth: "FFI_V_BRIDGE",
            researchFocus: "Memory Safety at Foreign Function Boundaries",
            primaryDomain: "Systems Engineering",
            experimentationAreas: ["Interface Metadata Extraction", "Universal IR Design", "Contract Synthesis Engine"],
            deepDives: [
                {
                    type: "DISCOVERY",
                    title: "FFI Boundary Fragility",
                    content: "Research into FFI failures revealed that most crashes stem from single-point mismatches in type definitions, pointer nullability, or memory ownership. PFCV attempts to convert these 'soft' assumptions into 'hard' formal contracts that the system can verify programmatically."
                },
                {
                    type: "OPTIMIZATION",
                    title: "AST-Based Metadata Extraction",
                    content: "Instead of fragile regex parsing, PFCV uses Clang's compiler infrastructure to traverse the Abstract Syntax Tree (AST) of C++ headers. This ensures that every function signature, struct padding detail, and ABI visibility flag is captured with compiler-level accuracy."
                },
                {
                    type: "REDESIGN",
                    title: "Multi-Language Enforcement Adapters",
                    content: "The system generates language-specific 'Safe-FFI' adapters. For example, a Python adapter intercepts calls to a native library and verifies that the incoming memory buffers and pointers obey the generated safety contract before allowing the native call to Proceed."
                }
            ],
            experimentationNotes: [
                {
                    title: "ABI Compatibility Complexities",
                    content: "Discovered that ABI (Application Binary Interface) compatibility is significantly more complex than API compatibility. Subtle differences in compiler versions can shift struct alignments, breaking FFI calls in ways that are invisible at the source code level."
                },
                {
                    title: "Cross-Language Type Mapping",
                    content: "Learned that 'mapping' types between languages (e.g., Rust's Option to C's Nullable Pointer) requires a formal intermediate representation to ensure that safety guarantees aren't lost in translation."
                },
                {
                    title: "Verification Pipeline Scalability",
                    content: "Experimented with breaking the analyzer into modular stages (Ingestion → Normalization → Synthesis). This modularity allows for faster experimentation with different contract solvers without rebuilding the entire extraction frontend."
                }
            ],
            recurringPatterns: ["AST-Driven Synthesis", "Constraint-Based Verification", "Interoperability Shims"]
        },
        problem: "Modern applications frequently call native libraries (C/C++) for performance, but Foreign Function Interfaces (FFI) are extremely fragile. A single mistake in pointer handling, memory ownership, or type definition can cause silent corruption or immediate crashes. PFCV explores how these dangerous language boundaries can be automatically analyzed and protected by formal safety contracts.",
        challenges: [
            { title: "FFI Boundary Type Safety", description: "Ensuring that complex types like pointers and structures maintain their integrity when passed between language runtimes like Python and Rust." },
            { title: "ABI Layout Accuracy", description: "Correctly determining how a C compiler will layout memory for a structure, including padding and alignment across different platforms." },
            { title: "Non-Intrusive Enforcement", description: "Generating runtime shims that provide strong safety guarantees without introducing prohibitive performance overhead during cross-language calls." }
        ],
        layout: "pipeline",
        domains: ["programming_languages", "systems_engineering"],
        architecture_nodes: [
            { 
                id: "native_source", 
                label: "Native Source Code", 
                type: "logic", 
                description: "The targeted C/C++ libraries containing the foreign functions to be verified.",
                responsibilities: ["Function definition", "Memory layout specification", "Native API exposure"],
                tech: ["C++", "C"]
            },
            { 
                id: "ingestion", 
                label: "Ingestion Layer (Clang)", 
                type: "pipeline", 
                description: "Uses compiler tooling to extract precisely typed metadata from the native abstract syntax tree.",
                responsibilities: ["AST traversal", "Header analysis", "ABI metadata collection"],
                tech: ["Clang Tooling", "LLVM"]
            },
            { 
                id: "uir", 
                label: "Intermediate Representation", 
                type: "logic", 
                description: "A universal, language-neutral format for representing function signatures and safety requirements.",
                responsibilities: ["Type normalization", "Ownership mapping", "Cross-platform schema"],
                tech: ["Rust", "JSON"]
            },
            { 
                id: "synthesis", 
                label: "Contract Synthesis Engine", 
                type: "service", 
                description: "Analyzes IR metadata to generate formal rules for nullability, buffer sizes, and pointer ownership.",
                responsibilities: ["Rule generation", "Constraint verification", "Contract export"],
                tech: ["Python", "Z3 Solver"]
            },
            { 
                id: "adapter", 
                label: "Runtime Adapter", 
                type: "logic", 
                description: "Cross-language shims that intercept FFI calls and enforce the generated safety contracts.",
                responsibilities: ["Boundary interception", "Contract enforcement", "Safety reporting"],
                tech: ["C++", "Rust", "Python"]
            }
        ],
        architecture_connections: [
            { from: "native_source", to: "ingestion", label: "AST_EXTRACTION" },
            { from: "ingestion", to: "uir", label: "NORMALIZE_METADATA" },
            { from: "uir", to: "synthesis", label: "SYNTHESIZE_CONTRACT" },
            { from: "synthesis", to: "adapter", label: "EXPORT_RULES" },
            { from: "adapter", to: "native_source", label: "ENFORCE_BOUNDARY" }
        ],
        evolution: [
            { milestone: "Research Initialization", description: "Identifying the core failure vectors in multi-language systems and defining the verification strategy.", date: "PHASE_01" },
            { milestone: "Clang AST Frontend", description: "Developing the ingestion layer to extract reliable metadata directly from C/C++ compiler internals.", date: "PHASE_02" },
            { milestone: "IR Design & Synthesis", description: "Designing the universal intermediate representation and the logical engine for contract generation.", date: "PHASE_03" },
            { milestone: "Adapter Prototype", description: "Building the first runtime adapters to demonstrate cross-language safety enforcement.", date: "PHASE_04" }
        ],
        architectureDecisions: [
            {
                title: "AST Parsing vs. Binary Inspection",
                problem: "Binary libraries lack the high-level type information (ownership, intent) necessary for safety verification.",
                approach: "Utilized Clang's AST tooling to analyze source headers instead of compiled binaries.",
                reasoning: "The Abstract Syntax Tree contains the original programmer's intent regarding types and parameters, which is lost after compilation.",
                alternatives: ["Binary DWARF analysis", "Object file scraping"]
            },
            {
                title: "Language-Neutral IR",
                problem: "Generating contracts directly from C++ for Python creates a tight coupling that breaks when adding a third language.",
                approach: "Created a normalized Intermediate Representation (IR) to act as a bridge between any two languages.",
                reasoning: "A universal IR allows the synthesis engine to remain agnostic of both the source and target languages.",
                alternatives: ["Direct source-to-source translation", "Ad-hoc mapping files"]
            },
            {
                title: "Modular Verification Pipeline",
                problem: "Systems research requires frequent changes to individual components (solvers, extractors, adapters).",
                approach: "Adopted a multi-stage pipeline architecture with isolated layers for each transformation.",
                reasoning: "Modular design ensures that an update to the Clang extractor doesn't require rewriting the contract logic.",
                alternatives: ["Monolithic analyzer", "Plugin-based system"]
            }
        ],
        tradeoffs: [
            {
                title: "Reliability over Compilation Speed",
                description: "The pipeline performs deep AST analysis which adds overhead to the build process, but ensures boundary safety and prevents runtime crashes.",
                impact: "PERFORMANCE"
            },
            {
                title: "Prototype over Tooling",
                description: "Focusing on modular research architecture rather than building a polished commercial CLI. Prioritizing flexibility for experimentation.",
                impact: "SIMPLICITY"
            }
        ],
        development_story: [
            {
                id: "extraction",
                title: "Metadata Ingestion",
                description: "The journey begins by feeding C/C++ source into the ingestion layer, where Clang extracts precise type and pointer metadata from the AST.",
                activeNodes: ["native_source", "ingestion"]
            },
            {
                id: "normalization",
                title: "IR Normalization",
                description: "Extracted data is normalized into a language-neutral Intermediate Representation, stripping away C++ specifics for universal safety analysis.",
                activeNodes: ["ingestion", "uir"]
            },
            {
                id: "synthesis",
                title: "Contract Synthesis",
                description: "The synthesis engine analyzes the IR, evaluating nullability, ownership, and ABI rules to generate formal cross-language safety contracts.",
                activeNodes: ["uir", "synthesis"]
            },
            {
                id: "enforcement",
                title: "Runtime Enforcement",
                description: "Generated contracts are utilized by runtime adapters to shield the FFI boundary, intercepting calls to verify safety before execution.",
                activeNodes: ["synthesis", "adapter", "native_source"]
            }
        ],
        storyTitle: "Verification Pipeline",
        internalComponents: [
            { name: "Architecture Layer", description: "Defines the structural constraints and system boundaries for the entire verification process." },
            { name: "Pipeline Orchestration", description: "Coordinates the flow of data from source extraction through to runtime enforcement." },
            { name: "Ingestion Layer", description: "Leverages Clang and LLVM to accurately ingest C++ header metadata and function signatures." },
            { name: "IR Normalization", description: "Standardizes extracted metadata into a canonical format for cross-language reasoning." },
            { name: "Contract Synthesis", description: "The logical core that generates safety rules for nullability, alignment, and ownership." },
            { name: "Language Adapters", description: "The final enforcement point where contracts are used to protect cross-language call boundaries." }
        ],
        future: [
            { title: "Recursive Type Synthesis", description: "Expanding the analyzer to automatically handle deeply nested structures and union types in contracts." },
            { title: "Dynamic Ownership Tracking", description: "Investigating runtime shims that can track memory ownership across multiple FFI boundaries." }
        ]
    }
];
