import React, { useEffect } from 'react';
import { useAppStore } from './store/useAppStore';
import { initialCoursesData } from './data/mockData';
import { Course, Lab } from './types';
import {
  Settings as SettingsIcon,
  Library,
  GraduationCap,
  Grid,
  List as ListIcon,
  ChevronRight,
  PlayCircle
} from 'lucide-react';
import { TridorianLogo } from './components/common/TridorianLogo';
import { DynamicIcon } from './utils/iconRegistry';

function App() {
  const {
    theme,
    portalTab,
    setPortalTab,
    viewMode,
    setViewMode,
    activeCourseId,
    setActiveCourseId,
    startCourse,
    enrolledCourseIds,
    isSettingsOpen,
    setSettingsOpen,
    setTheme
  } = useAppStore();

  // Apply theme to body
  useEffect(() => {
    document.body.className = theme === 'light' ? '' : `theme-${theme}`;
  }, [theme]);

  const activeCourse = initialCoursesData.find((c: Course) => c.id === activeCourseId);

  // Simple conditional rendering for now based on state
  return (
    <div className="min-h-screen app-bg transition-colors duration-200">
      {/* Basic Header */}
      <header className="bg-panel border-b border-main px-6 py-4 flex items-center justify-between sticky top-0 z-30 transition-colors duration-200">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3 group cursor-pointer" onClick={() => { setActiveCourseId(null); setPortalTab('catalog'); }}>
            <div className="bg-accent p-1.5 rounded-lg shadow-accent group-hover:scale-110 transition-transform">
              <TridorianLogo className="text-accent-fg" size={24} />
            </div>
            <div className="leading-none">
              <h1 className="text-lg font-black text-main tracking-tighter uppercase">Tridorian</h1>
              <span className="text-[10px] font-bold text-accent uppercase tracking-[0.2em]">Partner Portal</span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-1 bg-muted p-1 rounded-xl border border-main">
            <button
              onClick={() => setPortalTab('catalog')}
              className={`px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all ${portalTab === 'catalog' ? 'bg-panel text-accent shadow-sm border border-main' : 'text-muted hover:text-main'}`}
            >
              <Library size={18} /> Catalog
            </button>
            <button
              onClick={() => setPortalTab('my-courses')}
              className={`px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all ${portalTab === 'my-courses' ? 'bg-panel text-accent shadow-sm border border-main' : 'text-muted hover:text-main'}`}
            >
              <GraduationCap size={18} /> My Courses
            </button>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setSettingsOpen(!isSettingsOpen)}
            className="p-2.5 text-muted hover:text-accent hover:bg-muted rounded-xl transition-all border border-transparent hover:border-main"
          >
            <SettingsIcon size={22} />
          </button>
        </div>
      </header>

      {/* Basic Content Area */}
      <main className="max-w-7xl mx-auto p-6 md:p-10">
        {!activeCourseId ? (
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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {initialCoursesData
                .filter((c: Course) => portalTab === 'catalog' || enrolledCourseIds.includes(c.id))
                .map((course: Course) => (
                  <div key={course.id} className="bg-panel rounded-2xl border border-main shadow-sm hover:shadow-xl transition-all group overflow-hidden flex flex-col">
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
                        {enrolledCourseIds.includes(course.id) ? 'Continue Track' : 'View Track Details'}
                        <ChevronRight size={18} />
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ) : (
          <div className="animate-in fade-in duration-500">
             <button
              onClick={() => setActiveCourseId(null)}
              className="mb-8 text-muted hover:text-accent font-bold flex items-center gap-2 transition-colors uppercase tracking-widest text-xs"
            >
              Back to {portalTab === 'catalog' ? 'Catalog' : 'My Courses'}
            </button>
            <h2 className="text-4xl font-extrabold text-main tracking-tight">{activeCourse?.title}</h2>
            <p className="text-muted mt-4 text-xl max-w-3xl">{activeCourse?.description}</p>

            <div className="mt-12 grid md:grid-cols-2 gap-8">
              {activeCourse?.labs.map((lab: Lab) => (
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
                       <button className="w-full accent-btn py-3 rounded-lg font-bold flex items-center justify-center gap-2 uppercase tracking-wide text-sm">
                         Start Lab <PlayCircle size={18} />
                       </button>
                    </div>
                 </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Basic Settings Modal Overlay */}
      {isSettingsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSettingsOpen(false)}></div>
          <div className="relative bg-panel border border-main w-full max-w-md rounded-3xl shadow-2xl overflow-hidden">
            <div className="p-6 border-b border-main flex items-center justify-between">
              <h3 className="text-xl font-bold text-main">Portal Settings</h3>
              <button onClick={() => setSettingsOpen(false)} className="text-muted hover:text-main"><ChevronRight size={24} className="rotate-90" /></button>
            </div>
            <div className="p-8 space-y-6">
              <div>
                <label className="block text-xs font-bold text-muted uppercase tracking-widest mb-4">Theme Selection</label>
                <div className="grid grid-cols-2 gap-3">
                  {['light', 'dark', 'kitten', 'caribbean', 'lunar'].map(t => (
                    <button
                      key={t}
                      onClick={() => setTheme(t)}
                      className={`px-4 py-3 rounded-xl border font-bold capitalize transition-all ${theme === t ? 'border-accent bg-accent-muted text-accent' : 'border-main bg-muted text-muted hover:border-accent'}`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
