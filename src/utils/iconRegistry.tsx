import React from 'react';
import {
  Cloud, Terminal, Monitor, Lightbulb, Key, Zap, Presentation,
  Settings as SettingsIcon, FileCode2, BookOpen, Award, Play,
  CheckCircle2, Circle, GitPullRequest
} from 'lucide-react';

export const iconMap: Record<string, React.ElementType> = {
  Cloud, Terminal, Monitor, Lightbulb, Key, Zap, Presentation,
  SettingsIcon, FileCode2, BookOpen, Award, Play, CheckCircle2, Circle, GitPullRequest
};

interface DynamicIconProps {
  name: string;
  size?: number;
  className?: string;
}

export const DynamicIcon: React.FC<DynamicIconProps> = ({ name, size = 24, className = "" }) => {
  const IconComponent = iconMap[name] || Cloud;
  return <IconComponent size={size} className={className} />;
};
