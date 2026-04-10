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
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
             <div className="w-1 h-8 bg-accent rounded-full" />
             <h2 className="text-3xl font-black text-main tracking-tighter uppercase">
              {portalTab === 'catalog' ? 'Catalog' : 'My Tracks'}
            </h2>
          </div>
          <p className="text-text-muted text-base font-medium max-w-2xl opacity-70">
            {portalTab === 'catalog'
              ? 'Explore our professional services training tracks and OCM enablement modules.'
              : 'Continue your learning journey and track your progress across enrolled tracks.'}
          </p>
        </div>

        <div className="flex items-center gap-1 bg-muted/50 p-1 rounded-lg border border-subtle shadow-sm">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-1.5 rounded-md transition-all ${viewMode === 'grid' ? 'bg-panel text-accent shadow-sm ring-1 ring-black/5' : 'text-text-muted hover:text-main'}`}
          >
            <Grid size={18} />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-1.5 rounded-md transition-all ${viewMode === 'list' ? 'bg-panel text-accent shadow-sm ring-1 ring-black/5' : 'text-text-muted hover:text-main'}`}
          >
            <ListIcon size={18} />
          </button>
        </div>
      </div>

      <div className={viewMode === 'grid'
        ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        : "max-w-4xl space-y-4"
      }>
        {filteredCourses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
};
