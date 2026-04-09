# OCM Learning Management System (LMS)

A production-grade, component-driven React application for delivering Organizational Change Management (OCM) content within a professional services organization.

## Project Overview

This repository is a modernized refactor of the original OCM catalog prototype. It has been transitioned from a monolithic architecture into a scalable, type-safe development environment.

## Key Features

- **OCM Course Catalog:** Browse and enroll in various professional services training tracks.
- **Interactive Lab Engine:** Step-by-step hands-on training with integrated code snippets and progress tracking.
- **Dynamic Theme Engine:** Supports multiple themes (Light, Dark, Kitten, Caribbean, Lunar) powered by a centralized CSS variable system.
- **Global State Management:** High-performance state synchronization using Zustand.
- **Mobile Responsive:** Fully optimized for all screen sizes.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18.0 or higher)
- [npm](https://www.npmjs.com/) (v9.0 or higher)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd ocm-catalog
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Start the development server with Hot Module Replacement (HMR):
```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

### Production Build

Generate a production-ready build:
```bash
npm run build
```

Preview the local production build:
```bash
npm run preview
```

## Architecture

For a detailed breakdown of the project structure and technology choices, please refer to [ARCHITECTURE.md](./ARCHITECTURE.md).

## Refactor Status

The project is currently undergoing a multi-phase refactor:

- [x] **Phase 1:** Project Initialization & Core Styling (Complete)
- [x] **Phase 2:** Data Modeling & Strict Typing (Complete)
- [ ] **Phase 3:** Zustand Global State Implementation
- [ ] **Phase 4:** Atomic Component Decomposition
- [ ] **Phase 5:** CI/CD & Deployment Automation
- [ ] **Phase 6:** Final Documentation

## License

Internal Use Only - [Company Name]
