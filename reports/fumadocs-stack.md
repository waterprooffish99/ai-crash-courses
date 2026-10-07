# Fumadocs Stack Report

Report date: 2026-10-07  
Scope: local implementation and static export only; no deployment was performed.

## Selected stack

Package versions were checked against the npm registry before installation. The implementation follows the current official Fumadocs guidance: Node.js 22 or newer, Next.js 16, Tailwind CSS 4, App Router, and Fumadocs MDX as the content source.

| Tool or package | Installed version |
|---|---:|
| Node.js | 24.19.0 |
| npm | 11.17.0 |
| Next.js | 16.4.0 |
| React | 19.3.0 |
| React DOM | 19.3.0 |
| Fumadocs Core | 16.16.2 |
| Fumadocs UI | 16.16.2 |
| Fumadocs MDX | 15.4.6 |
| Tailwind CSS | 4.3.3 |
| `@tailwindcss/postcss` | 4.3.3 |
| TypeScript | 6.0.3 |
| FlexSearch | 0.8.212 |
| ESLint | 10.12.0 |
| `eslint-config-next` | 16.4.0 |
| Zod | 4.6.5 |
| Lucide React | 1.52.0 |

TypeScript 7.0.2 was the registry's newest release when checked, but the installed ESLint/TypeScript tooling did not support TypeScript 7. TypeScript 6.0.3 is the newest compatible stable line and passes the configured type check.

## Official guidance followed

- [Fumadocs Quick Start](https://www.fumadocs.dev/docs) documents Node.js 22+ and static generation through framework routing.
- [Fumadocs manual Next.js setup](https://www.fumadocs.dev/docs/manual-installation/next) specifies Next.js 16, Tailwind CSS 4, Fumadocs MDX, the App Router layout, and the shared CSS imports.
- [Fumadocs static-build guidance](https://www.fumadocs.dev/docs/deploying/static) documents `output: 'export'` and browser-side static search indexes.
- [Fumadocs FlexSearch guidance](https://www.fumadocs.dev/docs/headless/search/flexsearch) documents `staticGET` and the static client used by Fumadocs UI.

## Commands

Install:

```bash
cd website-fumadocs
npm install
```

Development:

```bash
npm run dev
```

Production static build:

```bash
npm run build
```

Quality checks:

```bash
npm run lint
npm run typecheck
npm run validate
```

The combined check is:

```bash
npm test
```

## Static export status

**Passed.** `next.config.mjs` uses `output: 'export'`, `trailingSlash: true`, unoptimized images, and optional `NEXT_PUBLIC_BASE_PATH` / `NEXT_PUBLIC_SITE_URL` environment values. The successful production build writes `website-fumadocs/out/` and requires no Node.js server at runtime.

The final root-path build generated 17 static entries, including:

- homepage
- course index
- exactly 10 course pages
- static FlexSearch endpoint
- not-found page
- `robots.txt`
- `sitemap.xml`

The export was approximately 11 MiB. Its local search artifact was 5.22 MiB after switching FlexSearch from full-substring to forward/prefix tokenization. Search data is loaded when search is used, not as the main lesson body.

GitHub Pages project-subpath configuration exists through `NEXT_PUBLIC_BASE_PATH`. A root-path export is validated. An additional local alternate-base-path build was attempted but not accepted as a pass because Turbopack stalled in this WSL/NTFS environment; that exact repository subpath must be rerun in the later deployment workflow. No deployment configuration or remote repository was created.

## Dependency audit

- `npm audit --omit=dev`: **0 production vulnerabilities**.
- Full development audit: **5 high transitive findings** in the ESLint configuration chain (`braces` → `micromatch` → `fast-glob` → `@next/eslint-plugin-next`). npm proposes downgrading `eslint-config-next` to an obsolete Next 14 line, which is incompatible with the selected Next 16 stack, so no unsafe downgrade was applied.
- The findings affect local lint/build tooling and are not shipped as runtime packages in the static export. Recheck before deployment as patched tooling becomes available.

## Production-host placeholder

`NEXT_PUBLIC_SITE_URL` defaults to `https://example.invalid`. This intentionally prevents an invented production domain. The actual GitHub Pages URL or approved custom domain must be supplied during the deployment phase.
