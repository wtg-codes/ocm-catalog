import React from 'react';
import { PlayCircle, Edit3, PlusCircle, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { DynamicIcon } from '../../utils/iconRegistry';
import { getTrackProgress, getCourseProgress } from '../../utils/courseUtils';

export const TrackDashboard: React.FC = () => {
  const {
    activeTrackId,
    returnToPortal,
    portalTab,
    startCourse,
    setCourseBuilderOpen,
    enrolledTrackIds,
    enrollTrack,
    completedStepIds,
    tracks
  } = useAppStore();

  const activeTrack = tracks.find((t: any) => t.id === activeTrackId);
  const isEnrolled = activeTrackId ? enrolledTrackIds.includes(activeTrackId) : false;

  if (!activeTrack) return null;

  const trackPercentage = getTrackProgress(activeTrack, completedStepIds);

  return (
    <div className="animate-in fade-in duration-500">
      <header className="bg-panel border border-main rounded-2xl p-6 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
        <div className="flex-1">
          <button
            onClick={() => returnToPortal()}
            className="mb-4 text-muted hover:text-accent font-bold flex items-center gap-2 transition-colors uppercase tracking-widest text-xs"
          >
            <ArrowLeft size={16} /> Back to {portalTab === 'catalog' ? 'Catalog' : 'My Tracks'}
          </button>
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <h2 className="text-4xl font-extrabold text-main tracking-tight">{activeTrack.title}</h2>
            {!isEnrolled && (
              <button
                onClick={() => enrollTrack(activeTrack.id)}
                className="bg-accent text-accent-fg px-4 py-1.5 rounded-full font-bold text-xs uppercase tracking-widest shadow-accent flex items-center gap-2 hover:scale-105 transition-transform"
              >
                <PlusCircle size={14} /> Enroll in Track
              </button>
            )}
          </div>
          <p className="text-muted text-xl max-w-3xl font-medium leading-relaxed">{activeTrack.description}</p>
        </div>

        <div className="flex flex-col gap-4 min-w-[240px]">
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-muted">
              <span>Overall Progress</span>
              <span className="text-accent">{Math.round(trackPercentage)}%</span>
            </div>
            <div className="w-full bg-muted border border-main h-3 rounded-full overflow-hidden">
               <div
                 className="bg-accent h-full transition-all duration-500 ease-out"
                 style={{ width: `${trackPercentage}%` }}
               />
            </div>
          </div>
        </div>
      </header>

      <div className="grid md:grid-cols-2 gap-8">
        {activeTrack.courses.map((course: any) => {
          const prog = getCourseProgress(course, completedStepIds);
          const isCourseComplete = prog === 100;

          return (
            <div key={course.id} className="bg-panel rounded-2xl border border-main shadow-sm hover:shadow-lg transition-all overflow-hidden flex flex-col group">
              <div className="p-8 flex-1">
                <div className="flex items-center gap-5 mb-5">
                  <div className={`p-4 rounded-xl transition-colors ${isCourseComplete ? 'bg-accent text-accent-fg shadow-accent' : 'bg-muted text-main border border-main group-hover:bg-accent group-hover:text-accent-fg'}`}>
                    {isCourseComplete ? <CheckCircle2 size={28} /> : <DynamicIcon name={course.icon} size={28} />}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-main tracking-tight group-hover:text-accent transition-colors">{course.title}</h3>
                    <p className="text-sm text-muted font-bold uppercase tracking-wide mt-1">{course.modules.length} Modules</p>
                  </div>
                </div>
                <p className="text-muted leading-relaxed font-medium">{course.description}</p>
              </div>
              <div className="bg-base border-t border-main p-5 flex items-center justify-between">
                <span className="text-xs font-bold text-muted uppercase tracking-widest">
                  {isCourseComplete ? '100% Complete' : `${Math.round(prog)}% Finished`}
                </span>
                <button
                  onClick={() => startCourse(activeTrack.id, course.id)}
                  className={`px-6 py-2.5 rounded-lg font-bold flex items-center gap-2 transition-all uppercase tracking-wide text-xs ${
                    isCourseComplete
                      ? 'bg-panel text-main hover:bg-muted border border-main'
                      : 'accent-btn'
                  }`}
                >
                  {isCourseComplete ? 'Review' : prog > 0 ? 'Resume' : 'Start Course'}
                  {!isCourseComplete && <PlayCircle size={18} />}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
