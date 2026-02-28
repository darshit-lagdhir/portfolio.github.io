import { Project } from "@/types/project";

export const projects: Project[] = [
    {
        slug: "courier-management-system",
        title: "Role-Based Courier Management System (CLI Architecture)",
        shortDescription:
            "Modular CLI-based system implementing role-driven workflows with structured command parsing, persistent state handling, and separated business logic layers.",
        techStack: ["C", "Modular CLI", "File-Based Storage"],
        tier: 1,
        overview:
            "A command-line management system designed to simulate real-world courier operations through structured role separation. The system handles multiple user roles — admin, staff, and customer — each with isolated command sets and permission boundaries. Built entirely in C without external frameworks, forcing deliberate architectural decisions at every layer.",
        problem:
            "The system required structured role separation without relying on external authentication frameworks or database engines. All state had to persist across sessions using file-based storage, and the command interface needed to handle complex multi-step workflows without ambiguity. The core challenge was maintaining clean separation between user roles, business logic, and data persistence within the constraints of procedural C programming.",
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
                    "Handles command parsing, argument validation, and role-based routing — ensuring each user type only accesses permitted operations through a centralized dispatcher.",
            },
            {
                name: "Business Logic Modules",
                description:
                    "Isolated modules for each domain: order management, user administration, delivery tracking, and reporting. Each module operates independently with well-defined function interfaces.",
            },
            {
                name: "Data Access & Persistence",
                description:
                    "Centralized I/O abstraction managing file-based persistence using structured flat files with consistent serialization formats. Business logic never touches files directly.",
            },
        ],
        decisions: [
            "Chose procedural C over C++ to enforce discipline in memory management and manual state handling rather than relying on OOP abstractions.",
            "Implemented a centralized command router instead of scattered conditional blocks, making the control flow predictable and extensible.",
            "Separated file I/O into a dedicated data access layer to prevent business logic from directly coupling to storage format.",
            "Used structured flat files with fixed-width fields rather than CSV to avoid parsing edge cases and maintain consistent record boundaries.",
        ],
        tradeoffs: [
            "File-based storage lacks indexing, making search operations O(n) — acceptable at current scale but would require database migration for production use.",
            "No concurrent access handling — the system assumes single-user operation per session.",
            "Error recovery is limited to basic validation; no transaction rollback mechanism exists for partial write failures.",
            "The procedural architecture, while disciplined, would benefit from modular compilation units for larger-scale maintenance.",
        ],
        performance:
            "Memory allocation is manually managed with explicit cleanup on every exit path to prevent leaks. File operations use buffered I/O to minimize system calls. The command parser uses a hash-based lookup for O(1) command resolution instead of sequential string comparison. Record searches use linear scan — sufficient for current data volumes but identified as the first optimization target for scaling.",
        future: [
            "Migrate persistence layer from flat files to SQLite for indexed queries and transactional safety.",
            "Introduce a logging abstraction for operation auditing and debugging.",
            "Refactor into separately compiled modules to improve build times and enable unit testing per module.",
            "Add a configuration layer for runtime-adjustable parameters instead of compile-time constants.",
        ],
        repositoryLink: "https://github.com/darshitlagdhir",
    },
    {
        slug: "student-record-engine",
        title: "Student Record Management Engine",
        shortDescription:
            "Structured data management system with CRUD operations, search indexing, and file-based persistence designed around normalized record handling.",
        techStack: ["C++", "File I/O", "Data Structuring"],
        tier: 1,
        overview:
            "A record management engine built in C++ that handles structured student data through clean CRUD operations. The system emphasizes data integrity, consistent formatting, and efficient retrieval patterns. Designed as a standalone engine that could serve as the data layer for a larger academic management system.",
        problem:
            "Managing structured records with multiple interdependent fields required careful schema design even without a formal database. The system needed to support creation, retrieval, update, and deletion of records while maintaining referential consistency and handling edge cases like duplicate entries, partial updates, and corrupted file recovery.",
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
                    "Menu-driven command system with input validation and formatted output display. Separates user interaction from core logic entirely.",
            },
            {
                name: "Service Layer",
                description:
                    "Core business logic — record creation with validation, search algorithms, update conflict detection, and deletion with integrity checks.",
            },
            {
                name: "Persistence Layer",
                description:
                    "Serialization to binary files using structured record objects, with a basic indexing mechanism that maps record IDs to file offsets for faster retrieval.",
            },
        ],
        decisions: [
            "Used C++ classes to encapsulate record structures, providing type safety and method-based access control over raw struct manipulation.",
            "Implemented binary file storage instead of text to maintain fixed record sizes, enabling direct offset calculation for random access.",
            "Built a simple in-memory index loaded at startup to avoid full file scans on every search operation.",
            "Separated display formatting from data logic to allow future interface changes without modifying core operations.",
        ],
        tradeoffs: [
            "Binary storage makes manual inspection and debugging harder compared to human-readable text formats.",
            "The in-memory index grows linearly with record count — suitable for thousands of records but not millions.",
            "No multi-user support — concurrent access would require file locking or database migration.",
            "Schema changes require migration logic since binary format is tightly coupled to struct layout.",
        ],
        performance:
            "Binary storage with fixed record sizes enables O(1) retrieval by ID through offset calculation. The in-memory index eliminates repeated file scans for search operations. Memory usage is controlled through scoped object lifetimes and RAII patterns. File writes use buffered streams with explicit flush points to balance performance and data safety.",
        future: [
            "Implement a proper B-tree index for multi-field search support.",
            "Add export functionality to CSV and JSON formats for interoperability.",
            "Introduce schema versioning to handle future field additions without data loss.",
            "Build a REST API wrapper to expose the engine as a microservice.",
        ],
        repositoryLink: "https://github.com/darshitlagdhir",
    },
    {
        slug: "inventory-control-system",
        title: "Inventory Control & Tracking System",
        shortDescription:
            "Backend-driven inventory management with role-based access control, transactional state updates, and structured reporting modules.",
        techStack: ["Java", "OOP Patterns", "Modular Architecture"],
        tier: 1,
        overview:
            "An inventory management system built in Java that handles product tracking, stock updates, and role-based operations through a cleanly layered OOP architecture. The system demonstrates practical application of design patterns including Repository, Service Layer, and Factory patterns within a real operational context.",
        problem:
            "Inventory systems require precise state management — every stock update must be atomic and auditable. The system needed to handle multiple product categories, support role-based access for different operational levels, and generate structured reports without relying on external reporting frameworks.",
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
                    "Structured CLI with role-based menu routing. Each role sees only permitted operations, enforced at the interface level before reaching business logic.",
            },
            {
                name: "Business Layer",
                description:
                    "Inventory operations — stock additions, removals, transfers, and threshold alerts — through service classes with transaction-like semantics and rollback capability.",
            },
            {
                name: "Data Layer",
                description:
                    "Repository pattern abstracting storage operations, currently backed by serialized file storage but designed for seamless database migration through interface contracts.",
            },
        ],
        decisions: [
            "Applied the Repository pattern to decouple business logic from storage implementation, making future database integration a configuration change rather than a rewrite.",
            "Used Factory pattern for product creation to handle multiple product categories with shared interfaces but distinct validation rules.",
            "Implemented service-layer transaction semantics with rollback capability for multi-step inventory operations.",
            "Chose composition over deep inheritance hierarchies to maintain flexibility as product types evolve.",
        ],
        tradeoffs: [
            "File-based serialization introduces startup latency as the full dataset loads into memory — acceptable for current scale.",
            "Transaction rollback is in-memory only — a crash during file write could leave inconsistent state.",
            "Report generation is synchronous and blocking — would need async execution for large datasets.",
            "No real-time notification system for threshold alerts — currently batch-checked on operation execution.",
        ],
        performance:
            "Collections are chosen based on access patterns — HashMap for ID-based lookups, ArrayList for sequential reporting. Lazy loading is applied to report generation to avoid computing unused summaries. Memory footprint is managed through explicit nullification of large temporary collections after use.",
        future: [
            "Integrate with a relational database using JDBC for persistent, queryable storage.",
            "Add a web-based dashboard using Spring Boot for remote access.",
            "Implement event-driven architecture for real-time stock threshold notifications.",
            "Introduce barcode/SKU scanning integration for physical inventory operations.",
        ],
        repositoryLink: "https://github.com/darshitlagdhir",
    },
    {
        slug: "task-workflow-engine",
        title: "Task Workflow Automation Engine",
        shortDescription:
            "Workflow orchestration system handling task lifecycle management with priority queuing, status transitions, and persistent state tracking.",
        techStack: ["Python", "State Management", "CLI Interface"],
        tier: 2,
    },
    {
        slug: "api-gateway-service",
        title: "RESTful API Gateway Service",
        shortDescription:
            "Structured API layer with route modularization, middleware chaining, request validation, and role-based endpoint access control.",
        techStack: ["Node.js", "Express", "REST Architecture"],
        tier: 2,
    },
];
