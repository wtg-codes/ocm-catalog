export const downloadQuickRefGuide = () => {
  const content = `# Agentic Developer Toolkit - Quick Reference Guide

## 1. Antigravity IDE Shortcuts
- **Fast Mode (Cmd + I):** Best for quick, inline edits. Routes to Gemini 3.1 Flash.
- **Agent Mode (Cmd + L):** Opens the Agent sidebar. Routes to Gemini 3.1 Pro. Best for complex, multi-file edits and terminal commands.

## 2. Managing Agent Context
- **Workspace Rules:** Create \`.agents/rules.md\` in your project root to enforce team-specific coding standards.
- **Global Rules:** Create \`~/.gemini/GEMINI.md\` to set your global developer preferences.

## 3. Local Model Offloading
To save cloud quota, you can run tasks locally:
1. Ensure Ollama (v0.20.0+) is installed.
2. Run \`ollama run gemma4:e4b\` in your terminal.
3. In Antigravity Settings, set 'Fast Mode' provider to 'Localhost (Ollama)'.

## 4. Gemini CLI Quick Commands
- Summary: \`git diff main | gemini prompt "Summarize for PR"\`
- Log Analysis: \`cat error.log | gemini prompt "Find the root cause"\`

## 5. Jules Cloud Agent
- **GitHub Trigger:** Create an issue and add the \`@jules-agent\` label.
- **CLI Trigger:** Run \`jules run "Your objective here"\`
- **Dashboard:** Track active cloud tasks via \`jules dashboard\`.
`;

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
