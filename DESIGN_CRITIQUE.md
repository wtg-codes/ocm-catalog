# 🎨 LMS UI Design Critique & To-Do List

This document outlines a 12-point critique of the current Tridorian OCM LMS UI, drawing inspiration from high-fidelity design systems like Linear, Vercel, and Stripe (as seen in [awesome-design-md](https://github.com/VoltAgent/awesome-design-md)).

## 1. Typography Consistency
- **Issue**: Font sizes and weights are scattered (e.g., `text-lg font-black`, `text-[10px] font-bold`).
- **To-Do**: Standardize typography scale in `tailwind.config.js` and use semantic classes.

## 2. Color Hierarchy (Surface Tokens)
- **Issue**: The palette is functional but flat. It lacks depth in "surface" tokens.
- **To-Do**: Introduce `surface-1`, `surface-2`, `surface-3` for better stacking and layering.

## 3. Nuanced Border Radius
- **Issue**: `rounded-2xl` is used excessively, making the UI feel "bubbly" rather than "precise".
- **To-Do**: Implement a tiered radius system (e.g., 6px for buttons, 12px for cards, 16px for modals).

## 4. Button Refinement
- **Issue**: The `accent-btn` uses aggressive shadows and brightness filters.
- **To-Do**: Transition to subtle internal borders and "glass" effects for primary actions.

## 5. Iconography Standardization
- **Issue**: Icons in cards and navigation vary in visual weight and padding.
- **To-Do**: Standardize icon containers and stroke widths (e.g., consistently 1.5 or 2).

## 6. Layout Density & Padding
- **Issue**: `CourseCard` padding (`p-8`) is too generous, wasting screen real estate.
- **To-Do**: Optimize padding for a "data-rich" yet clean aesthetic.

## 7. Progress Visualization
- **Issue**: The progress bars lack precision and "glow" effects found in modern dashboards.
- **To-Do**: Use thinner, high-contrast progress indicators with subtle gradients.

## 8. Navigation Interaction States
- **Issue**: Active states in the sidebar use heavy color blocks (`bg-accent-muted`).
- **To-Do**: Use subtle indicators like left-accents or light background shifts.

## 9. Elimnation of "Magic Numbers"
- **Issue**: Arbitrary values like `tracking-[0.2em]` or `text-[10px]` are hard-coded.
- **To-Do**: Move all custom spacing and typography values to `tailwind.config.js`.

## 10. Elevation & Shadow Systems
- **Issue**: Shadows are currently one-dimensional (`shadow-sm`).
- **To-Do**: Implement a multi-layered shadow system for proper component elevation.

## 11. Responsive Consistency
- **Issue**: Layout gaps (`gap-8`, `gap-3`) feel inconsistent across different breakpoints.
- **To-Do**: Define a strict spacing scale (e.g., 4px, 8px, 16px, 24px, 32px).

## 12. Theme Contrast & Accessibility
- **Issue**: High-vibrancy themes (`kitten`, `caribbean`) may fail WCAG AA contrast tests.
- **To-Do**: Audit and refine color tokens for accessibility without losing brand personality.

---

# 🚀 Actionable Plan

## Phase 1: Design Tokens (PR 1)
- Update `tailwind.config.js` with new scale.
- Standardize `src/index.css` variables.

## Phase 2: Core Layout (PR 2)
- Refactor `Header` and `SidebarNavigation`.
- Apply new surface tokens.

## Phase 3: Feature Components (PR 3)
- Redesign `CourseCard` and `CourseCatalog`.
- Refine `ActiveLabEngine`.

## Phase 4: Modals & Polish (PR 4)
- Update `SettingsModal` and `CourseBuilderModal`.
- Final visual regression testing.
