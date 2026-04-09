# **Comprehensive System Instructions: Monolith to Production-Grade Refactor**

**Target Agent Identifier:** @jules-agent (or equivalent autonomous coding agent)

**Agent Persona:** Act as a Senior Staff Frontend Engineer and Architect.

**Primary Objective:** You are tasked with deconstructing the attached monolithic React prototype (currently contained entirely within App.jsx or App.tsx) into a highly scalable, production-grade, component-driven web application repository. This is not a simple linting pass; it is a structural architectural transformation.

## **🎯 Target Architecture, Stack, & Tooling Specifications**

You MUST strictly adhere to the following technology stack. Deviations, substitutions, or introducing unauthorized libraries will result in a rejected PR.

* **Build Tool & Framework:** React 18+ bootstrapped exclusively with Vite. You must use the React \+ SWC plugin (@vitejs/plugin-react-swc) for optimized compilation.  
* **Language & Type Safety:** TypeScript. You must enable strict: true in tsconfig.json. The use of the any type is strictly forbidden. If a type is temporarily unknown, use unknown and properly narrow it.  
* **Styling Engine:** Tailwind CSS (v3+) integrated with PostCSS and Autoprefixer. All legacy inline styles must be evaluated for conversion to Tailwind utility classes where appropriate, while preserving the custom CSS variable theme engine.  
* **Global State Management:** Zustand. Do not use Redux, MobX, or the React Context API for global state. Local ephemeral state (e.g., simple toggles) should remain as standard React useState hooks.  
* **Iconography:** lucide-react. Ensure tree-shaking is preserved by importing specific icons rather than the entire library bundle.  
* **Routing Methodology:** Maintain the current state-based conditional rendering architecture (using activeCourseId, activeLabId, etc.). **DO NOT** introduce react-router-dom or any URL-based routing library unless explicitly instructed in a future phase.

## **🛑 Strict Guardrails & Execution Constraints**

1. **Zero Feature & Fidelity Loss:** The resulting compiled application MUST look, feel, and function EXACTLY like the original monolithic prototype. No UI elements, hover states, transitions, shadow values, or placeholder textual logic may be dropped, altered, or simplified.  
2. **Incremental, Sequential Execution:** You must break this transformation into isolated Pull Requests based on the numbered Phases below. Do not attempt a single, massive Pull Request. Complete Phase 1, wait for approval/merge, and then proceed to Phase 2\.  
3. **Atomic Commits:** Ensure each logical change is a separate commit within your PRs. Commits should follow conventional commit formatting (e.g., feat:, refactor:, chore:).  
4. **Preserve Raw Assets:** Any inline SVGs (like the TridorianLogo) must be extracted into their own dedicated React components within an assets or icons directory, completely preserving their viewBox and path data.  
5. **No Hallucinated Data:** Do not add new mock courses, labs, or steps that do not exist in the original prototype.

## **📋 Comprehensive Execution Plan (Phases 1 through 6\)**

### **Phase 1: Project Initialization & Core Styling Foundation**

Your first PR should establish the repository skeleton and asset pipeline.

* **Environment Scaffold:** Initialize the Vite \+ React \+ TS environment into the root of the repository. Clean out boilerplate files (App.css, standard Vite logos).  
* **Tailwind & PostCSS Setup:** Initialize and configure tailwind.config.js. Ensure the content array meticulously targets all future component directories (e.g., "./index.html", "./src/\*\*/\*.{js,ts,jsx,tsx}").  
* **CSS Variable Migration (CRITICAL):** The prototype contains a massive themeStyles template literal injected via a \<style\> tag.  
  * Extract all of these CSS variables (\--bg-base, \--text-main, etc.) and the theme classes (.theme-dark, .theme-kitten, etc.) into the global src/index.css file.  
  * Ensure the @tailwind base; @tailwind components; @tailwind utilities; directives are placed correctly at the top of this file.  
  * Map the active theme class dynamically to the root \<html\> or \<body\> tag in the main layout wrapper so Tailwind and native CSS can utilize them harmoniously.  
* **Dependency Management:** Install the required runtime dependencies: lucide-react, zustand, clsx, and tailwind-merge. Install developer dependencies for types (@types/node, etc.).

### **Phase 2: Data Modeling, Mock Data, & Strict Typing**

Your second PR focuses on untangling the data layer from the UI layer.

* **TypeScript Interfaces (src/types/index.ts):** Define strict, deeply nested interfaces representing the domain model.  
  * Create types for Course, Lab, and Step.  
  * Define explicit literal types for Status (e.g., 'published' | 'draft').  
  * *Crucial Note on Step Data:* Pay special attention to the content: () \=\> JSX.Element property in the Step configurations. Type this correctly as a React functional component returning a ReactNode.  
* **Mock Data Extraction (src/data/mockData.tsx):** Move initialCoursesData, the generateModuleSteps factory, and the generateLabSteps factory into this dedicated file. Because these data structures contain raw JSX (the step content), this file MUST use the .tsx extension, not just .ts.  
* **Icon Mapping Utility (src/utils/iconRegistry.tsx):** Extract the iconMap object and the DynamicIcon functional component into a dedicated utility file. Ensure the imports from lucide-react are clean and explicitly typed.

