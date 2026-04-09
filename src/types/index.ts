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

export interface Lab {
  id: string;
  title: string;
  description: string;
  icon: string;
  stepsData: Step[];
}

export interface Course {
  id: string;
  category: string;
  courseNumber: string;
  status: Status;
  title: string;
  description: string;
  icon: string;
  labs: Lab[];
}
