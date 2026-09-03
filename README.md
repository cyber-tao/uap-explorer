# UAP Explorer · Global Unidentified Anomalous Phenomena Archive

[English](README.md) | [简体中文](README.zh-CN.md)

> A sci-fi exploratory dynamic web platform showcasing scientific chronology, deep analysis, and multi-source verified media archives for 77 high-confidence UAP (Unidentified Anomalous Phenomena) incidents across the globe.

[📅 Timeline](https://cyber-tao.github.io/uap-explorer/#/timeline) · [🌍 Hotspots](https://cyber-tao.github.io/uap-explorer/#/hotspots) · [📊 Analysis](https://cyber-tao.github.io/uap-explorer/#/analysis) · [🏛 Official Agencies](https://cyber-tao.github.io/uap-explorer/#/agencies)

Live Site: [https://cyber-tao.github.io/uap-explorer/](https://cyber-tao.github.io/uap-explorer/)

---

## Preview

![Timeline](https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800)

*Global UAP Timeline — 77 high-confidence events chronologically cataloged with multi-dimensional filtering by confidence, region, and physical observables.*

---

## Key Features

| Feature | Description |
|---------|-------------|
| 🌐 **Multi-Language (i18n)** | Native support for English (`en`) and Chinese (`zh`). Auto-detects browser/system language with manual switcher and local persistence. |
| 🌌 **Galaxy Particle Hero** | Three.js particle galaxy background, optimized with IntersectionObserver for viewport-only rendering. |
| 🗺 **Dual-View Timeline** | Grid card and timeline views with real-time filtering across eras, confidence tiers, continents, and physical observables. |
| 🌍 **Tactical Hotspots Map HUD** | Interactive 177-country vector world map powered by D3 Geo & TopoJSON with tactical cluster inspection, heatmap overlays, and recurring corridor top-lists. |
| 📖 **Deep Event Dossiers** | Rich narrative descriptions, authentic verified media (images/videos), and comprehensive source attribution. |
| 🔗 **Observable Tag Linking** | Interactive physical characteristic tags on event detail pages for quick cross-event correlation. |
| 🖼 **Editorial Layout & Media Lightbox** | Editorial image-text interweaving, image zoom lightbox, playable video embeds, and 100% verified asset pipelines. |
| 📱 **Fully Responsive** | Optimized glassmorphic layout across mobile, tablet, and widescreen desktop displays. |
| ⚡ **Static-First Architecture** | HashRouter + `base: './'` designed for frictionless static hosting on GitHub Pages, Vercel, or Netlify. |
| 🎵 **Ambient Soundtrack** | Optional atmospheric background music player in the navigation bar. |

---

## Tech Stack

```
React 19 + TypeScript 5.9 + Vite 7 + Tailwind CSS 3
├── Three.js — Galaxy particle background (GalaxyBackground)
├── GSAP + Lenis — Smooth scrolling and choreographed transitions
├── D3 Geo + TopoJSON Client + World Atlas — Tactical vector map projection & spatial HUD
├── React Router DOM 7 — HashRouter static client-side routing
├── Lucide React — Modern icon library
└── Zero-Dependency Custom i18n — Type-safe English / Chinese localization
```

---

## Quick Start

### Prerequisites

- Bun ≥ 1.1

### Installation and Run

```bash
# Clone the repository
git clone https://github.com/cyber-tao/uap-explorer.git
cd uap-explorer

# Install dependencies
bun install

# Start development server
bun run dev
# → http://localhost:5173

# Production build
bun run build
# → dist/ directory ready for static hosting

# Preview build artifact locally
bun run preview
# → http://localhost:4173

# Run data integrity and i18n test suites
bun test
```

---

## Project Structure

```
uap-explorer/
├── public/
│   ├── images/              # Event covers and verified media assets
│   └── music/               # Soundtrack audio files
├── research/
│   └── raw/                 # Raw research data JSONs (excluded from build)
├── src/
│   ├── components/
│   │   ├── hotspots/             # Tactical map HUD components
│   │   │   ├── HotspotsMap.tsx
│   │   │   ├── HotspotsControls.tsx
│   │   │   ├── HotspotsDrawer.tsx
│   │   │   └── HotspotsSidebar.tsx
│   │   ├── GalaxyBackground.tsx  # Three.js galaxy animation
│   │   ├── Navigation.tsx        # Top navigation + i18n switcher + BGM player
│   │   ├── Layout.tsx            # App layout shell
│   │   ├── Footer.tsx            # Unified footer (home / default)
│   │   ├── EventCard.tsx         # Localized event cards
│   │   ├── EventEditorialBody.tsx# Editorial body with inline figures
│   │   ├── ImageLightbox.tsx     # Fullscreen image viewer
│   │   ├── TimelineFilters.tsx   # Filter and search controls
│   │   ├── ErrorBoundary.tsx     # Route error boundary
│   │   └── characteristicIcons.tsx
│   ├── sections/                 # Landing page sections
│   │   ├── HeroField.tsx
│   │   ├── ObservablesCarousel.tsx
│   │   ├── ImmersiveGallery.tsx
│   │   └── AgenciesGlossary.tsx
│   ├── data/
│   │   ├── events.ts             # Complete dataset for 65 events
│   │   ├── analysis.ts           # Observables, hypotheses, and research gaps
│   │   ├── agencies.ts           # Official government agency records
│   │   ├── worldGeoData.ts       # TopoJSON geometry, D3 projection & hotspots
│   │   ├── featured.ts           # Featured landing page event IDs
│   │   ├── integrity.test.ts     # Reference integrity test guardrails
│   │   └── images.integrity.test.ts # Image uniqueness & local asset integrity
│   ├── i18n/                     # Internationalization core
│   │   ├── types.ts              # Language types & dictionary schema
│   │   ├── context.ts            # Context, hooks & system language detector
│   │   ├── LanguageContext.tsx   # React Provider
│   │   ├── index.ts              # Barrel exports
│   │   ├── i18n.test.ts          # Automated dictionary integrity tests
│   │   └── locales/              # Dictionaries
│   │       ├── en.ts             # English
│   │       └── zh.ts             # Chinese (Simplified)
│   ├── lib/
│   │   ├── utils.ts              # assetUrl (Vite base aligned)
│   │   └── theme.ts              # Design tokens (matching --uap-*)
│   ├── pages/
│   │   ├── HomePage.tsx
│   │   ├── TimelinePage.tsx
│   │   ├── HotspotsPage.tsx
│   │   ├── EventDetailPage.tsx
│   │   ├── AnalysisPage.tsx
│   │   └── AgenciesPage.tsx
│   ├── config.ts                 # Marketing copy / Footer / Agency config
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── index.html
├── vite.config.ts
├── vitest.config.ts
├── tsconfig.json
└── package.json
```

---

## Dataset Scope

| Event | Year | Region | Confidence | Media | Sources |
|-------|------|--------|------------|-------|---------|
| Nimitz Tic Tac | 2004 | North America | High | 6 | 6 |
| East Coast Gimbal/GoFast | 2014-15 | North America | High | 6 | 6 |
| Belgian UFO Wave | 1989-91 | Europe | High | 5 | 8 |
| Colares Incident | 1977 | South America | High | 4 | 8 |
| JAL Flight 1628 | 1986 | Asia | High | 6 | 7 |
| Hangzhou Xiaoshan Airport | 2010 | Asia | High | 6 | 7 |
| Guizhou Duxi Forest Incident | 1994 | Asia | High | 8 | 12 |
| Malmstrom ICBM Shutdown | 1967 | North America | High | 4 | 7 |
| Salyut 6 Cosmonaut Sighting | 1981 | Space | Medium | 3 | 8 |
| Salyut 7 "Space Angels" | 1984 | Space | Medium | 3 | 9 |
| Apollo 17 | 1972 | Space | Medium | 4 | 10 |
| Roswell Incident | 1947 | North America | Medium | 9 | 9 |
| Washington D.C. Flap | 1952 | North America | Medium | 5 | 8 |
| ... Total **77 Events** | | | | **250+** | **320+** |

*Raw research assets are preserved under [`research/raw/`](research/raw/) and excluded from the production bundle.*

---

## Media Asset Provenance

All visual media assets are cross-verified with authoritative sources:

- **Government & Military**: U.S. Department of Defense (DoD), NASA, Naval Air Systems Command, UK National Archives
- **Scientific Literature**: Nature, arXiv, NASA NTRS, Condon Report
- **Journalistic Outlets**: The New York Times, CBS News, 60 Minutes, BBC, CCTV, Xinhua
- **UAP Repositories**: The Black Vault, NICAP, CUFOS, MUFON, UFO Evidence
- **Primary Telemetry**: FLIR video frames, DVIDS imagery, NASA mission archives, CEFAA analytical captures

---

## Routing

The application utilizes **HashRouter** for seamless static routing across any hosting environment:

| Route | View |
|-------|------|
| `/#/` | Landing Page (Galaxy Hero + Observables + Featured Gallery) |
| `/#/timeline` | Event Timeline (Search + Filters + Dual View) |
| `/#/timeline?characteristic=multi-sensor` | Timeline with pre-selected observable filter |
| `/#/event/nimitz-tic-tac` | Event Detail dossier |
| `/#/analysis` | Scientific Analysis & Hypotheses evaluation |
| `/#/agencies` | Global Government Agencies comparison |

---

## Build & Deployment

Automatic building and publishing is configured via GitHub Actions:

- Workflow File: [`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml)
- Triggers: Push to `main` branch or manual trigger via `workflow_dispatch`
- Action Steps: `npm ci` → `npm run build` → deploy `dist/` to GitHub Pages
- Hosted Endpoint: [https://cyber-tao.github.io/uap-explorer/](https://cyber-tao.github.io/uap-explorer/)

To enable GitHub Pages in your fork: navigate to **Settings → Pages → Build and deployment → Source**, and select **GitHub Actions**.

### Local Build

```bash
bun install
bun run build
# dist/ directory contains zero-backend static assets
```

---

## Design System

### Palette (`src/index.css` / `src/lib/theme.ts`)

```css
--uap-cyan: #30B0D0;           /* Accents, links, interactive highlights */
--uap-high: #00D9A5;           /* High confidence badge */
--uap-amber: #F5A623;          /* Medium confidence / alerts */
--uap-low: #FF6B35;            /* Low confidence */
--uap-speculative: #B8B8B8;    /* Speculative tier */

--uap-base: #050A0F;           /* Deep space background */
--uap-surface: #0A1117;        /* Cards & containers */
--uap-surface-elevated: #0F1923; /* Hover & elevated surfaces */

--uap-ivory: #EDE8E4;          /* Primary typography */
--uap-muted: #8A99A8;          /* Secondary & meta typography */
```

### Typography

- Display Headers: `font-serif-display` (Noto Serif SC / Playfair Display)
- Technical Data: `font-mono-data` (JetBrains Mono)
- Body Copy: `font-sans-body` (Noto Sans SC / Inter)

---

## Changelog

| Version | Highlights |
|---------|------------|
| v1.0 | Initial architecture (Hero, pages, and components) |
| v1.1 | 22 baseline events dataset & imagery |
| v1.2 | Image rendering fixes & navigation refinements |
| v1.3 | **AgentSwarm Research**: Multi-agent parallel verification of sources and dossiers |
| v1.4 | Clickable characteristic tags, URL query filtering, and media gallery |
| v1.5 | Dataset expansion to 35 events; automated GitHub Pages deployment |
| v1.6 | Domain model alignment, data integrity test guardrails |
| v1.7 | Smooth scrolling fixes, unified footer, design token normalization |
| v1.8 | Expansion to 65 global events; 279 verified local media assets |
| v1.9 | Editorial inline figure composition, responsive mobile drawer, chunking optimization |
| v2.0 | **Full i18n support (English, Chinese, Japanese, French)** with system auto-detection, dual-language READMEs, and test suites |
| v2.1 | **Global Archive Expansion to 77 Events**: Researched and integrated 12 premier military declassified, radar-visual, and mass-sighting cases (Tehran, Brazilian Night of UFOs, RB-47, Kaikoura, Phoenix Lights, O'Hare, etc.) with verified authentic media dossiers |

---

## Contributing

Contributions, issue reports, and source submissions are welcome:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/awesome-addition`
3. Commit your changes: `git commit -m "feat: add verified telemetry for event X"`
4. Push to branch: `git push origin feature/awesome-addition`
5. Open a Pull Request

---

## License

MIT © 2026 UAP Explorer

---

> *"Stay curious, stay rigorous."* — UAP Explorer
