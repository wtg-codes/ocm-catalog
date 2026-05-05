import React from 'react';
import {
  Play, Presentation, Award, BookOpen, Layout, Terminal,
  CheckCircle2, ChevronRight, ChevronLeft, ArrowLeft, Zap, Key, Lightbulb,
  Monitor, MessageSquare, FileCode2, GitPullRequest
} from 'lucide-react';
import { Track, Course, Module, Step } from '../types';
import { CodeBlock } from '../components/common/CodeBlock';
import { DeepDive } from '../components/common/DeepDive';
import { RefLink } from '../components/common/RefLink';
import { downloadQuickRefGuide } from '../utils/downloadUtils';

// --- FACTORY FUNCTIONS FOR STUBS ---
export const generateModuleSteps = (moduleId: string, moduleTitle: string, moduleDesc: string): Step[] => [
  {
    id: `${moduleId}-intro`,
    title: '1. Keynote Video',
    icon: 'Play',
    content: () => (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-main tracking-tight">Keynote Video</h2>
        <p className="text-muted font-medium">Before diving into the hands-on labs, watch this brief overview covering the core concepts for this module.</p>
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
        <p className="text-muted font-medium">Review the deployment architecture, quota management strategies, and security protocols: <strong>{moduleDesc}</strong></p>
        <div className="relative w-full aspect-video bg-muted rounded-xl border border-main flex flex-col items-center justify-center overflow-hidden shadow-sm mt-6 group">
           <div className="absolute inset-0 bg-panel opacity-50"></div>
           <div className="relative z-10 flex flex-col items-center text-center p-6">
             <div className="w-16 h-16 bg-base rounded-2xl flex items-center justify-center border border-main mb-4 shadow-sm">
               <Presentation size={32} className="text-accent" />
             </div>
             <h3 className="text-main font-bold text-xl mb-2">{moduleTitle}</h3>
             <p className="text-muted text-sm max-w-sm mb-6 font-medium">Interactive slide deck placeholder. The actual Google Slides embed will render here.</p>
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
        <p className="text-muted max-w-md mx-auto text-lg font-medium">You've successfully completed the pre-requisite learning material. You are now ready to advance.</p>
      </div>
    )
  }
];

