import React from 'react';
import { ArrowLeft, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { initialCoursesData } from '../../data/mockData';
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
    autoAdvance
  } = useAppStore();

  const activeCourse = initialCoursesData.find(c => c.id === activeCourseId);
  const activeLab = activeCourse?.labs.find(l => l.id === activeLabId);

  if (!activeLab) return null;

  const steps = activeLab.stepsData;
  const currentStep = steps[currentStepIndex];
  const isLastStep = currentStepIndex === steps.length - 1;

  const labProgress = (steps.length > 0)
    ? (useAppStore.getState().completedStepIds.filter(id => steps.some(s => s.id === id)).length / steps.length) * 100
    : 0;

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-panel border-b border-main px-6 py-4 flex items-center justify-between sticky top-0 z-10 transition-colors duration-200 shadow-sm">
        <div className="flex items-center gap-4">
          <button
            onClick={() => returnToCourse()}
            className="text-muted hover:text-accent transition-colors flex items-center gap-1.5 text-sm font-bold bg-muted hover:bg-accent-muted border border-transparent hover:border-accent px-3 py-1.5 rounded-lg uppercase tracking-wide"
          >
            <ArrowLeft size={16} /> Course
          </button>
          <div className="h-6 w-px border-l border-main hidden sm:block"></div>
          <div className="hidden sm:block">
            <h1 className="text-lg font-bold text-main leading-tight tracking-tight">{activeLab.title}</h1>
          </div>
        </div>
        <div className="flex items-center gap-4 w-64">
          <span className="text-xs text-muted font-bold uppercase tracking-widest hidden sm:block">Progress</span>
          <div className="flex-1 bg-muted border border-main h-2.5 rounded-full overflow-hidden">
            <div
              className="bg-accent h-full transition-all duration-500 ease-out"
              style={{ width: `${labProgress}%` }}
            />
          </div>
          <span className="text-sm font-bold text-main">
            {Math.round(labProgress)}%
          </span>
        </div>
      </header>

      <div className="flex flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 gap-6 flex-col md:flex-row">
        <SidebarNavigation steps={steps} />

        <main className="flex-1 flex flex-col">
          <div className="bg-panel rounded-2xl border border-main shadow-sm p-6 sm:p-10 flex-1 relative overflow-hidden flex flex-col transition-colors duration-200">

            <div className="flex items-center gap-3 text-accent mb-8 shrink-0 border-b border-main pb-6">
              <DynamicIcon name={currentStep?.icon} size={32} />
              <span className="text-sm font-bold tracking-widest uppercase">Step {currentStepIndex + 1} of {steps.length}</span>
            </div>

            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 pb-28 flex-1">
              {currentStep && <currentStep.content />}
            </div>

            <div className="absolute bottom-0 left-0 right-0 bg-panel border-t border-main p-6 flex items-center justify-between transition-colors duration-200">
              <button
                onClick={prevStep}
                disabled={currentStepIndex === 0}
                className="px-5 py-2.5 text-muted hover:text-main disabled:opacity-30 disabled:hover:text-muted flex items-center gap-2 font-bold uppercase tracking-wide text-sm transition-colors border border-transparent hover:border-main rounded-lg"
              >
                <ChevronLeft size={20} /> Back
              </button>

              {!isLastStep ? (
                <button
                  onClick={() => nextStep(currentStep.id, isLastStep)}
                  className="accent-btn px-8 py-3 rounded-lg font-bold flex items-center gap-2 uppercase tracking-wide text-sm"
                >
                  Mark Complete & Continue <ChevronRight size={20} />
                </button>
              ) : (
                <button
                  onClick={() => returnToCourse(currentStep.id)}
                  className="accent-btn px-8 py-3 rounded-lg font-bold flex items-center gap-2 uppercase tracking-wide text-sm"
                >
                  Return to Course <Check size={20} />
                </button>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
