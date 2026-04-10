import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { PortalTab, ViewMode, Course } from '../types';
import { initialCoursesData } from '../data/mockData';

interface AppState {
  // Domain 1: Navigation & UI State
  activeCourseId: string | null;
  activeLabId: string | null;
  currentStepIndex: number;
  portalTab: PortalTab;
  viewMode: ViewMode;

  // Domain 2: User Progress (using Arrays for easy serialization)
  completedStepIds: string[];
  enrolledCourseIds: string[];

  // Domain 3: Settings & Modals
  theme: string;
  autoAdvance: boolean;
  isSettingsOpen: boolean;
  isCourseBuilderOpen: boolean;

  // Domain 4: Data
  courses: Course[];
}

interface AppActions {
  // Navigation Actions
  setActiveCourseId: (id: string | null) => void;
  setActiveLabId: (id: string | null) => void;
  setCurrentStepIndex: (index: number | ((prev: number) => number)) => void;
  setPortalTab: (tab: PortalTab) => void;
  setViewMode: (mode: ViewMode) => void;

  // Progress Actions
  enrollCourse: (courseId: string) => void;
  completeStep: (stepId: string) => void;

  // Settings & Modal Actions
  setTheme: (theme: string) => void;
  setAutoAdvance: (enabled: boolean) => void;
  setSettingsOpen: (open: boolean) => void;
  setCourseBuilderOpen: (open: boolean) => void;

  // Data Actions
  setCourses: (courses: Course[]) => void;
  addCourse: (course: Course) => void;
  updateCourse: (course: Course) => void;
  deleteCourse: (courseId: string) => void;

  // Composite/Workflow Actions
  startCourse: (courseId: string) => void;
  startLab: (labId: string) => void;
  returnToPortal: () => void;
  returnToCourse: (lastStepId?: string) => void;
  nextStep: (currentStepId: string, isLastStep: boolean) => void;
  prevStep: () => void;
}

export const useAppStore = create<AppState & AppActions>()(
  persist(
    (set) => ({
      // Initial State
      activeCourseId: null,
      activeLabId: null,
      currentStepIndex: 0,
      portalTab: 'catalog',
      viewMode: 'grid',
      completedStepIds: [],
      enrolledCourseIds: [],
      theme: 'dark',
      autoAdvance: true,
      isSettingsOpen: false,
      isCourseBuilderOpen: false,
      courses: initialCoursesData,

      // Actions
      setActiveCourseId: (id) => set({ activeCourseId: id }),
      setActiveLabId: (id) => set({ activeLabId: id }),
      setCurrentStepIndex: (index) => set((state) => ({
        currentStepIndex: typeof index === 'function' ? index(state.currentStepIndex) : index
      })),
      setPortalTab: (tab) => set({ portalTab: tab }),
      setViewMode: (mode) => set({ viewMode: mode }),

      enrollCourse: (courseId) => set((state) => ({
        enrolledCourseIds: state.enrolledCourseIds.includes(courseId)
          ? state.enrolledCourseIds
          : [...state.enrolledCourseIds, courseId],
        portalTab: 'my-courses'
      })),

      completeStep: (stepId) => set((state) => ({
        completedStepIds: state.completedStepIds.includes(stepId)
          ? state.completedStepIds
          : [...state.completedStepIds, stepId]
      })),

      setTheme: (theme) => set({ theme }),
      setAutoAdvance: (enabled) => set({ autoAdvance: enabled }),
      setSettingsOpen: (open) => set({ isSettingsOpen: open }),
      setCourseBuilderOpen: (open) => set({ isCourseBuilderOpen: open }),

      // Data Actions
      setCourses: (courses) => set({ courses }),
      addCourse: (course) => set((state) => ({ courses: [...state.courses, course] })),
      updateCourse: (course) => set((state) => ({
        courses: state.courses.map((c) => (c.id === course.id ? course : c))
      })),
      deleteCourse: (courseId) => set((state) => ({
        courses: state.courses.filter((c) => c.id !== courseId)
      })),

      // Workflow Implementations
      startCourse: (courseId) => set({
        activeCourseId: courseId,
        activeLabId: null
      }),

      startLab: (labId) => set({
        activeLabId: labId,
        currentStepIndex: 0
      }),

      returnToPortal: () => set({
        activeCourseId: null,
        activeLabId: null
      }),

      returnToCourse: (lastStepId) => set((state) => {
        const updates: Partial<AppState> = { activeLabId: null };
        if (lastStepId && !state.completedStepIds.includes(lastStepId)) {
          updates.completedStepIds = [...state.completedStepIds, lastStepId];
        }
        return updates;
      }),

      nextStep: (currentStepId, isLastStep) => set((state) => {
        const newCompleted = state.completedStepIds.includes(currentStepId)
          ? state.completedStepIds
          : [...state.completedStepIds, currentStepId];

        if (!isLastStep && state.autoAdvance) {
          return {
            completedStepIds: newCompleted,
            currentStepIndex: state.currentStepIndex + 1
          };
        }
        return { completedStepIds: newCompleted };
      }),

      prevStep: () => set((state) => ({
        currentStepIndex: Math.max(0, state.currentStepIndex - 1)
      })),
    }),
    { name: "ocm-lms-store" }
  )
);
