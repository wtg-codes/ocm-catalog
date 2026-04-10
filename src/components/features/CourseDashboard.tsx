import React from 'react';
import { PlayCircle, Edit3, PlusCircle } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { initialCoursesData } from '../../data/mockData';
import { DynamicIcon } from '../../utils/iconRegistry';

export const CourseDashboard: React.FC = () => {
  const {
    activeCourseId,
    setActiveCourseId,
    portalTab,
    startLab,
    setCourseBuilderOpen,
    enrolledCourseIds,
    enrollCourse
  } = useAppStore();

  const activeCourse = initialCoursesData.find((c) => c.id === activeCourseId);
  const isEnrolled = activeCourseId ? enrolledCourseIds.includes(activeCourseId) : false;

  if (!activeCourse) return null;

  return (
    <div className="animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
        <div className="flex-1">
          <button
            onClick={() => setActiveCourseId(null)}
            className="mb-4 text-muted hover:text-accent font-bold flex items-center gap-2 transition-colors uppercase tracking-widest text-xs"
          >
            Back to {portalTab === 'catalog' ? 'Catalog' : 'My Courses'}
          </button>
          <div className="flex items-center gap-4 mb-4">
            <h2 className="text-4xl font-extrabold text-main tracking-tight">{activeCourse.title}</h2>
            {!isEnrolled && (
              <button
                onClick={() => enrollCourse(activeCourse.id)}
                className="bg-accent text-accent-fg px-4 py-1.5 rounded-full font-bold text-xs uppercase tracking-widest shadow-accent flex items-center gap-2 hover:scale-105 transition-transform"
              >
                <PlusCircle size={14} /> Enroll in Track
              </button>
            )}
          </div>
          <p className="text-muted text-xl max-w-3xl font-medium">{activeCourse.description}</p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => setCourseBuilderOpen(true)}
            className="flex items-center gap-2 text-sm font-bold text-muted hover:text-accent bg-base px-4 py-2 border border-main rounded-lg transition-colors whitespace-nowrap"
          >
            <Edit3 size={16} /> Edit Track
          </button>
        </div>
      </div>

      <div className="mt-12 grid md:grid-cols-2 gap-8">
        {activeCourse.labs.map((lab) => (
           <div key={lab.id} className="bg-panel rounded-2xl border border-main shadow-sm overflow-hidden flex flex-col">
              <div className="p-8 flex-1">
                <div className="flex items-center gap-5 mb-5">
                  <div className="p-4 rounded-xl bg-muted text-main border border-main">
                    <DynamicIcon name={lab.icon} size={28} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-main tracking-tight">{lab.title}</h3>
                    <p className="text-sm text-muted font-bold uppercase tracking-wide mt-1">{lab.stepsData.length} Steps</p>
                  </div>
                </div>
                <p className="text-muted leading-relaxed font-medium">{lab.description}</p>
              </div>
              <div className="bg-base border-t border-main p-5">
                 <button
                    onClick={() => startLab(lab.id)}
                    className="w-full accent-btn py-3 rounded-lg font-bold flex items-center justify-center gap-2 uppercase tracking-wide text-sm"
                  >
                   Start Lab <PlayCircle size={18} />
                 </button>
              </div>
           </div>
        ))}
      </div>
    </div>
  );
};
