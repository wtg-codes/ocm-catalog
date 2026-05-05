import React from 'react';
import { PlayCircle, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { DynamicIcon } from '../../utils/iconRegistry';
import { getCourseProgress, getModuleProgress } from '../../utils/courseUtils';

export const CourseDashboard: React.FC = () => {
  const {
    activeTrackId,
    activeCourseId,
    returnToTrack,
    startModule,
    completedStepIds,
    tracks
  } = useAppStore();

  const activeTrack = tracks.find((t: any) => t.id === activeTrackId);
  const activeCourse = activeTrack?.courses.find((c: any) => c.id === activeCourseId);

  if (!activeCourse) return null;

  const coursePercentage = getCourseProgress(activeCourse, completedStepIds);

  return (
    <div className="animate-in fade-in duration-500">
      <header className="bg-panel border border-main rounded-2xl p-6 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
        <div className="flex-1">
          <button
            onClick={() => returnToTrack()}
            className="mb-4 text-muted hover:text-accent font-bold flex items-center gap-2 transition-colors uppercase tracking-widest text-xs"
          >
            <ArrowLeft size={16} /> Back to Track
          </button>
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <h2 className="text-4xl font-extrabold text-main tracking-tight">{activeCourse.title}</h2>
          </div>
          <p className="text-muted text-xl max-w-3xl font-medium leading-relaxed">{activeCourse.description}</p>
        </div>

        <div className="flex flex-col gap-4 min-w-[240px]">
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-muted">
              <span>Overall Progress</span>
              <span className="text-accent">{Math.round(coursePercentage)}%</span>
            </div>
            <div className="w-full bg-muted border border-main h-3 rounded-full overflow-hidden">
               <div
                 className="bg-accent h-full transition-all duration-500 ease-out"
                 style={{ width: `${coursePercentage}%` }}
               />
            </div>
          </div>
        </div>
      </header>

      <div className="grid md:grid-cols-2 gap-8">
        {activeCourse.modules.map((moduleObj: any) => {
          const prog = getModuleProgress(moduleObj, completedStepIds);
          const isModuleComplete = prog.percentage === 100;

          return (
            <div key={moduleObj.id} className="bg-panel rounded-2xl border border-main shadow-sm hover:shadow-lg transition-all overflow-hidden flex flex-col group">
              <div className="p-8 flex-1">
                <div className="flex items-center gap-5 mb-5">
                  <div className={`p-4 rounded-xl transition-colors ${isModuleComplete ? 'bg-accent text-accent-fg shadow-accent' : 'bg-muted text-main border border-main group-hover:bg-accent group-hover:text-accent-fg'}`}>
                    {isModuleComplete ? <CheckCircle2 size={28} /> : <DynamicIcon name={moduleObj.icon} size={28} />}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-main tracking-tight group-hover:text-accent transition-colors">{moduleObj.title}</h3>
                    <p className="text-sm text-muted font-bold uppercase tracking-wide mt-1">{prog.total} Steps • ~15 mins</p>
                  </div>
                </div>
                <p className="text-muted leading-relaxed font-medium">{moduleObj.description}</p>
              </div>
              <div className="bg-base border-t border-main p-5 flex items-center justify-between">
                <span className="text-xs font-bold text-muted uppercase tracking-widest">
                  {isModuleComplete ? '100% Complete' : `${prog.completed} / ${prog.total} Steps Finished`}
                </span>
                <button
                  onClick={() => startModule(moduleObj.id)}
                  className={`px-6 py-2.5 rounded-lg font-bold flex items-center gap-2 transition-all uppercase tracking-wide text-xs ${
                    isModuleComplete
                      ? 'bg-panel text-main hover:bg-muted border border-main'
                      : 'accent-btn'
                  }`}
                >
                  {isModuleComplete ? 'Review' : prog.completed > 0 ? 'Resume' : 'Start Module'}
                  {!isModuleComplete && <PlayCircle size={18} />}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