export const generateLabSteps = (moduleId: string, moduleTitle: string, moduleDesc: string): Step[] => [
  {
    id: `${moduleId}-intro`,
    title: 'Lab Overview',
    icon: 'BookOpen',
    content: () => (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-main tracking-tight">{moduleTitle}</h2>
        <p className="text-muted text-lg font-medium">{moduleDesc}</p>
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
    id: `${moduleId}-exec`,
    title: '1. Hands-on Execution',
    icon: 'Terminal',
    content: () => (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-main tracking-tight">Executing the Lab</h2>
        <p className="text-muted font-medium">Follow the steps below to complete the configuration for this lab within your company-provided environment.</p>
        <div className="space-y-6 mt-6">
          <div className="flex gap-4 items-start border-b border-main pb-5">
            <div className="bg-accent-muted text-accent font-bold w-8 h-8 rounded-full flex items-center justify-center shrink-0 border border-accent">1</div>
            <div className="w-full">
              <h4 className="font-bold text-main">Initialize Environment</h4>
              <p className="text-sm text-muted mb-3 font-medium">Run the setup script in your cloud shell.</p>
              <CodeBlock code="./setup-lab.sh --init" language="bash" />
            </div>
          </div>
          <div className="flex gap-4 items-start pb-5">
            <div className="bg-accent-muted text-accent font-bold w-8 h-8 rounded-full flex items-center justify-center shrink-0 border border-accent">2</div>
            <div className="w-full">
              <h4 className="font-bold text-main">Deploy Resources</h4>
              <p className="text-sm text-muted mb-3 font-medium">Apply the standard deployment manifests.</p>
              <CodeBlock code="kubectl apply -f ./manifests/" language="bash" />
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: `${moduleId}-completion`,
    title: 'Lab Complete',
    icon: 'Award',
    content: () => (
      <div className="text-center space-y-6 py-10">
        <div className="mx-auto w-24 h-24 bg-accent-muted rounded-full flex items-center justify-center mb-6 border border-accent">
          <Award size={48} className="text-accent" />
        </div>
        <h2 className="text-3xl font-extrabold text-main tracking-tight">Lab Complete!</h2>
        <p className="text-muted max-w-md mx-auto text-lg font-medium">You've successfully completed the hands-on exercises. Your environment has been validated.</p>
      </div>
    )
  }
];

export const initialTracksData: Track[] = [
  {
    id: 'track-agentic-dev',
    category: 'Developer & Engineering',
    trackNumber: 'TRK-400',
    status: 'published',
    title: 'Agentic Developer Track',
    description: 'Master Antigravity IDE, Gemini CLI, and Jules in this comprehensive learning track.',
    icon: 'Terminal',
    courses: [
  {
    id: 'course-agentic',
    title: 'Agentic Developer Toolkit Workshop',
    description: 'Master Antigravity IDE, Gemini CLI, and Jules in this comprehensive hands-on workshop designed for modern development teams.',
    icon: 'Terminal',
    modules: [
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
                <p className="text-muted font-medium">
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
                <p className="text-muted font-medium">
                  Review the [Company Name] deployment architecture, quota management strategies, and security protocols.
                </p>
                <div className="relative w-full aspect-video bg-muted rounded-xl border border-main flex flex-col items-center justify-center overflow-hidden shadow-sm mt-6 group">
                   <div className="absolute inset-0 bg-panel opacity-50"></div>
                   <div className="relative z-10 flex flex-col items-center text-center p-6">
                     <div className="w-16 h-16 bg-base rounded-2xl flex items-center justify-center border border-main mb-4 shadow-sm">
                       <Presentation size={32} className="text-accent" />
                     </div>
                     <h3 className="text-main font-bold text-xl mb-2">Agentic Workflows 101</h3>
                     <p className="text-muted text-sm max-w-sm mb-6 font-medium">Interactive slide deck placeholder. The actual Google Slides embed will render here.</p>
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
                <p className="text-muted max-w-md mx-auto text-lg font-medium">
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
                <p className="text-muted text-lg font-medium">
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
                <p className="text-muted font-medium">
                  Antigravity is built as a fork of VS Code, meaning all your favorite extensions and keybindings are fully supported out of the box.
                </p>

                <div className="space-y-6 mt-6">
                  <div className="flex gap-4 items-start border-b border-main pb-5">
                    <div className="bg-accent-muted text-accent font-bold w-8 h-8 rounded-full flex items-center justify-center shrink-0 border border-accent">1</div>
                    <div className="w-full">
                      <h4 className="font-bold text-main">Download the IDE</h4>
                      <p className="text-sm text-muted mb-3 font-medium">Download the Spring 2026 release of Antigravity for your OS.</p>
                      <CodeBlock code="https://antigravity.google/download" language="text" />
                    </div>
                  </div>

                  <div className="flex gap-4 items-start border-b border-main pb-5">
                    <div className="bg-accent-muted text-accent font-bold w-8 h-8 rounded-full flex items-center justify-center shrink-0 border border-accent">2</div>
                    <div>
                      <h4 className="font-bold text-main">Migrate Extensions</h4>
                      <p className="text-sm text-muted mb-2 font-medium">On first launch, you will be prompted to import your environment. Click <strong className="text-main">"Import from VS Code"</strong> to instantly port your themes, settings, and snippets.</p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start border-b border-main pb-5">
                    <div className="bg-accent-muted text-accent font-bold w-8 h-8 rounded-full flex items-center justify-center shrink-0 border border-accent">3</div>
                    <div>
                      <h4 className="font-bold text-main">Authenticate</h4>
                      <p className="text-sm text-muted font-medium">Click the Account icon in the bottom left. Sign in using your company-provided Google Workspace email. This automatically links your IDE to your enterprise quota, giving you access to Gemini 3.1 Pro.</p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start">
                    <div className="bg-accent-muted text-accent font-bold w-8 h-8 rounded-full flex items-center justify-center shrink-0 border border-accent">4</div>
                    <div className="w-full">
                      <h4 className="font-bold text-main">Set Autonomy Level</h4>
                      <p className="text-sm text-muted mb-3 font-medium">By default, agents will ask permission before running terminal commands. For this workshop, let's keep it that way to learn how the agent thinks.</p>
                      <div className="bg-muted border border-main p-3 rounded-md text-sm text-main font-mono inline-block font-medium">
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
                <p className="text-muted font-medium">
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
                      <p className="text-sm text-muted mb-4 font-medium">Best for: Quick generation, refactoring highlighted code, or writing docs.</p>
                      <ol className="list-decimal pl-5 space-y-3 text-sm text-main font-medium">
                        <li>Open a new empty file and save it as <code>server.js</code>.</li>
                        <li>Press <kbd className="bg-muted border border-main rounded px-1.5 py-0.5 font-mono text-accent">Cmd + I</kbd> (or Ctrl+I).</li>
                        <li>Type the following prompt and hit Enter:</li>
                      </ol>
                      <div className="mt-4">
                        <CodeBlock code="Build a standard Express.js boilerplate listening on port 3000 with one /health route." language="prompt" />
                      </div>
                      <p className="text-sm text-muted mt-4 flex items-center gap-2 font-bold uppercase tracking-wide">
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
                      <p className="text-sm text-muted mb-4 font-medium">Best for: Complex architecture, debugging across files, or running terminal commands.</p>
                      <ol className="list-decimal pl-5 space-y-3 text-sm text-main mb-4 font-medium">
                        <li>Press <kbd className="bg-muted border border-main rounded px-1.5 py-0.5 font-mono text-accent">Cmd + L</kbd> to open the Agent Manager sidebar.</li>
                        <li>Give the agent a complex objective:</li>
                      </ol>
                      <CodeBlock code="Look at server.js. Initialize a package.json, install the required dependencies via npm, and create a Dockerfile to containerize this app." language="prompt" />
                      <div className="mt-5 bg-accent-muted border-l-4 border-accent p-4 text-sm text-main rounded-r-lg font-medium">
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
                <p className="text-muted font-medium">
                  Agents work best when they understand your team's specific standards. Instead of repeating yourself in every prompt, you configure Agent Rules.
                </p>

                <div className="mt-6">
                  <h4 className="font-bold text-main mb-2">Creating a Workspace Rule</h4>
                  <p className="text-sm text-muted mb-4 font-medium">
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
                  <p className="bg-muted p-3 rounded mt-2 border border-main font-medium"><strong>Global Rules Tip:</strong> Want rules applied to *every* project you open? Create a <code className="text-accent">~/.gemini/GEMINI.md</code> file on your computer. Antigravity will use this as your baseline personality globally.</p>
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
                <p className="text-muted text-lg font-medium">
                  Agentic workflows consume massive amounts of context. Antigravity abstracts this into a "Baseline Quota." Once exhausted, your team dips into AI Credits. However, there is a powerful way to mitigate this.
                </p>

                <div className="bg-accent-muted border border-accent p-6 rounded-xl mt-6 shadow-sm">
                  <h3 className="font-bold text-accent mb-3 flex items-center gap-2 text-lg"><Key size={20}/> Enterprise Billing Integration</h3>
                  <p className="text-sm text-main mb-4 leading-relaxed font-medium">
                    By logging in with your company-provisioned Google Workspace account in Step 1, you automatically unlocked the <strong>Google AI Ultra</strong> tier.
                  </p>
                  <p className="text-sm text-main font-bold bg-panel p-3 rounded-lg inline-block border border-main">
                    To view your team's usage, type <code className="font-bold">&gt; Google AI: Show Quota</code> in the Antigravity command palette (Cmd+Shift+P).
                  </p>
                </div>

                <div className="bg-panel border border-main p-6 rounded-xl mt-6 shadow-sm">
                  <h3 className="font-bold text-main mb-3 flex items-center gap-2 text-lg"><Terminal size={20} className="text-accent"/> The Hybrid Workflow (Zero Cost Strategy)</h3>
                  <p className="text-sm text-muted mb-4 leading-relaxed font-medium">
                    For massive enterprises, developers can save cloud quota by routing simple, high-frequency queries to local hardware.
                  </p>
                  <CodeBlock code="# In your terminal, verify Ollama v0.20.0+ is installed and run:
ollama run gemma4:e4b

# Then in Antigravity Settings, change the 'Fast Mode' provider to 'Localhost (Ollama)'." language="bash" />
                </div>

                <DeepDive title="Reference: Gemma 4 & Hardware Requirements (April 2026)">
                  <p>Provided you are using the latest 2026 versions of the software, this setup leverages Antigravity's "model agnostic" architecture, which allows you to swap cloud-based models for local ones running on your own hardware.</p>

                  <h4 className="font-bold mt-4 mb-2 text-main">Why this works:</h4>
                  <ul className="list-disc pl-5 space-y-2 font-medium">
                    <li><strong>Gemma 4 Availability:</strong> Google released the Gemma 4 family on April 2, 2026. The model <code>gemma4:e4b</code> (Effective 4B) is designed for efficient on-device execution and runs smoothly on standard laptops.</li>
                    <li><strong>Ollama Support:</strong> Ollama shipped same-day support (v0.20.0) for Gemma 4, allowing the model to run immediately via the CLI.</li>
                    <li><strong>Antigravity Integration:</strong> Antigravity is natively compatible with local inference servers like Ollama. Changing the 'Fast Mode' provider to Localhost (Ollama) will route high-frequency tasks to your local machine instead of using cloud quota for Gemini 3.1 Flash.</li>
                  </ul>

                  <h4 className="font-bold mt-5 mb-2 text-main">Hardware Requirements:</h4>
                  <p className="font-medium">Verify that your hardware meets these 2026 standards to run the E4B model effectively:</p>
                  <ul className="list-disc pl-5 space-y-2 mt-2 font-medium">
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
                <p className="text-muted max-w-md mx-auto text-lg font-medium">
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
                <p className="text-muted text-lg font-medium">
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
                <p className="text-muted font-medium">
                  The Gemini CLI allows you to pass output from traditional bash commands directly into an AI model for summarization, refactoring, or analysis.
                </p>

                <div className="space-y-6 mt-6">
                  <div>
                    <h4 className="font-bold text-main mb-2">Installation & Auth</h4>
                    <CodeBlock code="npm install -g @google/gemini-cli\ngemini auth login" language="bash" />
                  </div>

                  <div className="pt-4 border-t border-main">
                    <h4 className="font-bold text-main mb-2">Practical Example: Git Diffs</h4>
                    <p className="text-sm text-muted mb-3 font-medium">Pipe a diff into the CLI to generate a human-readable summary for a PR description:</p>
                    <CodeBlock code="git diff main | gemini prompt 'Write a professional Pull Request description for these changes, highlighting breaking changes.'" language="bash" />
                  </div>

                  <div className="pt-4 border-t border-main">
                    <h4 className="font-bold text-main mb-2">Practical Example: Log Analysis</h4>
                    <p className="text-sm text-muted mb-3 font-medium">Got a massive error log? Have the CLI find the needle in the haystack:</p>
                    <CodeBlock code="cat /var/log/nginx/error.log | tail -n 500 | gemini prompt 'Find the root cause of the 502 errors and suggest a fix.'" language="bash" />
                  </div>
                </div>

                <DeepDive title="Reference: Advanced CLI Pipelining & Scripting">
                  <p>The true power of the Gemini CLI is its ability to be integrated into existing bash scripts. Use the <code>--silent</code> flag to output pure text without UI formatting, allowing you to chain AI outputs into other command-line tools like <code>jq</code>.</p>
                  <p className="mt-3 font-bold text-main">Example: Fetching JSON from an API, using Gemini to reformat it, and saving it.</p>
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
                <p className="text-muted font-medium">
                  Jules is an asynchronous, cloud-based agent. Unlike your local IDE, Jules clones your entire repo into a Google Cloud VM, installs dependencies, runs tests, and creates PRs while you sleep.
                </p>

                <div className="space-y-6 mt-6">
                  <div>
                    <h4 className="font-bold text-main mb-2">Installing Jules Tools</h4>
                    <p className="text-sm text-muted mb-3 font-medium">Install the dedicated CLI for managing your cloud agent sessions.</p>
                    <CodeBlock code="npm install -g @google/jules\njules auth login" language="bash" />
                  </div>

                  <div className="bg-accent-muted border-l-4 border-accent p-5 rounded-r-xl shadow-sm">
                    <h4 className="font-bold text-accent mb-2">How Billing Works</h4>
                    <p className="text-sm text-main leading-relaxed font-medium">
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
                <p className="text-muted font-medium">
                  There are two main ways to tell Jules to get to work. Let's look at how to trigger an asynchronous task.
                </p>

                <div className="mt-6 space-y-6">
                  {/* Method 1 */}
                  <div className="border border-main rounded-xl p-6 shadow-sm bg-panel">
                    <h4 className="font-bold text-main mb-3 text-lg">Method 1: GitHub Issue Integration (Recommended)</h4>
                    <p className="text-sm text-muted mb-4 font-medium">If you have installed the Jules GitHub App on your repository, triggering the agent is as simple as creating an issue.</p>
                    <ol className="list-decimal pl-5 space-y-3 text-sm text-main font-medium">
                      <li>Go to your GitHub repository and create a new Issue.</li>
                      <li>Title: <code className="bg-muted px-1.5 py-0.5 rounded text-accent font-bold">Bump Next.js to v15 and fix breaking changes</code></li>
                      <li>Add the label: <span className="bg-accent text-accent-fg px-2 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide">@jules-agent</span></li>
                    </ol>
                  </div>

                  {/* Method 2 */}
                  <div className="border border-main rounded-xl p-6 shadow-sm bg-panel">
                    <h4 className="font-bold text-main mb-3 text-lg">Method 2: Trigger via CLI</h4>
                    <p className="text-sm text-muted mb-4 font-medium">You can offload a task directly from your terminal without opening a browser.</p>
                    <CodeBlock code="# Ensure you are inside your local git repository\njules run 'Find all deprecated API calls in the /src directory and update them. Create a PR when finished.'" language="bash" />

                    <div className="mt-5 bg-muted p-4 rounded-lg border border-main shadow-sm">
                      <p className="text-sm text-main font-bold mb-3 flex items-center gap-2 uppercase tracking-wide"><Layout size={16}/> Tracking Progress:</p>
                      <CodeBlock code="$ jules dashboard\n[RUNNING] Task #492: Update /src API calls... (Running tests)\n[SUCCESS] Task #491: Fix memory leak in auth... (PR #42 opened)" language="text" />
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
                <p className="text-muted max-w-md mx-auto text-lg font-medium">
                  You have successfully configured the Gemini CLI and dispatched an asynchronous background task using Jules.
                </p>

                <div className="bg-panel border border-main p-8 rounded-xl text-left max-w-xl mx-auto mt-8 shadow-sm">
                  <h3 className="font-bold text-main border-b border-main pb-3 mb-4 flex items-center gap-2 text-lg uppercase tracking-tight"><Lightbulb size={20} className="text-accent"/> Workshop Summary:</h3>
                  <ul className="space-y-4 text-sm text-main font-medium">
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
    ]
  },
];
