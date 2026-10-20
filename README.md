# Temmie

A local React, TypeScript, and Vite prototype of the CDE5311 Figma **Page 1** design.

## Setup and run

Install Node.js 22.12+ and pnpm:

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Open http://127.0.0.1:5173/. Use **Explore screens** to review individual frames, or **Welcome flow** to try onboarding.

```sh
pnpm build
pnpm preview
```

## Included flows

- Onboarding, preferences, medicines, and animated Temmie illustrations.
- Home with previous dates and three disabled future dates.
- Body, sleep, food, and movement records; original-entry details and editing.
- Month, three-month, and year Pattern examples, source-record access, and editable consultation summaries.
- Visit notes, example doctor selection, Profile, privacy preferences, and data export/deletion.

Records and preferences stay in this browser. Existing `care-entries` records are migrated without deleting the original storage. Design examples are labeled separately from personal records. AI, health-account connections, device security, notifications, and appointment booking are simulations; no external service is contacted.

Figma assets and fonts are bundled locally. The visual reference is Page 1 only; Page 2 is unchanged. No deployment is required to use this prototype.

## Browser checks

With Google Chrome installed and the development server running:

```sh
node checks/page1-flow.mjs
node checks/page1-extra.mjs
node checks/page1-review.mjs
```

Checks cover onboarding, creating/editing records, local persistence, visit notes, settings, medicine forms, editable summaries, calendar limits, image loading, and responsive layouts. Screenshots and diagnostic logs are ignored by Git.
