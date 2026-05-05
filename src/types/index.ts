import { ReactNode } from 'react';

export type Status = 'published' | 'draft';
export type PortalTab = 'catalog' | 'my-courses';
export type ViewMode = 'grid' | 'list';

export interface Step {
  id: string;
  title: string;
  icon: string;
  content: React.FC<Record<string, unknown>>;
}

export type ModuleType = 'lab' | 'learn' | 'video';

export interface Module {
  id: string;
  type?: ModuleType;
  title: string;
  description: string;
  icon: string;
  stepsData: Step[];
}

export interface Course {
  id: string;
  title: string;
  description: string;
  icon: string;
  modules: Module[];
}

export interface Track {
  id: string;
  category: string;
  trackNumber: string;
  status: Status;
  title: string;
  description: string;
  icon: string;
  courses: Course[];
}
