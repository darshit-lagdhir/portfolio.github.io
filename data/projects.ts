import { Project } from "@/types/project";

export const projects: Project[] = [
    {
        slug: "movex",
        title: "MoveX",
        shortDescription: "A full logistics and courier management system handling parcel operations, multi-role staff workflows, and shipment tracking with strict access control.",
        techStack: ["Node.js", "Express", "PostgreSQL", "Vanilla JS"],
        techGroups: [
            { role: "Backend Services", items: ["Node.js", "Express"] },
            { role: "Database Layer", items: ["PostgreSQL"] },
            { role: "Security & Auth", items: ["JWT", "Bcrypt", "Role-Based Access Control"] },
            { role: "Frontend", items: ["HTML", "CSS", "Vanilla JavaScript"] }
        ],
        tier: 1,
        githubRepoName: "movex",
        githubUrl: "https://github.com/darshit-lagdhir/movex",
        status: "COMPLETE",
        domains: ["backend_development", "security_linux", "data_systems"],
        overview: "MoveX is a logistics management system built to handle franchise-based shipping, staffing, and fleet coordination. It manages the full delivery lifecycle — from customer booking and pricing through pickup scheduling, dispatch, hub transfers, and final delivery confirmation. The system focuses on backend architecture and operational workflows rather than UI complexity.",
        problem: "Courier services involve multiple operational steps: booking parcels, assigning pickup tasks, tracking shipments, updating delivery status, managing staff roles, and maintaining operational reports. Without a centralized system, managing these processes becomes complicated and error-prone. MoveX attempts to organize all of these operations into a single system that handles authentication, shipment tracking, and operational management.",
        engineeringFocus: "Backend Architecture & Operational Workflows",
        technicalMeta: {
            systemType: "Web Application",
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
        architecture: "MoveX operates as a single integrated system with multiple operational modules. The backend server handles authentication, business logic, and database operations through Express routes organized by role. The frontend provides separate dashboard interfaces for administrators, franchisees, staff, and customers. The design focuses on maintaining clear separation between frontend pages and backend logic, with each role having its own controller, middleware, and view layer.",
        internalComponents: [
            { name: "User Management", description: "Handles registration, authentication, login sessions, and role-based access. Each user is assigned a role that determines which dashboards and operations they can access." },
            { name: "Franchise & Staff Operations", description: "Allows administrators to manage franchise branches and assign staff members. Franchisees can manage their own staff and oversee local operations." },
            { name: "Customer Booking & Pricing", description: "Customers can create parcel bookings, calculate delivery costs based on weight and distance, and track the status of their shipments." },
            { name: "Pickup & Dispatch Management", description: "Schedules parcel pickups and assigns delivery tasks to staff members. Manages the assignment workflow from pickup request to staff confirmation." },
            { name: "Shipment Tracking & Delivery", description: "Tracks the progress of each parcel from booking through hub transfers to final delivery. Supports proof-of-delivery uploads and delivery confirmation." },
            { name: "Reports & Analytics", description: "Provides operational statistics and reporting dashboards showing shipment volumes, delivery performance, and staff activity across franchise branches." }
        ],
        challenges: [
            { title: "Managing Session Security", description: "Building secure session management that prevents token replay and ensures each role operates within its own access boundary required careful middleware design and database-backed session storage." },
            { title: "Shipment State Tracking", description: "Tracking a parcel through multiple status transitions (booked, picked up, in transit, delivered) required a clear state model that prevents invalid transitions and handles edge cases like cancelled or returned shipments." },
            { title: "Multi-Role Data Access", description: "Different roles need different views of the same data. An admin sees all shipments, a franchisee sees only their branch, and a customer sees only their own parcels. Implementing this consistently required careful middleware design." }
        ],
        future: [
            { title: "Route Optimization", description: "Exploring algorithms to suggest optimal delivery routes based on geographic proximity and current staff workload." },
            { title: "Real-Time Status Updates", description: "Investigating WebSocket or polling-based approaches to provide live shipment status updates to customers." }
        ],
        diagram: {
            layout: "layered",
            nodes: [
                { 
                    id: "client", 
                    label: "FRONTEND_UI", 
                    type: "client", 
                    description: "Vanilla JavaScript dashboard interfaces for each role.",
                    responsibilities: ["Role-based dashboard rendering", "Shipment booking forms", "Status display"],
                    tech: ["HTML", "CSS", "Vanilla JavaScript"]
                },
                { 
                    id: "gateway", 
                    label: "EXPRESS_SERVER", 
                    type: "interface", 
                    description: "Express-based entry point handling routing and session validation.",
                    responsibilities: ["Request routing", "Session verification", "Rate limiting"],
                    tech: ["Express", "JWT", "Bcrypt"]
                },
                { 
                    id: "rbac", 
                    label: "AUTH_MIDDLEWARE", 
                    type: "logic", 
                    description: "Role-based access control middleware enforcing permissions per route.",
                    responsibilities: ["Permission checking", "Role validation", "Access boundary enforcement"],
                    tech: ["Custom Middleware", "JWT Verification"]
                },
                { 
                    id: "logistics", 
                    label: "BUSINESS_LOGIC", 
                    type: "service", 
                    description: "Core shipment and operational workflow logic.",
                    responsibilities: ["Shipment state transitions", "Booking and pricing", "Staff assignment"],
                    tech: ["Node.js", "Express Controllers"]
                },
                { 
                    id: "db", 
                    label: "POSTGRES_DB", 
                    type: "database", 
                    description: "PostgreSQL database storing all operational data.",
                    responsibilities: ["User and session storage", "Shipment records", "Organization data"],
                    tech: ["PostgreSQL"]
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
        storyFlow: [
            {
                id: "booking",
                title: "Customer Creates Booking",
                description: "A customer submits a parcel booking through the frontend form. The request is sent to the Express server with the session token.",
                activeNodes: ["client", "gateway"]
            },
            {
                id: "authentication",
                title: "Session & Role Verification",
                description: "The auth middleware validates the session token and confirms the customer role. The request is authorized to proceed.",
                activeNodes: ["gateway", "rbac"]
            },
            {
                id: "processing",
                title: "Booking Logic & Pricing",
                description: "The business logic layer calculates pricing based on weight and distance, creates the shipment record, and assigns a unique tracking ID.",
                activeNodes: ["logistics"]
            },
            {
                id: "storage",
                title: "Database Commit",
                description: "The shipment record is committed to PostgreSQL with all booking details and an initial status of 'booked'. The customer receives their tracking ID.",
                activeNodes: ["logistics", "db"]
            }
        ]
    },
    {
        slug: "uidai",
        title: "UIDAI Advisory System",
        shortDescription: "A hackathon project analyzing Aadhaar enrollment data to identify regional patterns and provide advisory insights to human operators.",
        techStack: ["Python", "FastAPI", "Pandas"],
        techGroups: [
            { role: "Core Language", items: ["Python 3.10+"] },
            { role: "API Layer", items: ["FastAPI", "Uvicorn"] },
            { role: "Data Processing", items: ["Pandas", "Scikit-Learn"] },
            { role: "Database", items: ["PostgreSQL"] }
        ],
        tier: 1,
        githubRepoName: "uidai-advisory",
        githubUrl: "https://github.com/darshit-lagdhir/uidai-advisory-system",
        status: "HACKATHON",
        domains: ["data_systems", "ai_ml", "systems_engineering"],
        overview: "The UIDAI Advisory Intelligence System was built during a hackathon focused on Aadhaar enrollment data. It analyzes enrollment datasets across thousands of pincodes to identify patterns such as regions with unusual enrollment spikes, declining activity, or high volatility. The system remains strictly advisory — it highlights patterns with confidence scores and explanatory context, but never makes decisions. All final decisions remain in human hands.",
        problem: "Identifying subtle fraud patterns at a national scale requires a system that can process high volumes of data without eliminating the nuance that human operators provide. Automation alone often results in high false-positives.",
        engineeringFocus: "Human-in-the-loop Pattern Detection",
        technicalMeta: {
            systemType: "Advisory Engine",
            architectureStyle: "Sequential Pipeline",
            storageType: "Structured & Vectorized",
        },
        authority: {
            complexityScore: 8,
            architectureDepth: "NON_BLOCKING_PIPE",
            researchFocus: "Advisory Intelligence Mechanisms",
            primaryDomain: "Data Engineering",
            experimentationAreas: ["Async Alert Correlation", "Human Feedback Weighting"],
            deepDives: [
                {
                    type: "REDESIGN",
                    title: "Switched to Asynchronous Ingestion",
                    content: "Originally built with synchronous endpoints, the system failed under burst traffic. Redesigned to use a Redis-backed queue (Celery), enabling the system to sustain 5x the ingestion load with no dropped authentication signals."
                },
                {
                    type: "DISCOVERY",
                    title: "The Feedback Loop Anomaly",
                    content: "Discovered that human-in-the-loop decisions were often biased by alert order. Implemented randomized priority shufflers in the advisory interface to normalize human decision-making and improve dataset balance."
                }
            ],
            experimentationNotes: [
                {
                    title: "Lesson: Simpler Models for First-Pass",
                    content: "Found that complex deep learning models had too much latency for initial outlier detection. Switched to lightweight statistical scanners for Level 1, reserving deep inference for verified risk clusters."
                }
            ],
            recurringPatterns: ["Async Worker Pipelines", "Feedback Loops"]
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
        shortDescription: "A verification pipeline exploring cross-language safety when connecting high-level languages to native C/C++ libraries through Foreign Function Interfaces.",
        techStack: ["C++", "Rust", "Python", "Clang"],
        techGroups: [
            { role: "Core Verification", items: ["C++", "Clang Tooling"] },
            { role: "Safety Logic", items: ["Rust"] },
            { role: "Analysis Layer", items: ["Python", "Z3 Solver"] },
            { role: "Runtime", items: ["Clang/LLVM", "PyBind11"] }
        ],
        tier: 1,
        githubRepoName: "polyglot-ffi-verifier",
        githubUrl: "https://github.com/darshit-lagdhir/polyglot-ffi-verifier",
        status: "ACTIVE_DEVELOPMENT",
        domains: ["systems_engineering", "programming_languages", "security_linux"],
        overview: "The Polyglot FFI Contract Verifier (PFCV) is a verification pipeline designed to ensure safety when connecting high-level programming languages to native C/C++ libraries. FFI boundaries can introduce type mismatches, memory safety problems, and ABI compatibility issues. PFCV attempts to solve this by extracting metadata from native source code, converting it into a universal intermediate representation, generating formal safety contracts, and enforcing those contracts at runtime. This project is an ongoing exploration into cross-language verification and runtime safety.",
        problem: "Foreign Function Interfaces (FFI) are notorious for creating 'safety gaps' where the compiler's guarantees from one language vanish when calling another, leading to silent memory corruption and exploitable vulnerabilities.",
        engineeringFocus: "Formal Contract Synthesis",
        technicalMeta: {
            systemType: "Systems Tooling",
            architectureStyle: "8-Module Universal IR Pipeline",
            storageType: "In-Memory AST State",
        },
        authority: {
            complexityScore: 9,
            architectureDepth: "MEM_ISO_LRY",
            researchFocus: "Formal Verification of FFI Bounds",
            primaryDomain: "Systems Programming",
            experimentationAreas: ["AST-to-UIR Normalization", "Pointer Escape Analysis"],
            deepDives: [
                {
                    type: "OPTIMIZATION",
                    title: "Pointer Escape Solver",
                    content: "Engineered a formal analysis pass that ensures pointers intended for local stack frames do not escape into the global heap during the cross-language transition. Solved using Z3 logic constraints over the synthesised IR."
                },
                {
                    type: "DEBUGGING",
                    title: "The Clang AST Memory Leak",
                    content: "Fixed a recurring memory exhaustion bug in the extractor by implementing a customized Clang RecursiveASTVisitor that properly manages memory across the multi-language semantic traversal."
                }
            ],
            experimentationNotes: [
                {
                    title: "Lessons in Type Safety",
                    content: "Initially tried manual type mapping, which proved too error-prone for production use. Switched to the automated synthesizer to eliminate human error in FFI boundary definitions."
                }
            ],
            recurringPatterns: ["AST-to-IR Pipeline", "Formal Verification"]
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
