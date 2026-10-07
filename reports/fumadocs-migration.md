# Fumadocs Migration Report

Migration date: 2026-10-07  
Scope: local Fumadocs implementation only; no deployment, publishing, remote repository, or video upload occurred.

## Outcome

The Fumadocs migration is complete in `website-fumadocs/`. All ten courses are maintainable MDX documents rendered at stable `/courses/...` URLs. The production static export passes, local search returns course and heading matches, navigation and responsive layouts are present, and all 20 immutable source checksums still match.

The validated Eleventy implementation remains intact in `website/`. It has not been deleted, overwritten, or replaced.

## Architecture implemented

- Next.js App Router with a catch-all `/courses/[[...slug]]` route and `generateStaticParams`
- Fumadocs Core/UI for the documentation shell, page tree, breadcrumbs, desktop/mobile sidebar, active table of contents, dark mode, and search dialog
- Fumadocs MDX Config API with ten course documents plus the course-index document
- one TypeScript course manifest for public metadata, filenames, checksums, source URLs, summaries, and future YouTube URLs
- reusable `Quiz`, `Glossary`, `Flashcard`, `Exercise`, `LearningCallout`, `SourceLink`, `CourseVideo`, and `CourseNavigation` components
- Tailwind CSS 4 plus a custom dark-first visual system rather than an unchanged default theme
- static FlexSearch generated from MDX structured data
- Next.js metadata APIs for titles, descriptions, canonical links, Open Graph, Twitter/X, sitemap, and robots
- `output: 'export'` for host-portable static files in `out/`
- centralized English locale declaration so a future localized collection/routing layer can be added without rewriting lesson components

The homepage is a separate premium learning-hub presentation. It lists all ten courses, communicates the beginner positioning, and identifies the site as an independent learning resource.

## Validation completed

| Check | Result |
|---|---|
| Dependency installation | Passed; lockfile created |
| ESLint | Passed |
| Fumadocs MDX generation | Passed |
| TypeScript | Passed |
| Next.js production build | Passed |
| Static export | Passed; 17 static entries |
| Course pages | Exactly 10 |
| Homepage links | All 10 present |
| Previous / All / Next | Passed for all boundary and middle courses |
| Sidebar navigation | All 10 links present on every course page |
| Breadcrumbs and TOC | Present; all checked fragment targets resolve |
| Search | Static index generated; live client queries for “hallucination”, “delegation”, and “governance” returned results |
| Mobile navigation | Open Sidebar and Open Search controls present; built export visually checked at 500 CSS px |
| Desktop homepage | Visually checked at 1440 px |
| Interactive components | Quiz, glossary, flashcard, exercise, callout, source, video, and sequence structures checked |
| Internal links/assets | Passed generated-output crawl |
| Missing media | No MP4/MOV/MKV/WebM in export |
| SEO support | Unique metadata, canonical, OG, Twitter/X, sitemap, robots present |
| Content comparison | 99.65–100% semantic token coverage per course; structural counts match |
| Source integrity | Passed; 10 HTML + 10 MP4 SHA-256 hashes match |
| Production dependency audit | 0 vulnerabilities |

The generated static artifact is approximately 11 MiB; the forward-tokenized local search index is 5.22 MiB.

## Eleventy versus Fumadocs

