import React from 'react';
import { useAppStore } from '../../store/useAppStore';
import { Library, GraduationCap, Settings as SettingsIcon } from 'lucide-react';
import { TridorianLogo } from '../common/TridorianLogo';

export const Header: React.FC = () => {
  const {
    portalTab,
    setPortalTab,
    setActiveCourseId,
    isSettingsOpen,
    setSettingsOpen,
    enrolledCourseIds
  } = useAppStore();

  const handleLogoClick = () => {
    setActiveCourseId(null);
    setPortalTab('catalog');
  };

  return (
    <header className="bg-panel border-b border-main px-6 py-4 flex items-center justify-between sticky top-0 z-30 transition-colors duration-200">
      <div className="flex items-center gap-8">
        <div
          className="flex items-center gap-3 group cursor-pointer"
          onClick={handleLogoClick}
        >
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
            className={`px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all ${
              portalTab === 'catalog'
                ? 'bg-panel text-accent shadow-sm border border-main'
                : 'text-muted hover:text-main'
            }`}
          >
            <Library size={18} /> Catalog
          </button>
          <button
            onClick={() => setPortalTab('my-courses')}
            className={`px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all ${
              portalTab === 'my-courses'
                ? 'bg-panel text-accent shadow-sm border border-main'
                : 'text-muted hover:text-main'
            }`}
          >
            <GraduationCap size={18} /> My Courses
            {enrolledCourseIds.length > 0 && (
               <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${portalTab === 'my-courses' ? 'bg-accent text-accent-fg' : 'bg-muted text-muted'}`}>
                {enrolledCourseIds.length}
              </span>
            )}
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
  );
};
