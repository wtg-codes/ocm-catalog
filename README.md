# 🎓 Tridorian OCM Learning Management System (LMS)

[![PR Check](https://github.com/wtg-codes/ocm-catalog/actions/workflows/pr-check.yml/badge.svg)](https://github.com/wtg-codes/ocm-catalog/actions/workflows/pr-check.yml)
[![Deploy to GitHub Pages](https://github.com/wtg-codes/ocm-catalog/actions/workflows/deploy-pages.yml/badge.svg)](https://github.com/wtg-codes/ocm-catalog/actions/workflows/deploy-pages.yml)

**Live Demo:** [https://wtg-codes.github.io/ocm-catalog/](https://wtg-codes.github.io/ocm-catalog/)

The Tridorian OCM LMS is a high-performance, component-driven React application specifically engineered for delivering **Organizational Change Management (OCM)** training tracks. Originally born as a rapid prototype, it has been fully refactored into a scalable, type-safe, and production-ready platform for professional services enablement.

---

## 🚀 Key Features

### 🏛️ Component-Driven Architecture
Built with **Atomic Design** principles. Every UI element is an isolated, reusable component, ensuring zero fidelity loss and maximum maintainability.

### 🧪 Interactive Lab Engine
- **Step-by-Step Guidance:** Logical flow for complex technical tasks.
- **Rich Content:** Support for deep-dives, code snippets, and reference links.
- **Progressive Persistence:** Automatic state saving via Zustand.

### 🎨 Advanced Theme Engine
A centralized CSS-variable system supports instant theme switching with no flash of unstyled content:
- 🌑 **Dark (Default)** | ☀️ **Light** | 🐱 **Kitten** | 🏝️ **Caribbean** | 🌙 **Lunar**

### 🛠️ Course Authoring Builder
Integrated developer tools to draft and modify curriculum modules in real-time.

### 🛡️ Enterprise-Grade Reliability
- **Strict TypeScript:** Zero `any` types, fully modeled data structures.
- **E2E Testing:** Robust coverage using **Playwright** for all critical user journeys.
- **CI/CD:** Automated builds, type-checking, and deployment to GitHub Pages.

---

## 🏗️ System Architecture

```text
[ Client (Vite + React) ] <---> [ Zustand State Store ]
           |                           |
           v                           v
[ Atomic UI Components ]      [ Persistence Middleware ]
           |                           |
           v                           v
[ Tailwind CSS Utility ]      [ LocalStorage (Browser) ]
```

Detailed architectural documentation can be found in [ARCHITECTURE.md](./ARCHITECTURE.md).

---

## 🛠️ Development & Tooling

### Prerequisites
- **Node.js**: v18.0+
- **npm**: v9.0+

### Quick Start
```bash
npm install      # Install dependencies
npm run dev      # Start development server
```

### Testing Suite
We use **Playwright** for end-to-end verification and visual regression testing.
```bash
npx playwright install --with-deps # One-time setup
npm run test                      # Run all E2E tests
```

### Deployment
Deployment is automated via GitHub Actions. Merging to `main` triggers:
1. Linting & Type-checking
2. Production Build (`npm run build`)
3. Automated deploy to GitHub Pages (`./dist`)

---

## 📈 Roadmap & Refactor Status

This project has successfully completed a 6-phase architectural refactor:
- ✅ **Phase 1:** Environment & Foundation
- ✅ **Phase 2:** Data Modeling & Mocking
- ✅ **Phase 3:** Global State (Zustand)
- ✅ **Phase 4:** Atomic Decomposition
- ✅ **Phase 5:** CI/CD & Testing
- ✅ **Phase 6:** Final Documentation

Track detailed progress in [to-do.md](./to-do.md).

---

## ⚖️ License

**Internal Use Only**
© 2024 Tridorian. All rights reserved. Proprietary and Confidential.
