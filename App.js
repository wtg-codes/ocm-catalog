import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  Circle, 
  Terminal, 
  Monitor, 
  Cloud, 
  ChevronRight, 
  ChevronLeft,
  ChevronDown,
  ChevronUp,
  Copy,
  Check,
  BookOpen,
  Award,
  Zap,
  Settings as SettingsIcon,
  Layout,
  ArrowLeft,
  PlayCircle,
  GraduationCap,
  Library,
  Plus,
  Search,
  MessageSquare,
  Lightbulb,
  GitPullRequest,
  FileCode2,
  Key,
  ExternalLink,
  X,
  Palette,
  Presentation,
  Play,
  Edit3,
  Trash2,
  Save,
  Grid,
  List as ListIcon
} from 'lucide-react';

// --- THEME CSS DEFINITIONS ---
const themeStyles = `
  :root {
    --bg-base: #f8fafc;
    --bg-panel: #ffffff;
    --bg-muted: #f1f5f9;
    --text-main: #0f172a;
    --text-muted: #64748b;
    --border-main: #e2e8f0;
    --accent-bg: #10b981;
    --accent-fg: #ffffff;
    --accent-text: #059669;
    --accent-muted: #ecfdf5;
    --accent-border: #a7f3d0;
    --shadow-accent: 0 0 15px rgba(16, 185, 129, 0.3);
  }
  .theme-dark {
    --bg-base: #0a0f14;
    --bg-panel: #111822;
    --bg-muted: #1e293b;
    --text-main: #ffffff;
    --text-muted: #94a3b8;
    --border-main: #1e293b;
    --accent-bg: #34d399;
    --accent-fg: #022c22;
    --accent-text: #34d399;
    --accent-muted: rgba(6, 78, 59, 0.2);
    --accent-border: rgba(6, 78, 59, 0.5);
    --shadow-accent: 0 0 15px rgba(52, 211, 153, 0.2);
  }
  .theme-kitten {
    --bg-base: #fff0f5;
    --bg-panel: #ffffff;
    --bg-muted: #ffe4e1;
    --text-main: #4a0e4e;
    --text-muted: #c71585;
    --border-main: #ffb6c1;
    --accent-bg: #ff1493;
    --accent-fg: #ffffff;
    --accent-text: #ff1493;
    --accent-muted: #fff0f5;
    --accent-border: #ff69b4;
    --shadow-accent: 0 0 15px rgba(255, 20, 147, 0.3);
  }
  .theme-caribbean {
    --bg-base: #e0f7fa;
    --bg-panel: #ffffff;
    --bg-muted: #b2ebf2;
    --text-main: #004d40;
    --text-muted: #00796b;
    --border-main: #b2ebf2;
    --accent-bg: #00acc1;
    --accent-fg: #ffffff;
    --accent-text: #00838f;
    --accent-muted: #e0f7fa;
    --accent-border: #80deea;
    --shadow-accent: 0 0 15px rgba(0, 172, 193, 0.3);
  }
  .theme-lunar {
    --bg-base: #050505;
    --bg-panel: #121212;
    --bg-muted: #222222;
    --text-main: #eeeeee;
    --text-muted: #888888;
    --border-main: #333333;
    --accent-bg: #ffffff;
    --accent-fg: #000000;
    --accent-text: #ffffff;
    --accent-muted: #222222;
    --accent-border: #444444;
    --shadow-accent: 0 0 15px rgba(255, 255, 255, 0.15);
  }

  /* Core Utility Classes */
  .app-bg { background-color: var(--bg-base); color: var(--text-main); }
  .bg-panel { background-color: var(--bg-panel); }
  .bg-muted { background-color: var(--bg-muted); }
  .text-main { color: var(--text-main); }
  .text-muted { color: var(--text-muted); }
  .border-main { border-color: var(--border-main); }
  
  .bg-accent { background-color: var(--accent-bg); }
  .text-accent-fg { color: var(--accent-fg); }
  .text-accent { color: var(--accent-text); }
  .bg-accent-muted { background-color: var(--accent-muted); }
  .border-accent { border-color: var(--accent-border); }

  .accent-btn {
    background-color: var(--accent-bg);
    color: var(--accent-fg);
    box-shadow: var(--shadow-accent);
    transition: all 0.2s ease-in-out;
  }
  .accent-btn:hover {
    transform: translateY(-1px);
    filter: brightness(1.1);
  }
  .accent-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

// --- ICON DICTIONARY FOR AUTHORING ---
const iconMap = {
  Cloud, Terminal, Monitor, Lightbulb, Key, Zap, Presentation, 
  SettingsIcon, FileCode2, BookOpen, Award, Play, CheckCircle2, Circle, GitPullRequest
};

const DynamicIcon = ({ name, size = 24, className = "" }) => {
  const IconComponent = iconMap[name] || Cloud;
  return <IconComponent size={size} className={className} />;
};

// --- TRIDORIAN BRAND ASSETS ---
const TridorianLogo = ({ className, size = 24 }) => (
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

// --- SHARED COMPONENTS ---
const CodeBlock = ({ code, language }) => {
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

const DeepDive = ({ title, children }) => {
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

const RefLink = ({ href, children }) => (
  <a href={href} target="_blank" rel="noreferrer" className="text-accent hover:opacity-80 hover:underline inline-flex items-center gap-1 font-medium">
    {children} <ExternalLink size={12} />
  </a>
);

// --- FACTORY FUNCTIONS FOR STUBS ---
const generateModuleSteps = (moduleId, moduleTitle, moduleDesc) => [
  {
    id: `${moduleId}-intro`,
    title: '1. Keynote Video',
    icon: 'Play',
    content: () => (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-main tracking-tight">Keynote Video</h2>
        <p className="text-muted">Before diving into the hands-on labs, watch this brief overview covering the core concepts for this module.</p>
        <div className="relative w-full aspect-video bg-[#0a0f14] rounded-xl border border-main flex items-center justify-center overflow-hidden shadow-sm mt-6 group">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent opacity-60"></div>
          <button className="relative z-10 w-20 h-20 bg-accent text-accent-fg rounded-full flex items-center justify-center shadow-accent transform group-hover:scale-110 transition-transform duration-300">
            <Play size={36} className="ml-1 fill-current" />
          </button>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 pt-12 flex justify-between items-end">
            <div>
              <h3 className="text-white font-bold text-lg">{moduleTitle}</h3>
              <p className="text-white/70 text-sm font-medium">[Company Name] Enablement Video</p>
            </div>
            <span className="bg-black/50 text-white text-xs font-mono font-bold px-2 py-1 rounded border border-white/10 backdrop-blur">10:24</span>
          </div>
        </div>
      </div>
    )
  },
  {
    id: `${moduleId}-deck`,
    title: '2. Slide Deck Review',
    icon: 'Presentation',
    content: () => (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-main tracking-tight">Architectural Slide Deck</h2>
        <p className="text-muted">Review the deployment architecture, quota management strategies, and security protocols: <strong>{moduleDesc}</strong></p>
        <div className="relative w-full aspect-video bg-muted rounded-xl border border-main flex flex-col items-center justify-center overflow-hidden shadow-sm mt-6 group">
           <div className="absolute inset-0 bg-panel opacity-50"></div>
           <div className="relative z-10 flex flex-col items-center text-center p-6">
             <div className="w-16 h-16 bg-base rounded-2xl flex items-center justify-center border border-main mb-4 shadow-sm">
               <Presentation size={32} className="text-accent" />
             </div>
             <h3 className="text-main font-bold text-xl mb-2">{moduleTitle}</h3>
             <p className="text-muted text-sm max-w-sm mb-6">Interactive slide deck placeholder. The actual Google Slides embed will render here.</p>
             <button className="accent-btn px-5 py-2.5 rounded-lg text-sm font-bold uppercase tracking-wide">
               Next Slide <ChevronRight size={16} className="inline ml-1" />
             </button>
           </div>
           <div className="absolute bottom-0 left-0 right-0 bg-base/80 backdrop-blur border-t border-main p-3 flex items-center justify-between">
             <span className="text-xs font-bold text-muted uppercase tracking-wider">Slide 1 of 24</span>
             <div className="flex items-center gap-2">
                <button className="p-1.5 rounded bg-muted text-muted hover:text-main transition-colors border border-transparent hover:border-main"><ChevronLeft size={16} /></button>
                <button className="p-1.5 rounded bg-muted text-muted hover:text-main transition-colors border border-transparent hover:border-main"><ChevronRight size={16} /></button>
             </div>
           </div>
        </div>
      </div>
    )
  },
  {
    id: `${moduleId}-completion`,
    title: 'Module Complete',
    icon: 'Award',
    content: () => (
      <div className="text-center space-y-6 py-10">
        <div className="mx-auto w-24 h-24 bg-accent-muted rounded-full flex items-center justify-center mb-6 border border-accent">
          <Award size={48} className="text-accent" />
        </div>
        <h2 className="text-3xl font-extrabold text-main tracking-tight">Module Complete!</h2>
        <p className="text-muted max-w-md mx-auto text-lg">You've successfully completed the pre-requisite learning material. You are now ready to advance.</p>
      </div>
    )
  }
];

const generateLabSteps = (labId, labTitle, labDesc) => [
  {
    id: `${labId}-intro`,
    title: 'Lab Overview',
    icon: 'BookOpen',
    content: () => (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-main tracking-tight">{labTitle}</h2>
        <p className="text-muted text-lg">{labDesc}</p>
        <div className="bg-accent-muted border border-accent p-6 rounded-xl shadow-sm mt-6">
          <h3 className="font-bold text-accent mb-4 flex items-center gap-2"><Layout size={20}/> Lab Objectives:</h3>
          <ul className="list-none space-y-3 text-main font-medium">
            <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-accent"/> Access your [Company Name] sandbox environment.</li>
            <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-accent"/> Execute the assigned configuration tasks.</li>
            <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-accent"/> Validate your setup using the provided test scripts.</li>
          </ul>
        </div>
      </div>
    )
  },
  {
    id: `${labId}-exec`,
    title: '1. Hands-on Execution',
    icon: 'Terminal',
    content: () => (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-main tracking-tight">Executing the Lab</h2>
        <p className="text-muted">Follow the steps below to complete the configuration for this lab within your company-provided environment.</p>
        <div className="space-y-6 mt-6">
          <div className="flex gap-4 items-start border-b border-main pb-5">
            <div className="bg-accent-muted text-accent font-bold w-8 h-8 rounded-full flex items-center justify-center shrink-0 border border-accent">1</div>
            <div className="w-full">
              <h4 className="font-bold text-main">Initialize Environment</h4>
              <p className="text-sm text-muted mb-3">Run the setup script in your cloud shell.</p>
              <CodeBlock code="./setup-lab.sh --init" language="bash" />
            </div>
          </div>
          <div className="flex gap-4 items-start pb-5">
            <div className="bg-accent-muted text-accent font-bold w-8 h-8 rounded-full flex items-center justify-center shrink-0 border border-accent">2</div>
            <div className="w-full">
              <h4 className="font-bold text-main">Deploy Resources</h4>
              <p className="text-sm text-muted mb-3">Apply the standard deployment manifests.</p>
              <CodeBlock code="kubectl apply -f ./manifests/" language="bash" />
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: `${labId}-completion`,
    title: 'Lab Complete',
    icon: 'Award',
    content: () => (
      <div className="text-center space-y-6 py-10">
        <div className="mx-auto w-24 h-24 bg-accent-muted rounded-full flex items-center justify-center mb-6 border border-accent">
          <Award size={48} className="text-accent" />
        </div>
        <h2 className="text-3xl font-extrabold text-main tracking-tight">Lab Complete!</h2>
        <p className="text-muted max-w-md mx-auto text-lg">You've successfully completed the hands-on exercises. Your environment has been validated.</p>
      </div>
    )
  }
];

const downloadQuickRefGuide = () => {
  const content = `# Agentic Developer Toolkit - Quick Reference Guide\n\n## 1. Antigravity IDE Shortcuts\n- **Fast Mode (Cmd + I):** Best for quick, inline edits. Routes to Gemini 3.1 Flash.\n- **Agent Mode (Cmd + L):** Opens the Agent sidebar. Routes to Gemini 3.1 Pro. Best for complex, multi-file edits and terminal commands.\n\n## 2. Managing Agent Context\n- **Workspace Rules:** Create \`.agents/rules.md\` in your project root to enforce team-specific coding standards.\n- **Global Rules:** Create \`~/.gemini/GEMINI.md\` to set your global developer preferences.\n\n## 3. Local Model Offloading\nTo save cloud quota, you can run tasks locally:\n1. Ensure Ollama (v0.20.0+) is installed.\n2. Run \`ollama run gemma4:e4b\` in your terminal.\n3. In Antigravity Settings, set 'Fast Mode' provider to 'Localhost (Ollama)'.\n\n## 4. Gemini CLI Quick Commands\n- Summary: \`git diff main | gemini prompt "Summarize for PR"\`\n- Log Analysis: \`cat error.log | gemini prompt "Find the root cause"\`\n\n## 5. Jules Cloud Agent\n- **GitHub Trigger:** Create an issue and add the \`@jules-agent\` label.\n- **CLI Trigger:** Run \`jules run "Your objective here"\`\n- **Dashboard:** Track active cloud tasks via \`jules dashboard\`.\n`;
  
  const blob = new Blob([content], { type: 'text/markdown' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'Agentic_Toolkit_QuickRef.md';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

// --- INITIAL DATA STORE (2026 CATALOG) ---
const initialCoursesData = [
  {
    id: 'course-agentic',
    category: 'Developer & Engineering',
    courseNumber: 'DEV-400',
    status: 'published',
    title: 'Agentic Developer Toolkit Workshop',
    description: 'Master Antigravity IDE, Gemini CLI, and Jules in this comprehensive hands-on workshop designed for modern development teams.',
    icon: 'Terminal',
    labs: [
      {
        id: 'lab-0',
        title: 'Module 1: Concepts & Architecture',
        description: 'Watch the keynote presentation and review the architectural slide deck before starting the hands-on exercises.',
        icon: 'Presentation',
        stepsData: [
          {
            id: 'v-intro',
            title: '1. Keynote Video',
            icon: 'Play',
            content: () => (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-main tracking-tight">Keynote Video</h2>
                <p className="text-muted">
                  Before diving into the hands-on labs, watch this brief overview on the paradigm shift from chat-assistants to autonomous agents.
                </p>
                <div className="relative w-full aspect-video bg-[#0a0f14] rounded-xl border border-main flex items-center justify-center overflow-hidden shadow-sm mt-6 group">
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent opacity-60"></div>
                  <button className="relative z-10 w-20 h-20 bg-accent text-accent-fg rounded-full flex items-center justify-center shadow-accent transform group-hover:scale-110 transition-transform duration-300">
                    <Play size={36} className="ml-1 fill-current" />
                  </button>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 pt-12 flex justify-between items-end">
                    <div>
                      <h3 className="text-white font-bold text-lg">The Agentic Era of Development</h3>
                      <p className="text-white/70 text-sm font-medium">Internal Enablement Video</p>
                    </div>
                    <span className="bg-black/50 text-white text-xs font-mono font-bold px-2 py-1 rounded border border-white/10 backdrop-blur">
                      10:24
                    </span>
                  </div>
                </div>
              </div>
            )
          },
          {
            id: 'v-deck',
            title: '2. Slide Deck Review',
            icon: 'Presentation',
            content: () => (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-main tracking-tight">Architectural Slide Deck</h2>
                <p className="text-muted">
                  Review the [Company Name] deployment architecture, quota management strategies, and security protocols.
                </p>
                <div className="relative w-full aspect-video bg-muted rounded-xl border border-main flex flex-col items-center justify-center overflow-hidden shadow-sm mt-6 group">
                   <div className="absolute inset-0 bg-panel opacity-50"></div>
                   <div className="relative z-10 flex flex-col items-center text-center p-6">
                     <div className="w-16 h-16 bg-base rounded-2xl flex items-center justify-center border border-main mb-4 shadow-sm">
                       <Presentation size={32} className="text-accent" />
                     </div>
                     <h3 className="text-main font-bold text-xl mb-2">Agentic Workflows 101</h3>
                     <p className="text-muted text-sm max-w-sm mb-6">Interactive slide deck placeholder. The actual Google Slides embed will render here.</p>
                     <button className="accent-btn px-5 py-2.5 rounded-lg text-sm font-bold uppercase tracking-wide">
                       Next Slide <ChevronRight size={16} className="inline ml-1" />
                     </button>
                   </div>
                   <div className="absolute bottom-0 left-0 right-0 bg-base/80 backdrop-blur border-t border-main p-3 flex items-center justify-between">
                     <span className="text-xs font-bold text-muted uppercase tracking-wider">Slide 1 of 24</span>
                     <div className="flex items-center gap-2">
                        <button className="p-1.5 rounded bg-muted text-muted hover:text-main transition-colors border border-transparent hover:border-main"><ChevronLeft size={16} /></button>
                        <button className="p-1.5 rounded bg-muted text-muted hover:text-main transition-colors border border-transparent hover:border-main"><ChevronRight size={16} /></button>
                     </div>
                   </div>
                </div>
              </div>
            )
          },
          {
            id: 'v-completion',
            title: 'Module Complete',
            icon: 'Award',
            content: () => (
              <div className="text-center space-y-6 py-10">
                <div className="mx-auto w-24 h-24 bg-accent-muted rounded-full flex items-center justify-center mb-6 border border-accent">
                  <Award size={48} className="text-accent" />
                </div>
                <h2 className="text-3xl font-extrabold text-main tracking-tight">Module Complete!</h2>
                <p className="text-muted max-w-md mx-auto text-lg">
                  You've successfully completed the pre-requisite architecture review. You are now ready to begin the hands-on configuration.
                </p>
              </div>
            )
          }
        ]
      },
      {
        id: 'lab-1',
        title: 'Module 2: Antigravity IDE Setup & Usage',
        description: 'Configure your workspace and learn how to drive autonomous agents to write, test, and refactor code.',
        icon: 'Monitor',
        stepsData: [
          {
            id: 'ag-intro',
            title: 'Lab 1 Overview',
            icon: 'BookOpen',
            content: () => (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-main tracking-tight">Welcome to Lab 1: Antigravity IDE</h2>
                <p className="text-muted text-lg">
                  Antigravity IDE is more than just an editor with autocomplete; it is a fully agentic workspace. In this lab, we will go beyond installation and learn how to actually <em>drive</em> the AI.
                </p>
                <div className="bg-accent-muted border border-accent p-6 rounded-xl shadow-sm mt-6">
                  <h3 className="font-bold text-accent mb-4 flex items-center gap-2"><Layout size={20}/> Learning Objectives:</h3>
                  <ul className="list-none space-y-3 text-main font-medium">
                    <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-accent"/> Install and configure Antigravity for your OS.</li>
                    <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-accent"/> Execute your first "Fast Mode" and "Planning Mode" tasks.</li>
                    <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-accent"/> Set up workspace-specific Agent Rules.</li>
                  </ul>
                </div>
              </div>
            )
          },
          {
            id: 'ag-install',
            title: '1. Install & Configure',
            icon: 'Monitor',
            content: () => (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-main tracking-tight">Installation & Initial Setup</h2>
                <p className="text-muted">
                  Antigravity is built as a fork of VS Code, meaning all your favorite extensions and keybindings are fully supported out of the box.
                </p>
                
                <div className="space-y-6 mt-6">
                  <div className="flex gap-4 items-start border-b border-main pb-5">
                    <div className="bg-accent-muted text-accent font-bold w-8 h-8 rounded-full flex items-center justify-center shrink-0 border border-accent">1</div>
                    <div className="w-full">
                      <h4 className="font-bold text-main">Download the IDE</h4>
                      <p className="text-sm text-muted mb-3">Download the Spring 2026 release of Antigravity for your OS.</p>
                      <CodeBlock code="https://antigravity.google/download" language="text" />
                    </div>
                  </div>
                  
                  <div className="flex gap-4 items-start border-b border-main pb-5">
                    <div className="bg-accent-muted text-accent font-bold w-8 h-8 rounded-full flex items-center justify-center shrink-0 border border-accent">2</div>
                    <div>
                      <h4 className="font-bold text-main">Migrate Extensions</h4>
                      <p className="text-sm text-muted mb-2">On first launch, you will be prompted to import your environment. Click <strong className="text-main">"Import from VS Code"</strong> to instantly port your themes, settings, and snippets.</p>
                    </div>
                  </div>
    
                  <div className="flex gap-4 items-start border-b border-main pb-5">
                    <div className="bg-accent-muted text-accent font-bold w-8 h-8 rounded-full flex items-center justify-center shrink-0 border border-accent">3</div>
                    <div>
                      <h4 className="font-bold text-main">Authenticate</h4>
                      <p className="text-sm text-muted">Click the Account icon in the bottom left. Sign in using your company-provided Google Workspace email. This automatically links your IDE to your enterprise quota, giving you access to Gemini 3.1 Pro.</p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start">
                    <div className="bg-accent-muted text-accent font-bold w-8 h-8 rounded-full flex items-center justify-center shrink-0 border border-accent">4</div>
                    <div className="w-full">
                      <h4 className="font-bold text-main">Set Autonomy Level</h4>
                      <p className="text-sm text-muted mb-3">By default, agents will ask permission before running terminal commands. For this workshop, let's keep it that way to learn how the agent thinks.</p>
                      <div className="bg-muted border border-main p-3 rounded-md text-sm text-main font-mono inline-block">
                        Settings {'>'} Agent Behavior {'>'} Request Review
                      </div>
                    </div>
                  </div>
                </div>

                <DeepDive title="Deep Dive: Architecture & Extension Compatibility">
                  <p>Because Antigravity leverages the open-source VSCodium core, it inherently supports the Language Server Protocol (LSP) and standard <code>.vsix</code> extensions. However, its core agent architecture is completely bespoke.</p>
                  <p>When you run an agent in Antigravity, the IDE captures a headless DOM snapshot of your active editor windows, terminal output, and extension states, streaming this directly to the Gemini 3.1 context window. This is what allows the agent to "see" your active compilation errors.</p>
                  <p className="pt-2"><strong>Official Documentation:</strong> <RefLink href="#">Migrating from VS Code to Antigravity IDE</RefLink></p>
                </DeepDive>
              </div>
            )
          },
          {
            id: 'ag-first-task',
            title: '2. Your First Agent Task',
            icon: 'Zap',
            content: () => (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-main tracking-tight">Driving the IDE</h2>
                <p className="text-muted">
                  You interact with Antigravity through two primary shortcuts. Let's create a new Express.js server from scratch to test them out.
                </p>

                <div className="grid grid-cols-1 gap-6 mt-6">
                  {/* Fast Mode */}
                  <div className="border border-main rounded-xl overflow-hidden shadow-sm bg-panel">
                    <div className="bg-muted px-5 py-4 border-b border-main flex items-center gap-3">
                      <Zap size={20} className="text-accent"/>
                      <h3 className="font-bold text-main text-lg">Fast Mode (Inline Editing)</h3>
                      <span className="ml-auto text-xs font-mono font-bold bg-base px-2 py-1 rounded text-muted border border-main">Cmd + I</span>
                    </div>
                    <div className="p-6">
                      <p className="text-sm text-muted mb-4">Best for: Quick generation, refactoring highlighted code, or writing docs.</p>
                      <ol className="list-decimal pl-5 space-y-3 text-sm text-main">
                        <li>Open a new empty file and save it as <code>server.js</code>.</li>
                        <li>Press <kbd className="bg-muted border border-main rounded px-1.5 py-0.5 font-mono text-accent">Cmd + I</kbd> (or Ctrl+I).</li>
                        <li>Type the following prompt and hit Enter:</li>
                      </ol>
                      <div className="mt-4">
                        <CodeBlock code="Build a standard Express.js boilerplate listening on port 3000 with one /health route." language="prompt" />
                      </div>
                      <p className="text-sm text-muted mt-4 flex items-center gap-2 font-medium">
                        <ArrowLeft size={16} className="text-accent" /> Accept the diff by pressing <kbd className="bg-muted border border-main rounded px-1.5 py-0.5 font-mono text-accent">Cmd + Enter</kbd>.
                      </p>
                    </div>
                  </div>

                  {/* Planning Mode */}
                  <div className="border border-main rounded-xl overflow-hidden shadow-sm bg-panel">
                    <div className="bg-muted px-5 py-4 border-b border-main flex items-center gap-3">
                      <MessageSquare size={20} className="text-accent"/>
                      <h3 className="font-bold text-main text-lg">Agent Mode (Multi-file / Terminal)</h3>
                      <span className="ml-auto text-xs font-mono font-bold bg-base px-2 py-1 rounded text-muted border border-main">Cmd + L</span>
                    </div>
                    <div className="p-6">
                      <p className="text-sm text-muted mb-4">Best for: Complex architecture, debugging across files, or running terminal commands.</p>
                      <ol className="list-decimal pl-5 space-y-3 text-sm text-main mb-4">
                        <li>Press <kbd className="bg-muted border border-main rounded px-1.5 py-0.5 font-mono text-accent">Cmd + L</kbd> to open the Agent Manager sidebar.</li>
                        <li>Give the agent a complex objective:</li>
                      </ol>
                      <CodeBlock code="Look at server.js. Initialize a package.json, install the required dependencies via npm, and create a Dockerfile to containerize this app." language="prompt" />
                      <div className="mt-5 bg-accent-muted border-l-4 border-accent p-4 text-sm text-main rounded-r-lg">
                        <strong className="text-accent block mb-1">Notice:</strong> The agent will automatically read <code>server.js</code>, write to the terminal to run <code>npm init -y</code> and <code>npm install express</code>, and create a new <code>Dockerfile</code>. It will pause to ask your permission before executing the terminal commands.
                      </div>
                    </div>
                  </div>
                </div>

                <DeepDive title="Deep Dive: Fast Mode vs. Agent Mode Models">
                  <p>Understanding the difference between the two modes is crucial for performance optimization:</p>
                  <ul className="list-disc pl-5 space-y-2 mt-2">
                    <li><strong>Fast Mode (Cmd+I):</strong> Routes to <strong>Gemini 3.1 Flash</strong>. It features lower latency and a smaller context window, specifically optimized for generating exact code diffs inline without hallucinating file structural changes.</li>
                    <li><strong>Agent Mode (Cmd+L):</strong> Routes to <strong>Gemini 3.1 Pro</strong>. It utilizes a massive 2M+ token context window, allowing it to read entire project directories, reason about multi-step plans, and issue bash commands to the terminal.</li>
                  </ul>
                  <p className="pt-2"><strong>Official Documentation:</strong> <RefLink href="#">Choosing the Right Interaction Mode</RefLink></p>
                </DeepDive>
              </div>
            )
          },
          {
            id: 'ag-rules',
            title: '3. Context & Rules',
            icon: 'FileCode2',
            content: () => (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-main tracking-tight">Guiding the Agent</h2>
                <p className="text-muted">
                  Agents work best when they understand your team's specific standards. Instead of repeating yourself in every prompt, you configure Agent Rules.
                </p>

                <div className="mt-6">
                  <h4 className="font-bold text-main mb-2">Creating a Workspace Rule</h4>
                  <p className="text-sm text-muted mb-4">
                    At the root of your project, create a folder named <code className="text-accent font-bold bg-muted px-1 py-0.5 rounded">.agents/</code> and inside it, a file called <code className="text-accent font-bold bg-muted px-1 py-0.5 rounded">rules.md</code>. The IDE automatically appends these rules to every agent query in this workspace.
                  </p>
                  <CodeBlock 
                    language="markdown (.agents/rules.md)" 
                    code={`# [Company Name] Standard React Guidelines
- ALWAYS use TypeScript (strict mode enabled).
- Prefer functional components with hooks over class components.
- Use Tailwind CSS for all styling; do not write custom CSS files.
- All new functions MUST include JSDoc comments explaining parameters.
- Never use 'any' as a type. Use 'unknown' if unsure.`} 
                  />
                </div>

                <DeepDive title="Deep Dive: System Prompt Injection via .agents/">
                  <p>When you create an <code>.agents/rules.md</code> file, Antigravity does not simply append the text to your user prompt. Instead, it injects these rules directly into the <strong>System Instructions</strong> parameter of the Vertex AI API request.</p>
                  <p>This ensures the model heavily weights these constraints over general training data. You can also create sub-directory rules (e.g., placing a <code>rules.md</code> inside a <code>/tests</code> folder) which will only apply when the agent is interacting with files in that specific path.</p>
                  <p className="bg-muted p-3 rounded mt-2 border border-main"><strong>Global Rules Tip:</strong> Want rules applied to *every* project you open? Create a <code className="text-accent">~/.gemini/GEMINI.md</code> file on your computer. Antigravity will use this as your baseline personality globally.</p>
                  <p className="pt-2"><strong>Official Documentation:</strong> <RefLink href="#">Configuring Workspace Agent Guidelines</RefLink></p>
                </DeepDive>
              </div>
            )
          },
          {
            id: 'ag-usage',
            title: '4. Local Offloading & Gemma 4',
            icon: 'SettingsIcon',
            content: () => (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-main tracking-tight">Managing Agent Costs</h2>
                <p className="text-muted text-lg">
                  Agentic workflows consume massive amounts of context. Antigravity abstracts this into a "Baseline Quota." Once exhausted, your team dips into AI Credits. However, there is a powerful way to mitigate this.
                </p>
    
                <div className="bg-accent-muted border border-accent p-6 rounded-xl mt-6">
                  <h3 className="font-bold text-accent mb-3 flex items-center gap-2 text-lg"><Key size={20}/> Enterprise Billing Integration</h3>
                  <p className="text-sm text-main mb-4 leading-relaxed">
                    By logging in with your company-provisioned Google Workspace account in Step 1, you automatically unlocked the <strong>Google AI Ultra</strong> tier.
                  </p>
                  <p className="text-sm text-main font-medium bg-panel p-3 rounded-lg inline-block border border-main">
                    To view your team's usage, type <code className="font-bold">&gt; Google AI: Show Quota</code> in the Antigravity command palette (Cmd+Shift+P).
                  </p>
                </div>
    
                <div className="bg-panel border border-main p-6 rounded-xl mt-6 shadow-sm">
                  <h3 className="font-bold text-main mb-3 flex items-center gap-2 text-lg"><Terminal size={20} className="text-accent"/> The Hybrid Workflow (Zero Cost Strategy)</h3>
                  <p className="text-sm text-muted mb-4 leading-relaxed">
                    For massive enterprises, developers can save cloud quota by routing simple, high-frequency queries to local hardware. 
                  </p>
                  <CodeBlock code="# In your terminal, verify Ollama v0.20.0+ is installed and run:
ollama run gemma4:e4b

# Then in Antigravity Settings, change the 'Fast Mode' provider to 'Localhost (Ollama)'." language="bash" />
                </div>

                <DeepDive title="Reference: Gemma 4 & Hardware Requirements (April 2026)">
                  <p>Provided you are using the latest 2026 versions of the software, this setup leverages Antigravity's "model agnostic" architecture, which allows you to swap cloud-based models for local ones running on your own hardware.</p>
                  
                  <h4 className="font-bold mt-4 mb-2 text-main">Why this works:</h4>
                  <ul className="list-disc pl-5 space-y-2">
                    <li><strong>Gemma 4 Availability:</strong> Google released the Gemma 4 family on April 2, 2026. The model <code>gemma4:e4b</code> (Effective 4B) is designed for efficient on-device execution and runs smoothly on standard laptops.</li>
                    <li><strong>Ollama Support:</strong> Ollama shipped same-day support (v0.20.0) for Gemma 4, allowing the model to run immediately via the CLI.</li>
                    <li><strong>Antigravity Integration:</strong> Antigravity is natively compatible with local inference servers like Ollama. Changing the 'Fast Mode' provider to Localhost (Ollama) will route high-frequency tasks to your local machine instead of using cloud quota for Gemini 3.1 Flash.</li>
                  </ul>

                  <h4 className="font-bold mt-5 mb-2 text-main">Hardware Requirements:</h4>
                  <p>Verify that your hardware meets these 2026 standards to run the E4B model effectively:</p>
                  <ul className="list-disc pl-5 space-y-2 mt-2">
                    <li><strong>Apple Silicon Mac:</strong> (M1 or newer) is highly recommended due to unified memory architecture.</li>
                    <li><strong>VRAM/RAM:</strong> The 4B (E4B) model variant can run on as little as <strong>5GB of RAM in 4-bit mode</strong>, making it highly accessible for enterprise fleets.</li>
                  </ul>
                  <p className="mt-4 pt-4 border-t border-main"><strong>Official Documentation:</strong> <RefLink href="#">Running Gemma 4 Locally in Antigravity</RefLink></p>
                </DeepDive>
              </div>
            )
          },
          {
            id: 'ag-completion',
            title: 'Lab 1 Complete',
            icon: 'Award',
            content: () => (
              <div className="text-center space-y-6 py-10">
                <div className="mx-auto w-24 h-24 bg-accent-muted rounded-full flex items-center justify-center mb-6 border border-accent">
                  <Award size={48} className="text-accent" />
                </div>
                <h2 className="text-3xl font-extrabold text-main tracking-tight">Lab 1 Complete!</h2>
                <p className="text-muted max-w-md mx-auto text-lg">
                  You've successfully installed Antigravity IDE, executed your first multi-file agentic task, and learned how to offload tasks to local Gemma 4 models.
                </p>
                
                <div className="pt-8">
                  <button 
                    onClick={downloadQuickRefGuide}
                    className="accent-btn px-8 py-3.5 rounded-lg font-bold inline-flex items-center gap-2 uppercase tracking-wide text-sm"
                  >
                    <BookOpen size={18} /> Download Quick Reference Guide
                  </button>
                </div>
              </div>
            )
          }
        ]
      },
      {
        id: 'lab-2',
        title: 'Module 3: Terminal & Cloud Agents',
        description: 'Deploy Gemini CLI for local scripting and unleash Jules for asynchronous background engineering tasks.',
        icon: 'Terminal',
        stepsData: [
          {
            id: 'cj-intro',
            title: 'Lab 2 Overview',
            icon: 'BookOpen',
            content: () => (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-main tracking-tight">Welcome to Lab 2: Terminal & Cloud Agents</h2>
                <p className="text-muted text-lg">
                  Antigravity handles your active workspace, but true velocity requires automation. In this lab, we will bring AI to your command line and offload heavy maintenance to the cloud.
                </p>
                <div className="bg-accent-muted border border-accent p-6 rounded-xl shadow-sm mt-6">
                  <h3 className="font-bold text-accent mb-4 flex items-center gap-2"><Layout size={20}/> Learning Objectives:</h3>
                  <ul className="list-none space-y-3 text-main font-medium">
                    <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-accent"/> Install the Gemini CLI and execute prompt pipelines.</li>
                    <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-accent"/> Connect your local CLI to the Jules cloud agent.</li>
                    <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-accent"/> Dispatch your first autonomous PR generation task.</li>
                  </ul>
                </div>
              </div>
            )
          },
          {
            id: 'cj-gemini',
            title: '1. Gemini CLI Workflows',
            icon: 'Terminal',
            content: () => (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-main tracking-tight">Supercharging the Terminal</h2>
                <p className="text-muted">
                  The Gemini CLI allows you to pass output from traditional bash commands directly into an AI model for summarization, refactoring, or analysis.
                </p>
    
                <div className="space-y-6 mt-6">
                  <div>
                    <h4 className="font-bold text-main mb-2">Installation & Auth</h4>
                    <CodeBlock code="npm install -g @google/gemini-cli
gemini auth login" language="bash" />
                  </div>
    
                  <div className="pt-4 border-t border-main">
                    <h4 className="font-bold text-main mb-2">Practical Example: Git Diffs</h4>
                    <p className="text-sm text-muted mb-3">Pipe a diff into the CLI to generate a human-readable summary for a PR description:</p>
                    <CodeBlock code="git diff main | gemini prompt 'Write a professional Pull Request description for these changes, highlighting breaking changes.'" language="bash" />
                  </div>

                  <div className="pt-4 border-t border-main">
                    <h4 className="font-bold text-main mb-2">Practical Example: Log Analysis</h4>
                    <p className="text-sm text-muted mb-3">Got a massive error log? Have the CLI find the needle in the haystack:</p>
                    <CodeBlock code="cat /var/log/nginx/error.log | tail -n 500 | gemini prompt 'Find the root cause of the 502 errors and suggest a fix.'" language="bash" />
                  </div>
                </div>

                <DeepDive title="Reference: Advanced CLI Pipelining & Scripting">
                  <p>The true power of the Gemini CLI is its ability to be integrated into existing bash scripts. Use the <code>--silent</code> flag to output pure text without UI formatting, allowing you to chain AI outputs into other command-line tools like <code>jq</code>.</p>
                  <p className="mt-3 font-medium text-main">Example: Fetching JSON from an API, using Gemini to reformat it, and saving it.</p>
                  <div className="mt-2">
                    <CodeBlock code="curl -s https://api.example.com/data | gemini prompt --silent 'Format this JSON to only include names and email addresses' > users.json" language="bash" />
                  </div>
                  <p className="mt-4 pt-4 border-t border-main"><strong>Official Documentation:</strong> <RefLink href="#">Scripting Workflows with Gemini CLI</RefLink></p>
                </DeepDive>
              </div>
            )
          },
          {
            id: 'cj-jules',
            title: '2. Jules: The Cloud Agent',
            icon: 'Cloud',
            content: () => (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-main tracking-tight">Deploying Jules</h2>
                <p className="text-muted">
                  Jules is an asynchronous, cloud-based agent. Unlike your local IDE, Jules clones your entire repo into a Google Cloud VM, installs dependencies, runs tests, and creates PRs while you sleep.
                </p>
    
                <div className="space-y-6 mt-6">
                  <div>
                    <h4 className="font-bold text-main mb-2">Installing Jules Tools</h4>
                    <p className="text-sm text-muted mb-3">Install the dedicated CLI for managing your cloud agent sessions.</p>
                    <CodeBlock code="npm install -g @google/jules
jules auth login" language="bash" />
                  </div>
    
                  <div className="bg-accent-muted border-l-4 border-accent p-5 rounded-r-xl">
                    <h4 className="font-bold text-accent mb-2">How Billing Works</h4>
                    <p className="text-sm text-main leading-relaxed">
                      Because Jules runs in the background and might spend 45 minutes refactoring 200 files, billing by the token is impossible to predict. Therefore, Jules is billed on a <strong>flat per-task basis</strong>. Your platform account includes the Ultra tier automatically.
                    </p>
                  </div>
                </div>

                <DeepDive title="Deep Dive: Asynchronous Execution & Ephemeral VMs">
                  <p>When Jules accepts a task, it provisions a highly secure, ephemeral e2-standard-8 VM within Google Cloud. It clones your repository, reads the package manager configurations (e.g., <code>package-lock.json</code> or <code>Cargo.toml</code>), and runs the installation scripts.</p>
                  <p>Jules iteratively writes code and runs your test suites (e.g., <code>npm test</code>). If tests fail, Jules reads the error output, modifies its approach, and tries again. This autonomous feedback loop runs asynchronously, entirely separated from your local hardware.</p>
                  <p className="mt-4 pt-4 border-t border-main"><strong>Official Documentation:</strong> <RefLink href="#">Jules Cloud Architecture & Security</RefLink></p>
                </DeepDive>
              </div>
            )
          },
          {
            id: 'cj-action',
            title: '3. Your First Cloud PR',
            icon: 'GitPullRequest',
            content: () => (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-main tracking-tight">Dispatching Work</h2>
                <p className="text-muted">
                  There are two main ways to tell Jules to get to work. Let's look at how to trigger an asynchronous task.
                </p>
    
                <div className="mt-6 space-y-6">
                  {/* Method 1 */}
                  <div className="border border-main rounded-xl p-6 shadow-sm bg-panel">
                    <h4 className="font-bold text-main mb-3 text-lg">Method 1: GitHub Issue Integration (Recommended)</h4>
                    <p className="text-sm text-muted mb-4">If you have installed the Jules GitHub App on your repository, triggering the agent is as simple as creating an issue.</p>
                    <ol className="list-decimal pl-5 space-y-3 text-sm text-main">
                      <li>Go to your GitHub repository and create a new Issue.</li>
                      <li>Title: <code className="bg-muted px-1.5 py-0.5 rounded text-accent font-bold">Bump Next.js to v15 and fix breaking changes</code></li>
                      <li>Add the label: <span className="bg-accent text-accent-fg px-2 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide">@jules-agent</span></li>
                    </ol>
                  </div>

                  {/* Method 2 */}
                  <div className="border border-main rounded-xl p-6 shadow-sm bg-panel">
                    <h4 className="font-bold text-main mb-3 text-lg">Method 2: Trigger via CLI</h4>
                    <p className="text-sm text-muted mb-4">You can offload a task directly from your terminal without opening a browser.</p>
                    <CodeBlock code="# Ensure you are inside your local git repository
jules run 'Find all deprecated API calls in the /src directory and update them. Create a PR when finished.'" language="bash" />
                    
                    <div className="mt-5 bg-muted p-4 rounded-lg border border-main">
                      <p className="text-sm text-main font-bold mb-3 flex items-center gap-2"><Layout size={16}/> Tracking Progress:</p>
                      <CodeBlock code="$ jules dashboard
[RUNNING] Task #492: Update /src API calls... (Running tests)
[SUCCESS] Task #491: Fix memory leak in auth... (PR #42 opened)" language="text" />
                    </div>
                  </div>
                </div>

                <DeepDive title="Reference: GitHub App Integration & Webhooks">
                  <p>When using the GitHub Issue integration, the Jules GitHub App listens for the <code>issues.labeled</code> webhook event. Upon receiving the payload, Jules extracts the issue title, body, and repository context to construct its system prompt.</p>
                  <p>Once the agent completes the work, it uses the GitHub API to open a Pull Request against the main branch. The PR description will automatically include a detailed changelog and link back to the originating issue via the <code>Fixes #IssueNumber</code> syntax, ensuring proper issue closure tracking.</p>
                  <p className="mt-4 pt-4 border-t border-main"><strong>Official Documentation:</strong> <RefLink href="#">Configuring the Jules GitHub App</RefLink></p>
                </DeepDive>
              </div>
            )
          },
          {
            id: 'cj-completion',
            title: 'Lab 2 Complete',
            icon: 'Award',
            content: () => (
              <div className="text-center space-y-6 py-10">
                <div className="mx-auto w-24 h-24 bg-accent-muted rounded-full flex items-center justify-center mb-6 border border-accent">
                  <Award size={48} className="text-accent" />
                </div>
                <h2 className="text-3xl font-extrabold text-main tracking-tight">Lab 2 Complete!</h2>
                <p className="text-muted max-w-md mx-auto text-lg">
                  You have successfully configured the Gemini CLI and dispatched an asynchronous background task using Jules.
                </p>
                
                <div className="bg-panel border border-main p-8 rounded-xl text-left max-w-xl mx-auto mt-8 shadow-sm">
                  <h3 className="font-bold text-main border-b border-main pb-3 mb-4 flex items-center gap-2 text-lg"><Lightbulb size={20} className="text-accent"/> Workshop Summary:</h3>
                  <ul className="space-y-4 text-sm text-main">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 size={20} className="text-accent shrink-0 mt-0.5"/> 
                      <span className="leading-relaxed"><strong className="text-main">Antigravity IDE:</strong> Used for active, daily coding where you need granular control and immediate feedback.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 size={20} className="text-accent shrink-0 mt-0.5"/> 
                      <span className="leading-relaxed"><strong className="text-main">Gemini CLI:</strong> Used to inject AI into bash scripts, CI pipelines, or quick local terminal workflows.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 size={20} className="text-accent shrink-0 mt-0.5"/> 
                      <span className="leading-relaxed"><strong className="text-main">Jules:</strong> Used for fire-and-forget tasks (dependency updates, linting fixes, broad refactors) while you work on feature logic.</span>
                    </li>
                  </ul>
                </div>
              </div>
            )
          }
        ]
      }
    ]
  },
  {
    id: 'course-gcp',
    category: 'Cloud Infrastructure',
    courseNumber: 'GCP-101',
    status: 'published',
    title: 'Google Cloud Vertex AI Fundamentals',
    description: 'Learn how to deploy, tune, and scale open-weights foundation models on Google Cloud Vertex AI infrastructure.',
    icon: 'Cloud',
    labs: [
      {
        id: 'v1-lab-1',
        title: 'Lab 1: Model Garden & Endpoints',
        description: 'Deploy your first foundation model from the Vertex AI Model Garden to an active endpoint.',
        icon: 'Zap',
        stepsData: [
          {
            id: 'v1-intro',
            title: 'Overview',
            icon: 'BookOpen',
            content: () => (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-main tracking-tight">Welcome to Vertex AI</h2>
                <p className="text-muted">This is a placeholder lab to demonstrate the multi-course learning portal functionality.</p>
              </div>
            )
          },
          {
            id: 'v1-completion',
            title: 'Lab Complete',
            icon: 'Award',
            content: () => (
              <div className="text-center space-y-6 py-10">
                <div className="mx-auto w-24 h-24 bg-accent-muted rounded-full flex items-center justify-center mb-6 border border-accent">
                  <Award size={48} className="text-accent" />
                </div>
                <h2 className="text-3xl font-extrabold text-main tracking-tight">Lab Complete!</h2>
                <p className="text-muted text-lg">You have successfully completed this module.</p>
              </div>
            )
          }
        ]
      }
    ]
  },
  {
    id: 'course-connected-worker',
    category: 'Productivity & Collaboration',
    courseNumber: 'GWS-200',
    status: 'published',
    title: 'The Connected Worker',
    description: 'Drive Google Workspace & Productivity transformation across your organization.',
    icon: 'Cloud',
    labs: [
      { id: 'gws-101', title: 'Module 1: Welcome to Google Workspace (GWS 101)', description: 'High-level project vision, case for change, timeline, and executive tour.', icon: 'Presentation', stepsData: generateModuleSteps('gws-101', 'Welcome to Google Workspace', 'High-level project vision, case for change, timeline, and executive tour.') },
      { id: 'gws-102', title: 'Module 2: Communication Deep Dive (GWS 102)', description: 'Detailed training on Gmail, Google Chat, and Google Meet.', icon: 'Presentation', stepsData: generateModuleSteps('gws-102', 'Communication Deep Dive', 'Detailed training on Gmail, Google Chat, and Google Meet.') },
      { id: 'gws-301', title: 'Lab 1: Workspace Power User Lab (GWS 301)', description: 'Advanced sharing, AppSheet automation, and complex scheduling.', icon: 'Terminal', stepsData: generateLabSteps('gws-301', 'Workspace Power User Lab', 'Advanced sharing, AppSheet automation, and complex scheduling.') }
    ]
  },
  {
    id: 'course-intel-advantage',
    category: 'Generative AI Foundations',
    courseNumber: 'AI-101',
    status: 'published',
    title: 'The Intelligence Advantage',
    description: 'Master Standalone Gemini Enterprise and foundational Generative AI principles.',
    icon: 'Lightbulb',
    labs: [
      { id: 'ge-101', title: 'Module 1: Intro to Gemini Enterprise (GE 101)', description: 'Understanding the capabilities of Gemini and core AI concepts.', icon: 'Presentation', stepsData: generateModuleSteps('ge-101', 'Intro to Gemini Enterprise', 'Understanding the capabilities of Gemini and core AI concepts.') },
      { id: 'ge-401', title: 'Lab 1: AI Administration & Governance (GE 401)', description: 'Administering AI access, monitoring usage, and data governance.', icon: 'SettingsIcon', stepsData: generateLabSteps('ge-401', 'AI Administration & Governance', 'Administering AI access, monitoring usage, and data governance.') }
    ]
  },
  {
    id: 'course-secure-edge',
    category: 'Security & Zero Trust',
    courseNumber: 'SEC-300',
    status: 'published',
    title: 'The Secure Edge',
    description: 'Browsing, Virtualization, and zero-trust security with Chrome Enterprise.',
    icon: 'Key',
    labs: [
      { id: 'cep-101', title: 'Module 1: Navigating Chrome Enterprise Premium (CEP 101)', description: 'Access changes, secure enterprise browsing, and download protections.', icon: 'Presentation', stepsData: generateModuleSteps('cep-101', 'Navigating Chrome Enterprise Premium', 'Access changes, secure enterprise browsing, and download protections.') },
      { id: 'cep-401', title: 'Lab 1: Chrome Enterprise Premium Administration (CEP 401)', description: 'Access policies, security telemetry, and fleet management.', icon: 'SettingsIcon', stepsData: generateLabSteps('cep-401', 'Chrome Enterprise Premium Administration', 'Access policies, security telemetry, and fleet management.') }
    ]
  },
  // --- DRAFT STUBS ---
  {
    id: 'course-rag-systems',
    category: 'Developer & Engineering',
    courseNumber: 'DEV-500',
    status: 'draft',
    title: 'Advanced RAG Systems Implementation',
    description: 'A deep dive into Retrieval-Augmented Generation, vector databases, and grounding your models with enterprise data.',
    icon: 'FileCode2',
    labs: []
  },
  {
    id: 'course-k8s-fleet',
    category: 'Cloud Infrastructure',
    courseNumber: 'GCP-202',
    status: 'draft',
    title: 'Kubernetes Cluster Fleet Management',
    description: 'Managing multi-region GKE clusters using Anthos and modern GitOps pipelines.',
    icon: 'Monitor',
    labs: []
  },
  {
    id: 'course-beyondcorp',
    category: 'Security & Zero Trust',
    courseNumber: 'SEC-400',
    status: 'draft',
    title: 'BeyondCorp Enterprise Implementation',
    description: 'Transitioning from legacy VPNs to context-aware, zero-trust access controls across your global workforce.',
    icon: 'Key',
    labs: []
  }
];

// --- MAIN APPLICATION APP COMPONENT ---
export default function App() {
  const [coursesData, setCoursesData] = useState(initialCoursesData);
  
  // Navigation State
  const [activeCourseId, setActiveCourseId] = useState(null);
  const [activeLabId, setActiveLabId] = useState(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [completedSteps, setCompletedSteps] = useState(new Set());
  const [enrolledCourses, setEnrolledCourses] = useState(new Set());
  const [portalTab, setPortalTab] = useState('catalog');
  const [viewMode, setViewMode] = useState('grid');
  
  // Settings & Authoring State 
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [theme, setTheme] = useState('dark');
  const [autoAdvance, setAutoAdvance] = useState(true);

  // --- PROGRESS HELPERS ---
  const getLabProgress = (lab) => {
    const total = lab.stepsData.length - 1; 
    const completed = lab.stepsData.filter(step => completedSteps.has(step.id) && !step.id.includes('completion')).length;
    return { total, completed, percentage: total === 0 ? 0 : Math.min(100, (completed / total) * 100) };
  };

  const getCourseProgress = (course) => {
    let total = 0;
    let completed = 0;
    course.labs.forEach(lab => {
      const prog = getLabProgress(lab);
      total += prog.total;
      completed += prog.completed;
    });
    return { total, completed, percentage: total === 0 ? 0 : Math.min(100, (completed / total) * 100) };
  };

  // --- STATE DERIVATIONS ---
  const activeCourse = coursesData.find(c => c.id === activeCourseId);
  const activeLab = activeCourse?.labs.find(l => l.id === activeLabId);
  const stepsData = activeLab ? activeLab.stepsData : [];
  const currentStep = activeLab ? stepsData[currentStepIndex] : null;
  const isLastStep = activeLab ? currentStepIndex === stepsData.length - 1 : false;

  // --- HANDLERS ---
  const handleStartCourse = (courseId) => {
    setActiveCourseId(courseId);
    setActiveLabId(null);
  };

  const handleStartLab = (labId) => {
    setActiveLabId(labId);
    setCurrentStepIndex(0);
  };

  const handleReturnToPortal = () => {
    setActiveCourseId(null);
    setActiveLabId(null);
  };

  const handleReturnToCourse = () => {
    if (isLastStep && activeLab) {
      const newCompleted = new Set(completedSteps);
      newCompleted.add(currentStep.id);
      setCompletedSteps(newCompleted);
    }
    setActiveLabId(null);
  };

  const handleNext = () => {
    if (!activeLab) return;
    const newCompleted = new Set(completedSteps);
    newCompleted.add(currentStep.id);
    setCompletedSteps(newCompleted);

    if (!isLastStep && autoAdvance) {
      setCurrentStepIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
    }
  };

  const handleEnroll = (courseId, e) => {
    if (e) e.stopPropagation();
    const newEnrolled = new Set(enrolledCourses);
    newEnrolled.add(courseId);
    setEnrolledCourses(newEnrolled);
    setPortalTab('my-courses');
  };

  // --- AUTHORING HANDLERS ---
  const handleCreateCourse = () => {
    const newCourse = {
      id: `course-${Date.now()}`,
      category: 'New Category',
      courseNumber: 'NEW-100',
      status: 'draft',
      title: 'New Course',
      description: 'Describe the outcome and goal of this learning path.',
      icon: 'Cloud',
      labs: []
    };
    setEditingCourse(newCourse);
  };

  const handleEditCourse = (course, e) => {
    if (e) e.stopPropagation();
    setEditingCourse(JSON.parse(JSON.stringify(course))); // deep clone
  };

  const handleSaveCourse = () => {
    if (!editingCourse) return;
    
    setCoursesData(prev => {
      const exists = prev.find(c => c.id === editingCourse.id);
      if (exists) {
        return prev.map(c => c.id === editingCourse.id ? editingCourse : c);
      }
      return [...prev, editingCourse];
    });
    setEditingCourse(null);
  };

  const handleDeleteCourse = () => {
    if (!editingCourse || !window.confirm("Are you sure you want to delete this course?")) return;
    setCoursesData(prev => prev.filter(c => c.id !== editingCourse.id));
    setEditingCourse(null);
  };

  // --- AUTHORING MODAL COMPONENT ---
  const CourseBuilderModal = () => {
    if (!editingCourse) return null;

    const addModule = () => {
      const id = `mod-${Date.now()}`;
      setEditingCourse({
        ...editingCourse,
        labs: [...editingCourse.labs, {
          id,
          title: 'Module: New Presentation',
          description: 'A new video and slide deck review module.',
          icon: 'Presentation',
          stepsData: generateModuleSteps(id, 'New Presentation', 'Review the architectural concepts.')
        }]
      });
    };

    const addLab = () => {
      const id = `lab-${Date.now()}`;
      setEditingCourse({
        ...editingCourse,
        labs: [...editingCourse.labs, {
          id,
          title: 'Lab: New Hands-on Exercise',
          description: 'A new terminal-based execution lab.',
          icon: 'Terminal',
          stepsData: generateLabSteps(id, 'New Hands-on Exercise', 'Execute the assigned configuration tasks.')
        }]
      });
    };

    const removeLab = (idx) => {
      const newLabs = [...editingCourse.labs];
      newLabs.splice(idx, 1);
      setEditingCourse({ ...editingCourse, labs: newLabs });
    };

    const updateLab = (idx, field, value) => {
      const newLabs = [...editingCourse.labs];
      newLabs[idx][field] = value;
      setEditingCourse({ ...editingCourse, labs: newLabs });
    };

    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200">
        <div className="bg-panel border border-main shadow-2xl rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
          
          <div className="flex items-center justify-between p-5 border-b border-main bg-muted">
            <h3 className="font-bold text-main flex items-center gap-2 text-lg">
              <Edit3 size={20} className="text-accent" /> Course Authoring Builder
            </h3>
            <button onClick={() => setEditingCourse(null)} className="text-muted hover:text-accent transition-colors bg-base p-1.5 rounded-full border border-main">
              <X size={18} />
            </button>
          </div>

          <div className="p-6 overflow-y-auto flex-1 space-y-8 custom-scrollbar">
            {/* Metadata Section */}
            <div className="space-y-4">
              <h4 className="font-bold text-main text-lg border-b border-main pb-2">Course Metadata</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-muted mb-1 uppercase tracking-wide">Course Title</label>
                  <input 
                    type="text" 
                    value={editingCourse.title}
                    onChange={(e) => setEditingCourse({...editingCourse, title: e.target.value})}
                    className="w-full bg-base border border-main rounded-lg p-3 text-main focus:outline-none focus:border-accent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-muted mb-1 uppercase tracking-wide">Category</label>
                  <input 
                    type="text" 
                    value={editingCourse.category || ''}
                    onChange={(e) => setEditingCourse({...editingCourse, category: e.target.value})}
                    className="w-full bg-base border border-main rounded-lg p-3 text-main focus:outline-none focus:border-accent"
                    placeholder="e.g. Developer & Engineering"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-muted mb-1 uppercase tracking-wide">Course Number</label>
                  <input 
                    type="text" 
                    value={editingCourse.courseNumber || ''}
                    onChange={(e) => setEditingCourse({...editingCourse, courseNumber: e.target.value})}
                    className="w-full bg-base border border-main rounded-lg p-3 text-main focus:outline-none focus:border-accent"
                    placeholder="e.g. DEV-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-muted mb-1 uppercase tracking-wide">Status</label>
                  <select
                    value={editingCourse.status || 'published'}
                    onChange={(e) => setEditingCourse({...editingCourse, status: e.target.value})}
                    className="w-full bg-base border border-main rounded-lg p-3 text-main focus:outline-none focus:border-accent appearance-none"
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-muted mb-1 uppercase tracking-wide">Description</label>
                <textarea 
                  value={editingCourse.description}
                  onChange={(e) => setEditingCourse({...editingCourse, description: e.target.value})}
                  className="w-full bg-base border border-main rounded-lg p-3 text-main h-24 focus:outline-none focus:border-accent"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-muted mb-2 uppercase tracking-wide">Course Icon</label>
                <div className="flex flex-wrap gap-3">
                  {['Cloud', 'Terminal', 'Monitor', 'Lightbulb', 'Key', 'Zap', 'Presentation', 'FileCode2'].map(i => (
                    <button 
                      key={i}
                      onClick={() => setEditingCourse({...editingCourse, icon: i})}
                      className={`p-3 rounded-lg border transition-all ${editingCourse.icon === i ? 'border-accent bg-accent-muted text-accent shadow-sm' : 'border-main text-muted hover:border-accent hover:text-accent bg-base'}`}
                    >
                      <DynamicIcon name={i} size={24} />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Curriculum Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-main pb-2">
                <h4 className="font-bold text-main text-lg">Curriculum</h4>
                <div className="flex gap-2">
                  <button onClick={addModule} className="text-xs font-bold bg-base border border-main hover:border-accent text-muted hover:text-accent px-3 py-1.5 rounded flex items-center gap-1 transition-colors"><Plus size={14}/> Add Module (100/200)</button>
                  <button onClick={addLab} className="text-xs font-bold bg-base border border-main hover:border-accent text-muted hover:text-accent px-3 py-1.5 rounded flex items-center gap-1 transition-colors"><Plus size={14}/> Add Lab (300/400)</button>
                </div>
              </div>

              {editingCourse.labs.length === 0 ? (
                <div className="text-center py-10 border-2 border-dashed border-main rounded-xl">
                  <p className="text-muted font-medium">No curriculum items yet. Add a Module or Lab to begin.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {editingCourse.labs.map((lab, index) => (
                    <div key={lab.id} className="bg-base border border-main rounded-xl p-4 flex gap-4">
                      <div className="mt-1 bg-muted p-2 rounded border border-main text-muted shrink-0">
                        <DynamicIcon name={lab.icon} size={20} />
                      </div>
                      <div className="flex-1 space-y-3">
                        <input 
                          type="text" 
                          value={lab.title}
                          onChange={(e) => updateLab(index, 'title', e.target.value)}
                          className="w-full bg-panel border border-main rounded p-2 text-sm font-bold text-main focus:outline-none focus:border-accent"
                          placeholder="Module / Lab Title"
                        />
                        <input 
                          type="text" 
                          value={lab.description}
                          onChange={(e) => updateLab(index, 'description', e.target.value)}
                          className="w-full bg-panel border border-main rounded p-2 text-sm text-main focus:outline-none focus:border-accent"
                          placeholder="Short description..."
                        />
                      </div>
                      <button onClick={() => removeLab(index)} className="text-muted hover:text-red-500 shrink-0 self-start p-2"><Trash2 size={18}/></button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="p-5 border-t border-main bg-muted flex justify-between items-center">
            <button 
              onClick={handleDeleteCourse}
              className="text-red-500 hover:text-red-600 font-bold text-sm flex items-center gap-1"
            >
              <Trash2 size={16}/> Delete Course
            </button>
            <div className="flex gap-3">
              <button 
                onClick={() => setEditingCourse(null)}
                className="px-6 py-2.5 rounded-lg text-sm font-bold uppercase tracking-wide border border-main text-muted hover:text-main bg-base transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleSaveCourse}
                className="accent-btn px-6 py-2.5 rounded-lg text-sm font-bold uppercase tracking-wide flex items-center gap-2"
              >
                <Save size={16}/> Save Course
              </button>
            </div>
          </div>

        </div>
      </div>
    );
  };

  // --- SETTINGS MODAL ---
  const SettingsModal = () => {
    if (!isSettingsOpen) return null;
    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center animate-in fade-in duration-200">
        <div className="bg-panel border border-main shadow-2xl rounded-2xl w-full max-w-lg overflow-hidden">
          <div className="flex items-center justify-between p-5 border-b border-main bg-muted">
            <h3 className="font-bold text-main flex items-center gap-2 text-lg">
              <SettingsIcon size={20} className="text-accent" /> Portal Settings
            </h3>
            <button onClick={() => setIsSettingsOpen(false)} className="text-muted hover:text-accent transition-colors bg-base p-1.5 rounded-full border border-main">
              <X size={18} />
            </button>
          </div>
          <div className="p-6 space-y-6">
            <div className="bg-base p-5 rounded-xl border border-main">
              <div className="flex items-center gap-2 mb-4">
                <Palette size={18} className="text-main" />
                <h4 className="font-bold text-main">Theme Engine</h4>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                {['light', 'dark', 'kitten', 'caribbean', 'lunar'].map(t => (
                  <button 
                    key={t}
                    onClick={() => setTheme(t)} 
                    className={`flex flex-col items-center gap-2 p-3 rounded-lg border transition-all ${theme === t ? 'border-accent bg-accent-muted shadow-sm' : 'border-main hover:border-accent hover:bg-muted'}`}
                  >
                    <div className={`w-8 h-8 rounded-full border-2 theme-${t} bg-panel border-accent shadow-sm flex items-center justify-center`}>
                      <div className="w-4 h-4 rounded-full bg-accent"></div>
                    </div>
                    <span className="text-[10px] font-bold text-main capitalize tracking-wide">{t}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between bg-base p-5 rounded-xl border border-main">
              <div>
                <h4 className="font-bold text-main">Auto-Advance Labs</h4>
                <p className="text-sm text-muted mt-0.5">Automatically skip to the next step.</p>
              </div>
              <button 
                onClick={() => setAutoAdvance(!autoAdvance)}
                className={`w-14 h-7 rounded-full transition-colors relative flex items-center shadow-inner ${autoAdvance ? 'bg-accent' : 'bg-muted border border-main'}`}
              >
                <div className={`w-5 h-5 bg-white rounded-full absolute shadow-md transition-transform transform ${autoAdvance ? 'translate-x-8' : 'translate-x-1'}`} />
              </button>
            </div>
          </div>
          <div className="p-5 border-t border-main bg-muted flex justify-end">
            <button 
              onClick={() => setIsSettingsOpen(false)}
              className="accent-btn px-6 py-2.5 rounded-lg text-sm font-bold uppercase tracking-wide transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`theme-${theme} app-bg min-h-screen transition-colors duration-300 font-sans`}>
      <style>{themeStyles}</style>
      <SettingsModal />
      <CourseBuilderModal />

      {/* ============================================================================
      // VIEW 1: MY LEARNING PORTAL (List of assigned courses)
      // ============================================================================ */}
      {!activeCourseId && (
        <div className="flex flex-col min-h-screen">
          <header className="bg-panel border-b border-main px-6 py-5 flex items-center justify-between sticky top-0 z-20 shadow-sm transition-colors duration-200">
            <div className="flex items-center gap-4">
              <TridorianLogo size={36} className="text-accent" />
              <div>
                <h1 className="text-2xl font-bold text-main leading-none tracking-tight lowercase">tridorian</h1>
                <p className="text-[10px] text-muted font-bold uppercase tracking-[0.2em] mt-1">Partner Portal v0.2</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button onClick={() => setIsSettingsOpen(true)} className="text-muted hover:text-accent transition-colors p-2.5 rounded-full hover:bg-muted">
                <SettingsIcon size={20} />
              </button>
              <div className="hidden sm:flex text-muted">
                <Search size={20} />
              </div>
            </div>
          </header>

          {/* Tab Navigation */}
          <div className="bg-panel border-b border-main sticky top-[81px] z-10 transition-colors duration-200">
            <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
              <div className="flex gap-8">
                <button
                  onClick={() => setPortalTab('catalog')}
                  className={`py-4 text-sm font-bold border-b-2 transition-all ${portalTab === 'catalog' ? 'border-accent text-accent' : 'border-transparent text-muted hover:text-main'}`}
                >
                  Course Catalog
                </button>
                <button
                  onClick={() => setPortalTab('my-courses')}
                  className={`py-4 text-sm font-bold border-b-2 transition-all flex items-center gap-2 ${portalTab === 'my-courses' ? 'border-accent text-accent' : 'border-transparent text-muted hover:text-main'}`}
                >
                  My Assigned Courses
                  <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${portalTab === 'my-courses' ? 'bg-accent text-accent-fg' : 'bg-muted text-muted'}`}>
                    {enrolledCourses.size}
                  </span>
                </button>
              </div>
              {portalTab === 'catalog' && (
                <div className="hidden sm:flex items-center gap-1 bg-muted p-1 rounded-lg border border-main">
                  <button onClick={() => setViewMode('grid')} className={`p-1.5 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-panel shadow-sm text-main' : 'text-muted hover:text-main'}`} title="Grid View"><Grid size={16}/></button>
                  <button onClick={() => setViewMode('list')} className={`p-1.5 rounded-md transition-colors ${viewMode === 'list' ? 'bg-panel shadow-sm text-main' : 'text-muted hover:text-main'}`} title="List View"><ListIcon size={16}/></button>
                </div>
              )}
            </div>
          </div>

          <main className="max-w-6xl mx-auto p-6 md:p-10 w-full flex-1">
            <div className="mb-10">
              <h2 className="text-4xl font-extrabold text-main mb-4 tracking-tight">
                {portalTab === 'catalog' ? 'Explore the Catalog' : 'Welcome back, Developer'}
              </h2>
              <p className="text-muted text-lg max-w-3xl leading-relaxed">
                {portalTab === 'catalog'
                  ? 'Browse available training modules and self-assign courses to expand your skill set.'
                  : 'Select an assigned course below to continue your training and hands-on labs.'}
              </p>
            </div>

            {portalTab === 'my-courses' && enrolledCourses.size === 0 && (
              <div className="text-center py-24 bg-panel rounded-2xl border border-main shadow-sm border-dashed">
                <GraduationCap size={56} className="mx-auto text-muted opacity-50 mb-5" />
                <h3 className="text-2xl font-bold text-main mb-2">No courses assigned yet</h3>
                <p className="text-muted mb-8 text-lg">You haven't enrolled in any training modules.</p>
                <button
                  onClick={() => setPortalTab('catalog')}
                  className="accent-btn px-8 py-3 rounded-lg font-bold inline-flex items-center gap-2 transition-all"
                >
                  Browse Catalog
                </button>
              </div>
            )}

            <div className="space-y-16">
              {(() => {
                const visibleCourses = coursesData.filter(course => portalTab === 'catalog' || enrolledCourses.has(course.id));
                const groupedCourses = visibleCourses.reduce((acc, course) => {
                  const cat = course.category || 'Uncategorized';
                  if (!acc[cat]) acc[cat] = [];
                  acc[cat].push(course);
                  return acc;
                }, {});

                return Object.entries(groupedCourses).map(([category, courses]) => (
                  <div key={category} className="space-y-6">
                    <h3 className="text-2xl font-bold text-main border-b-2 border-main inline-block pb-2 pr-8 tracking-tight">
                      {category}
                    </h3>
                    <div className={viewMode === 'grid' ? "grid md:grid-cols-2 lg:grid-cols-3 gap-8" : "flex flex-col gap-5"}>
                      {courses.map((course) => {
                        const progress = getCourseProgress(course);
                        const isComplete = progress.percentage === 100;
                        const isEnrolled = enrolledCourses.has(course.id);
                        const isDraft = course.status === 'draft';

                        if (viewMode === 'list') {
                          return (
                            <div key={course.id} className="bg-panel rounded-2xl border border-main shadow-sm hover:shadow-md hover:border-accent transition-all overflow-hidden flex flex-col md:flex-row group relative">
                              {portalTab === 'catalog' && (
                                 <button 
                                   onClick={(e) => handleEditCourse(course, e)}
                                   className="absolute top-4 right-4 z-10 p-2 bg-base rounded-lg border border-main text-muted hover:text-accent hover:border-accent opacity-0 group-hover:opacity-100 transition-all shadow-sm"
                                   title="Edit Course Content"
                                 >
                                   <Edit3 size={16} />
                                 </button>
                              )}
                              <div 
                                className={`p-6 flex-1 flex flex-col md:flex-row gap-6 items-start md:items-center ${isEnrolled ? 'cursor-pointer' : ''}`}
                                onClick={() => isEnrolled ? handleStartCourse(course.id) : null}
                              >
                                <div className={`p-4 rounded-xl shrink-0 transition-colors ${isComplete ? 'bg-accent-muted text-accent' : 'bg-muted text-main group-hover:bg-accent group-hover:text-accent-fg'}`}>
                                  <DynamicIcon name={course.icon} size={32} />
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-1">
                                    <span className="text-xs font-bold text-muted uppercase tracking-widest">{course.courseNumber || 'Course'}</span>
                                    {isDraft && <span className="bg-amber-500/10 text-amber-600 border border-amber-500/20 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-widest">Draft</span>}
                                  </div>
                                  <h3 className="text-xl font-bold text-main mb-2 tracking-tight">{course.title}</h3>
                                  <p className="text-sm text-muted line-clamp-2 leading-relaxed max-w-2xl">{course.description}</p>
                                </div>
                              </div>
                              <div className="p-6 border-t md:border-t-0 md:border-l border-main bg-base w-full md:w-64 flex flex-col justify-center shrink-0 gap-4">
                                <div>
                                  <div className="flex justify-between text-xs text-muted font-bold uppercase tracking-wider mb-2">
                                    <span>{course.labs?.length || 0} Modules</span>
                                    {isEnrolled && <span className="text-accent">{Math.round(progress.percentage)}%</span>}
                                  </div>
                                  <div className="w-full bg-muted h-2 rounded-full overflow-hidden border border-main">
                                    <div
                                      className={`h-full transition-all duration-500 bg-accent`}
                                      style={{ width: `${isEnrolled ? progress.percentage : 0}%` }}
                                    />
                                  </div>
                                </div>
                                {isEnrolled ? (
                                  <button
                                    onClick={() => handleStartCourse(course.id)}
                                    className="flex w-full items-center justify-between text-sm font-bold text-main group-hover:text-accent uppercase tracking-wide bg-panel border border-main rounded-lg px-4 py-2 hover:border-accent transition-colors"
                                  >
                                    <span>{isComplete ? 'Review' : progress.percentage > 0 ? 'Resume' : 'Start'}</span>
                                    <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                  </button>
                                ) : (
                                  <button
                                    onClick={(e) => handleEnroll(course.id, e)}
                                    className="flex w-full items-center justify-center gap-2 accent-btn py-2 rounded-lg text-sm font-bold uppercase tracking-wide transition-colors"
                                  >
                                    <Plus size={16} /> Assign to Me
                                  </button>
                                )}
                              </div>
                            </div>
                          );
                        }

                        return (
                          <div key={course.id} className="bg-panel rounded-2xl border border-main shadow-sm hover:shadow-xl hover:border-accent transition-all overflow-hidden flex flex-col group relative h-full">
                            {/* Editor Access */}
                            {portalTab === 'catalog' && (
                               <button 
                                 onClick={(e) => handleEditCourse(course, e)}
                                 className="absolute top-4 right-4 z-10 p-2 bg-base rounded-lg border border-main text-muted hover:text-accent hover:border-accent opacity-0 group-hover:opacity-100 transition-all shadow-sm"
                                 title="Edit Course Content"
                               >
                                 <Edit3 size={16} />
                               </button>
                            )}

                            <div
                              className={`p-8 flex-1 ${isEnrolled ? 'cursor-pointer' : ''}`}
                              onClick={() => isEnrolled ? handleStartCourse(course.id) : null}
                            >
                              <div className="flex items-start justify-between mb-6">
                                <div className={`p-4 rounded-xl transition-colors ${isComplete ? 'bg-accent-muted text-accent' : 'bg-muted text-main group-hover:bg-accent group-hover:text-accent-fg'}`}>
                                  <DynamicIcon name={course.icon} size={32} />
                                </div>
                                <div className="flex flex-col gap-2 items-end">
                                  {isDraft && <span className="bg-amber-500/10 text-amber-600 border border-amber-500/20 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">Draft</span>}
                                  {isComplete && <span className="bg-accent text-accent-fg text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 uppercase tracking-wide shadow-accent"><CheckCircle2 size={12}/> Completed</span>}
                                  {!isEnrolled && !isComplete && <span className="bg-accent text-accent-fg text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide shadow-accent">New</span>}
                                </div>
                              </div>
                              <div className="text-xs font-bold text-muted uppercase tracking-widest mb-2">{course.courseNumber || 'Course'}</div>
                              <h3 className="text-xl font-bold text-main mb-3 tracking-tight">{course.title}</h3>
                              <p className="text-sm text-muted line-clamp-3 leading-relaxed">
                                {course.description}
                              </p>
                            </div>

                            <div className="px-8 pb-6 shrink-0">
                              <div className="flex justify-between text-xs text-muted font-bold uppercase tracking-wider mb-2">
                                <span>{course.labs?.length || 0} Modules & Labs</span>
                                {isEnrolled && <span className="text-accent">{Math.round(progress.percentage)}%</span>}
                              </div>
                              <div className="w-full bg-muted h-2 rounded-full overflow-hidden border border-main">
                                <div
                                  className={`h-full transition-all duration-500 bg-accent`}
                                  style={{ width: `${isEnrolled ? progress.percentage : 0}%` }}
                                />
                              </div>
                            </div>

                            <div className="p-5 border-t border-main bg-base shrink-0">
                              {isEnrolled ? (
                                <button
                                  onClick={() => handleStartCourse(course.id)}
                                  className="flex w-full items-center justify-between text-sm font-bold text-main group-hover:text-accent uppercase tracking-wide"
                                >
                                  <span>{isComplete ? 'Review Course' : progress.percentage > 0 ? 'Resume Course' : 'Start Course'}</span>
                                  <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </button>
                              ) : (
                                <button
                                  onClick={(e) => handleEnroll(course.id, e)}
                                  className="flex w-full items-center justify-center gap-2 accent-btn py-3 rounded-lg font-bold uppercase tracking-wide transition-colors"
                                >
                                  <Plus size={18} /> Assign to Me
                                </button>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ));
              })()}

              {portalTab === 'catalog' && (
                <div className="pt-8 border-t border-main mt-12">
                   <button 
                     onClick={handleCreateCourse}
                     className="w-full bg-panel rounded-2xl border-2 border-dashed border-main shadow-sm hover:border-accent hover:bg-accent-muted transition-all py-12 flex flex-col items-center justify-center text-muted hover:text-accent group"
                   >
                     <div className="w-16 h-16 rounded-full bg-base border border-main flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                       <Plus size={32} />
                     </div>
                     <h3 className="text-xl font-bold tracking-tight">Create Custom Course</h3>
                     <p className="text-sm mt-2 max-w-md text-center">Add a new learning path to the catalog. You can assign it to a new or existing category.</p>
                   </button>
                </div>
              )}
            </div>
          </main>
        </div>
      )}

      {/* ============================================================================
      // VIEW 2: COURSE DASHBOARD (List of labs in the selected course)
      // ============================================================================ */}
      {activeCourseId && !activeLabId && (() => {
        const courseProgress = getCourseProgress(activeCourse);

        return (
          <div className="flex flex-col min-h-screen">
            <header className="bg-panel border-b border-main px-6 py-4 flex items-center justify-between sticky top-0 z-10 shadow-sm transition-colors duration-200">
              <div className="flex items-center gap-5">
                <button 
                  onClick={handleReturnToPortal}
                  className="text-muted hover:text-accent transition-colors flex items-center gap-1.5 text-sm font-bold bg-muted hover:bg-accent-muted px-4 py-2 rounded-lg uppercase tracking-wide border border-transparent hover:border-accent"
                >
                  <ArrowLeft size={16} /> Portal
                </button>
                <div className="h-8 w-px bg-main hidden sm:block border-l border-main"></div>
                <div className="hidden sm:flex items-center gap-3">
                   <DynamicIcon name={activeCourse.icon} size={24} className="text-accent" />
                   <h1 className="text-xl font-bold text-main leading-tight tracking-tight">{activeCourse.title}</h1>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <button onClick={() => setIsSettingsOpen(true)} className="text-muted hover:text-accent transition-colors p-2 rounded-full hover:bg-muted md:hidden">
                  <SettingsIcon size={20} />
                </button>
                <div className="hidden sm:flex items-center gap-4 w-72">
                  <span className="text-xs text-muted font-bold uppercase tracking-widest">Progress</span>
                  <div className="flex-1 bg-muted border border-main h-2.5 rounded-full overflow-hidden">
                    <div 
                      className="bg-accent h-full transition-all duration-500 ease-out"
                      style={{ width: `${courseProgress.percentage}%` }}
                    />
                  </div>
                  <span className="text-sm font-bold text-accent">
                    {Math.round(courseProgress.percentage)}%
                  </span>
                </div>
              </div>
            </header>

            <main className="max-w-5xl mx-auto p-6 md:p-10 w-full flex-1">
              <div className="mb-10 text-center md:text-left flex justify-between items-end">
                <div>
                  <h2 className="text-3xl font-extrabold text-main mb-4 tracking-tight">Course Modules</h2>
                  <p className="text-muted text-lg max-w-3xl">
                    Complete the modules and hands-on labs below in sequence.
                  </p>
                </div>
                <button onClick={(e) => handleEditCourse(activeCourse, e)} className="hidden md:flex items-center gap-2 text-sm font-bold text-muted hover:text-accent bg-base px-4 py-2 border border-main rounded-lg transition-colors">
                  <Edit3 size={16} /> Edit Track
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {activeCourse.labs.map((lab) => {
                  const labProgress = getLabProgress(lab);
                  const isLabComplete = labProgress.percentage === 100;
                  
                  return (
                    <div key={lab.id} className="bg-panel rounded-2xl border border-main shadow-sm hover:shadow-lg transition-shadow overflow-hidden flex flex-col">
                      <div className="p-8 flex-1">
                        <div className="flex items-center gap-5 mb-5">
                          <div className={`p-4 rounded-xl ${isLabComplete ? 'bg-accent text-accent-fg shadow-accent' : 'bg-muted text-main border border-main'}`}>
                            {isLabComplete ? <CheckCircle2 size={28} /> : <DynamicIcon name={lab.icon} size={28} />}
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-main tracking-tight">{lab.title}</h3>
                            <p className="text-sm text-muted font-bold uppercase tracking-wide mt-1">{labProgress.total} Steps • ~15 mins</p>
                          </div>
                        </div>
                        <p className="text-muted leading-relaxed">
                          {lab.description}
                        </p>
                      </div>
                      <div className="bg-base border-t border-main p-5 flex items-center justify-between">
                        <span className="text-sm font-bold text-muted uppercase tracking-wide">
                          {isLabComplete ? '100% Complete' : `${labProgress.completed} / ${labProgress.total} Steps Finished`}
                        </span>
                        <button
                          onClick={() => handleStartLab(lab.id)}
                          className={`px-6 py-2.5 rounded-lg font-bold flex items-center gap-2 transition-all uppercase tracking-wide text-sm ${
                            isLabComplete 
                              ? 'bg-muted text-main hover:brightness-95 border border-main'
                              : 'accent-btn'
                          }`}
                        >
                          {isLabComplete ? 'Review' : labProgress.completed > 0 ? 'Resume' : 'Start'}
                          {!isLabComplete && <PlayCircle size={18} />}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </main>
          </div>
        );
      })()}

      {/* ============================================================================
      // VIEW 3: ACTIVE LAB (Step by step guide)
      // ============================================================================ */}
      {activeLabId && (() => {
        const labProgress = getLabProgress(activeLab);
        
        return (
          <div className="flex flex-col min-h-screen">
            <header className="bg-panel border-b border-main px-6 py-4 flex items-center justify-between sticky top-0 z-10 transition-colors duration-200 shadow-sm">
              <div className="flex items-center gap-4">
                <button 
                  onClick={handleReturnToCourse}
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
                    style={{ width: `${labProgress.percentage}%` }}
                  />
                </div>
                <span className="text-sm font-bold text-main">
                  {Math.round(labProgress.percentage)}%
                </span>
              </div>
            </header>

            <div className="flex flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 gap-6 flex-col md:flex-row">
              {/* Sidebar Navigation */}
              <aside className="w-full md:w-72 shrink-0">
                <div className="bg-panel rounded-2xl border border-main shadow-sm overflow-hidden sticky top-24 transition-colors duration-200">
                  <div className="p-5 bg-base border-b border-main flex items-center justify-between">
                    <div className="flex items-center gap-2">
                       <Layout size={18} className="text-muted" />
                       <h3 className="font-bold text-main uppercase tracking-widest text-xs">Steps</h3>
                    </div>
                  </div>
                  <nav className="p-3 space-y-1">
                    {stepsData.map((step, index) => {
                      const isCompleted = completedSteps.has(step.id);
                      const isActive = index === currentStepIndex;

                      return (
                        <button
                          key={step.id}
                          onClick={() => setCurrentStepIndex(index)}
                          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-colors ${
                            isActive 
                              ? 'bg-accent-muted text-accent border border-accent shadow-sm' 
                              : 'hover:bg-muted text-muted border border-transparent hover:border-main'
                          }`}
                        >
                          {isCompleted ? (
                            <CheckCircle2 size={20} className="text-accent shrink-0" />
                          ) : isActive ? (
                            <Circle size={20} className="text-accent fill-accent-muted shrink-0" />
                          ) : (
                            <Circle size={20} className="text-muted opacity-50 shrink-0" />
                          )}
                          <span className={`text-sm ${isActive ? 'font-bold' : 'font-medium'} truncate`}>
                            {step.title}
                          </span>
                        </button>
                      );
                    })}
                  </nav>
                </div>
              </aside>

              {/* Main Content Area */}
              <main className="flex-1 flex flex-col">
                <div className="bg-panel rounded-2xl border border-main shadow-sm p-6 sm:p-10 flex-1 relative overflow-hidden flex flex-col transition-colors duration-200">
                  
                  {/* Step Header */}
                  <div className="flex items-center gap-3 text-accent mb-8 shrink-0 border-b border-main pb-6">
                    <DynamicIcon name={currentStep?.icon} size={32} />
                    <span className="text-sm font-bold tracking-widest uppercase">Step {currentStepIndex + 1} of {stepsData.length}</span>
                  </div>

                  {/* Dynamic Content */}
                  <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 pb-28 flex-1">
                    {currentStep && <currentStep.content />}
                  </div>

                  {/* Bottom Actions */}
                  <div className="absolute bottom-0 left-0 right-0 bg-panel border-t border-main p-6 flex items-center justify-between transition-colors duration-200">
                    <button
                      onClick={handlePrev}
                      disabled={currentStepIndex === 0}
                      className="px-5 py-2.5 text-muted hover:text-main disabled:opacity-30 disabled:hover:text-muted flex items-center gap-2 font-bold uppercase tracking-wide text-sm transition-colors border border-transparent hover:border-main rounded-lg"
                    >
                      <ChevronLeft size={20} /> Back
                    </button>
                    
                    {!isLastStep ? (
                      <button
                        onClick={handleNext}
                        className="accent-btn px-8 py-3 rounded-lg font-bold flex items-center gap-2 uppercase tracking-wide text-sm"
                      >
                        Mark Complete & Continue <ChevronRight size={20} />
                      </button>
                    ) : (
                      <button
                        onClick={handleReturnToCourse}
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
      })()}

    </div>
  );
}
