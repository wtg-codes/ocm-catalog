import React from 'react';
import { ChevronRight } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

export const SettingsModal: React.FC = () => {
  const { theme, setTheme, isSettingsOpen, setSettingsOpen } = useAppStore();

  if (!isSettingsOpen) return null;

  return (
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
                  className={`px-4 py-3 rounded-xl border font-bold capitalize transition-all ${
                    theme === t
                      ? 'border-accent bg-accent-muted text-accent'
                      : 'border-main bg-muted text-muted hover:border-accent'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
