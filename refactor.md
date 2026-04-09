<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Tridorian — The Google AI Ecosystem Park</title>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>
  :root {
    --bg-deep: #050d05;
    --bg-dark: #0a1a0a;
    --bg-card: #0f1f0f;
    --bg-card-hover: #142414;
    --green-100: #e8f5e8;
    --green-200: #c8e6c8;
    --green-300: #81c784;
    --green-400: #4caf50;
    --green-500: #2e7d32;
    --green-600: #1b5e20;
    --green-700: #0d3d0d;
    --green-glow: rgba(76, 175, 80, 0.15);
    --green-glow-strong: rgba(76, 175, 80, 0.3);
    --accent-cyan: #26c6da;
    --accent-amber: #ffb300;
    --accent-blue: #42a5f5;
    --accent-purple: #ab47bc;
    --text-primary: #e8f5e8;
    --text-secondary: #a5c9a5;
    --text-muted: #5e8a5e;
    --border: rgba(76, 175, 80, 0.12);
    --border-active: rgba(76, 175, 80, 0.35);
  }

  * { margin: 0; padding: 0; box-sizing: border-box; }

  body {
    background: var(--bg-deep);
    color: var(--text-primary);
    font-family: 'DM Sans', sans-serif;
    line-height: 1.6;
    overflow-x: hidden;
  }

  /* ─── HEADER ─── */
  .header {
    position: relative;
    text-align: center;
    padding: 80px 40px 60px;
    overflow: hidden;
  }
  .header::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background: 
      radial-gradient(ellipse 80% 50% at 50% 0%, rgba(46,125,50,0.15) 0%, transparent 70%),
      radial-gradient(ellipse 40% 30% at 20% 80%, rgba(38,198,218,0.05) 0%, transparent 60%);
    pointer-events: none;
  }
  .header-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 6px 18px;
    border: 1px solid var(--border-active);
    border-radius: 100px;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 2.5px;
    text-transform: uppercase;
    color: var(--green-300);
    margin-bottom: 28px;
    background: rgba(76,175,80,0.06);
  }
  .header-badge::before {
    content: '';
    width: 6px; height: 6px;
    background: var(--green-400);
    border-radius: 50%;
    animation: pulse-dot 2s ease-in-out infinite;
  }
  @keyframes pulse-dot {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.4; transform: scale(0.7); }
  }
  .header h1 {
    font-family: 'Playfair Display', serif;
    font-size: clamp(36px, 5vw, 64px);
    font-weight: 800;
    line-height: 1.1;
    color: var(--green-100);
    margin-bottom: 12px;
    letter-spacing: -1px;
  }
  .header h1 span {
    background: linear-gradient(135deg, var(--green-300), var(--accent-cyan));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .header-sub {
    font-size: clamp(15px, 1.8vw, 19px);
    color: var(--text-secondary);
    max-width: 700px;
    margin: 0 auto 8px;
    font-weight: 300;
  }
  .header-sub-small {
    font-size: 13px;
    color: var(--text-muted);
    font-family: 'JetBrains Mono', monospace;
    letter-spacing: 0.5px;
  }

  /* ─── SECTION TITLES ─── */
  .section-label {
    text-align: center;
    padding: 60px 40px 10px;
  }
  .section-label .label-tag {
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: var(--green-400);
    margin-bottom: 10px;
  }
  .section-label h2 {
    font-family: 'Playfair Display', serif;
    font-size: clamp(26px, 3.5vw, 42px);
    font-weight: 700;
    color: var(--green-100);
    letter-spacing: -0.5px;
  }
  .section-label p {
    font-size: 15px;
    color: var(--text-secondary);
    max-width: 600px;
    margin: 10px auto 0;
    font-weight: 300;
  }

  /* ─── MAP CONTAINER ─── */
  .park-map {
    max-width: 1300px;
    margin: 0 auto;
    padding: 30px 24px;
    position: relative;
  }
  .map-frame {
    position: relative;
    border: 1px solid var(--border);
    border-radius: 20px;
    background: var(--bg-dark);
    overflow: hidden;
    padding: 40px 30px;
  }
  .map-frame::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background:
      radial-gradient(circle 400px at 25% 30%, rgba(46,125,50,0.08) 0%, transparent 60%),
      radial-gradient(circle 300px at 75% 70%, rgba(38,198,218,0.05) 0%, transparent 60%);
    pointer-events: none;
  }

  /* ─── LEGEND ─── */
  .map-legend {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 16px 28px;
    margin-bottom: 36px;
    padding-bottom: 24px;
    border-bottom: 1px solid var(--border);
  }
  .legend-item {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 11px;
    font-weight: 500;
    color: var(--text-secondary);
    letter-spacing: 0.8px;
    text-transform: uppercase;
  }
  .legend-dot {
    width: 10px; height: 10px;
    border-radius: 3px;
  }

  /* ─── ZONE GRID ─── */
  .zones-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 16px;
    position: relative;
  }
  .zone-card {
    position: relative;
    border: 1px solid var(--border);
    border-radius: 14px;
    padding: 24px 22px 22px;
    background: var(--bg-card);
    transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
    cursor: default;
    overflow: hidden;
  }
  .zone-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 3px;
    border-radius: 14px 14px 0 0;
    opacity: 0.8;
  }
  .zone-card:hover {
    border-color: var(--border-active);
    background: var(--bg-card-hover);
    transform: translateY(-3px);
    box-shadow: 0 12px 40px rgba(0,0,0,0.3), 0 0 30px var(--green-glow);
  }
  .zone-icon {
    width: 38px; height: 38px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    margin-bottom: 14px;
  }
  .zone-number {
    position: absolute;
    top: 16px; right: 18px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px;
    color: var(--text-muted);
    letter-spacing: 1px;
  }
  .zone-name {
    font-family: 'Playfair Display', serif;
    font-size: 18px;
    font-weight: 700;
    color: var(--green-100);
    margin-bottom: 10px;
  }
  .zone-desc {
    font-size: 12px;
    color: var(--text-muted);
    margin-bottom: 14px;
    font-weight: 400;
    line-height: 1.5;
  }
  .zone-items {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }
  .zone-item {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    font-size: 11px;
    font-family: 'JetBrains Mono', monospace;
    padding: 4px 10px;
    border-radius: 6px;
    background: rgba(76,175,80,0.06);
    border: 1px solid rgba(76,175,80,0.1);
    color: var(--text-secondary);
    letter-spacing: 0.3px;
    transition: all 0.2s;
  }
  .zone-card:hover .zone-item {
    border-color: rgba(76,175,80,0.2);
    background: rgba(76,175,80,0.1);
  }
  .zone-item .arrow {
    color: var(--green-500);
    font-size: 10px;
  }

  /* Zone accent colors */
  .zone-models::before { background: linear-gradient(90deg, #4caf50, #81c784); }
  .zone-models .zone-icon { background: rgba(76,175,80,0.12); color: #81c784; }

  .zone-infra::before { background: linear-gradient(90deg, #26c6da, #4dd0e1); }
  .zone-infra .zone-icon { background: rgba(38,198,218,0.12); color: #4dd0e1; }

  .zone-agents::before { background: linear-gradient(90deg, #ab47bc, #ce93d8); }
  .zone-agents .zone-icon { background: rgba(171,71,188,0.12); color: #ce93d8; }

  .zone-research::before { background: linear-gradient(90deg, #ffb300, #ffd54f); }
  .zone-research .zone-icon { background: rgba(255,179,0,0.12); color: #ffd54f; }

  .zone-devtools::before { background: linear-gradient(90deg, #42a5f5, #90caf9); }
  .zone-devtools .zone-icon { background: rgba(66,165,245,0.12); color: #90caf9; }

  .zone-design::before { background: linear-gradient(90deg, #ef5350, #ef9a9a); }
  .zone-design .zone-icon { background: rgba(239,83,80,0.12); color: #ef9a9a; }

  .zone-video::before { background: linear-gradient(90deg, #ff7043, #ffab91); }
  .zone-video .zone-icon { background: rgba(255,112,67,0.12); color: #ffab91; }

  .zone-enterprise::before { background: linear-gradient(90deg, #66bb6a, #a5d6a7); }
  .zone-enterprise .zone-icon { background: rgba(102,187,106,0.12); color: #a5d6a7; }

  /* ─── OS STATEMENT ─── */
  .os-statement {
    text-align: center;
    padding: 50px 40px;
    position: relative;
  }
  .os-statement blockquote {
    font-family: 'Playfair Display', serif;
    font-size: clamp(20px, 3vw, 30px);
    font-weight: 600;
    color: var(--green-200);
    max-width: 700px;
    margin: 0 auto;
    font-style: italic;
    line-height: 1.4;
  }
  .os-statement blockquote em {
    background: linear-gradient(135deg, var(--green-300), var(--accent-cyan));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-style: normal;
  }

  /* ─── FRAMEWORK ─── */
  .framework {
    max-width: 1100px;
    margin: 0 auto;
    padding: 20px 24px 60px;
  }
  .framework-phases {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
    position: relative;
  }
  .phase-card {
    position: relative;
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 30px 26px 26px;
    background: var(--bg-card);
    transition: all 0.35s ease;
  }
  .phase-card:hover {
    border-color: var(--border-active);
    transform: translateY(-2px);
    box-shadow: 0 8px 30px rgba(0,0,0,0.25);
  }
  .phase-step {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: var(--green-400);
    margin-bottom: 14px;
    padding: 4px 12px;
    border: 1px solid rgba(76,175,80,0.2);
    border-radius: 100px;
    background: rgba(76,175,80,0.05);
  }
  .phase-card h3 {
    font-family: 'Playfair Display', serif;
    font-size: 20px;
    font-weight: 700;
    color: var(--green-100);
    margin-bottom: 12px;
  }
  .phase-card p {
    font-size: 13.5px;
    color: var(--text-secondary);
    line-height: 1.65;
    font-weight: 300;
  }
  .phase-card .phase-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-top: 16px;
  }
  .phase-tag {
    font-size: 10px;
    font-family: 'JetBrains Mono', monospace;
    padding: 3px 10px;
    border-radius: 5px;
    background: rgba(76,175,80,0.08);
    border: 1px solid rgba(76,175,80,0.12);
    color: var(--text-muted);
    letter-spacing: 0.3px;
  }

  /* ─── Iterative Loop SVG ─── */
  .loop-visual {
    display: flex;
    justify-content: center;
    padding: 10px 0 30px;
  }

  /* ─── SALES TRACKS ─── */
  .tracks {
    max-width: 1100px;
    margin: 0 auto;
    padding: 20px 24px 40px;
  }
  .tracks-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
  }
  .track-card {
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 28px 24px 24px;
    background: var(--bg-card);
    position: relative;
    overflow: hidden;
    transition: all 0.35s ease;
  }
  .track-card:hover {
    border-color: var(--border-active);
    transform: translateY(-2px);
    box-shadow: 0 8px 30px rgba(0,0,0,0.25);
  }
  .track-card::after {
    content: '';
    position: absolute;
    bottom: 0; left: 0; right: 0;
    height: 2px;
  }
  .track-blue::after { background: linear-gradient(90deg, var(--accent-cyan), transparent); }
  .track-displace::after { background: linear-gradient(90deg, var(--accent-amber), transparent); }
  .track-google::after { background: linear-gradient(90deg, var(--green-400), transparent); }
  .track-emoji {
    font-size: 28px;
    margin-bottom: 14px;
    display: block;
  }
  .track-card h3 {
    font-family: 'Playfair Display', serif;
    font-size: 18px;
    font-weight: 700;
    color: var(--green-100);
    margin-bottom: 10px;
  }
  .track-card p {
    font-size: 13px;
    color: var(--text-secondary);
    line-height: 1.6;
    font-weight: 300;
  }

  /* ─── CTA ─── */
  .cta-section {
    text-align: center;
    padding: 60px 40px 80px;
    position: relative;
  }
  .cta-section::before {
    content: '';
    position: absolute;
    bottom: 0; left: 0; right: 0;
    height: 300px;
    background: radial-gradient(ellipse 60% 80% at 50% 100%, rgba(46,125,50,0.1) 0%, transparent 70%);
    pointer-events: none;
  }
  .cta-line {
    width: 60px;
    height: 1px;
    background: var(--green-500);
    margin: 0 auto 24px;
  }
  .cta-section h3 {
    font-family: 'Playfair Display', serif;
    font-size: clamp(22px, 3vw, 32px);
    font-weight: 700;
    color: var(--green-100);
    margin-bottom: 12px;
  }
  .cta-section p {
    font-size: 14px;
    color: var(--text-secondary);
    margin-bottom: 28px;
    font-weight: 300;
  }
  .cta-button {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 14px 36px;
    background: linear-gradient(135deg, var(--green-600), var(--green-500));
    border: 1px solid var(--green-500);
    border-radius: 10px;
    color: var(--green-100);
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    font-weight: 600;
    text-decoration: none;
    transition: all 0.3s ease;
    letter-spacing: 0.5px;
  }
  .cta-button:hover {
    background: linear-gradient(135deg, var(--green-500), #388e3c);
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(46,125,50,0.35);
  }
  .cta-email {
    display: block;
    margin-top: 16px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 13px;
    color: var(--text-muted);
    letter-spacing: 0.5px;
  }

  /* ─── FOOTER ─── */
  .footer {
    text-align: center;
    padding: 20px 40px 40px;
    font-size: 11px;
    color: var(--text-muted);
    letter-spacing: 0.5px;
  }
  .footer span {
    color: var(--green-500);
  }

  /* ─── ANIMATIONS ─── */
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .zone-card, .phase-card, .track-card {
    animation: fadeInUp 0.6s ease forwards;
    opacity: 0;
  }
  .zone-card:nth-child(1) { animation-delay: 0.05s; }
  .zone-card:nth-child(2) { animation-delay: 0.1s; }
  .zone-card:nth-child(3) { animation-delay: 0.15s; }
  .zone-card:nth-child(4) { animation-delay: 0.2s; }
  .zone-card:nth-child(5) { animation-delay: 0.25s; }
  .zone-card:nth-child(6) { animation-delay: 0.3s; }
  .zone-card:nth-child(7) { animation-delay: 0.35s; }
  .zone-card:nth-child(8) { animation-delay: 0.4s; }
  .phase-card:nth-child(1) { animation-delay: 0.1s; }
  .phase-card:nth-child(2) { animation-delay: 0.2s; }
  .phase-card:nth-child(3) { animation-delay: 0.3s; }
  .track-card:nth-child(1) { animation-delay: 0.1s; }
  .track-card:nth-child(2) { animation-delay: 0.2s; }
  .track-card:nth-child(3) { animation-delay: 0.3s; }

  /* ─── RESPONSIVE ─── */
  @media (max-width: 768px) {
    .header { padding: 50px 24px 40px; }
    .map-frame { padding: 24px 16px; }
    .zones-grid { grid-template-columns: 1fr; }
    .framework-phases { grid-template-columns: 1fr; }
    .tracks-grid { grid-template-columns: 1fr; }
  }

  /* ─── DECORATIVE CONNECTOR ─── */
  .connector {
    display: flex;
    justify-content: center;
    padding: 10px 0;
  }
  .connector svg {
    opacity: 0.3;
  }
</style>
</head>
<body>

<!-- ═══════════ HEADER ═══════════ -->
<header class="header">
  <div class="header-badge">Tridorian × Google Cloud &nbsp;·&nbsp; 2026</div>
  <h1>The Google AI <span>Ecosystem Park</span></h1>
  <p class="header-sub">Navigate the full landscape of Google's AI operating system — from foundational models to enterprise agents — with Tridorian as your guide.</p>
  <p class="header-sub-small">8 zones · 35+ products · 1 unified stack</p>
</header>

<!-- ═══════════ SECTION 1: THE AI STACK ═══════════ -->
<div class="section-label">
  <div class="label-tag">Section I — The Landscape</div>
  <h2>The 8-Zone AI Stack</h2>
  <p>Google isn't building one AI product. They're building an entire AI operating system. Here's the map.</p>
</div>

<div class="park-map">
  <div class="map-frame">
    
    <!-- Legend -->
    <div class="map-legend">
      <div class="legend-item"><div class="legend-dot" style="background:#81c784"></div>Models</div>
      <div class="legend-item"><div class="legend-dot" style="background:#4dd0e1"></div>Infrastructure</div>
      <div class="legend-item"><div class="legend-dot" style="background:#ce93d8"></div>Agents</div>
      <div class="legend-item"><div class="legend-dot" style="background:#ffd54f"></div>Research</div>
      <div class="legend-item"><div class="legend-dot" style="background:#90caf9"></div>Dev Tools</div>
      <div class="legend-item"><div class="legend-dot" style="background:#ef9a9a"></div>Design</div>
      <div class="legend-item"><div class="legend-dot" style="background:#ffab91"></div>Video</div>
      <div class="legend-item"><div class="legend-dot" style="background:#a5d6a7"></div>Enterprise</div>
    </div>

    <!-- Zone Cards Grid -->
    <div class="zones-grid">

      <!-- 1. Models -->
      <div class="zone-card zone-models">
        <span class="zone-number">ZONE 01</span>
        <div class="zone-icon">◆</div>
        <div class="zone-name">The Model Gardens</div>
        <div class="zone-desc">Foundation models tiered by speed, cost, and quality — from open-source Gemma to the full Gemini family.</div>
        <div class="zone-items">
          <span class="zone-item"><span class="arrow">→</span> Gemma (OSS)</span>
          <span class="zone-item"><span class="arrow">→</span> Gemini Flash Lite</span>
          <span class="zone-item"><span class="arrow">→</span> Gemini Flash</span>
          <span class="zone-item"><span class="arrow">→</span> Gemini Pro</span>
          <span class="zone-item"><span class="arrow">→</span> Gemini Ultra</span>
        </div>
      </div>

      <!-- 2. AI Infrastructure -->
      <div class="zone-card zone-infra">
        <span class="zone-number">ZONE 02</span>
        <div class="zone-icon">⬡</div>
        <div class="zone-name">Infrastructure Ridge</div>
        <div class="zone-desc">Custom silicon, MLOps, and data convergence — the bedrock powering every AI workload at scale.</div>
        <div class="zone-items">
          <span class="zone-item"><span class="arrow">→</span> Google TPU</span>
          <span class="zone-item"><span class="arrow">→</span> Vertex AI</span>
          <span class="zone-item"><span class="arrow">→</span> BigQuery AI</span>
          <span class="zone-item"><span class="arrow">→</span> Model Garden</span>
          <span class="zone-item"><span class="arrow">→</span> AI Studio</span>
        </div>
      </div>

      <!-- 3. AI Agents -->
      <div class="zone-card zone-agents">
        <span class="zone-number">ZONE 03</span>
        <div class="zone-icon">⟡</div>
        <div class="zone-name">Agent Canopy</div>
        <div class="zone-desc">Build, deploy, and orchestrate autonomous agents — from no-code builders to full agent-to-agent protocols.</div>
        <div class="zone-items">
          <span class="zone-item"><span class="arrow">→</span> Google ADK</span>
          <span class="zone-item"><span class="arrow">→</span> A2A Protocol</span>
          <span class="zone-item"><span class="arrow">→</span> Agent Builder</span>
          <span class="zone-item"><span class="arrow">→</span> FileSearch API</span>
          <span class="zone-item"><span class="arrow">→</span> Agentspace</span>
        </div>
      </div>

      <!-- 4. Research & Discovery -->
      <div class="zone-card zone-research">
        <span class="zone-number">ZONE 04</span>
        <div class="zone-icon">◎</div>
        <div class="zone-name">Discovery Meadow</div>
        <div class="zone-desc">AI-powered research, multimodal understanding, and the frontier of what's next from DeepMind.</div>
        <div class="zone-items">
          <span class="zone-item"><span class="arrow">→</span> NotebookLM</span>
          <span class="zone-item"><span class="arrow">→</span> AI Mode in Search</span>
          <span class="zone-item"><span class="arrow">→</span> DeepMind</span>
          <span class="zone-item"><span class="arrow">→</span> Project Astra</span>
        </div>
      </div>

      <!-- 5. Developer Tools -->
      <div class="zone-card zone-devtools">
        <span class="zone-number">ZONE 05</span>
        <div class="zone-icon">⌘</div>
        <div class="zone-name">Developer Trail</div>
        <div class="zone-desc">CLI-first workflows, AI coding agents, and serverless AI — built for engineers who ship fast.</div>
        <div class="zone-items">
          <span class="zone-item"><span class="arrow">→</span> Gemini CLI</span>
          <span class="zone-item"><span class="arrow">→</span> Antigravity IDE</span>
          <span class="zone-item"><span class="arrow">→</span> Jules</span>
          <span class="zone-item"><span class="arrow">→</span> Firebase AI</span>
          <span class="zone-item"><span class="arrow">→</span> Cloud Functions AI</span>
        </div>
      </div>

      <!-- 6. Design & Creativity -->
      <div class="zone-card zone-design">
        <span class="zone-number">ZONE 06</span>
        <div class="zone-icon">✦</div>
        <div class="zone-name">Creative Conservatory</div>
        <div class="zone-desc">Generative image, audio, and design tools — where AI meets creative expression.</div>
        <div class="zone-items">
          <span class="zone-item"><span class="arrow">→</span> Stitch</span>
          <span class="zone-item"><span class="arrow">→</span> Whisk</span>
          <span class="zone-item"><span class="arrow">→</span> NanoBanana</span>
          <span class="zone-item"><span class="arrow">→</span> Imagen</span>
          <span class="zone-item"><span class="arrow">→</span> MusicLM</span>
        </div>
      </div>

      <!-- 7. Video & Presentation -->
      <div class="zone-card zone-video">
        <span class="zone-number">ZONE 07</span>
        <div class="zone-icon">▶</div>
        <div class="zone-name">Motion Theater</div>
        <div class="zone-desc">Video generation, AI editing, and presentation tools for the next era of visual storytelling.</div>
        <div class="zone-items">
          <span class="zone-item"><span class="arrow">→</span> Veo</span>
          <span class="zone-item"><span class="arrow">→</span> Flow</span>
          <span class="zone-item"><span class="arrow">→</span> Google Vids</span>
        </div>
      </div>

      <!-- 8. Enterprise (bonus zone tying it together) -->
      <div class="zone-card zone-enterprise">
        <span class="zone-number">ZONE 08</span>
        <div class="zone-icon">⊞</div>
        <div class="zone-name">Enterprise Commons</div>
        <div class="zone-desc">Where it all converges — Workspace integrations, Duet AI, and organization-wide intelligence woven into every surface.</div>
        <div class="zone-items">
          <span class="zone-item"><span class="arrow">→</span> Gemini for Workspace</span>
          <span class="zone-item"><span class="arrow">→</span> Security AI</span>
          <span class="zone-item"><span class="arrow">→</span> Data Cloud</span>
        </div>
      </div>

    </div>
  </div>
</div>

<!-- OS Statement -->
<div class="os-statement">
  <blockquote>"Google isn't building one AI product. They're building an <em>entire AI operating system.</em>"</blockquote>
</div>

<!-- ═══════════ SECTION 2: TRIDORIAN FRAMEWORK ═══════════ -->
<div class="section-label">
  <div class="label-tag">Section II — The Trail Guide</div>
  <h2>The Tridorian Implementation Framework</h2>
  <p>A proven 3-phase methodology that maps AI capabilities directly to business outcomes.</p>
</div>

<!-- Iterative Loop Visual -->
<div class="loop-visual">
  <svg width="500" height="80" viewBox="0 0 500 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <!-- Connecting flow arrows -->
    <defs>
      <linearGradient id="flowGrad" x1="0" y1="0" x2="500" y2="0" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stop-color="#4caf50" stop-opacity="0.6"/>
        <stop offset="50%" stop-color="#26c6da" stop-opacity="0.6"/>
        <stop offset="100%" stop-color="#4caf50" stop-opacity="0.6"/>
      </linearGradient>
    </defs>
    <path d="M 50 40 C 120 10, 180 10, 250 40 C 320 70, 380 70, 450 40" stroke="url(#flowGrad)" stroke-width="2" fill="none" stroke-dasharray="6 4"/>
    <!-- Phase dots -->
    <circle cx="50" cy="40" r="8" fill="#1b5e20" stroke="#4caf50" stroke-width="1.5"/>
    <text x="50" y="68" text-anchor="middle" fill="#5e8a5e" font-family="JetBrains Mono" font-size="9" letter-spacing="1">PHASE 1</text>
    <circle cx="250" cy="40" r="8" fill="#1b5e20" stroke="#26c6da" stroke-width="1.5"/>
    <text x="250" y="68" text-anchor="middle" fill="#5e8a5e" font-family="JetBrains Mono" font-size="9" letter-spacing="1">PHASE 2</text>
    <circle cx="450" cy="40" r="8" fill="#1b5e20" stroke="#4caf50" stroke-width="1.5"/>
    <text x="450" y="68" text-anchor="middle" fill="#5e8a5e" font-family="JetBrains Mono" font-size="9" letter-spacing="1">PHASE 3</text>
    <!-- Return arrow -->
    <path d="M 450 35 C 450 -5, 50 -5, 50 35" stroke="#4caf50" stroke-width="1" fill="none" stroke-dasharray="4 3" stroke-opacity="0.3"/>
    <text x="250" y="14" text-anchor="middle" fill="#5e8a5e" font-family="JetBrains Mono" font-size="8" letter-spacing="1.5" opacity="0.5">ITERATE</text>
  </svg>
</div>

<div class="framework">
  <div class="framework-phases">

    <div class="phase-card">
      <div class="phase-step">◇ Phase 1</div>
      <h3>Discovery & Data Readiness</h3>
      <p>Classify enterprise data assets, identify process bottlenecks ripe for AI intervention, and establish secure-by-default governance protocols before any implementation begins.</p>
      <div class="phase-tags">
        <span class="phase-tag">Data Classification</span>
        <span class="phase-tag">Bottleneck Analysis</span>
        <span class="phase-tag">Security Protocols</span>
        <span class="phase-tag">Governance</span>
      </div>
    </div>

    <div class="phase-card">
      <div class="phase-step">◇ Phase 2</div>
      <h3>The KPI Workback</h3>
      <p>Engage directly with Lines of Business to identify core metrics that matter. Map agentic AI workflows backward from business outcomes — revenue, efficiency, CSAT — to specific technical capabilities.</p>
      <div class="phase-tags">
        <span class="phase-tag">LOB Alignment</span>
        <span class="phase-tag">KPI Mapping</span>
        <span class="phase-tag">Outcome Design</span>
        <span class="phase-tag">Agentic Workflows</span>
      </div>
    </div>

    <div class="phase-card">
      <div class="phase-step">◇ Phase 3</div>
      <h3>Technical Execution</h3>
      <p>Integrate via the Gemini API, AppSheet, and Vertex AI platform. Deploy RAG architectures for speed and scalability, delivering production-ready AI that moves the needle.</p>
      <div class="phase-tags">
        <span class="phase-tag">Gemini API</span>
        <span class="phase-tag">AppSheet</span>
        <span class="phase-tag">Vertex AI</span>
        <span class="phase-tag">RAG Pipelines</span>
      </div>
    </div>

  </div>
</div>

<!-- ═══════════ SECTION 3: SALES TRACKS ═══════════ -->
<div class="section-label">
  <div class="label-tag">Section III — The Pathways</div>
  <h2>Strategic Sales Tracks</h2>
  <p>Three distinct paths to engage every client, regardless of where they are in their AI journey.</p>
</div>

<div class="tracks">
  <div class="tracks-grid">

    <div class="track-card track-blue">
      <span class="track-emoji">🌊</span>
      <h3>The Blue Ocean Path</h3>
      <p>Capture greenfield AI opportunities where no solution currently exists. Position Google Cloud as the first-mover platform for clients building net-new intelligent workflows — from agentic automation to generative applications.</p>
    </div>

    <div class="track-card track-displace">
      <span class="track-emoji">⚡</span>
      <h3>The Displacement Path</h3>
      <p>Competitive takeout of legacy and incumbent AI solutions. Leverage Google's unified stack — security, breadth, and cost efficiency — to replace fragmented point solutions with an integrated AI platform.</p>
    </div>

    <div class="track-card track-google">
      <span class="track-emoji">🛡️</span>
      <h3>The "Why Google" Differentiator</h3>
      <p>Integrated security posture, unparalleled breadth from silicon to application layer, and proven innovation partnerships. The only vendor delivering an end-to-end AI operating system at global scale.</p>
    </div>

  </div>
</div>

<!-- ═══════════ CTA ═══════════ -->
<div class="cta-section">
  <div class="cta-line"></div>
  <h3>Ready to Navigate the Ecosystem?</h3>
  <p>Let Tridorian be your guide through the Google AI landscape.</p>
  <a href="mailto:hello@tridorian.com" class="cta-button">
    <span>Start the Conversation</span>
    <span>→</span>
  </a>
  <span class="cta-email">hello@tridorian.com</span>
</div>

<!-- ═══════════ FOOTER ═══════════ -->
<div class="footer">
  <span>TRIDORIAN</span> &nbsp;·&nbsp; Google Cloud Partner &nbsp;·&nbsp; 2026
</div>

</body>
</html>
