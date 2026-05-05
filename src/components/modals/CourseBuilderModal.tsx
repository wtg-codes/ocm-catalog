import React from 'react';
import { useAppStore } from '../../store/useAppStore';

export const CourseBuilderModal: React.FC = () => {
  const { isCourseBuilderOpen, setCourseBuilderOpen } = useAppStore();
  if (!isCourseBuilderOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-panel w-full max-w-lg rounded-2xl border border-main p-6 text-center">
        <h2 className="text-xl font-bold text-main mb-4">Builder Coming Soon</h2>
        <p className="text-muted mb-6">Track Builder is currently being refactored for the new data structure.</p>
        <button onClick={() => setCourseBuilderOpen(false)} className="accent-btn px-6 py-2 rounded-lg">Close</button>
      </div>
    </div>
  );
};
