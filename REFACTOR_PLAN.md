# OCM LMS Refactor Plan

This document serves as the granular to-do list for the remaining refactor phases. Each step must be completed, verified, and tested before proceeding.

## Phase 2: Data Modeling, Mock Data, & Strict Typing

### Step 2.1: Define Core TypeScript Interfaces
- **Tasks:**
  - Create `src/types/index.ts`.
  - Define `Step`, `Lab`, `Course` interfaces.
  - Define literal types for `Status` ('published' | 'draft') and `PortalTab`.
- **Verification:** Run `tsc --noEmit` to ensure type definitions are valid.

### Step 2.2: Extract Mock Data & Utility Components
- **Tasks:**
  - Create `src/data/mockData.tsx`.
  - Move `initialCoursesData`, `generateModuleSteps`, and `generateLabSteps` to this file.
  - Create `src/utils/iconRegistry.tsx` for `iconMap` and `DynamicIcon`.
- **Verification:**
  - Run `npm run build` to check for import/export errors.
  - Temporarily import data into `App.tsx` to verify data integrity.

---

## Phase 3: Global State Management (Zustand)

### Step 3.1: Initialize Zustand Store
- **Tasks:**
  - Create `src/store/useAppStore.ts`.
  - Define `AppState` and `AppActions` interfaces.
  - Implement the store with domains for Navigation, User Progress, and Settings.
- **Verification:** Unit test the store actions (if possible) or verify via manual state logging.

### Step 3.2: Implement State Persistence & Serialization
- **Tasks:**
  - Add `persist` middleware to the store.
  - Convert `Set` objects (`completedSteps`, `enrolledCourses`) to `Array` for JSON compatibility, or implement custom hydration logic.
- **Verification:** Refresh the browser during development and ensure state (e.g., enrolled courses) persists.

### Step 3.3: Connect App Logic to Store
- **Tasks:**
  - Replace `useState` hooks in `App.tsx` with store hooks.
  - Update all handlers (`handleStartCourse`, `handleEnroll`, etc.) to use store actions.
- **Verification:** Perform a full user journey (Enroll -> Start Course -> Complete Lab) and verify state updates in the UI.

---

## Phase 4: Atomic Component Decomposition

### Step 4.1: Common UI Atoms
- **Tasks:**
  - Extract `CodeBlock.tsx`, `DeepDive.tsx`, `RefLink.tsx`, and `TridorianLogo.tsx` to `src/components/common/`.
- **Verification:** Run `frontend_verification` to ensure these atoms render identically to the original.

### Step 4.2: Layout Components
- **Tasks:**
  - Extract `Header.tsx` and `SidebarNavigation.tsx` to `src/components/layout/`.
  - Connect them to the Zustand store.
- **Verification:** Screenshot verification of the Header and Sidebar in various app states.

### Step 4.3: Feature Views
- **Tasks:**
  - Create `src/components/features/CourseCatalog.tsx`, `CourseCard.tsx`, `CourseDashboard.tsx`, and `ActiveLabEngine.tsx`.
  - Move respective logic and JSX from `App.tsx`.
- **Verification:** Verify each view individually via Playwright scripts.

### Step 4.4: Modals
- **Tasks:**
  - Extract `SettingsModal.tsx` and `CourseBuilderModal.tsx` to `src/components/modals/`.
- **Verification:** Open modals and test all interactive elements (theme switching, course editing).

---

## Phase 5: CI/CD & Deployment

### Step 5.1: GitHub Actions Workflows
- **Tasks:**
  - Create `.github/workflows/pr-check.yml` (Lint, Type-check, Build).
  - Create `.github/workflows/deploy-pages.yml` (Build and Deploy to GH Pages).
- **Verification:** Push a test commit/PR and verify workflow runs pass.

### Step 5.2: Vite Config for Deployment
- **Tasks:**
  - Update `vite.config.ts` with `base: './'`.
- **Verification:** Ensure local production preview still works correctly with relative paths.

---

## Phase 6: Final Documentation & Cleanup

### Step 6.1: README Update & Handoff
- **Tasks:**
  - Add "Finalizing GitHub Pages Deployment" section to `README.md`.
  - Perform a final sweep of the codebase for unused code or comments.
- **Verification:** Final `npm run build` and visual inspection of the entire app.
