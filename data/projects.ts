import { Project } from "@/types/project";

export const projects: Project[] = [
    {
        slug: "courier-management-system",
        title: "Courier Management System",
        shortDescription:
            "Implements role-based CLI workflows with command routing, file-based persistence, and separated data access in C.",
        techStack: ["C", "File I/O", "CLI"],
        tier: 1,
        githubRepoName: "courier-management-system",
        githubUrl: "https://github.com/darshit-lagdhir/courier-management-system",
        overview:
            "CLI-based courier operations system handling admin, staff, and customer roles through isolated command sets. Built in C without external frameworks — all routing, persistence, and access control implemented manually.",
        problem:
            "Required structured role separation without authentication libraries or databases. State had to persist across sessions via flat files. The command interface needed to handle multi-step workflows within procedural C constraints.",
        constraints: [
            "Strictly bounded by procedural C paradigms.",
            "No dynamic memory allocation for bulk record retrieval to avoid fragmentation.",
            "File-based storage with no external database layer allowed.",
            "Text-based purely procedural CLI, no advanced UI frameworks.",
        ],
        technicalMeta: {
            systemType: "CLI Application",
            architectureStyle: "Layered Modular",
            storageType: "Structured Flat Files",
            authType: "Role-Based Command Routing",
        },
        diagramLayers: [
            { label: "User Input / CLI" },
            { label: "Command Router" },
            { label: "Business Logic Modules" },
            { label: "Data Access Layer" },
            { label: "File-Based Storage" },
        ],
        architectureLayers: [
            {
                name: "Input & Command Routing",
                description:
                    "Parses commands, validates arguments, routes to role-specific handlers through a centralized dispatcher.",
            },
            {
                name: "Business Logic Modules",
                description:
                    "Isolated modules for order management, user administration, delivery tracking. Each operates through defined function interfaces.",
            },
            {
                name: "Data Access & Persistence",
                description:
                    "Centralized file I/O abstraction using structured flat files. Business logic never touches files directly.",
            },
        ],
        decisions: [
            "Chose C over C++ to enforce manual memory management and explicit state handling.",
            "Centralized command router instead of scattered conditionals for predictable control flow.",
            "Separated file I/O into dedicated data access layer to decouple storage format from logic.",
            "Fixed-width field format instead of CSV to avoid parsing edge cases.",
        ],
        tradeoffs: [
            "No indexing on flat files — search is O(n). Acceptable at current scale.",
            "Single-user per session. No concurrent access handling.",
            "Procedural architecture limits modular compilation for larger-scale maintenance.",
        ],
        limitations: [
            "Not production ready for concurrent environments.",
            "Lacks row-level locking mechanism.",
            "No transaction rollback for partial write failures.",
        ],
        detailedDecisions: [
            {
                decision: "File-based persistence over SQL database",
                why: "Prioritized zero-dependency environment setup and direct file I/O manipulation to focus purely on foundational logic.",
                alternative: "SQLite / PostgreSQL",
                rejectedReason: "Added unnecessary overhead for a core structural learning project."
            },
            {
                decision: "Custom command parser over external library",
                why: "Required granular control over input validation strings and tokenization without relying on abstracted toolkits.",
                alternative: "argparse or similar parsing utilities",
                rejectedReason: "Abstracts away the very state-machine logic the project aimed to solidify."
            },
            {
                decision: "Strict memory cleanup on all exit paths",
                why: "Ensured zero leak tolerance in a lower-level environment, forcing structured garbage collection awareness.",
                alternative: "Deferred exit cleanup relying on OS",
                rejectedReason: "Creates bad habits for long-running daemon services."
            }
        ],
        ifRebuildingToday: [
            "Introduce an abstract persistence interface to allow swapping between file-system and SQL storage easily.",
            "Build automated unit tests for the command parsing logic, isolating it entirely from the IO execution layer.",
            "Implement a structured logging daemon instead of inline console outputs."
        ],
        performance:
            "Manual memory management with explicit cleanup on every exit path. Buffered I/O for file operations. Hash-based command lookup for O(1) resolution. Linear scan for record search — identified as first scaling target.",
        future: [
            "Migrate to SQLite for indexed queries and transactions.",
            "Add logging abstraction for auditing.",
            "Refactor into separately compiled modules for unit testing.",
            "Add runtime configuration layer replacing compile-time constants.",
        ],
    },
    {
        slug: "student-record-engine",
        title: "Student Record Engine",
        shortDescription:
            "Implements file-based CRUD with binary storage, in-memory indexing, and structured record retrieval in C++.",
        techStack: ["C++", "Binary File I/O", "OOP"],
        tier: 1,
        githubRepoName: "student-record-engine",
        githubUrl: "https://github.com/darshit-lagdhir/student-record-engine",
        overview:
            "Record management engine handling structured student data through CRUD operations. Uses binary file storage with fixed record sizes and an in-memory ID-to-offset index for retrieval. Designed as a standalone data layer.",
        problem:
            "Needed structured record management without a database. Required creation, retrieval, update, deletion with referential consistency, duplicate detection, and corrupted file recovery.",
        constraints: [
            "No relational database usage permitted.",
            "C++ binary file operations only.",
            "Performance must handle O(1) retrieval despite lack of external indexing.",
        ],
        engineeringFocus: "Data persistence and memory indexing",
        technicalMeta: {
            systemType: "Data Management Engine",
            architectureStyle: "Three-Tier OOP",
            storageType: "Binary File with In-Memory Index",
        },
        diagramLayers: [
            { label: "Menu Interface" },
            { label: "Service Layer" },
            { label: "In-Memory Index" },
            { label: "Binary File Storage" },
        ],
        architectureLayers: [
            {
                name: "Interface Layer",
                description:
                    "Menu-driven input with validation and formatted output. User interaction fully separated from core logic.",
            },
            {
                name: "Service Layer",
                description:
                    "Record creation with validation, search algorithms, update conflict detection, deletion with integrity checks.",
            },
            {
                name: "Persistence Layer",
                description:
                    "Binary serialization with fixed record sizes. Index maps record IDs to file offsets for direct access.",
            },
        ],
        decisions: [
            "C++ classes for type-safe record encapsulation over raw struct manipulation.",
            "Binary storage for fixed record sizes enabling O(1) offset-based retrieval.",
            "In-memory index loaded at startup to eliminate repeated file scans.",
            "Display formatting separated from data logic for interface portability.",
        ],
        tradeoffs: [
            "Binary format limits manual inspection.",
            "Linear scaling for in-memory mapping — not suited for millions of rows.",
        ],
        limitations: [
            "Single process access only; no file locking mechanism.",
            "Schema mutations require manual migration routines.",
        ],
        performance:
            "O(1) retrieval by ID through offset calculation. In-memory index eliminates file scans. RAII patterns for memory management. Buffered streams with explicit flush for write safety.",
        future: [
            "B-tree index for multi-field search.",
            "CSV and JSON export for interoperability.",
            "Schema versioning for non-breaking field additions.",
            "REST API wrapper to expose as microservice.",
        ],
    },
    {
        slug: "inventory-control-system",
        title: "Inventory Control System",
        shortDescription:
            "Implements role-based inventory management with Repository pattern, Factory pattern, and transactional stock operations in Java.",
        techStack: ["Java", "OOP Patterns", "Serialization"],
        tier: 1,
        githubRepoName: "inventory-control-system",
        githubUrl: "https://github.com/darshit-lagdhir/inventory-control-system",
        overview:
            "Inventory management system handling product tracking, stock updates, and role-based operations. Applies Repository, Service Layer, and Factory patterns. Serialized file storage designed for database migration through interface contracts.",
        problem:
            "Required atomic stock updates with audit capability. Multiple product categories with role-based access. Structured reporting without external frameworks.",
        constraints: [
            "Pure Java SE without Spring or Hibernate.",
            "Object serialization for persistence instead of SQL.",
            "Strict structural adherence to OOP design patterns.",
        ],
        engineeringFocus: "Domain modeling and layered architecture patterns",
        technicalMeta: {
            systemType: "Backend Management System",
            architectureStyle: "Layered OOP with Design Patterns",
            storageType: "Serialized File Storage",
            authType: "Role-Based Access Control",
        },
        diagramLayers: [
            { label: "Role-Based CLI" },
            { label: "Service Layer" },
            { label: "Repository Pattern" },
            { label: "Serialized Storage" },
        ],
        architectureLayers: [
            {
                name: "Presentation Layer",
                description:
                    "CLI with role-based menu routing. Permitted operations enforced at interface level before reaching business logic.",
            },
            {
                name: "Business Layer",
                description:
                    "Stock additions, removals, transfers, threshold alerts through service classes with transaction semantics and rollback.",
            },
            {
                name: "Data Layer",
                description:
                    "Repository pattern abstracting storage. Currently file-backed, designed for database swap via interface contracts.",
            },
        ],
        decisions: [
            "Repository pattern decouples storage from logic — database migration becomes configuration change.",
            "Factory pattern for product creation with category-specific validation rules.",
            "Service-layer transaction semantics with rollback for multi-step operations.",
            "Composition over inheritance for flexibility as product types evolve.",
        ],
        tradeoffs: [
            "Full dataset loads into memory at startup. Scalability depends on heap size.",
            "Synchronous execution blocks interface during heavy reporting.",
        ],
        limitations: [
            "No distributed concurrent access support.",
            "In-memory rollback state does not survive crash during write cycle.",
        ],
        performance:
            "HashMap for ID lookups, ArrayList for sequential reporting. Lazy loading on report generation. Explicit nullification of large temporary collections after use.",
        future: [
            "JDBC integration for relational persistence.",
            "Spring Boot web dashboard for remote access.",
            "Event-driven architecture for real-time threshold alerts.",
            "Barcode/SKU scanning integration.",
        ],
    },
];

