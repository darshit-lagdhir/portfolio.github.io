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
            systemType: "Operational backend system",
            architectureStyle: "Modular Monolith",
            storageType: "Relational (PostgreSQL)",
        },
        purpose: "Logistics workflow management system designed to manage parcel operations, shipments, and role-based dashboards.",
        learningOutcomes: ["Backend Architecture", "Role-Based Access Control", "Database Schema Design"],
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
        developmentStory: [
            {
                id: "motivation",
                title: "Operational Motivation",
                description: "The project began with a simple objective: Create a backend system capable of managing parcel operations from booking to delivery, exploring how multi-role workflows function in a real-world environment.",
                activeNodes: ["gateway"]
            },
            {
                id: "complexity",
                title: "Structural Expansion",
                description: "As the system grew, I designed intricate authentication systems, role-based dashboards, and custom shipment tracking logic to ensure data integrity across the logistics lifecycle.",
                activeNodes: ["rbac", "logistics"]
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
                activeNodes: ["client", "gateway", "rbac", "logistics", "db"]
            }
        ]
    },
    {
        slug: "uidai",
        title: "UIDAI Advisory System",
        shortDescription: "A hackathon project analyzing aggregated Aadhaar enrollment data to identify regional patterns and provide contextual advisory insights to human operators.",
        techStack: ["Python", "FastAPI", "Pandas", "Scikit-Learn"],
        techGroups: [
            { role: "Core Engine", items: ["Python", "Pandas", "NumPy"] },
            { role: "API Layer", items: ["FastAPI", "Uvicorn"] },
            { role: "Analysis Stage", items: ["Scikit-Learn", "Statistical Scanners"] },
            { role: "Data Management", items: ["PostgreSQL", "Aggregated Datasets"] }
        ],
        tier: 1,
        githubRepoName: "uidai-advisory",
        githubUrl: "https://github.com/darshit-lagdhir/uidai-advisory-system",
        status: "HACKATHON",
        domains: ["data_systems", "ai_ml", "systems_engineering"],
        overview: "The UIDAI Advisory Intelligence System was developed for a hackathon focused on analyzing aggregated Aadhaar enrollment data. The system monitors enrollment counts across thousands of locations to identify patterns that may require human attention. It is designed as a purely advisory tool; it identifies patterns and provides contextual explanations so that officials can interpret data more effectively. The system highlights trends with confidence scores but never makes autonomous decisions.",
        problem: "Monitoring enrollment patterns manually across millions of records in thousands of centers is extremely difficult. Officials struggle to detect unexpected spikes, sudden drops (Ghost Zones), or gradual trend shifts in specific demographic groups across a national scale. The project attempts to make these patterns visible by analyzing aggregated counts and presenting summarized signals for review.",
        engineeringFocus: "Advisory Pattern Detection & Ethical Design",
        technicalMeta: {
            systemType: "Data analysis and advisory system",
            architectureStyle: "Sequential Data Pipeline",
            storageType: "Aggregated Pincode-Level Data",
        },
        purpose: "Data analysis system that highlights enrollment patterns in Aadhaar datasets to support human decision-making.",
        learningOutcomes: ["Statistical Pattern Detection", "Advisory Signal Design", "Privacy-by-Aggregation"],
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
        architecture: "The system operates as a structured diagnostic pipeline. It organizes incoming enrollment records by date, location (pincode), and age group. It kemudian establishing a baseline pattern for each region and identifies deviations. These deviations are translated into prioritized signals and presented on a dashboard for human review.",
        internalComponents: [
            { name: "Pattern Detection Logic", description: "Identifies demographic trends such as 'Baby Boom Zones' (0-5 enrollment) and 'Employment Magnet Zones' (adult migration indicators)." },
            { name: "Signal Generation Engine", description: "Triggers flags like 'High Stress' for volume spikes and 'Ghost Zone Signal' for sustained zero-activity periods in active regions." },
            { name: "Confidence Scoring Module", description: "Calculates reliability scores (HIGH/MEDIUM/LOW) for each signal based on data completeness and pattern stability." },
            { name: "Advisory Dashboard", description: "A review-only interface that presents highlighted patterns and contextual signals for official human evaluation." },
            { name: "Privacy Aggregator", description: "Ensures no individual-level data is ingested, strictly enforcing district and pincode-level analysis boundaries." }
        ],
        challenges: [
            { title: "Handling National-Scale Datasets", description: "Processing data across thousands of locations while maintaining clear regional context required efficient data partitioning and baseline comparison logic." },
            { title: "Defining the 'Advice' Boundary", description: "Ensuring the system UI does not suggest actions but only identifies patterns required a careful redesign of how alerts are worded and displayed." },
            { title: "Data Volatility", description: "Normalizing data to account for temporary network issues or regional holidays that can cause false-positive 'Ghost Zone' signals." }
        ],
        future: [
            { title: "Cross-District Correlation", description: "Identifying if migration patterns in one district correlate with enrollment shifts in neighboring regions." },
            { title: "Improved Contextual Hooks", description: "Allowing human officials to 'tag' known events (like local festivals) to automatically adjust baselines." }
        ],
        diagram: {
            layout: "pipeline",
            nodes: [
                { 
                    id: "data", 
                    label: "AGGREGATED_DATA", 
                    type: "database", 
                    description: "Pincode-level enrollment counts.",
                    responsibilities: ["Historical record storage", "Location-based data partitioning", "Demographic count isolation"],
                    tech: ["PostgreSQL", "Aggregated JSON"]
                },
                { 
                    id: "baseline", 
                    label: "BASELINE_SYNTHESIZER", 
                    type: "logic", 
                    description: "Establishes historical norms for each region.",
                    responsibilities: ["Historical trend analysis", "Regional baseline generation", "Statistical mean calculation"],
                    tech: ["Pandas", "NumPy"]
                },
                { 
                    id: "engine", 
                    label: "PATTERN_DETECTOR", 
                    type: "service", 
                    description: "Compares current vs baseline data.",
                    responsibilities: ["Anomaly identification", "Demographic shift detection", "Confidence scoring"],
                    tech: ["Python", "Statistical Scanners"]
                },
                { 
                    id: "dashboard", 
                    label: "ADVISORY_UI", 
                    type: "client", 
                    description: "Human-centered signal dashboard.",
                    responsibilities: ["Signal highlighting", "Contextual display", "Official review logging"],
                    tech: ["Vanilla JS", "D3.js"]
                }
            ],
            connections: [
                { from: "data", to: "baseline" },
                { from: "baseline", to: "engine" },
                { from: "engine", to: "dashboard" }
            ]
        },
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
        developmentStory: [
            {
                id: "challenge",
                title: "Hackathon Challenge",
                description: "The project started with a challenge to analyze large-scale Aadhaar enrollment data covering thousands of centers, where manual monitoring was functionally impossible.",
                activeNodes: ["data"]
            },
            {
                id: "insight",
                title: "Pattern Visualization",
                description: "I realized that identifying spikes or 'Ghost Zones' required an automated system that could highlight unusual enrollment patterns for further human review.",
                activeNodes: ["baseline", "engine"]
            },
            {
                id: "ethical",
                title: "Advisory-Only Boundary",
                description: "Recognizing the gravity of identity data, I intentionally designed the system to be advisory-only, providing signals and context but never making autonomous decisions.",
                activeNodes: ["dashboard"]
            },
            {
                id: "learning",
                title: "Responsible Design",
                description: "Developing this system reinforced the vital lesson that data tools should empower human officials with context rather than replacing them with opaque algorithms.",
                activeNodes: ["data", "baseline", "engine", "dashboard"]
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
        problem: "When a high-level language calls native code through FFI, several assumptions must hold: function parameters must match expected types, pointers must reference valid memory, ownership rules must be respected, and binary interfaces must remain compatible across compilation boundaries. If any of these assumptions fail, the program may crash or behave unpredictably. PFCV attempts to detect these issues before they cause runtime failures.",
        engineeringFocus: "Cross-Language Verification Pipeline",
        technicalMeta: {
            systemType: "Systems engineering research pipeline",
            architectureStyle: "Multi-Stage Pipeline",
            storageType: "In-Memory AST State",
        },
        purpose: "Verification pipeline designed to improve safety when calling native libraries across different programming languages.",
        learningOutcomes: ["Language Interoperability", "Compiler Tooling (Clang)", "Contract-Driven Verification"],
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
        architecture: "PFCV operates as a multi-stage pipeline where each stage transforms information from the previous one. Native source code enters the pipeline, metadata is extracted using compiler tooling, that metadata is normalized into a universal intermediate representation, safety contracts are synthesized from the IR, and those contracts are enforced at runtime through language-specific adapters.",
        internalComponents: [
            { name: "Metadata Extractor", description: "Uses Clang compiler tooling to analyze native C/C++ header files and extract function signatures, parameter types, pointer relationships, and struct definitions." },
            { name: "IR Normalizer", description: "Converts language-specific metadata into a universal intermediate representation that captures scalars, pointers, structures, and memory ownership in a consistent format." },
            { name: "Contract Synthesizer", description: "Analyzes the normalized IR to generate formal safety contracts — rules that define valid conditions for cross-language function calls." },
            { name: "Runtime Enforcer", description: "Language-specific adapters that intercept FFI calls and verify contract rules before allowing native functions to execute." },
            { name: "Safety Reporter", description: "Generates reports documenting verification results, contract violations, and safety status for each analyzed FFI boundary." }
        ],
        challenges: [
            { title: "Type System Differences", description: "Different languages represent the same concepts differently. A Python list and a C++ vector may seem similar but have completely different memory layouts, ownership semantics, and access patterns." },
            { title: "Compiler Tooling Complexity", description: "Working with Clang's AST requires understanding internal compiler representations. The learning curve is steep, but the precision of AST-based analysis is essential for reliable verification." },
            { title: "Multi-Language Adapter Design", description: "Each target language (Python, Rust, C++) requires its own runtime adapter that integrates with the language's FFI mechanism. Designing adapters that are both thorough and non-intrusive is an ongoing challenge." }
        ],
        future: [
            { title: "Additional Language Adapters", description: "Expanding beyond the current Python, Rust, and C++ targets to support additional languages." },
            { title: "Automated Bridge Generation", description: "Automatically generating FFI bridge code from verified contracts rather than requiring manual binding definitions." }
        ],
        diagram: {
            layout: "pipeline",
            nodes: [
                { 
                    id: "analyser", 
                    label: "SOURCE_PARSER", 
                    type: "pipeline", 
                    description: "Parses source files in multiple languages to prepare for analysis.",
                    responsibilities: ["Source file parsing", "Tokenization", "Initial metadata collection"],
                    tech: ["Python", "Tree-Sitter"]
                },
                { 
                    id: "ast", 
                    label: "AST_EXTRACTOR", 
                    type: "logic", 
                    description: "Extracts precise function metadata from native code using Clang.",
                    responsibilities: ["AST generation", "Type signature extraction", "Struct layout analysis"],
                    tech: ["Clang Tooling", "C++"]
                },
                { 
                    id: "uir", 
                    label: "IR_NORMALIZER", 
                    type: "logic", 
                    description: "Converts language-specific types into a universal intermediate format.",
                    responsibilities: ["Type normalization", "Ownership mapping", "IR generation"],
                    tech: ["Rust"]
                },
                { 
                    id: "solver", 
                    label: "CONTRACT_ENGINE", 
                    type: "service", 
                    description: "Generates and verifies safety contracts from the normalized IR.",
                    responsibilities: ["Contract synthesis", "Constraint solving", "Safety validation"],
                    tech: ["Z3 Solver", "Python"]
                },
                { 
                    id: "report", 
                    label: "SAFETY_REPORT", 
                    type: "interface", 
                    description: "Outputs verification results and violation details.",
                    responsibilities: ["Result aggregation", "Violation reporting", "Contract documentation"],
                    tech: ["JSON", "Markdown"]
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
        developmentStory: [
            {
                id: "curiosity",
                title: "FFI Boundary Research",
                description: "Curiosity about the fragile interaction between high-level languages and native C/C++ libraries led to an investigation into common Foreign Function Interface failure modes.",
                activeNodes: ["analyser"]
            },
            {
                id: "fragility",
                title: "Identifying Failure Vectors",
                description: "I identified that runtime crashes often stemmed from incorrect function signatures, pointer misuse, or misaligned memory ownership assumptions across compilation boundaries.",
                activeNodes: ["ast"]
            },
            {
                id: "pipeline",
                title: "Contract Synthesis Idea",
                description: "This research inspired the creation of a verification pipeline that extracts metadata from native code and generates safety contracts to enforce valid cross-language calls.",
                activeNodes: ["uir", "solver"]
            },
            {
                id: "evolution",
                title: "Modular Research Pipeline",
                description: "The system evolved from a conceptual exploration into a multi-stage modular pipeline, representing a deep dive into systems engineering and runtime safety.",
                activeNodes: ["analyser", "ast", "uir", "solver", "report"]
            }
        ]
    }
];
