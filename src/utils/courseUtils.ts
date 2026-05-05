import { Track, Course, Module } from '../types';

export const getModuleProgress = (moduleObj: Module, completedStepIds: string[]) => {
  const total = Math.max(0, moduleObj.stepsData.length - 1); // Exclude completion step
  const completed = moduleObj.stepsData.filter((step: any) =>
    completedStepIds.includes(step.id) && !step.id.includes('completion')
  ).length;
  return {
    total,
    completed,
    percentage: total === 0 ? 0 : Math.min(100, (completed / total) * 100)
  };
};

export const getCourseProgress = (course: Course, completedStepIds: string[]) => {
  let total = 0;
  let completed = 0;
  course.modules.forEach((moduleObj: any) => {
    const prog = getModuleProgress(moduleObj, completedStepIds);
    total += prog.total;
    completed += prog.completed;
  });
  return total === 0 ? 0 : Math.min(100, (completed / total) * 100);
};

export const getTrackProgress = (track: Track, completedStepIds: string[]) => {
  let total = 0;
  let completed = 0;
  track.courses.forEach((course: any) => {
    course.modules.forEach((moduleObj: any) => {
      const prog = getModuleProgress(moduleObj, completedStepIds);
      total += prog.total;
      completed += prog.completed;
    });
  });
  return total === 0 ? 0 : Math.min(100, (completed / total) * 100);
};
