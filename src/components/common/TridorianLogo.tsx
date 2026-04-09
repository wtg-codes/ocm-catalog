import React from 'react';

interface TridorianLogoProps {
  className?: string;
  size?: number;
}

export const TridorianLogo: React.FC<TridorianLogoProps> = ({ className, size = 24 }) => (
  <svg
    width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="3" strokeLinecap="round"
    strokeLinejoin="round" className={className}
  >
    <path d="M12 2.5 L19.5 6.5 L19.5 9.5" />
    <path d="M19.5 14.5 L19.5 17.5 L12 21.5" />
    <path d="M12 21.5 L4.5 17.5 L4.5 14.5" />
    <path d="M4.5 9.5 L4.5 6.5 L12 2.5" />
    <path d="M12 8 V13" />
    <path d="M12 13 L8.5 15.5" />
    <path d="M12 13 L15.5 15.5" />
  </svg>
);
