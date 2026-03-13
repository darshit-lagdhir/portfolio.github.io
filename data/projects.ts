import { Project } from "@/types/project";

export const projects: Project[] = [
    {
        id: "movex",
        name: "MoveX",
        slug: "movex",
        route_path: "/movex",
        shortDescription: "A full logistics and courier management system handling parcel operations, multi-role staff workflows, and shipment tracking with strict access control.",
        longDescription: "MoveX is a logistics management system built to handle franchise-based shipping, staffing, and fleet coordination. It manages the full delivery lifecycle — from customer booking and pricing through pickup scheduling, dispatch, hub transfers, and final delivery confirmation. The system focuses on backend architecture and operational workflows rather than UI complexity.",
        category: "Operational Backend System",
        techStack: ["Node.js", "Express", "PostgreSQL", "Vanilla JS"],
        status: "Completed",
        learningOutcomes: ["Backend Architecture", "Role-Based Access Control", "Database Schema Design"],
        techGroups: [
            { role: "Backend Services", items: ["Node.js", "Express"] },
            { role: "Database Layer", items: ["PostgreSQL"] },
            { role: "Security & Auth", items: ["JWT", "Bcrypt", "Role-Based Access Control"] },
            { role: "Frontend", items: ["HTML", "CSS", "Vanilla JavaScript"] }
        ],
        tier: 1,
        engineeringFocus: "Backend Architecture & Operational Workflows",
        technicalMeta: {
            systemType: "Operational backend system",
            architectureStyle: "Modular Monolith",
            storageType: "Relational (PostgreSQL)",
        },
        authority: {
            complexityScore: 7,
            architectureDepth: "ROLE_ISO_HNDL",
            researchFocus: "Role-Based Session Isolation in Multi-User Systems",
            primaryDomain: "Backend Development",
            experimentationAreas: ["Role-Based Access Control", "Session Security", "Database Schema Design"],
            deepDives: [
                {
                    type: "DISCOVERY",
                    title: "Session Security Design",
                    content: "Login sessions are stored in the database with secure session management. Passwords are hashed using Bcrypt. Request rate limits prevent brute-force login attempts. Role-based access control ensures users can only access dashboards appropriate to their role."
                },
                {
                    type: "OPTIMIZATION",
                    title: "PostgreSQL Schema Architecture",
                    content: "The database uses PostgreSQL with key tables for organizations, users, sessions, password_resets, and shipments. Each shipment is tracked using a unique tracking ID linked to sender and receiver information. The schema supports both authentication and logistics operations."
                },
                {
                    type: "REDESIGN",
                    title: "Split Deployment Model",
                    content: "MoveX supports a split deployment architecture where backend services run on platforms like Render, frontend assets are served through Cloudflare, and PostgreSQL databases are hosted through Supabase. This separates application layers for scalability and security."
                }
            ],
            experimentationNotes: [
                {
                    title: "Designing Role-Based Systems",
                    content: "Learned how to separate authentication concerns from business logic so that each role operates within its own access boundary without shared state leaking between roles."
                },
                {
                    title: "Database Schema Design for Workflows",
                    content: "Designing schemas for operational workflows taught me the importance of tracking state transitions explicitly rather than inferring them from timestamp comparisons."
                },
                {
                    title: "Debugging Real-World Application Behavior",
                    content: "Many bugs only appeared when multiple roles interacted with the same data simultaneously. This taught me the value of database-level constraints over application-level validation."
                }
            ],
            recurringPatterns: ["Modular Route Separation", "Database-Level State Tracking", "Role-Based Middleware Chains"]
        },
        problem: "Courier services involve multiple operational steps: booking parcels, assigning pickup tasks, tracking shipments, updating delivery status, managing staff roles, and maintaining operational reports. Without a centralized system, managing these processes becomes complicated and error-prone. MoveX attempts to organize all of these operations into a single system that handles authentication, shipment tracking, and operational management.",
        challenges: [
            { title: "Managing Session Security", description: "Building secure session management that prevents token replay and ensures each role operates within its own access boundary required careful middleware design and database-backed session storage." },
            { title: "Shipment State Tracking", description: "Tracking a parcel through multiple status transitions (booked, picked up, in transit, delivered) required a clear state model that prevents invalid transitions and handles edge cases like cancelled or returned shipments." },
            { title: "Multi-Role Data Access", description: "Different roles need different views of the same data. An admin sees all shipments, a franchisee sees only their branch, and a customer sees only their own parcels. Implementing this consistently required careful middleware design." }
        ],
        layout: "layered",
        domains: ["backend_systems", "data_systems"],
        architecture_nodes: [
            { 
                id: "frontend", 
                label: "Frontend Dashboards", 
                type: "interface", 
                description: "Role-specific user interfaces for administrators, franchise staff, and customers.",
                responsibilities: ["Role-based access", "Shipment operations", "Dashboard rendering"],
                tech: ["Vanilla JS", "HTML", "CSS"]
            },
            { 
                id: "api", 
                label: "API Server (Node.js)", 
                type: "service", 
                description: "The core backend engine handling business logic and shipment operations.",
                responsibilities: ["Request routing", "Business logic execution", "Shipment management"],
                tech: ["Node.js", "Express"]
            },
            { 
                id: "auth", 
                label: "Auth & Session Layer", 
                type: "logic", 
                description: "Manages user authentication and role-based session isolation.",
                responsibilities: ["Login verification", "Session management", "Bcrypt hashing"],
                tech: ["JWT", "Bcrypt", "Middleware"]
            },
            { 
                id: "db", 
                label: "PostgreSQL Database", 
                type: "database", 
                description: "Primary relational storage for users, shipments, and organizational data.",
                responsibilities: ["Data persistence", "Relational integrity", "Shipment records"],
                tech: ["PostgreSQL"]
            },
            { 
                id: "storage", 
                label: "Storage Layer (Supabase)", 
                type: "database", 
                description: "Cloud storage for delivery confirmation photos and shipment files.",
                responsibilities: ["Asset storage", "Delivery proof hosting", "Secure file access"],
                tech: ["Supabase Storage"]
            }
        ],
        architecture_connections: [
            { from: "frontend", to: "api", label: "REST_API_REQUESTS" },
            { from: "api", to: "auth", label: "VERIFY_PERMISSIONS" },
            { from: "api", to: "db", label: "PERSIST_RECORDS" },
            { from: "api", to: "storage", label: "UPLOAD_ASSETS" }
        ],
        evolution: [
            { milestone: "Initial Prototype", description: "Started with a basic Express server and simple file-based data storage to test the core booking workflow.", date: "PHASE_01" },
            { milestone: "Database Integration", description: "Migrated from file storage to PostgreSQL to support relational data and ensure integrity across concurrent operations.", date: "PHASE_02" },
            { milestone: "Role System Implementation", description: "Built the role-based access control system with separate middleware chains for Admin, Franchisee, Staff, and Customer roles.", date: "PHASE_03" },
            { milestone: "Full Workflow Completion", description: "Completed the end-to-end shipment lifecycle from booking through pickup, dispatch, transit, and delivery confirmation.", date: "PHASE_04" }
        ],
        architectureDecisions: [
            {
                title: "Modular Route Separation by Role",
                problem: "Mixing all role logic into shared routes made the codebase difficult to maintain and created security risks.",
                approach: "Separated routes, controllers, and middleware into role-specific modules so each role has its own isolated code path.",
                reasoning: "This makes it easy to modify one role without affecting others and creates a natural security boundary.",
                alternatives: ["Single shared controller with role checks", "Microservice per role"]
            },
            {
                title: "PostgreSQL over NoSQL",
                problem: "Shipment tracking requires consistent relational data with strict integrity guarantees.",
                approach: "Used PostgreSQL with structured tables and foreign key relationships to ensure data consistency.",
                reasoning: "In logistics, eventually-consistent data can lead to lost shipments or double-assigned staff.",
                alternatives: ["MongoDB", "SQLite"]
            },
            {
                title: "Server-Side Sessions over Stateless Tokens",
                problem: "Needed to invalidate sessions immediately when a user's role changes or suspicious activity is detected.",
                approach: "Stored sessions in the database rather than relying purely on stateless JWT tokens.",
                reasoning: "Stateless JWTs cannot be revoked until they expire. Database-backed sessions give immediate control.",
                alternatives: ["Pure JWT with short expiry", "Redis session store"]
            }
        ],
        tradeoffs: [
            {
                title: "Simplicity over Scalability",
                description: "Chose a monolithic architecture with modular separation rather than microservices. Simpler to deploy and debug but limits horizontal scaling.",
                impact: "SIMPLICITY"
            },
            {
                title: "Vanilla JS over Frontend Framework",
                description: "Used plain HTML/CSS/JavaScript for the frontend rather than React or similar frameworks. Keeps the focus on backend architecture.",
                impact: "SIMPLICITY"
            }
        ],
        development_story: [
            {
                id: "motivation",
                title: "Operational Motivation",
                description: "The project began with a simple objective: Create a backend system capable of managing parcel operations from booking to delivery, exploring how multi-role workflows function in a real-world environment.",
                activeNodes: ["api"]
            },
            {
                id: "complexity",
                title: "Structural Expansion",
                description: "As the system grew, I designed intricate authentication systems, role-based dashboards, and custom shipment tracking logic to ensure data integrity across the logistics lifecycle.",
                activeNodes: ["auth", "api"]
            },
            {
                id: "challenges",
                title: "Technical Friction",
                description: "Development revealed significant challenges in handling session security between roles and designing database schemas that could accurately track complex temporal state transitions.",
                activeNodes: ["db"]
            },
            {
                id: "evolution",
                title: "System Stabilization",
                description: "Through deep iteration and debugging, the initial prototype evolved into a modular platform where authentication concerns were isolated from operational logistics logic.",
                activeNodes: ["frontend", "api", "auth", "db"]
            }
        ],
        internalComponents: [
            { name: "User Authentication Module", description: "Handles user login, password hashing with Bcrypt, and generation of secure session tokens." },
            { name: "Role-Based Routes", description: "Separated route handlers for Admins, Franchisees, Staff, and Customers to ensure isolation." },
            { name: "Shipment State Engine", description: "Manages technical transitions of shipment records (booked -> picked up -> delivered)." },
            { name: "Database Schema Layer", description: "Relational PostgreSQL structure optimized for logistics and multi-role data access." },
            { name: "Asset Storage Driver", description: "Connects to Supabase to host and serve delivery confirmation photos and shipment files." }
        ],
        future: [
            { title: "Automated Dispatch Routing", description: "Implementing algorithms to suggest optimal delivery routes for drivers based on shipment density." },
            { title: "Real-Time Tracking Socket", description: "Adding WebSocket support for live location updates for customers and admins." }
        ]
    },
    {
        id: "uidai",
        name: "UIDAI Advisory System",
        slug: "uidai",
        route_path: "/uidai",
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
                    title: "Signal Types and Trend Shifters",
                    content: "The system generates specific signals like 'High Stress' (volume exceeding norms) and 'Trend Shifter' (direction changes in activity). These flags are designed to prompt human investigation rather than trigger automated responses, ensuring the system remains a partner to the operator."
                },
                {
                    type: "OPTIMIZATION",
                    title: "Establishing Regional Baselines",
                    content: "To detect anomalies, the system establishes a baseline pattern for each region based on historical data. By comparing current data against these historical norms, we can identify demographic shifts (like 'Baby Boom' or 'Employment Magnet' zones) without requiring hard-coded thresholds."
                },
                {
                    type: "REDESIGN",
                    title: "Strict Functional Boundaries",
                    content: "The design was refined to explicitly prevent automated decision-making. The system does not issue instructions to field teams, assign resources, or rank individuals. This boundary is enforced by a reporting-only architecture where all outputs are channeled through an advisory dashboard."
                }
            ],
            experimentationNotes: [
                {
                    title: "Aggregated Privacy Boundaries",
                    content: "Learned that useful insights can be extracted entirely from aggregated pincode counts without ever touching PII or biometrics. Privacy is built into the data model itself by only processing high-level totals."
                },
                {
                    title: "Communicating Uncertainty",
                    content: "Implementing confidence levels (HIGH/MEDIUM/LOW) taught me that an AI's most valuable output often isn't the prediction itself, but the degree of certainty attached to it. This prevents officials from over-relying on system signals."
                },
                {
                    title: "Human Contextual Advantage",
                    content: "Discovered that many 'anomalies' were actually local events or network issues. This reinforced the requirement for human review, as local teams possess contextual knowledge an algorithm cannot see."
                }
            ],
            recurringPatterns: ["Baseline-vs-Current Analysis", "Advisory Signal Propagation", "Privacy-by-Aggregation"]
        },
        problem: "Monitoring enrollment patterns manually across millions of records in thousands of centers is extremely difficult. Officials struggle to detect unexpected spikes, sudden drops (Ghost Zones), or gradual trend shifts in specific demographic groups across a national scale. The project attempts to make these patterns visible by analyzing aggregated counts and presenting summarized signals for review.",
        challenges: [
            { title: "Handling National-Scale Datasets", description: "Processing data across thousands of locations while maintaining clear regional context required efficient data partitioning and baseline comparison logic." },
            { title: "Defining the 'Advice' Boundary", description: "Ensuring the system UI does not suggest actions but only identifies patterns required a careful redesign of how alerts are worded and displayed." },
            { title: "Data Volatility", description: "Normalizing data to account for temporary network issues or regional holidays that can cause false-positive 'Ghost Zone' signals." }
        ],
        layout: "pipeline",
        domains: ["data_systems", "ai_exploration"],
        architecture_nodes: [
            { 
                id: "data_source", 
                label: "Enrollment Data Source", 
                type: "database", 
                description: "Aggregated Aadhaar enrollment records organized by region and date.",
                responsibilities: ["Raw count ingestion", "Pincode-level aggregation", "Dataset partitioning"],
                tech: ["PostgreSQL", "CSV/JSON Datasets"]
            },
            { 
                id: "processor", 
                label: "Data Processing Layer", 
                type: "logic", 
                description: "Organizes and cleans enrollment records to establish regional baselines.",
                responsibilities: ["Data cleaning", "Baseline synthesis", "Temporal normalization"],
                tech: ["Python", "Pandas"]
            },
            { 
                id: "engine", 
                label: "Pattern Detection Engine", 
                type: "service", 
                description: "Identifies anomalies by comparing current enrollment counts against historical regional baselines.",
                responsibilities: ["Anomaly detection", "Statistical significance scoring", "Trend identification"],
                tech: ["Python", "Scikit-Learn"]
            },
            { 
                id: "signals", 
                label: "Signal Generation Layer", 
                type: "logic", 
                description: "Translates identified patterns into advisory signals like 'High Stress' or 'Ghost Zones'.",
                responsibilities: ["Signal classification", "Confidence calculation", "Contextual metadata attachment"],
                tech: ["Python", "NumPy"]
            },
            { 
                id: "dashboard", 
                label: "Dashboard Visualization", 
                type: "interface", 
                description: "Heatmaps and signal logs for review by human officials.",
                responsibilities: ["Spatial visualization", "Signal reporting", "Pattern highlighting"],
                tech: ["Vanilla JS", "D3.js"]
            },
            { 
                id: "human", 
                label: "Human Decision Layer", 
                type: "interface", 
                description: "Represents the official review process where humans interpret advisor signals.",
                responsibilities: ["Signal interpretation", "Contextual verification", "Final operational decisions"],
                tech: ["Human Analysis"]
            }
        ],
        architecture_connections: [
            { from: "data_source", to: "processor", label: "INGEST_DATA" },
            { from: "processor", to: "engine", label: "ANALYZE_BASELINES" },
            { from: "engine", to: "signals", label: "GENERATE_SIGNAL" },
            { from: "signals", to: "dashboard", label: "DELIVER_ADVISORY" },
            { from: "dashboard", to: "human", label: "REVIEW_SIGNALS" }
        ],
        evolution: [
            { milestone: "Data Partitioning", description: "Refined the data model to focus strictly on pincode-level demographic counts.", date: "HACKATHON_W1" },
            { milestone: "Baseline Logic", description: "Implemented the baseline-vs-current comparison engine to identify regional spikes.", date: "HACKATHON_W2" },
            { milestone: "Advisory Interface", description: "Built the signal dashboard highlighting 'Ghost Zones' and 'Baby Boom' patterns.", date: "HACKATHON_W3" }
        ],
        architectureDecisions: [
            {
                title: "Advisory Only Architecture",
                problem: "Automated decisions in identity systems can lead to high-impact false positives.",
                approach: "Designed a 'read-only' pattern detection pipeline with no automated instruction capability.",
                reasoning: "Ensures all final decisions remain with human officials who have the necessary local context.",
                alternatives: ["Automated Alerting Systems", "Rule-based Auto-flags"]
            },
            {
                title: "Privacy by Aggregation",
                problem: "Handling individual records within a hackathon environment carries high privacy risks.",
                approach: "Processed data strictly at the aggregated pincode level, discarding all individual identifiers.",
                reasoning: "Aggregation provides significant insight while ensuring that zero individual-level data is ever stored or analyzed.",
                alternatives: ["Data Anonymization", "Homomorphic Encryption"]
            }
        ],
        tradeoffs: [
            {
                title: "Context over Automation",
                description: "Sacrificed speed of action to ensure every signal undergoes mandatory human review for contextual accuracy.",
                impact: "SIMPLICITY"
            }
        ],
        development_story: [
            {
                id: "challenge",
                title: "Hackathon Challenge",
                description: "The project started with a challenge to analyze large-scale Aadhaar enrollment data covering thousands of centers, where manual monitoring was functionally impossible.",
                activeNodes: ["data_source"]
            },
            {
                id: "insight",
                title: "Pattern Visualization",
                description: "I realized that identifying spikes or 'Ghost Zones' required an automated system that could highlight unusual enrollment patterns for further human review.",
                activeNodes: ["processor", "engine"]
            },
            {
                id: "ethical",
                title: "Advisory-Only Boundary",
                description: "Recognizing the gravity of identity data, I intentionally designed the system to be advisory-only, providing signals and context but never making autonomous decisions.",
                activeNodes: ["dashboard", "signals"]
            },
            {
                id: "learning",
                title: "Responsible Design",
                description: "Developing this system reinforced the vital lesson that data tools should empower human officials with context rather than replacing them with opaque algorithms.",
                activeNodes: ["data_source", "processor", "engine", "dashboard", "human"]
            }
        ],
        internalComponents: [
            { name: "Data Aggregator", description: "Ingests raw pincode counts and organizes them into regional temporal datasets for analysis." },
            { name: "Baseline Synthesis Engine", description: "Generates historical enrollment norms for each region to serve as a reference point." },
            { name: "Signal Generator", description: "Identifies specific patterns (Spikes, Ghost Zones) and attaches contextual confidence scores." },
            { name: "Advisory Dashboard", description: "Map-based interface representing signals spatially for quick identification of regional trends." },
            { name: "Ethics Boundary Guard", description: "Architecture-level constraints that prevent the system from triggering automated actions." }
        ],
        future: [
            { title: "Temporal Forecasting", description: "Expanding the baseline model to predict future seasonal spikes based on historical multi-year trends." },
            { title: "Multi-Source Integration", description: "Correlating enrollment spikes with external demographic events or administrative policy changes." }
        ]
    },
    {
        id: "pfcv",
        name: "Polyglot FFI Verifier",
        slug: "pfcv",
        route_path: "/pfcv",
        shortDescription: "A verification pipeline exploring cross-language safety when connecting high-level languages to native C/C++ libraries through Foreign Function Interfaces.",
        longDescription: "The Polyglot FFI Contract Verifier (PFCV) is a verification pipeline designed to ensure safety when connecting high-level programming languages to native C/C++ libraries. FFI boundaries can introduce type mismatches, memory safety problems, and ABI compatibility issues. PFCV attempts to solve this by extracting metadata from native source code, converting it into a universal intermediate representation, generating formal safety contracts, and enforcing those contracts at runtime. This project is an ongoing exploration into cross-language verification and runtime safety.",
        category: "Verification Pipeline",
        techStack: ["C++", "Rust", "Python", "Clang"],
        status: "Active Development",
        learningOutcomes: ["Language Interoperability", "Compiler Tooling (Clang)", "Contract-Driven Verification"],
        techGroups: [
            { role: "Core Verification", items: ["C++", "Clang Tooling"] },
            { role: "Safety Logic", items: ["Rust"] },
            { role: "Analysis Layer", items: ["Python", "Z3 Solver"] },
            { role: "Runtime", items: ["Clang/LLVM", "PyBind11"] }
        ],
        tier: 1,
        engineeringFocus: "Cross-Language Verification Pipeline",
        technicalMeta: {
            systemType: "Systems engineering research pipeline",
            architectureStyle: "Multi-Stage Pipeline",
            storageType: "In-Memory AST State",
        },
        authority: {
            complexityScore: 8,
            architectureDepth: "FFI_VERIFY",
            researchFocus: "Cross-Language Safety Verification",
            primaryDomain: "Systems Engineering",
            experimentationAreas: ["Metadata Extraction", "Intermediate Representation Design", "Contract Synthesis"],
            deepDives: [
                {
                    type: "DISCOVERY",
                    title: "Metadata Extraction with Clang",
                    content: "The pipeline begins by extracting metadata from native C/C++ source code using Clang compiler tooling. This step analyzes header files and function definitions to extract function signatures, parameter types, pointer relationships, and struct definitions. This metadata forms the foundation for all later verification steps."
                },
                {
                    type: "OPTIMIZATION",
                    title: "Universal Intermediate Representation",
                    content: "After extraction, the system converts language-specific metadata into a normalized intermediate representation. The IR captures scalars, pointers, structures, and memory ownership relationships in a consistent format, allowing the system to reason about functions across multiple programming languages."
                },
                {
                    type: "REDESIGN",
                    title: "Contract Synthesis and Enforcement",
                    content: "The synthesis engine analyzes the IR to generate safety contracts — rules like 'a pointer parameter must not be null' or 'a buffer size must match a specified length parameter.' Language adapters then enforce these contracts at runtime, intercepting FFI calls to verify rules before native functions execute."
                }
            ],
            experimentationNotes: [
                {
                    title: "Understanding Cross-Language Boundaries",
                    content: "Working on PFCV taught me how much hidden complexity exists at the boundary between two programming languages. Type systems that seem compatible on the surface often have subtle differences in memory layout, alignment, and ownership semantics."
                },
                {
                    title: "Working with Compiler Tooling",
                    content: "Learning to use Clang's AST tooling was one of the most technically demanding parts of this project. Compiler internals are complex, but understanding how source code is represented as an abstract syntax tree is fundamental to building verification tools."
                },
                {
                    title: "Designing Modular Pipeline Architecture",
                    content: "Building PFCV as a series of independent stages — extraction, normalization, synthesis, enforcement — taught me the value of modular architecture. Each stage can be tested and improved independently."
                }
            ],
            recurringPatterns: ["Pipeline Stage Isolation", "AST-Based Analysis", "Contract-Driven Verification"]
        },
        problem: "When a high-level language calls native code through FFI, several assumptions must hold: function parameters must match expected types, pointers must reference valid memory, ownership rules must be respected, and binary interfaces must remain compatible across compilation boundaries. If any of these assumptions fail, the program may crash or behave unpredictably. PFCV attempts to detect these issues before they cause runtime failures.",
        challenges: [
            { title: "Type System Differences", description: "Different languages represent the same concepts differently. A Python list and a C++ vector may seem similar but have completely different memory layouts, ownership semantics, and access patterns." },
            { title: "Compiler Tooling Complexity", description: "Working with Clang's AST requires understanding internal compiler representations. The learning curve is steep, but the precision of AST-based analysis is essential for reliable verification." },
            { title: "Multi-Language Adapter Design", description: "Each target language (Python, Rust, C++) requires its own runtime adapter that integrates with the language's FFI mechanism. Designing adapters that are both thorough and non-intrusive is an ongoing challenge." }
        ],
        layout: "pipeline",
        domains: ["programming_languages", "systems_engineering"],
        architecture_nodes: [
            { 
                id: "native_source", 
                label: "Native Source Code", 
                type: "logic", 
                description: "C/C++ libraries and header files being analyzed for FFI safety.",
                responsibilities: ["Exposing native APIs", "Defining complex memory layouts", "Managing manual memory"],
                tech: ["C++", "C"]
            },
            { 
                id: "extraction", 
                label: "Metadata Extraction Layer", 
                type: "pipeline", 
                description: "Uses Clang tooling to extract function signatures and types from native headers.",
                responsibilities: ["AST tree traversal", "Type signature extraction", "Struct alignment analysis"],
                tech: ["Clang Tooling", "LLVM"]
            },
            { 
                id: "uir", 
                label: "Intermediate Representation", 
                type: "logic", 
                description: "Normalizes extracted metadata into a language-independent data format.",
                responsibilities: ["Type normalization", "Canonical memory mapping", "Metadata serialization"],
                tech: ["Rust", "Serde"]
            },
            { 
                id: "synthesis", 
                label: "Contract Synthesis Engine", 
                type: "service", 
                description: "Generates formal safety contracts based on the IR metadata.",
                responsibilities: ["Constraint solving", "Safety rule generation", "Contract export"],
                tech: ["Python", "Z3 Solver"]
            },
            { 
                id: "adapter", 
                label: "Runtime Adapter", 
                type: "logic", 
                description: "Language-specific shims that enforce safety contracts during FFI execution.",
                responsibilities: ["Contract enforcement", "Boundary intercept", "Active safety checking"],
                tech: ["C++", "PyBind11"]
            },
            { 
                id: "runtimes", 
                label: "Language Runtimes", 
                type: "interface", 
                description: "Higher-level environments (Python, Rust) calling into native code.",
                responsibilities: ["FFI invocation", "Data marshaling", "Memory ownership negotiation"],
                tech: ["Python", "Rust", "Node.js"]
            }
        ],
        architecture_connections: [
            { from: "native_source", to: "extraction", label: "AST_PARSING" },
            { from: "extraction", to: "uir", label: "NORMALIZE_TYPES" },
            { from: "uir", to: "synthesis", label: "GENERATE_CONTRACTS" },
            { from: "synthesis", to: "adapter", label: "ENFORCE_RULES" },
            { from: "runtimes", to: "adapter", label: "NATIVE_CALL" },
            { from: "adapter", to: "native_source", label: "SAFE_EXECUTION" }
        ],
        evolution: [
            { milestone: "Pipeline Design", description: "Designed the multi-stage pipeline architecture and defined the intermediate representation format.", date: "PHASE_01" },
            { milestone: "Clang Integration", description: "Integrated Clang compiler tooling for AST extraction, enabling precise analysis of C/C++ function signatures.", date: "PHASE_02" },
            { milestone: "Contract Synthesis", description: "Implemented the contract synthesis engine that generates safety rules from the normalized IR.", date: "PHASE_03" },
            { milestone: "Runtime Adapters", description: "Currently developing language-specific adapters for Python and Rust to enforce contracts at runtime.", date: "PHASE_04" }
        ],
        architectureDecisions: [
            {
                title: "Pipeline Architecture over Monolithic Analyzer",
                problem: "A single monolithic analyzer would tightly couple extraction, normalization, and verification logic, making it difficult to test or extend.",
                approach: "Designed the system as a series of independent pipeline stages where each stage produces output consumed by the next.",
                reasoning: "Each pipeline stage can be developed, tested, and improved independently. Adding a new language only requires a new extractor and adapter.",
                alternatives: ["Monolithic analysis engine", "Plugin-based architecture"]
            },
            {
                title: "Clang Tooling over Manual Parsing",
                problem: "Parsing C/C++ headers manually would miss edge cases in complex type definitions, macros, and templates.",
                approach: "Used Clang's AST tooling to get compiler-accurate metadata extraction.",
                reasoning: "Clang already solves the hard problem of fully parsing C/C++. Using it ensures extraction accuracy and handles edge cases.",
                alternatives: ["Custom parser", "Regular expression extraction"]
            },
            {
                title: "Rust for IR Logic",
                problem: "Writing verification logic that is itself memory-safe is important for a tool that verifies memory safety.",
                approach: "Implemented the IR normalization and contract synthesis in Rust.",
                reasoning: "If the verifier itself has memory bugs, it undermines the credibility of the verification results. Rust's ownership system prevents this.",
                alternatives: ["C++ with smart pointers", "Python with type checking"]
            }
        ],
        tradeoffs: [
            {
                title: "Thoroughness over Speed",
                description: "The pipeline performs exhaustive AST analysis rather than optimized bytecode inspection. This is slower but more reliable for catching subtle type mismatches.",
                impact: "PERFORMANCE"
            },
            {
                title: "Modular Stages over Integrated Processing",
                description: "Breaking the pipeline into separate stages adds overhead from serialization between stages but makes the system easier to develop and debug.",
                impact: "MAINTAINABILITY"
            }
        ],
        development_story: [
            {
                id: "curiosity",
                title: "FFI Boundary Research",
                description: "Curiosity about the fragile interaction between high-level languages and native C/C++ libraries led to an investigation into common Foreign Function Interface failure modes.",
                activeNodes: ["native_source"]
            },
            {
                id: "fragility",
                title: "Identifying Failure Vectors",
                description: "I identified that runtime crashes often stemmed from incorrect function signatures, pointer misuse, or misaligned memory ownership assumptions across compilation boundaries.",
                activeNodes: ["extraction"]
            },
            {
                id: "pipeline",
                title: "Contract Synthesis Idea",
                description: "This research inspired the creation of a verification pipeline that extracts metadata from native code and generates safety contracts to enforce valid cross-language calls.",
                activeNodes: ["uir", "synthesis"]
            },
            {
                id: "evolution",
                title: "Modular Research Pipeline",
                description: "The system evolved from a conceptual exploration into a multi-stage modular pipeline, representing a deep dive into systems engineering and runtime safety.",
                activeNodes: ["native_source", "extraction", "uir", "synthesis", "adapter", "runtimes"]
            }
        ],
        internalComponents: [
            { name: "Metadata Extractor", description: "Uses Clang compiler tooling to analyze native C/C++ header files and extract function signatures, parameter types, pointer relationships, and struct definitions." },
            { name: "IR Normalizer", description: "Converts language-specific metadata into a universal intermediate representation that captures scalars, pointers, structures, and memory ownership in a consistent format." },
            { name: "Contract Synthesizer", description: "Analyzes the normalized IR to generate formal safety contracts — rules that define valid conditions for cross-language function calls." },
            { name: "Runtime Enforcer", description: "Language-specific adapters that intercept FFI calls and verify contract rules before allowing native functions to execute." },
            { name: "Safety Reporter", description: "Generates reports documenting verification results, contract violations, and safety status for each analyzed FFI boundary." }
        ],
        future: [
            { title: "Additional Language Adapters", description: "Expanding beyond the current Python, Rust, and C++ targets to support additional languages." },
            { title: "Automated Bridge Generation", description: "Automatically generating FFI bridge code from verified contracts rather than requiring manual binding definitions." }
        ]
    }
];
