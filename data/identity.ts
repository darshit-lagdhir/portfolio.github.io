import { Identity } from "@/types/identity";

export const identity: Identity = {
    name: "Darshit Lagdhir",
    headline: "Aspiring Systems Architect | Learning High-Performance Backend & Distributed Systems",
    short_identity: "Systems-focused developer building and breaking software to understand how it actually works.",
    
    hero_identity: {
        hero_title: "EXPLORING MECHANICS",
        hero_subtitle: "Building systems to understand their internal behavior.",
        hero_description: "I am a systems-focused developer who spends a lot of time trying to understand how complex software actually works. Most of my learning happens by building systems, breaking them, and then trying to figure out why they failed. I enjoy exploring the internal mechanics of applications, from how services communicate to how data flows through a system and where things start to break."
    },
    
    about: {
        about_intro: "I enjoy understanding how systems actually work internally. Instead of focusing only on writing code that runs, I try to understand what happens underneath the application—exploring memory behavior, service communication, data flow between components, and architectural failures.",
        about_learning_context: "I am a student currently exploring system architecture through hands-on experimentation. I view my development projects not just as functional tools, but as technical research to understand the trade-offs and failures inherent in software design."
    },
    
    learning_workflow: [
        {
            title: "BUILD",
            description: "I begin by creating a prototype or system idea. The goal is to make the system work as quickly as possible so that real behavior can be observed."
        },
        {
            title: "BREAK",
            description: "Systems almost always fail during early stages. These failures reveal hidden assumptions and weaknesses in the architecture."
        },
        {
            title: "UNDERSTAND",
            description: "Instead of immediately patching, I investigate the failure in detail—tracing execution paths and studying internal mechanics to find the root cause."
        },
        {
            title: "REDESIGN",
            description: "Once the root cause is understood, the system is refactored. The new design attempts to eliminate the weakness discovered earlier."
        }
    ],
    
    capabilities: [
        {
            category: "Programming Languages",
            description: "Tools for architectural exploration. Currently using Java and C++ to study deep data structures and algorithmic thinking, while using Python for data analysis.",
            items: ["C", "C++", "Java", "Python", "JavaScript", "TypeScript"],
            projects: ["PFCV", "UIDAI", "MoveX"]
        },
        {
            category: "Backend Technologies",
            description: "Designing server logic and workflows. Node.js and Express were the primary tools used for building the MoveX operational backend.",
            items: ["Node.js", "Express", "REST APIs", "Session Auth", "Middlewares"],
            projects: ["MoveX"]
        },
        {
            category: "Frontend Technologies",
            description: "Building interfaces for system management. Using React and Vanilla JavaScript to create dashboards for multi-role logistics systems.",
            items: ["HTML", "CSS", "React", "Vanilla JS", "Tailwind"],
            projects: ["MoveX", "UIDAI"]
        },
        {
            category: "Databases",
            description: "Managing operational data persistence. PostgreSQL serves as the main relational engine for tracking shipments and user sessions.",
            items: ["PostgreSQL", "MySQL", "MongoDB", "SQLite"],
            projects: ["MoveX", "UIDAI"]
        },
        {
            category: "Tools & Platforms",
            description: "Infrastructural support for the development lifecycle, from version control to early cloud exploration.",
            items: ["Git", "GitHub", "VS Code", "Google Cloud", "Clang Tooling"],
            projects: ["PFCV"]
        }
    ],
    
    exploration_focus: [
        {
            title: "Systems Engineering",
            description: "Deepening my knowledge of low-level mechanics and hardware-software interaction."
        },
        {
            title: "Programming Languages",
            description: "Exploring language design, type systems, and cross-language compatibility."
        },
        {
            title: "Backend Systems",
            description: "Designing reliable, multi-role distributed systems and operational workflows."
        },
        {
            title: "Data Systems",
            description: "Understanding storage engine internals and relational integrity in complex datasets."
        },
        {
            title: "Artificial Intelligence Exploration",
            description: "Researching how advisory AI systems can support human decision-making with confidence metrics."
        },
        {
            title: "Linux and Security",
            description: "Investigating operating system internals, kernel boundaries, and cybersecurity fundamentals."
        }
    ],
    
    contact: {
        github_url: "https://github.com/darshit-lagdhir",
        linkedin_url: "https://www.linkedin.com/in/darshitlagdhir/",
        email: "darshitlagdhir@gmail.com",
        resume_url: "/resume.pdf"
    },
    
    final_reflection: "This portfolio represents a small part of my journey trying to understand how complex software systems actually work. Most of what I learn comes from building projects, watching them fail, and then spending time figuring out why they failed. The systems shown here are not perfect solutions — they are experiments that helped me understand backend architectures, cross-language interfaces, and data analysis systems. I am still learning, still exploring new areas, and still breaking things along the way. But that process is what makes technology interesting.",
    
    section_transitions: {
        toAbout: "Before looking at the systems themselves, it helps to understand how I approach learning and building software.",
        toDomains: "These are the technical areas I am currently exploring while building systems and studying how they behave internally.",
        toSystems: "These are the systems I have built while exploring backend architecture, language boundaries, and data analysis.",
        toComparison: "Each system explores a different technical problem. Comparing them helps reveal what each one was designed to investigate.",
        toExploration: "Not everything I learn becomes a full project. Some ideas begin as small investigations while trying to understand how systems behave.",
        toArchive: "These are small technical investigations that influenced how I understand software systems.",
        toPhilosophy: "Most of what I learn comes from building systems, breaking them, and then trying to understand why they failed.",
        toReflection: "After exploring the systems and experiments above, this portfolio really represents one thing: a continuing attempt to understand how complex software actually works.",
        toContact: "If you enjoy discussing system architecture, debugging strange software behavior, or exploring how systems work internally, feel free to connect."
    },
    
    discovery_hints: {
        toAbout: {
            label: "UNDERSTAND_SYSTEM_STUDENT",
            description: "Understand the mindset and educational background supporting these explorations."
        },
        toDomains: {
            label: "MAPPING_TECHNICAL_DOMAINS",
            description: "Explore the technical territories and research clusters shaping my current learning path."
        },
        toSystems: {
            label: "IDENTIFY_CORE_SYSTEMS",
            description: "Explore the systems built to investigate specific architectural and performance hypotheses."
        },
        toComparison: {
            label: "COMPARE_ARCHITECTURES",
            description: "Identify recurring engineering patterns and divergent architectural goals across projects."
        },
        toExploration: {
            label: "RESEARCH_INVESTIGATIONS",
            description: "Examine small-scale technical investigations and curiosity-driven research experiments."
        },
        toArchive: {
            label: "SYSTEM_LAB_RECORDS",
            description: "Review small technical investigations that influenced how I understand software systems."
        },
        toPhilosophy: {
            label: "ANALYZE_ENGINEERING_PHILOSOPHY",
            description: "Understand the engineering principles and workflow that guide the construction of these systems."
        },
        toReflection: {
            label: "SYSTEM_REFLECTIONS",
            description: "Review the final thoughts on architectural rigor and systems thinking."
        },
        toContact: {
            label: "ESTABLISH_CONNECTION",
            description: "Connect to discuss backend architecture, systems debugging, or performance optimizations."
        },
        toProjectComparison: {
            label: "COMPARE_ARCHITECTURAL_NODES",
            description: "Analyze how this system's architecture compares to other builds in the manifest."
        },
        toProjectComparisonMatrix: {
            label: "CROSS_PROJECT_CONTEXT",
            description: "Analyze how this specific system situtates within the broader architectural comparison matrix."
        }
    },
    
    location: "Bangalore, India",
    university: "Kristu Jayanti University",
    degree: "BCA"
};
