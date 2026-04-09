# Project Architecture: OCM LMS

This document outlines the architectural structure and technology stack for the OCM Learning Management System (LMS), following its refactor from a monolithic prototype.

## Technology Stack

- **Build Tool:** [Vite](https://vitejs.dev/) + [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc)
- **Framework:** [React 18+](https://react.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/) (Strict Mode)
- **Styling:** [Tailwind CSS v3](https://tailwindcss.com/) + [PostCSS](https://postcss.org/)
- **State Management:** [Zustand](https://zustand-demo.pmnd.rs/)
- **Iconography:** [Lucide React](https://lucide.dev/)

## Directory Structure

```text
/
├── .github/            # CI/CD Workflows (Phase 5)
├── src/
│   ├── assets/         # Static assets and raw icons
│   ├── components/     # Atomic component structure (Phase 4)
│   │   ├── common/     # Reusable UI atoms
│   │   ├── layout/     # Structural components (Header, Sidebar)
│   │   ├── features/   # Large view components
│   │   └── modals/     # Overlay interfaces
│   ├── data/           # Mock data and static configurations (Phase 2)
│   ├── store/          # Zustand global state (Phase 3)
│   ├── types/          # Strict TypeScript interfaces (Phase 2)
│   ├── utils/          # Helper functions and utilities
│   ├── App.tsx         # Main application entry
│   ├── index.css       # Global styles and theme engine
│   └── main.tsx        # Vite entry point
├── index.html          # HTML template
├── tailwind.config.js  # Tailwind CSS configuration
└── tsconfig.json       # TypeScript configuration
```

## Theme Engine

The application uses a dynamic CSS-variable-based theme engine. Themes are defined in `src/index.css` and applied via classes (e.g., `.theme-dark`, `.theme-kitten`) on a root element.

Tailwind is configured to use these variables, enabling utility classes to adapt to the active theme:
- `bg-base`, `bg-panel`, `bg-muted`
- `text-main`, `text-muted`
- `accent`, `accent-fg`, `accent-text`, `accent-muted`

## Refactor Roadmap

1. **Phase 1: Project Initialization & Core Styling Foundation** (Complete)
   - Established Vite + React + TS environment and Tailwind CSS integration.
2. **Phase 2: Data Modeling, Mock Data, & Strict Typing**
   - Extracting types and mock data from the legacy monolith.
3. **Phase 3: Global State Management Implementation**
   - Migrating state logic to Zustand.
4. **Phase 4: Atomic Component Decomposition**
   - Breaking down the UI into modular, reusable components.
5. **Phase 5: CI/CD Pipeline & GitHub Pages Deployment**
   - Automating builds and deployments.
6. **Phase 6: Repository Documentation**
   - Finalizing documentation and handoff.
