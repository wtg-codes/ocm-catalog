import React from 'react';
import { ChevronRight, PlusCircle, CheckCircle2, Edit3 } from 'lucide-react';
import { Course } from '../../types';
import { useAppStore } from '../../store/useAppStore';
import { DynamicIcon } from '../../utils/iconRegistry';

interface CourseCardProps {
  course: Course;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const {
    enrolledCourseIds,
    startCourse,
    enrollCourse,
    completedStepIds,
    viewMode,
    portalTab,
    setCourseBuilderOpen,
    setActiveCourseId
  } = useAppStore();

  const isEnrolled = enrolledCourseIds.includes(course.id);

  const getCourseProgress = (course: Course) => {
    let total = 0;
    let completed = 0;
    course.labs.forEach(lab => {
      lab.stepsData.forEach(step => {
        if (!step.id.includes('completion')) {
          total++;
          if (completedStepIds.includes(step.id)) {
            completed++;
          }
        }
      });
    });
    return total === 0 ? 0 : Math.min(100, (completed / total) * 100);
  };

  const progress = getCourseProgress(course);
  const isComplete = progress === 100;
  const isDraft = course.status === 'draft';

  const handleEditCourse = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveCourseId(course.id);
    setCourseBuilderOpen(true);
  };

  if (viewMode === 'list') {
    return (
      <div className="bg-panel rounded-2xl border border-main shadow-sm hover:shadow-md hover:border-accent transition-all overflow-hidden flex flex-col md:flex-row group relative cursor-pointer"
           onClick={() => startCourse(course.id)}>
        {portalTab === 'catalog' && (
          <button
            onClick={handleEditCourse}
            className="absolute top-4 right-4 z-10 p-2 bg-base rounded-lg border border-main text-muted hover:text-accent hover:border-accent opacity-0 group-hover:opacity-100 transition-all shadow-sm"
            title="Edit Course Content"
          >
            <Edit3 size={16} />
          </button>
        )}
        <div className="p-6 flex-1 flex flex-col md:flex-row gap-6 items-start md:items-center">
          <div className={`p-4 rounded-xl shrink-0 transition-colors ${isComplete ? 'bg-accent-muted text-accent' : 'bg-muted text-main group-hover:bg-accent group-hover:text-accent-fg'}`}>
            <DynamicIcon name={course.icon} size={32} />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold text-muted uppercase tracking-widest">{course.courseNumber || 'Course'}</span>
              {isDraft && <span className="bg-amber-500/10 text-amber-600 border border-amber-500/20 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-widest">Draft</span>}
            </div>
            <h3 className="text-xl font-bold text-main mb-2 tracking-tight">{course.title}</h3>
            <p className="text-sm text-muted line-clamp-2 leading-relaxed max-w-2xl font-medium">{course.description}</p>
          </div>
        </div>
        <div className="p-6 border-t md:border-t-0 md:border-l border-main bg-base w-full md:w-64 flex flex-col justify-center shrink-0 gap-4">
          <div>
            <div className="flex justify-between text-xs text-muted font-bold uppercase tracking-wider mb-2">
              <span>{course.labs?.length || 0} Modules</span>
              {isEnrolled && <span className="text-accent">{Math.round(progress)}%</span>}
            </div>
            <div className="w-full bg-muted h-2 rounded-full overflow-hidden border border-main">
              <div
                className={`h-full transition-all duration-500 bg-accent`}
                style={{ width: `${isEnrolled ? progress : 0}%` }}
              />
            </div>
          </div>
          {isEnrolled ? (
            <button
              className="flex w-full items-center justify-between text-sm font-bold text-main group-hover:text-accent uppercase tracking-wide bg-panel border border-main rounded-lg px-4 py-2 hover:border-accent transition-colors"
            >
              <span>{isComplete ? 'Review' : progress > 0 ? 'Resume' : 'Start'}</span>
              <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          ) : (
            <button
              onClick={(e) => {
                e.stopPropagation();
                enrollCourse(course.id);
              }}
              className="flex w-full items-center justify-center gap-2 accent-btn py-2 rounded-lg text-sm font-bold uppercase tracking-wide transition-colors"
            >
              <PlusCircle size={16} /> Assign to Me
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={() => startCourse(course.id)}
      className="bg-panel rounded-2xl border border-main shadow-sm hover:shadow-xl transition-all group overflow-hidden flex flex-col relative h-full cursor-pointer"
    >
      {/* Editor Access */}
      {portalTab === 'catalog' && (
          <button
            onClick={handleEditCourse}
            className="absolute top-4 right-4 z-10 p-2 bg-base rounded-lg border border-main text-muted hover:text-accent hover:border-accent opacity-0 group-hover:opacity-100 transition-all shadow-sm"
            title="Edit Course Content"
          >
            <Edit3 size={16} />
          </button>
      )}

      <div className="p-8 flex-1">
        <div className="flex items-start justify-between mb-6">
          <div className={`p-4 rounded-xl transition-colors ${isComplete ? 'bg-accent-muted text-accent' : 'bg-muted text-accent border border-main group-hover:bg-accent group-hover:text-accent-fg group-hover:scale-110 transition-all duration-300'}`}>
            <DynamicIcon name={course.icon} size={32} />
          </div>
          <div className="flex flex-col gap-2 items-end">
            {isDraft && <span className="bg-amber-500/10 text-amber-600 border border-amber-500/20 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">Draft</span>}
            {isComplete && <span className="bg-accent text-accent-fg text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 uppercase tracking-wide shadow-accent"><CheckCircle2 size={12}/> Completed</span>}
            {!isEnrolled && !isComplete && <span className="bg-accent text-accent-fg text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide shadow-accent">New</span>}
          </div>
        </div>
        <div className="text-[10px] font-black uppercase tracking-widest px-2.5 py-1 bg-muted text-muted rounded-full border border-main inline-block mb-3">
          {course.courseNumber}
        </div>
        <h3 className="text-2xl font-bold text-main mb-3 leading-tight tracking-tight">{course.title}</h3>
        <p className="text-muted leading-relaxed line-clamp-3 font-medium">{course.description}</p>
      </div>

      <div className="px-8 pb-6 shrink-0">
        <div className="flex justify-between text-xs text-muted font-bold uppercase tracking-wider mb-2">
          <span>{course.labs?.length || 0} Modules & Labs</span>
          {isEnrolled && <span className="text-accent">{Math.round(progress)}%</span>}
        </div>
        <div className="w-full bg-muted h-2 rounded-full overflow-hidden border border-main">
          <div
            className={`h-full transition-all duration-500 bg-accent`}
            style={{ width: `${isEnrolled ? progress : 0}%` }}
          />
        </div>
      </div>

      <div className="p-5 border-t border-main bg-base shrink-0">
        {isEnrolled ? (
          <button
            className="flex w-full items-center justify-between text-sm font-bold text-main group-hover:text-accent uppercase tracking-wide"
          >
            <span>{isComplete ? 'Review Course' : progress > 0 ? 'Resume Course' : 'Start Course'}</span>
            <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        ) : (
          <button
            onClick={(e) => {
              e.stopPropagation();
              enrollCourse(course.id);
            }}
            className="flex w-full items-center justify-center gap-2 accent-btn py-3 rounded-lg font-bold uppercase tracking-wide transition-colors"
          >
            <PlusCircle size={18} /> Assign to Me
          </button>
        )}
      </div>
    </div>
  );
};
