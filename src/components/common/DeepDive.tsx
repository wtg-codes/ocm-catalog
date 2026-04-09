import React, { useState } from 'react';
import { BookOpen, ChevronDown, ChevronUp } from 'lucide-react';

interface DeepDiveProps {
  title: string;
  children: React.ReactNode;
}

export const DeepDive: React.FC<DeepDiveProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="mt-5 border border-accent rounded-lg overflow-hidden shadow-sm">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 bg-accent-muted hover:brightness-95 text-accent font-semibold text-sm transition-colors"
      >
        <span className="flex items-center gap-2"><BookOpen size={16} /> {title}</span>
        {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
      {isOpen && (
        <div className="p-5 text-sm text-main bg-panel border-t border-accent space-y-4 leading-relaxed">
          {children}
        </div>
      )}
    </div>
  );
};
