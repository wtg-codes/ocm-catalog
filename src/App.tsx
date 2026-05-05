import React, { useEffect } from 'react';
import { useAppStore } from './store/useAppStore';
import { Header } from './components/layout/Header';
import { CourseCatalog } from './components/features/CourseCatalog';
import { CourseDashboard } from './components/features/CourseDashboard';
import { ActiveModuleEngine } from './components/features/ActiveModuleEngine';
import { TrackDashboard } from './components/features/TrackDashboard';
import { ProfileModal } from './components/modals/ProfileModal';
import { SettingsModal } from './components/modals/SettingsModal';
import { CourseBuilderModal } from './components/modals/CourseBuilderModal';
import { UpdatePromptModal } from './components/modals/UpdatePromptModal';
import { checkForAppUpdate } from './utils/versionCheck';

function App() {
  const {
    theme,
    activeCourseId,
    activeTrackId,
    activeModuleId,
  } = useAppStore();

  // Check for app updates on mount
  useEffect(() => {
    checkForAppUpdate();
  }, []);

  // Apply theme to body
  useEffect(() => {
    document.body.className = theme === 'light' ? '' : `theme-${theme}`;
  }, [theme]);

  // If in a lab, we render the lab engine directly (occupies full screen)
  if (activeModuleId) {
    return (
      <div className="min-h-screen app-bg transition-colors duration-200">
        <ActiveModuleEngine />
        <ProfileModal />
        <SettingsModal />
        <CourseBuilderModal />
        <UpdatePromptModal />
      </div>
    );
  }

  return (
    <div className="min-h-screen app-bg transition-colors duration-200">
      <Header />

      <main className="max-w-7xl mx-auto p-6 md:p-10">
        {!activeTrackId ? (
          <CourseCatalog />
        ) : !activeCourseId ? (
          <TrackDashboard />
        ) : (
          <CourseDashboard />
        )}
      </main>

      <SettingsModal />
      <CourseBuilderModal />
      <UpdatePromptModal />
      <ProfileModal />
    </div>
  );
}

export default App;
