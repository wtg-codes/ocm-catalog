import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Course } from '../../types';
import { useAppStore } from '../../store/useAppStore';
import { DynamicIcon } from '../../utils/iconRegistry';

interface CourseCardProps {
  course: Course;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const { enrolledCourseIds, startCourse } = useAppStore();
  const isEnrolled = enrolledCourseIds.includes(course.id);

  return (
    <div className="bg-panel rounded-2xl border border-main shadow-sm hover:shadow-xl transition-all group overflow-hidden flex flex-col">
      <div className="p-8 flex-1">
        <div className="flex items-start justify-between mb-6">
          <div className="p-4 bg-muted rounded-2xl text-accent border border-main group-hover:scale-110 transition-transform duration-300">
            <DynamicIcon name={course.icon} size={32} />
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-1 bg-muted text-muted rounded-full border border-main">
            {course.courseNumber}
          </span>
        </div>
        <h3 className="text-2xl font-bold text-main mb-3 leading-tight tracking-tight">{course.title}</h3>
        <p className="text-muted leading-relaxed line-clamp-3 font-medium">{course.description}</p>
      </div>
      <div className="p-6 bg-base border-t border-main">
        <button
          onClick={() => startCourse(course.id)}
          className="w-full accent-btn py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 uppercase tracking-widest text-xs"
        >
          {isEnrolled ? 'Continue Track' : 'View Track Details'}
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
};
