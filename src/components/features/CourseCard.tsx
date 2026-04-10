import React from 'react';
import { ChevronRight, PlusCircle } from 'lucide-react';
import { Course } from '../../types';
import { useAppStore } from '../../store/useAppStore';
import { DynamicIcon } from '../../utils/iconRegistry';

interface CourseCardProps {
  course: Course;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const { enrolledCourseIds, startCourse, enrollCourse } = useAppStore();
  const isEnrolled = enrolledCourseIds.includes(course.id);

  return (
    <div
      onClick={() => startCourse(course.id)}
      className="bg-panel rounded-lg border border-main shadow-sm hover:shadow-md hover:border-accent/30 transition-all duration-300 group overflow-hidden flex flex-col cursor-pointer relative"
    >
      <div className="p-6 flex-1">
        <div className="flex items-start justify-between mb-5">
          <div className="p-3 bg-muted rounded-md text-accent border border-subtle group-hover:scale-105 transition-transform duration-300 group-hover:shadow-sm">
            <DynamicIcon name={course.icon} size={24} />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 bg-muted text-text-muted rounded-md border border-subtle">
            {course.courseNumber}
          </span>
        </div>
        <h3 className="text-xl font-bold text-main mb-2 leading-tight tracking-tight group-hover:text-accent transition-colors">
          {course.title}
        </h3>
        <p className="text-sm text-text-muted leading-relaxed line-clamp-3 font-medium opacity-80">
          {course.description}
        </p>
      </div>

      <div className="px-6 py-5 bg-muted/20 border-t border-subtle flex gap-2">
        {!isEnrolled ? (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                enrollCourse(course.id);
              }}
              className="flex-1 bg-panel hover:bg-muted text-main border border-main py-2.5 rounded-md font-bold flex items-center justify-center gap-2 uppercase tracking-widest text-[10px] transition-all hover:shadow-sm active:scale-95"
            >
              <PlusCircle size={14} /> Enroll
            </button>
            <button
              className="flex-1 accent-btn py-2.5 rounded-md font-bold flex items-center justify-center gap-2 uppercase tracking-widest text-[10px] active:scale-95"
            >
              Details
              <ChevronRight size={14} />
            </button>
          </>
        ) : (
          <button
            className="w-full accent-btn py-2.5 rounded-md font-bold flex items-center justify-center gap-2 uppercase tracking-widest text-[10px] active:scale-95"
          >
            Continue Track
            <ChevronRight size={14} />
          </button>
        )}
      </div>

      {/* Subtle indicator for enrolled courses */}
      {isEnrolled && (
        <div className="absolute top-0 right-0 p-1">
          <div className="w-2 h-2 bg-accent rounded-full animate-pulse shadow-accent" />
        </div>
      )}
    </div>
  );
};
