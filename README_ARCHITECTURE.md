# Portfolio Architecture Manifest

## 🏗️ Design Philosophy
This portfolio is engineered as a high-fidelity systems documentation environment. Instead of a traditional gallery, it utilizes architectural visualization, interactive telemetry, and narrative engineering to communicate technical depth.

### Core Principles:
- **Mechanical Transparency:** Visualizing how systems work internally via interactive diagrams.
- **Narrative Integrity:** Explaining *why* decisions were made, not just *what* was built.
- **Performance First:** Utilizing hardware-synced motion and optimized render pipelines.

## 📂 Directory Structure

```bash
/app                # Next.js App Router (Routes & Global Styles)
/components         # Modular React Components
  /about            # Narrative & Philosophy modules
  /contact          # Terminal interaction system
  /hero             # Identity & Architectural visualization
  /layout           # Global shell components (Dock, Scroll, Background)
  /projects         # Documentation and project-specific modules
  /shared           # Reusable UI primitives (Capabilities, Sections)
  /visualization    # Architecture diagram engine
/context            # Global state management (SceneContext)
/data               # Structured content (Identity, Projects)
/lib                # Shared utility layer (Fonts, Interaction hooks)
/public             # Static assets (Fonts, Media)
/types              # Shared TypeScript definitions
```

## 🚀 System Growth & Evolution
The portfolio is designed for long-term scalability through a Tiered Registry System.

### 1. Project Tier Classification
Projects are categorized into three tiers in `data/projects.ts`:
- **Tier 1 (Core Systems):** Major architectural builds. These appear as large modules in the main catalogue and are included in the comparison matrix.
- **Tier 2 (Experiments):** Active research, learning prototypes, and technical investigations. These appear in the Exploration Archive.
- **Tier 3 (Archived):** Past experiments or deprecated builds. These are preserved in the Exploration Archive with an "Archived" status.

### 2. How to Add a New System
1. **Define the Data:** Add a new entry to `data/projects.ts` following the [`Project`](types/project.ts) type.
2. **Assign Tier:** Set the `tier` property (1, 2, or 3) to determine where the system surface.
3. **Define Mechanics:**
   - **Diagram:** Define nodes and connections for the interactive architecture engine.
   - **StoryFlow:** Outline the technical walkthrough steps for deep storytelling.
   - **Authority:** Map the complexity scores and research focus for the credibility layer.
4. **Automatic Routing:** The system uses dynamic routing to overnight generate a deep documentation page at `/[slug]`.

## 🛠️ Tech Stack Primitives
- **Core:** Next.js (App Router), TypeScript
- **Motion:** Framer Motion (Hardware-synced springs)
- **Styling:** Vanilla CSS + Tailwind Utility layer
- **Deployment:** GitHub Actions (Automated CI/CD to GitHub Pages)

---
*Created and maintained as a living manifest of Darshit Lagdhir's engineering journey.*
