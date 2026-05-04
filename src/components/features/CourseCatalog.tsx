import React from 'react';
import { Grid, List as ListIcon, GraduationCap, Plus } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { CourseCard } from './CourseCard';
import { Course } from '../../types';

export const CourseCatalog: React.FC = () => {
  const {
    portalTab,
    setPortalTab,
    viewMode,
    setViewMode,
    enrolledCourseIds,
    courses,
    setCourseBuilderOpen,
    setActiveCourseId
  } = useAppStore();

  const filteredCourses = courses.filter(
    (c) => portalTab === 'catalog' || enrolledCourseIds.includes(c.id)
  );

  const groupedCourses = filteredCourses.reduce((acc: Record<string, Course[]>, course) => {
    const cat = course.category || 'Uncategorized';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(course);
    return acc;
  }, {});

  const handleCreateCourse = () => {
    setActiveCourseId(null); // Signal it's a new course
    setCourseBuilderOpen(true);
  };

  if (portalTab === 'my-courses' && enrolledCourseIds.length === 0) {
    return (
      <div className="text-center py-24 bg-panel rounded-2xl border border-main shadow-sm border-dashed animate-in fade-in duration-500">
        <GraduationCap size={56} className="mx-auto text-muted opacity-50 mb-5" />
        <h3 className="text-2xl font-bold text-main mb-2">No courses assigned yet</h3>
        <p className="text-muted mb-8 text-lg">You haven't enrolled in any training modules.</p>
        <button
          onClick={() => setPortalTab('catalog')}
          className="accent-btn px-8 py-3 rounded-lg font-bold inline-flex items-center gap-2 transition-all"
        >
          Browse Catalog
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
             <div className="w-1 h-8 bg-accent rounded-full" />
             <h2 className="text-3xl font-black text-main tracking-tighter uppercase">
              {portalTab === 'catalog' ? 'Catalog' : 'My Tracks'}
            </h2>
          </div>
          <p className="text-muted text-base font-medium max-w-2xl opacity-70">
            {portalTab === 'catalog'
              ? 'Explore our professional services training tracks and OCM enablement modules.'
              : 'Continue your learning journey and track your progress across enrolled tracks.'}
          </p>
        </div>

        <div className="flex items-center gap-1 bg-muted/50 p-1 rounded-lg border border-subtle shadow-sm">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-1.5 rounded-md transition-all ${viewMode === 'grid' ? 'bg-panel text-accent shadow-sm ring-1 ring-black/5' : 'text-muted hover:text-main'}`}
          >
            <Grid size={18} />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-1.5 rounded-md transition-all ${viewMode === 'list' ? 'bg-panel text-accent shadow-sm ring-1 ring-black/5' : 'text-muted hover:text-main'}`}
          >
            <ListIcon size={18} />
          </button>
        </div>
      </div>

      <div className="space-y-16">
        {Object.entries(groupedCourses).map(([category, categoryCourses]) => (
          <div key={category} className="space-y-6">
            <h3 className="text-2xl font-bold text-main border-b-2 border-main inline-block pb-2 pr-8 tracking-tight">
              {category}
            </h3>
            <div className={viewMode === 'grid'
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              : "space-y-6"
            }>
              {categoryCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </div>
        ))}
      </div>

      {portalTab === 'catalog' && (
        <div className="pt-8 border-t border-main mt-12">
          <button
            onClick={handleCreateCourse}
            className="w-full bg-panel rounded-2xl border-2 border-dashed border-main shadow-sm hover:border-accent hover:bg-accent-muted transition-all py-12 flex flex-col items-center justify-center text-muted hover:text-accent group"
          >
            <div className="w-16 h-16 rounded-full bg-base border border-main flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Plus size={32} />
            </div>
            <h3 className="text-xl font-bold tracking-tight">Create Custom Course</h3>
            <p className="text-sm mt-2 max-w-md text-center">Add a new learning path to the catalog. You can assign it to a new or existing category.</p>
          </button>
        </div>
      )}
    </div>
  );
};
