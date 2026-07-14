# AGENTS.md

## Cursor Cloud specific instructions

UAP Explorer is a **client-only static SPA** (Vite + React 19 + TypeScript, with Three.js/GSAP). There is **no backend, database, or secrets** — a single Vite dev server is all that's needed to run and test the product end to end.

Dependencies are installed automatically by the startup update script (`npm ci`). Standard commands are defined in `package.json` and documented in `README.md`:

- Dev server: `npm run dev` → http://localhost:5173
- Lint: `npm run lint`
- Tests: `npm test` (Vitest data-integrity tests only)
- Build: `npm run build`
- Preview built output: `npm run preview` → http://localhost:4173

Non-obvious notes:

- Routing uses **HashRouter**, so in-app URLs look like `http://localhost:5173/#/timeline` and `http://localhost:5173/#/event/<id>`. Deep-linking without the `#/` will not resolve to a route.
- All event/analysis data is **hardcoded** in `src/data/`. There is no data fetching; content changes mean editing those TypeScript files (the Vitest tests validate data integrity).
- The `media:*` npm scripts require **bun**, which is NOT installed by default and is NOT needed to run or test the app — they are maintainer-only media tooling.
