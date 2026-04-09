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
      <div className="bg-panel rounded-2xl border border-main shadow-sm overflow-hidden sticky top-24 transition-colors duration-200">
        <div className="p-5 bg-base border-b border-main flex items-center justify-between">
          <div className="flex items-center gap-2">
             <Layout size={18} className="text-muted" />
             <h3 className="font-bold text-main uppercase tracking-widest text-xs">Steps</h3>
          </div>
        </div>
        <nav className="p-3 space-y-1">
          {steps.map((step, index) => {
            const isCompleted = completedStepIds.includes(step.id);
            const isActive = index === currentStepIndex;

            return (
              <button
                key={step.id}
                onClick={() => setCurrentStepIndex(index)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-colors ${
                  isActive
                    ? 'bg-accent-muted text-accent border border-accent shadow-sm'
                    : 'hover:bg-muted text-muted border border-transparent hover:border-main'
                }`}
              >
                {isCompleted ? (
                  <CheckCircle2 size={20} className="text-accent shrink-0" />
                ) : isActive ? (
                  <Circle size={20} className="text-accent fill-accent-muted shrink-0" />
                ) : (
                  <Circle size={20} className="text-muted opacity-50 shrink-0" />
                )}
                <span className={`text-sm ${isActive ? 'font-bold' : 'font-medium'} truncate`}>
                  {step.title}
                </span>
              </button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};
