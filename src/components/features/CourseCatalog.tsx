import React from 'react';
import { Grid, List as ListIcon } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { initialCoursesData } from '../../data/mockData';
import { CourseCard } from './CourseCard';

export const CourseCatalog: React.FC = () => {
  const { portalTab, viewMode, setViewMode, enrolledCourseIds } = useAppStore();

  const filteredCourses = initialCoursesData.filter(
    (c) => portalTab === 'catalog' || enrolledCourseIds.includes(c.id)
  );

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-4xl font-extrabold text-main tracking-tight mb-3">
            {portalTab === 'catalog' ? 'Course Catalog' : 'My Enrolled Courses'}
          </h2>
          <p className="text-muted text-lg font-medium max-w-2xl">
            {portalTab === 'catalog'
              ? 'Explore our professional services training tracks and OCM enablement modules.'
              : 'Continue your learning journey and track your progress across enrolled tracks.'}
          </p>
        </div>

        <div className="flex items-center gap-2 bg-panel p-1.5 rounded-xl border border-main shadow-sm">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-accent text-accent-fg shadow-accent' : 'text-muted hover:bg-muted'}`}
          >
            <Grid size={20} />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-accent text-accent-fg shadow-accent' : 'text-muted hover:bg-muted'}`}
          >
            <ListIcon size={20} />
          </button>
        </div>
      </div>

      <div className={viewMode === 'grid'
        ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        : "space-y-6"
      }>
        {filteredCourses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
};