### **Phase 3: Global State Management Implementation (Zustand)**

Your third PR handles the migration of the complex, monolithic useState logic into a scalable global store.

* **Store Creation (src/store/useAppStore.ts):** Create a robust Zustand store integrating the following logical domains:  
  * **Domain 1 (Navigation & UI State):** activeCourseId (string | null), activeLabId (string | null), currentStepIndex (number), portalTab ('catalog' | 'my-courses'), viewMode ('grid' | 'list').  
  * **Domain 2 (User Progress):** completedSteps and enrolledCourses.  
  * **Domain 3 (Settings):** theme (string), autoAdvance (boolean), isSettingsOpen (boolean).  
* **Serialization Requirement (CRITICAL):** The original prototype uses native JavaScript Set objects for completedSteps and enrolledCourses. Zustand's persist middleware cannot natively serialize/deserialize Set objects to JSON for localStorage.  
  * You MUST either refactor the application logic to use standard Arrays of strings for these fields, OR implement custom serialize/deserialize functions within the Zustand persist configuration to seamlessly convert Arrays to Sets upon hydration and Sets to Arrays upon storage. Arrays are highly preferred for simplicity.  
* **Actions:** Bind all state mutation handlers (e.g., handleStartCourse, handleNext, handleEnroll) as actions within the Zustand store.

### **Phase 4: Atomic Component Decomposition**

Your fourth PR is the heaviest. Deconstruct the remaining 1000+ line App.jsx layout into a modular, highly cohesive directory structure.

* **/src/components/common/ (or UI):** Extract reusable atoms.  
  * CodeBlock.tsx (Handle clipboard copy state locally here).  
  * DeepDive.tsx (Handle accordion open/close state locally here).  
  * TridorianLogo.tsx (Pure SVG component).  
  * Button.tsx or specialized utility wrappers if identified.  
* **/src/components/layout/**: Extract the structural scaffolding.  
  * Header.tsx (Must dynamically render title, breadcrumbs, and the top progress bar depending on the active Zustand state).  
  * SidebarNavigation.tsx (The left-hand steps navigation for active labs).  
* **/src/components/features/**: Extract the primary view states.  
  * CourseCatalog.tsx: The logic that loops over coursesData and toggles between the Grid and List views.  
  * CourseCard.tsx / CourseListItem.tsx: The individual UI cards representing a course.  
  * CourseDashboard.tsx: The view showing the list of modules/labs for a actively selected course.  
  * ActiveLabEngine.tsx: The split-pane view rendering the sidebar and the dynamically injected currentStep.content().  
* **/src/components/modals/**: Extract the overlay interfaces.  
  * SettingsModal.tsx (Connect directly to Zustand for theme and auto-advance toggling).  
  * CourseBuilderModal.tsx (The authoring UI).

### **Phase 5: CI/CD Pipeline & GitHub Pages Deployment Config**

Your fifth PR automates the repository quality and deployment mechanisms.

* **PR Validation Workflow:** Create .github/workflows/pr-check.yml.  
  * Triggers: On Pull Request to main.  
  * Steps: Checkout code, setup Node.js (v20+), run npm ci, run npm run lint, enforce strict type checking with npx tsc \--noEmit, and verify a successful build with npm run build.  
* **GitHub Pages Deployment Workflow:** Create .github/workflows/deploy-pages.yml.  
  * Triggers: On push to main.  
  * Vite Config Update: You MUST update vite.config.ts to include the property base: './' so that static assets resolve via relative paths, which is mandatory for standard GitHub Pages hosting without custom domains.  
  * Permissions: Explicitly set contents: read, pages: write, and id-token: write.  
  * Steps: Actions/checkout, actions/setup-node, npm ci, npm run build, use actions/upload-pages-artifact targeting the /dist directory, and finally actions/deploy-pages.

### **Phase 6: Repository Documentation**

Your final PR provides the operational manual for the codebase.

* **README.md Rewrite:** Overwrite the default Vite README with a comprehensive guide.  
* **Structure Explanation:** Briefly explain the /src directory layout and the Zustand state domains.  
* **Local Development:** Document the standard commands (npm install, npm run dev, npm run build).  
* **Deployment Instructions (CRITICAL):** Include a specific section exactly titled "Finalizing GitHub Pages Deployment" containing the following literal text to guide the repository owner:  
  **To make this site live on GitHub Pages, you must enable GitHub Actions deployments in your repository settings:**  
  1. Go to your repository on GitHub.  
  2. Click on the **Settings** tab.  
  3. In the left sidebar, click on **Pages**.  
  4. Under *Build and deployment*, change the **Source** dropdown to **GitHub Actions**.  
* The .github/workflows/deploy-pages.yml file included in this repository will now automatically build and publish your site to the web every time a pull request is merged into the main branch.

**End of Instructions.** Ensure you have fully parsed the constraints regarding state serialization and routing before executing Phase 1\.

