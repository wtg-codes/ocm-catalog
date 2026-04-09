import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  language: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ code, language }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="relative group rounded-md bg-[#0a0f14] overflow-hidden border border-slate-800 shadow-inner">
      <div className="flex items-center justify-between px-4 py-2 bg-[#111822] text-xs text-slate-400 select-none border-b border-slate-800">
        <span className="font-mono uppercase tracking-wider">{language}</span>
        <button onClick={handleCopy} className="hover:text-white transition-colors flex items-center gap-1 font-medium text-accent">
          {copied ? <Check size={14} /> : <Copy size={14} />}
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <div className="p-4 overflow-x-auto">
        <code className="text-sm font-mono text-slate-200">{code}</code>
      </div>
    </div>
  );
};
