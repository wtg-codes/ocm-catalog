import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { PortalTab, ViewMode, Track } from '../types';
import { initialTracksData } from '../data/mockData';

interface AppState {
  // Domain 1: Navigation & UI State
  activeTrackId: string | null;
  activeCourseId: string | null;
  activeModuleId: string | null;
  currentStepIndex: number;
  portalTab: PortalTab;
  viewMode: ViewMode;

  // Domain 2: User Progress (using Arrays for easy serialization)
  completedStepIds: string[];
  enrolledTrackIds: string[];
  enrolledCourseIds: string[];
  completedCourseIds: string[];
  completedTrackIds: string[];

  // Domain 3: Settings & Modals
  theme: string;
  autoAdvance: boolean;
  isSettingsOpen: boolean;
  isCourseBuilderOpen: boolean;
  isProfileOpen: boolean;

  // Domain 4: Data
  tracks: Track[];
}

interface AppActions {
  // Navigation Actions
  setActiveTrackId: (id: string | null) => void;
  setActiveCourseId: (id: string | null) => void;
  setActiveModuleId: (id: string | null) => void;
  setCurrentStepIndex: (index: number | ((prev: number) => number)) => void;
  setPortalTab: (tab: PortalTab) => void;
  setViewMode: (mode: ViewMode) => void;

  // Progress Actions
  enrollTrack: (trackId: string) => void;
  unenrollTrack: (trackId: string) => void;
  enrollCourse: (courseId: string) => void;
  unenrollCourse: (courseId: string) => void;
  completeStep: (stepId: string) => void;
  completeCourse: (courseId: string) => void;
  completeTrack: (trackId: string) => void;

  // Settings & Modal Actions
  setTheme: (theme: string) => void;
  setAutoAdvance: (enabled: boolean) => void;
  setSettingsOpen: (open: boolean) => void;
  setCourseBuilderOpen: (open: boolean) => void;
  setProfileOpen: (open: boolean) => void;

  // Data Actions
  setTracks: (tracks: Track[]) => void;
  addTrack: (track: Track) => void;
  updateTrack: (track: Track) => void;
  deleteTrack: (trackId: string) => void;

  // Composite/Workflow Actions
  startTrack: (trackId: string) => void;
  startCourse: (trackId: string, courseId: string) => void;
  startModule: (moduleId: string) => void;
  returnToPortal: () => void;
  returnToTrack: () => void;
  returnToCourse: (lastStepId?: string) => void;
  nextStep: (currentStepId: string, isLastStep: boolean) => void;
  prevStep: () => void;
}

export const useAppStore = create<AppState & AppActions>()(
  persist(
    (set) => ({
      // Initial State
      activeTrackId: null,
      activeCourseId: null,
      activeModuleId: null,
      currentStepIndex: 0,
      portalTab: 'catalog',
      viewMode: 'grid',
      completedStepIds: [],
      enrolledTrackIds: [],
      enrolledCourseIds: [],
      completedCourseIds: [],
      completedTrackIds: [],
      theme: 'dark',
      autoAdvance: true,
      isSettingsOpen: false,
      isCourseBuilderOpen: false,
      isProfileOpen: false,
      tracks: initialTracksData,

      // Actions
      setActiveTrackId: (id) => set({ activeTrackId: id }),
      setActiveCourseId: (id) => set({ activeCourseId: id }),
      setActiveModuleId: (id) => set({ activeModuleId: id }),
      setCurrentStepIndex: (index) => set((state) => ({
        currentStepIndex: typeof index === 'function' ? index(state.currentStepIndex) : index
      })),
      setPortalTab: (tab) => set({ portalTab: tab }),
      setViewMode: (mode) => set({ viewMode: mode }),

      enrollTrack: (trackId) => set((state) => ({
        enrolledTrackIds: state.enrolledTrackIds.includes(trackId)
          ? state.enrolledTrackIds
          : [...state.enrolledTrackIds, trackId],
        portalTab: 'my-courses'
      })),
      unenrollTrack: (trackId) => set((state) => ({
        enrolledTrackIds: state.enrolledTrackIds.filter(id => id !== trackId)
      })),
      enrollCourse: (courseId) => set((state) => ({
        enrolledCourseIds: state.enrolledCourseIds.includes(courseId)
          ? state.enrolledCourseIds
          : [...state.enrolledCourseIds, courseId],
        portalTab: 'my-courses'
      })),
      unenrollCourse: (courseId) => set((state) => ({
        enrolledCourseIds: state.enrolledCourseIds.filter(id => id !== courseId)
      })),

      completeStep: (stepId) => set((state) => ({
        completedStepIds: state.completedStepIds.includes(stepId)
          ? state.completedStepIds
          : [...state.completedStepIds, stepId]
      })),
      completeCourse: (courseId) => set((state) => ({
        completedCourseIds: state.completedCourseIds.includes(courseId)
          ? state.completedCourseIds
          : [...state.completedCourseIds, courseId]
      })),
      completeTrack: (trackId) => set((state) => ({
        completedTrackIds: state.completedTrackIds.includes(trackId)
          ? state.completedTrackIds
          : [...state.completedTrackIds, trackId]
      })),

      setTheme: (theme) => set({ theme }),
      setAutoAdvance: (enabled) => set({ autoAdvance: enabled }),
      setSettingsOpen: (open) => set({ isSettingsOpen: open }),
      setCourseBuilderOpen: (open) => set({ isCourseBuilderOpen: open }),
      setProfileOpen: (open) => set({ isProfileOpen: open }),

      // Data Actions
      setTracks: (tracks) => set({ tracks }),
      addTrack: (track) => set((state) => ({ tracks: [...state.tracks, track] })),
      updateTrack: (track) => set((state) => ({
        tracks: state.tracks.map((t) => (t.id === track.id ? track : t))
      })),
      deleteTrack: (trackId) => set((state) => ({
        tracks: state.tracks.filter((t) => t.id !== trackId)
      })),

      // Workflow Implementations
      startTrack: (trackId) => set({
        activeTrackId: trackId,
        activeCourseId: null,
        activeModuleId: null
      }),

      startCourse: (trackId, courseId) => set({
        activeTrackId: trackId,
        activeCourseId: courseId,
        activeModuleId: null
      }),

      startModule: (moduleId) => set({
        activeModuleId: moduleId,
        currentStepIndex: 0
      }),

      returnToPortal: () => set({
        activeTrackId: null,
        activeCourseId: null,
        activeModuleId: null
      }),

      returnToTrack: () => set({
        activeCourseId: null,
        activeModuleId: null
      }),

      returnToCourse: (lastStepId) => set((state) => {
        const updates: any = { activeModuleId: null };
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
