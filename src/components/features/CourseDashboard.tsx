import React from 'react';
import { PlayCircle, Edit3, PlusCircle, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { DynamicIcon } from '../../utils/iconRegistry';
import { Lab } from '../../types';

export const CourseDashboard: React.FC = () => {
  const {
    activeCourseId,
    setActiveCourseId,
    portalTab,
    startLab,
    setCourseBuilderOpen,
    enrolledCourseIds,
    enrollCourse,
    completedStepIds,
    courses
  } = useAppStore();

  const activeCourse = courses.find((c) => c.id === activeCourseId);
  const isEnrolled = activeCourseId ? enrolledCourseIds.includes(activeCourseId) : false;

  const getLabProgress = (lab: Lab) => {
    const total = lab.stepsData.length - 1; // Exclude completion step
    const completed = lab.stepsData.filter(step =>
      completedStepIds.includes(step.id) && !step.id.includes('completion')
    ).length;
    return {
      total,
      completed,
      percentage: total === 0 ? 0 : Math.min(100, (completed / total) * 100)
    };
  };

  const getCourseProgress = () => {
    if (!activeCourse) return 0;
    let total = 0;
    let completed = 0;
    activeCourse.labs.forEach(lab => {
      const prog = getLabProgress(lab);
      total += prog.total;
      completed += prog.completed;
    });
    return total === 0 ? 0 : Math.min(100, (completed / total) * 100);
  };

  if (!activeCourse) return null;

  const coursePercentage = getCourseProgress();

  return (
    <div className="animate-in fade-in duration-500">
      <header className="bg-panel border border-main rounded-2xl p-6 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
        <div className="flex-1">
          <button
            onClick={() => setActiveCourseId(null)}
            className="mb-4 text-muted hover:text-accent font-bold flex items-center gap-2 transition-colors uppercase tracking-widest text-xs"
          >
            <ArrowLeft size={16} /> Back to {portalTab === 'catalog' ? 'Catalog' : 'My Courses'}
          </button>
          <div className="flex flex-wrap items-center gap-4 mb-4">
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
          <button
            onClick={() => setCourseBuilderOpen(true)}
            className="flex items-center justify-center gap-2 text-sm font-bold text-muted hover:text-accent bg-base px-4 py-2.5 border border-main rounded-xl transition-colors whitespace-nowrap"
          >
            <Edit3 size={16} /> Edit Track Structure
          </button>
        </div>
      </header>

      <div className="grid md:grid-cols-2 gap-8">
        {activeCourse.labs.map((lab) => {
          const prog = getLabProgress(lab);
          const isLabComplete = prog.percentage === 100;

          return (
            <div key={lab.id} className="bg-panel rounded-2xl border border-main shadow-sm hover:shadow-lg transition-all overflow-hidden flex flex-col group">
              <div className="p-8 flex-1">
                <div className="flex items-center gap-5 mb-5">
                  <div className={`p-4 rounded-xl transition-colors ${isLabComplete ? 'bg-accent text-accent-fg shadow-accent' : 'bg-muted text-main border border-main group-hover:bg-accent group-hover:text-accent-fg'}`}>
                    {isLabComplete ? <CheckCircle2 size={28} /> : <DynamicIcon name={lab.icon} size={28} />}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-main tracking-tight group-hover:text-accent transition-colors">{lab.title}</h3>
                    <p className="text-sm text-muted font-bold uppercase tracking-wide mt-1">{prog.total} Steps • ~15 mins</p>
                  </div>
                </div>
                <p className="text-muted leading-relaxed font-medium">{lab.description}</p>
              </div>
              <div className="bg-base border-t border-main p-5 flex items-center justify-between">
                <span className="text-xs font-bold text-muted uppercase tracking-widest">
                  {isLabComplete ? '100% Complete' : `${prog.completed} / ${prog.total} Steps Finished`}
                </span>
                <button
                  onClick={() => startLab(lab.id)}
                  className={`px-6 py-2.5 rounded-lg font-bold flex items-center gap-2 transition-all uppercase tracking-wide text-xs ${
                    isLabComplete
                      ? 'bg-panel text-main hover:bg-muted border border-main'
                      : 'accent-btn'
                  }`}
                >
                  {isLabComplete ? 'Review' : prog.completed > 0 ? 'Resume' : 'Start Lab'}
                  {!isLabComplete && <PlayCircle size={18} />}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
