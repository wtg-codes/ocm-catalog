/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        base: 'var(--bg-base)',
        panel: 'var(--bg-panel)',
        muted: 'var(--bg-muted)',
        main: 'var(--text-main)',
        'text-muted': 'var(--text-muted)',
        'border-main': 'var(--border-main)',
        accent: {
          DEFAULT: 'var(--accent-bg)',
          fg: 'var(--accent-fg)',
          text: 'var(--accent-text)',
          muted: 'var(--accent-muted)',
          border: 'var(--accent-border)',
        },
      },
      boxShadow: {
        'accent': 'var(--shadow-accent)',
      }
    },
  },
  plugins: [],
}
