import React from 'react';
import { X } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

export const SettingsModal: React.FC = () => {
  const { theme, setTheme, isSettingsOpen, setSettingsOpen } = useAppStore();

  if (!isSettingsOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-md animate-in fade-in duration-300"
        onClick={() => setSettingsOpen(false)}
      ></div>
      <div className="relative bg-panel border border-main w-full max-w-sm rounded-lg shadow-elevated overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="px-5 py-4 border-b border-subtle flex items-center justify-between">
          <h3 className="text-sm font-black text-main uppercase tracking-widest">Settings</h3>
          <button
            onClick={() => setSettingsOpen(false)}
            className="p-1.5 text-text-muted hover:text-main hover:bg-muted rounded-md transition-colors"
          >
            <X size={18} />
          </button>
        </div>
        <div className="p-6 space-y-6">
          <div className="space-y-4">
            <label className="block text-[10px] font-black text-text-muted uppercase tracking-[0.2em]">Theme</label>
            <div className="grid grid-cols-1 gap-2">
              {['light', 'dark', 'kitten', 'caribbean', 'lunar'].map(t => (
                <button
                  key={t}
                  onClick={() => setTheme(t)}
                  className={`flex items-center justify-between px-4 py-3 rounded-md border font-bold capitalize transition-all ${
                    theme === t
                      ? 'border-accent/40 bg-accent/5 text-accent ring-1 ring-accent/20'
                      : 'border-subtle bg-muted/30 text-text-muted hover:border-main hover:bg-muted/50'
                  }`}
                >
                  <span className="text-sm tracking-tight">{t}</span>
                  {theme === t && (
                    <div className="w-2 h-2 bg-accent rounded-full shadow-accent" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="p-4 bg-muted/20 border-t border-subtle text-center">
           <p className="text-[10px] font-bold text-text-muted/50 uppercase tracking-widest">Tridorian v0.8.0</p>
        </div>
      </div>
    </div>
  );
};
