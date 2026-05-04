import React from 'react';
import { Layout, CheckCircle2, Circle } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { Step } from '../../types';

interface SidebarNavigationProps {
  steps: Step[];
}

export const SidebarNavigation: React.FC<SidebarNavigationProps> = ({ steps }) => {
  const { currentStepIndex, setCurrentStepIndex, completedStepIds } = useAppStore();

  return (
    <aside className="w-full md:w-72 shrink-0">
      <div className="bg-panel rounded-lg border border-main shadow-sm overflow-hidden sticky top-24 transition-colors duration-200">
        <div className="px-5 py-4 bg-muted/30 border-b border-main flex items-center justify-between">
          <div className="flex items-center gap-2">
             <Layout size={16} className="text-muted" />
             <h3 className="font-bold text-main uppercase tracking-widest text-xs">Steps</h3>
          </div>
        </div>
        <nav className="p-2 space-y-0.5">
          {steps.map((step, index) => {
            const isCompleted = completedStepIds.includes(step.id);
            const isActive = index === currentStepIndex;

            return (
              <button
                key={step.id}
                onClick={() => setCurrentStepIndex(index)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-left transition-all duration-200 ${
                  isActive
                    ? 'bg-accent/10 text-accent ring-1 ring-inset ring-accent/20'
                    : 'hover:bg-muted text-muted hover:text-main'
                }`}
              >
                <div className="flex-shrink-0">
                  {isCompleted ? (
                    <CheckCircle2 size={18} className="text-accent" />
                  ) : isActive ? (
                    <Circle size={18} className="text-accent fill-accent/20" />
                  ) : (
                    <Circle size={18} className="text-muted opacity-40" />
                  )}
                </div>
                <span className={`text-sm ${isActive ? 'font-semibold' : 'font-medium'} truncate tracking-tight`}>
                  {step.title}
                </span>
                {isActive && (
                   <div className="ml-auto w-1 h-4 bg-accent rounded-full" />
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};
