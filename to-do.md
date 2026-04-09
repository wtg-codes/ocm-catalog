# OCM LMS Refactor To-Do List

## Core Constraints & Guardrails
- **Zero Fidelity Loss:** The app must look, feel, and function EXACTLY like the original prototype.
- **Strict Typing:** No `any` types. Use `unknown` and narrow if necessary.
- **State Serialization:** Zustand persistence must handle `Set` objects (convert to `Array` for JSON).
- **Iconography:** Import specific icons from `lucide-react` to preserve tree-shaking.
- **Routing:** Maintain state-based conditional rendering; do NOT introduce `react-router-dom`.
- **Vite Config:** Use `base: './'` for GitHub Pages compatibility.

---

## Phase 1: Project Initialization & Core Styling Foundation (DONE)
- [x] Step 1.1: Initialize Vite + React + TS environment
- [x] Step 1.2: Setup Tailwind CSS, PostCSS, and Autoprefixer
- [x] Step 1.3: Migrate CSS Variables and setup global styles
- [x] Step 1.4: Scaffold project source structure
- [x] Step 1.5: Terminology Correction & Documentation (OCM LMS)

---

## Phase 2: Data Modeling, Mock Data, & Strict Typing
- [x] **Step 2.1: Define Core TypeScript Interfaces** (DONE)
- [x] **Step 2.2: Extract Mock Data & Utility Components** (DONE)

---

## Phase 3: Global State Management (Zustand)
- [ ] **Step 3.1: Initialize Zustand Store**
  - [ ] Create `src/store/useAppStore.ts`.
  - [ ] Define `AppState` and `AppActions` interfaces.
  - [ ] Implement domains: Navigation (active IDs), User Progress (Sets/Arrays), Settings.
  - [ ] *Verification:* Manual state logging and action testing.
- [ ] **Step 3.2: Implement State Persistence & Serialization**
  - [ ] Add `persist` middleware.
  - [ ] Implement serialization logic for `Set` fields or refactor to use `Array` internally.
  - [ ] *Verification:* Browser refresh persistence test.
- [ ] **Step 3.3: Connect App Logic to Store**
  - [ ] Replace `useState` in `App.tsx` with store hooks.
  - [ ] Update all handlers (start course, enroll, next/prev step) to use store actions.
  - [ ] *Verification:* End-to-end journey test (Enroll -> Progress -> Complete).

---

## Phase 4: Atomic Component Decomposition
- [ ] **Step 4.1: Common UI Atoms**
  - [ ] Extract `CodeBlock.tsx`, `DeepDive.tsx`, `RefLink.tsx`, `TridorianLogo.tsx` to `src/components/common/`.
  - [ ] *Verification:* Frontend visual regression check (Playwright).
- [ ] **Step 4.2: Layout Components**
  - [ ] Extract `Header.tsx` (dynamic progress bar) and `SidebarNavigation.tsx` (steps nav).
  - [ ] *Verification:* Screenshot verification of layout in various states.
- [ ] **Step 4.3: Feature Views**
  - [ ] Extract `CourseCatalog.tsx`, `CourseCard.tsx`, `CourseDashboard.tsx`, `ActiveLabEngine.tsx`.
  - [ ] *Verification:* Independent view verification (Playwright).
- [ ] **Step 4.4: Modals**
  - [ ] Extract `SettingsModal.tsx`, `CourseBuilderModal.tsx` to `src/components/modals/`.
  - [ ] *Verification:* Interactive test of modal functionalities.

---

## Phase 5: CI/CD & Deployment
- [ ] **Step 5.1: GitHub Actions Workflows**
  - [ ] Create `.github/workflows/pr-check.yml` (Lint, Type-check, Build).
  - [ ] Create `.github/workflows/deploy-pages.yml` (Build and Deploy).
  - [ ] *Verification:* Run workflows on push/PR.
- [ ] **Step 5.2: Deployment Configuration**
  - [ ] Ensure `vite.config.ts` has `base: './'`.
  - [ ] *Verification:* Production build preview check.

---

## Phase 6: Final Documentation & Cleanup
- [ ] **Step 6.1: README Update & Handoff**
  - [ ] Add GitHub Pages deployment instructions to `README.md`.
  - [ ] Delete `App.js` legacy reference.
  - [ ] Final code cleanup and removal of unused artifacts.
  - [ ] *Verification:* Final visual audit and build.
