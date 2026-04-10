import React from 'react';
import { ArrowLeft, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { SidebarNavigation } from '../layout/SidebarNavigation';
import { DynamicIcon } from '../../utils/iconRegistry';

export const ActiveLabEngine: React.FC = () => {
  const {
    activeCourseId,
    activeLabId,
    returnToCourse,
    currentStepIndex,
    nextStep,
    prevStep,
    completedStepIds,
    courses
  } = useAppStore();

  const activeCourse = courses.find(c => c.id === activeCourseId);
  const activeLab = activeCourse?.labs.find(l => l.id === activeLabId);

  if (!activeLab) return null;

  const steps = activeLab.stepsData;
  const currentStep = steps[currentStepIndex];
  const isLastStep = currentStepIndex === steps.length - 1;

  // Reactive progress calculation
  const labProgress = (steps.length > 0)
    ? (completedStepIds.filter(id => steps.some(s => s.id === id)).length / steps.length) * 100
    : 0;

  return (
    <div className="flex flex-col min-h-screen bg-base">
      <header className="bg-panel/80 backdrop-blur-md border-b border-main px-6 h-16 flex items-center justify-between sticky top-0 z-30 transition-colors duration-200">
        <div className="flex items-center gap-4">
          <button
            onClick={() => returnToCourse()}
            className="text-text-muted hover:text-main transition-colors flex items-center gap-1.5 text-[10px] font-bold bg-muted/50 hover:bg-muted border border-subtle px-3 py-1.5 rounded-md uppercase tracking-widest active:scale-95"
          >
            <ArrowLeft size={14} /> Exit Lab
          </button>
          <div className="h-4 w-px bg-border-main hidden sm:block"></div>
          <div className="hidden sm:block">
            <h1 className="text-sm font-bold text-main tracking-tight">{activeLab.title}</h1>
          </div>
        </div>
        <div className="flex items-center gap-4 w-64">
          <div className="flex-1 bg-muted h-1.5 rounded-full overflow-hidden shadow-inner">
            <div
              className="bg-accent h-full transition-all duration-700 ease-out shadow-accent"
              style={{ width: `${labProgress}%` }}
            />
          </div>
          <span className="text-xs font-black text-accent tracking-tighter w-8 text-right">
            {Math.round(labProgress)}%
          </span>
        </div>
      </header>

      <div className="flex flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 gap-6 flex-col md:flex-row">
        <SidebarNavigation steps={steps} />

        <main className="flex-1 flex flex-col">
          <div className="bg-panel rounded-lg border border-main shadow-sm p-6 sm:p-8 flex-1 relative overflow-hidden flex flex-col transition-colors duration-200">

            <div className="flex items-center gap-3 text-accent mb-8 shrink-0 border-b border-subtle pb-6">
              <div className="p-2 bg-accent/10 rounded-md">
                <DynamicIcon name={currentStep?.icon} size={24} />
              </div>
              <span className="text-[10px] font-black tracking-widest uppercase opacity-70">
                Step {currentStepIndex + 1} / {steps.length}
              </span>
            </div>

            <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 pb-28 flex-1">
              {currentStep && <currentStep.content />}
            </div>

            <div className="absolute bottom-0 left-0 right-0 bg-panel border-t border-subtle p-6 flex items-center justify-between transition-colors duration-200">
              <button
                onClick={prevStep}
                disabled={currentStepIndex === 0}
                className="px-4 py-2 text-text-muted hover:text-main disabled:opacity-20 disabled:cursor-not-allowed flex items-center gap-2 font-bold uppercase tracking-widest text-[10px] transition-colors border border-transparent hover:border-main rounded-md active:scale-95"
              >
                <ChevronLeft size={16} /> Previous
              </button>

              {!isLastStep ? (
                <button
                  onClick={() => nextStep(currentStep.id, isLastStep)}
                  className="accent-btn px-6 py-2.5 rounded-md font-bold flex items-center gap-2 uppercase tracking-widest text-[10px] active:scale-95 shadow-sm"
                >
                  Continue <ChevronRight size={16} />
                </button>
              ) : (
                <button
                  onClick={() => returnToCourse(currentStep.id)}
                  className="accent-btn px-6 py-2.5 rounded-md font-bold flex items-center gap-2 uppercase tracking-widest text-[10px] active:scale-95 shadow-sm"
                >
                  Complete Lab <Check size={16} />
                </button>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
