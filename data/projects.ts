import { Project } from "@/types/project";

export const projects: Project[] = [
    {
        slug: "courier-management-system",
        title: "Role-Based Courier Management System (CLI Architecture)",
        shortDescription:
            "Modular CLI-based system implementing role-driven workflows with structured command parsing, persistent state handling, and separated business logic layers.",
        techStack: ["C", "Modular CLI", "File-Based Storage"],
        tier: 1,
    },
    {
        slug: "student-record-engine",
        title: "Student Record Management Engine",
        shortDescription:
            "Structured data management system with CRUD operations, search indexing, and file-based persistence designed around normalized record handling.",
        techStack: ["C++", "File I/O", "Data Structuring"],
        tier: 1,
    },
    {
        slug: "inventory-control-system",
        title: "Inventory Control & Tracking System",
        shortDescription:
            "Backend-driven inventory management with role-based access control, transactional state updates, and structured reporting modules.",
        techStack: ["Java", "OOP Patterns", "Modular Architecture"],
        tier: 1,
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
