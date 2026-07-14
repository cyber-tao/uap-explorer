# Research raw archives

Original research and media JSON produced by research agents during content curation.

These files are **not** imported by the Vite app. Canonical runtime data lives in:

- `src/data/events.ts` — event catalog
- `src/data/analysis.ts` — observables, hypotheses, gaps
- `src/data/agencies.ts` — official agencies
- `src/data/featured.ts` — homepage featured event IDs

## Naming notes

- Event-related filenames should use the same slug as runtime event ids (e.g. `malmstrom-icbm`, not `malstrom`).
- `research_2024_2025_sightings.json` and `research_2024_2025_sightings_2024_2025.json` are **two curation passes with different schemas** (metadata-wrapped vs flat id style such as `MQ9-YEMEN-2024-10-30`). Both are retained as research history; only curated rows were promoted into `events.ts`.
- `research_pursue_2024_2025.json` and `research_pursue_2026_07.json` are time-batched PURSUE releases.
