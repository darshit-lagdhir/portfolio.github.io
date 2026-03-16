# Darshit Lagdhir // Systems Engineering Portfolio

This repository contains the source code and architectural documentation for my personal portfolio. This project is not a static gallery or a generic template; it is a deliberately engineered system designed to document my learning journey through systems engineering, backend architecture, and technical exploration.

The portfolio serves as a structured interface for explaining how I approach building software, breaking complex problems down into modular components, and understanding the internal mechanics of complex systems.

---

## 👨‍💻 About the Developer

**Darshit Lagdhir**  
*Aspiring Systems Architect*

I am a software engineer focused on exploring backend systems, programming language boundaries, and the internal mechanics of how software actually works. My work is driven by a curiosity for what happens beneath the surface of high-level abstractions—specifically how data flows through pipelines, how memory is managed across FFI boundaries, and how multi-role systems maintain security and state integrity.

---

## 🏛️ Portfolio Structure

The portfolio is organized into a logical narrative sequence that moves from identity and philosophy into applied systems and deep-dive research:

1.  **Identity Probing (Hero)**: A high-level introduction to my technical focus.
2.  **Human Construct (About)**: Detailed background on my mindset and educational path.
3.  **Intellectual Territory (Domains)**: A map of the technical areas I am currently exploring.
4.  **Core Project Modules (Systems)**: Detailed documentation of real systems I have built.
5.  **Comparative Matrix (Comparison)**: An analytical look at how different architectures solve specific problems.
6.  **Capabilities Map (Exploration)**: A visual representation of the tools and technologies I actually use.
7.  **Laboratory Records (Archive)**: A collection of small-scale technical investigations and curiosity-driven experiments.
8.  **Technical Principles (Philosophy)**: A breakdown of my engineering workflow and core principles.
9.  **System Reflections**: Final thoughts on architectural rigor and systems thinking.
10. **Connection Bus (Contact)**: A terminal-style interface for professional communication.

---

## 🚀 Featured Systems

The portfolio highlights three primary projects that represent different architectural challenges:

### 1. MoveX (Logistics Management)
A full logistics and courier management system built with **Node.js, Express, and PostgreSQL**. It manages the complete parcel lifecycle—from booking and pricing to pickup scheduling, hub transfers, and final delivery. This project explored **Role-Based Access Control (RBAC)**, database schema design for complex workflows, and session security in multi-user environments.

### 2. Polyglot FFI Contract Verifier (PFCV)
A verification pipeline designed to improve safety when calling native C/C++ libraries from high-level languages (Python, Rust) through **Foreign Function Interfaces (FFI)**. This research project uses **Clang compiler tooling** to extract metadata, normalizes it into a universal intermediate representation, and synthesizes safety contracts to prevent runtime crashes.

### 3. UIDAI Advisory Intelligence System
A data analysis system developed for a hackathon to analyze aggregated Aadhaar enrollment datasets. The system establishes regional baselines to identify unusual activity patterns (such as "Ghost Zones" or "High Stress" areas) and generates prioritized advisory signals for human evaluation, emphasizing **privacy-by-aggregation** and ethical AI boundaries.

---

## 🛠️ Technology Stack

The portfolio itself is built with a focus on performance, structural clarity, and technical honesty:

*   **Framework**: [Next.js](https://nextjs.org/) (App Router)
*   **Library**: [React](https://reactjs.org/)
*   **Language**: [TypeScript](https://www.typescriptlang.org/) for strict type safety
*   **Styling**: Custom **Vanilla CSS** and **TailwindCSS** for precise architectural layouts
*   **Animations**: [Framer Motion](https://www.framer.com/motion/) for system-state transitions and data-flow visualizations
*   **Deployment**: Vercel

---

## 📁 Repository Blueprint

*   `app/`: Contains the Next.js page routes, including the main homepage and dynamic project documentation paths.
*   `components/`: Reusable UI components organized by section (hero, about, projects, visualization, shared).
*   `data/`: The "Source of Truth" for all content. Contains structured TypeScript objects for identity, projects, domains, and laboratory records.
*   `lib/`: Helper utilities for layout logic, animations, and data processing.
*   `public/`: Static assets, including custom fonts, icons, and architecture-related graphics.
*   `types/`: TypeScript interface definitions ensuring data consistency across the system.

---

## 📊 Data-Driven Architecture

To keep content separate from presentation logic, the portfolio uses a centralized data layer. Adding new content is as simple as updating the structured TypeScript files in the `/data` directory. This allows the UI components to remain focused strictly on rendering and interaction, while the content remains immutable and easy to manage.

---

## ⚡ Quick Start (Local Execution)

To explore the portfolio or inspect the architecture locally:

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/darshit-lagdhir/portfolio.github.io.git
    cd portfolio
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Run the development server**:
    ```bash
    npm run dev
    ```

4.  **Access the interface**:
    Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📝 Design Philosophy

*   **Minimal Visual Noise**: Every element should serve a functional or narrative purpose.
*   **Structured Navigation**: The interface follows a logical engineering manifest.
*   **System Explanation**: Visuals represent real architectural nodes and data flows, not just decoration.
*   **Honest Representation**: The portfolio documents learning progress, technical trade-offs, and project limitations with transparency.

---

## 🤝 Connection

If you enjoy discussing system architecture, debugging strange software behavior, or exploring the internal mechanics of complex software, feel free to connect via [LinkedIn](https://www.linkedin.com/in/darshit-lagdhir/) or [GitHub](https://github.com/darshit-lagdhir).

---
*SYS_HASH: 70_README_REWRITE_2026 // DOCUMENTATION_SIG_STABILIZED*