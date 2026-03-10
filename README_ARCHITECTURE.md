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

## 🚀 How to Add New Projects

The portfolio is designed for data-driven expansion. To add a new system:

1. **Update Data:** Add a new project entry to `data/projects.ts` following the `Project` type.
2. **Define Diagram:** Use the `diagram` object within the project entry to define:
   - `layout`: "layered" | "pipeline" | "grid"
   - `nodes`: List of system components with their specific tech and roles.
   - `connections`: Mapping of data/control flow between nodes.
3. **Automatic Integration:** The system will automatically:
   - Generate a new dedicated documentation page at `/[slug]`.
   - Update the "Systems Manifest" section on the homepage.
   - Integrate the node into the "Cross-Project Navigation" engine.

## 🛠️ Tech Stack Primitives
- **Core:** Next.js (App Router), TypeScript
- **Motion:** Framer Motion (Hardware-synced springs)
- **Styling:** Vanilla CSS + Tailwind Utility layer
- **Deployment:** GitHub Actions (Automated CI/CD to GitHub Pages)

---
*Created and maintained as a living manifest of Darshit Lagdhir's engineering journey.*
