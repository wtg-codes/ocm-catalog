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
    setSettingsOpen
  } = useAppStore();

  const handleLogoClick = () => {
    setActiveCourseId(null);
    setPortalTab('catalog');
  };

  return (
    <header className="bg-panel/80 backdrop-blur-md border-b border-main px-6 h-16 flex items-center justify-between sticky top-0 z-30 transition-colors duration-200">
      <div className="flex items-center gap-10">
        <div
          className="flex items-center gap-3 group cursor-pointer"
          onClick={handleLogoClick}
        >
          <div className="bg-accent p-1.5 rounded-md shadow-sm group-hover:shadow-accent transition-all duration-300">
            <TridorianLogo className="text-accent-fg" size={20} />
          </div>
          <div className="leading-none flex flex-col">
            <h1 className="text-base font-black text-main tracking-tighter uppercase">Tridorian</h1>
            <span className="text-xs font-bold text-accent uppercase tracking-caps mt-0.5 opacity-80">Partner Portal</span>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-1 bg-muted/50 p-1 rounded-lg border border-subtle">
          <button
            onClick={() => setPortalTab('catalog')}
            className={`px-3 py-1.5 rounded-md text-sm font-semibold flex items-center gap-2 transition-all ${
              portalTab === 'catalog'
                ? 'bg-panel text-accent shadow-sm border border-main ring-1 ring-black/5'
                : 'text-text-muted hover:text-main'
            }`}
          >
            <Library size={16} /> Catalog
          </button>
          <button
            onClick={() => setPortalTab('my-courses')}
            className={`px-3 py-1.5 rounded-md text-sm font-semibold flex items-center gap-2 transition-all ${
              portalTab === 'my-courses'
                ? 'bg-panel text-accent shadow-sm border border-main ring-1 ring-black/5'
                : 'text-text-muted hover:text-main'
            }`}
          >
            <GraduationCap size={16} /> My Courses
          </button>
        </nav>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => setSettingsOpen(!isSettingsOpen)}
          className="p-2 text-text-muted hover:text-main hover:bg-muted rounded-md transition-all border border-transparent hover:border-main"
        >
          <SettingsIcon size={20} />
        </button>
      </div>
    </header>
  );
};
