# OCM LMS Refactor To-Do List

## Phase 1: Project Initialization & Core Styling Foundation (DONE)
- [x] Step 1.1: Initialize Vite + React + TS environment
- [x] Step 1.2: Setup Tailwind CSS, PostCSS, and Autoprefixer
- [x] Step 1.3: Migrate CSS Variables and setup global styles
- [x] Step 1.4: Scaffold project source structure
- [x] Step 1.5: Terminology Correction & Documentation (OCM LMS)

---

## Phase 2: Data Modeling, Mock Data, & Strict Typing
- [ ] **Step 2.1: Define Core TypeScript Interfaces**
  - [ ] Create `src/types/index.ts`.
  - [ ] Define `Step`, `Lab`, `Course` interfaces.
  - [ ] Define literal types for `Status` ('published' | 'draft') and `PortalTab`.
  - [ ] *Verification:* Run `tsc --noEmit`.
- [ ] **Step 2.2: Extract Mock Data & Utility Components**
  - [ ] Create `src/data/mockData.tsx`.
  - [ ] Move `initialCoursesData`, `generateModuleSteps`, and `generateLabSteps` to this file.
  - [ ] Create `src/utils/iconRegistry.tsx` for `iconMap` and `DynamicIcon`.
  - [ ] *Verification:* Run `npm run build`; verify imports in `App.tsx`.

---

## Phase 3: Global State Management (Zustand)
- [ ] **Step 3.1: Initialize Zustand Store**
  - [ ] Create `src/store/useAppStore.ts`.
  - [ ] Define `AppState` and `AppActions` interfaces.
  - [ ] Implement store with domains: Navigation, User Progress, Settings.
  - [ ] *Verification:* Manual state logging and action testing.
- [ ] **Step 3.2: Implement State Persistence & Serialization**
  - [ ] Add `persist` middleware.
  - [ ] Handle `Set` serialization (convert to `Array` for storage).
  - [ ] *Verification:* Browser refresh persistence test.
- [ ] **Step 3.3: Connect App Logic to Store**
  - [ ] Replace `useState` in `App.tsx` with store hooks.
  - [ ] Update all handlers to use store actions.
  - [ ] *Verification:* End-to-end user journey test (Enroll -> Progress -> Complete).

---

## Phase 4: Atomic Component Decomposition
- [ ] **Step 4.1: Common UI Atoms**
  - [ ] Extract `CodeBlock.tsx`, `DeepDive.tsx`, `RefLink.tsx`, `TridorianLogo.tsx` to `src/components/common/`.
  - [ ] *Verification:* Frontend visual regression check (Playwright).
- [ ] **Step 4.2: Layout Components**
  - [ ] Extract `Header.tsx`, `SidebarNavigation.tsx` to `src/components/layout/`.
  - [ ] *Verification:* Screenshot verification of layout in various states.
- [ ] **Step 4.3: Feature Views**
  - [ ] Extract `CourseCatalog.tsx`, `CourseCard.tsx`, `CourseDashboard.tsx`, `ActiveLabEngine.tsx` to `src/components/features/`.
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
- [ ] **Step 5.2: Vite Config for Deployment**
  - [ ] Set `base: './'` in `vite.config.ts`.
  - [ ] *Verification:* Production build preview check.

---

## Phase 6: Final Documentation & Cleanup
- [ ] **Step 6.1: README Update & Handoff**
  - [ ] Add "Finalizing GitHub Pages Deployment" section.
  - [ ] Final code cleanup and removal of unused artifacts.
  - [ ] *Verification:* Final visual audit and build.
