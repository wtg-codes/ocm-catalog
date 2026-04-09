import React from 'react';
import { ExternalLink } from 'lucide-react';

interface RefLinkProps {
  href: string;
  children: React.ReactNode;
}

export const RefLink: React.FC<RefLinkProps> = ({ href, children }) => (
  <a href={href} target="_blank" rel="noreferrer" className="text-accent hover:opacity-80 hover:underline inline-flex items-center gap-1 font-medium">
    {children} <ExternalLink size={12} />
  </a>
);
