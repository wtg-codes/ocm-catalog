import React from 'react';
import { PlayCircle } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { initialCoursesData } from '../../data/mockData';
import { DynamicIcon } from '../../utils/iconRegistry';

export const CourseDashboard: React.FC = () => {
  const { activeCourseId, setActiveCourseId, portalTab, startLab } = useAppStore();
  const activeCourse = initialCoursesData.find((c) => c.id === activeCourseId);

  if (!activeCourse) return null;

  return (
    <div className="animate-in fade-in duration-500">
       <button
        onClick={() => setActiveCourseId(null)}
        className="mb-8 text-muted hover:text-accent font-bold flex items-center gap-2 transition-colors uppercase tracking-widest text-xs"
      >
        Back to {portalTab === 'catalog' ? 'Catalog' : 'My Courses'}
      </button>
      <h2 className="text-4xl font-extrabold text-main tracking-tight">{activeCourse.title}</h2>
      <p className="text-muted mt-4 text-xl max-w-3xl">{activeCourse.description}</p>

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
                <p className="text-muted leading-relaxed">{lab.description}</p>
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
