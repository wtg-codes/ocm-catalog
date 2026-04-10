import React, { useEffect } from 'react';
import { useAppStore } from './store/useAppStore';
import { Header } from './components/layout/Header';
import { CourseCatalog } from './components/features/CourseCatalog';
import { CourseDashboard } from './components/features/CourseDashboard';
import { ActiveLabEngine } from './components/features/ActiveLabEngine';
import { SettingsModal } from './components/modals/SettingsModal';
import { CourseBuilderModal } from './components/modals/CourseBuilderModal';

function App() {
  const {
    theme,
    activeCourseId,
    activeLabId,
  } = useAppStore();

  // Apply theme to body
  useEffect(() => {
    document.body.className = theme === 'light' ? '' : `theme-${theme}`;
  }, [theme]);

  // If in a lab, we render the lab engine directly (occupies full screen)
  if (activeLabId) {
    return (
      <div className="min-h-screen app-bg transition-colors duration-200">
        <ActiveLabEngine />
        <SettingsModal />
        <CourseBuilderModal />
      </div>
    );
  }

  return (
    <div className="min-h-screen app-bg transition-colors duration-200">
      <Header />

      <main className="max-w-7xl mx-auto p-6 md:p-10">
        {!activeCourseId ? (
          <CourseCatalog />
        ) : (
          <CourseDashboard />
        )}
      </main>

      <SettingsModal />
      <CourseBuilderModal />
    </div>
  );
}

export default App;