| Area | Eleventy reference | Fumadocs migration | Assessment |
|---|---|---|---|
| Content model | HTML transformed during build | Ten explicit MDX documents with typed components | Fumadocs is easier to edit course-by-course |
| Shared architecture | Nunjucks layouts/data and custom enhancements | React components, Fumadocs page tree, App Router | Fumadocs has more conventions but better docs ergonomics |
| Search | No full-document search | Local static FlexSearch with keyboard search dialog | Clear Fumadocs improvement |
| Navigation | Shared header, local TOC, sequence links | Sidebar, breadcrumbs, active TOC, mobile drawer, sequence links | Fumadocs improvement for long lessons |
| Mobile UX | Custom responsive layout | Fumadocs mobile controls plus custom responsive theme | Equivalent or improved; visual check passed |
| Interactions | One custom enhancement script | Reusable React components plus native disclosures | Easier isolation/testing in Fumadocs; more client JS |
| Maintainability | Very small, direct, low dependency count | Typed manifest, MDX, component library, generated page tree | Fumadocs wins for future content/features; Eleventy wins for simplicity |
| Build complexity | Small and fast | 616 installed packages; MDX/React/Next toolchain; slower build | Fumadocs regression |
| Output size | About 424 KB | About 11 MiB, including 5.22 MiB search index | Fumadocs regression; search is the main tradeoff |
| Deployment | Plain static files | Plain static export after Next build | Both suit static hosts; Fumadocs needs correct base path on project sites |
| Page performance | Minimal JavaScript | Static HTML with framework/client-component chunks | Eleventy is lighter; Fumadocs remains statically rendered but needs later performance measurement |
| Future localization | Would require new data/templates | Locale config is centralized; Fumadocs supports localized sources/page trees | Fumadocs is the stronger base |
| Future courses | Manifest plus generated HTML | Add manifest entry + MDX + page-tree order | Both are manageable; MDX authoring is more direct |

## Content preservation

No known educational content was lost. The migration preserves explanations, headings, tables, examples, code/prompt blocks, projects, exercises, disclosures, quizzes, MCQs, glossary terms, flashcards, safety notes, and source attribution. Bare `<pre>` elements were explicitly converted to fenced MDX blocks so prompts, diagrams, and directory examples retain preformatted meaning.

The full per-course record is in `reports/fumadocs-content-migration.md`.

## Search and static-output tradeoff

Static FlexSearch is the correct no-cost search architecture for GitHub Pages and works without a server. Forward tokenization reduced the exported index from roughly 15 MiB to 5.22 MiB while preserving useful prefix matches.

This remains the largest regression relative to Eleventy. Fumadocs documentation notes that static clients must download the exported index when search is used. If the course library grows substantially, reconsider a server search endpoint on Cloudflare/Vercel or a hosted index. No paid service is necessary for the present ten-course site.

## Deployment recommendation

Use **GitHub Pages** as the primary platform for this build because it matches the decided target and the site now exports complete static HTML with no server dependency. Configure the later workflow with:

- project root: `website-fumadocs/`
- build command: `npm ci && npm run build`
- artifact directory: `website-fumadocs/out/`
- `NEXT_PUBLIC_SITE_URL`: the real approved Pages URL
- `NEXT_PUBLIC_BASE_PATH`: empty for a root/custom-domain site, or `/<repository-name>` for a project site

The root-path export is fully validated. The environment-driven project-subpath support is implemented, but the exact alternate-base-path production build must be rerun in the deployment phase because the local Turbopack check stalled under this WSL/NTFS environment. This does not affect the validated root export and no deployment was attempted.

Vercel is the simplest fallback if server-rendered search or preview deployments become more important. Cloudflare Pages is also suitable for the static `out/` artifact. Neither is required for the current design.

## Regressions and unresolved items

1. Fumadocs has a significantly larger dependency graph, build time, JavaScript footprint, and output size than Eleventy.
2. Static search is 5.22 MiB and should be performance-tested on slower mobile networks before publication.
3. The actual production hostname remains unset (`https://example.invalid` placeholder).
4. The GitHub Pages repository type and exact base path still require a human decision in the deployment phase.
5. Full development audit reports five transitive high findings in lint-only tooling; production audit is clean. Do not apply npm's suggested incompatible Next 14 downgrade.
6. Human review is still required for source rights, attribution wording, factual currency, and final visual acceptance.
7. YouTube URLs intentionally remain null and all pages show placeholders.

There are no unresolved official source URLs. The official title for Course 10 is confirmed as **Governance, Risk & Responsible Use** from the [official Agent Factory / Panaversity page](https://agentfactory.panaversity.org/docs/governance-risk-responsible-use-crash-course).

## Replacement recommendation

The Fumadocs version now meets the local migration criteria and is the recommended implementation for future course expansion, search, navigation, and localization. It is reasonable to replace Eleventy **after human review and after the real GitHub Pages base-path build passes in the deployment workflow**.

Do not delete `website/` yet. Keep it as a reference/fallback until that approval and deployment validation occur.
