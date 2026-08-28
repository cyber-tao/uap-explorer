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
- `research_disclosed_batch_2026_08.json` is the curation pass that promoted PR29/PR32/PR43/PR48 plus USS Jackson and Langley AFB into `events.ts`.
- `research_disclosed_batch_2026_08_week.json` is the weekly curation pass that promoted PR34/PR46/PR49/PR108 plus FBI-UAP-PR003/PR004 into `events.ts`.
- `research_disclosed_batch_2026_08_week2.json` is the weekly curation pass that promoted FBI-UAP-PR001/PR002, DOW-UAP-PR35/PR27/PR115, and Gulf of Oman PR117 into `events.ts`.
- `research_disclosed_batch_2026_08_week3.json` is the weekly curation pass that promoted FBI-UAP-PR007, DOW-UAP-PR134/PR136/PR024, and FBI Bagram/Colorado Springs triangle FD-302s into `events.ts`.
- `research_disclosed_batch_2026_08_week4.json` is the weekly curation pass that promoted DOW-UAP-D098, FBI-UAP-D028/D033/D037-D040/D026, and CENTCOM PR149 into `events.ts`.
