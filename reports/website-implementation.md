# Website Implementation Report

Implementation date: 2026-10-07  
Scope: local website implementation only; no deployment or publishing was performed.

## Outcome

The ten supplied study guides now build as one cohesive Eleventy website. The generated site contains a homepage, an all-courses catalog, exactly ten clean course routes, shared navigation and design, source attribution, future-video placeholders, sitemap, robots file, and a local 404 page.

The immutable files in `sources/html/` and `sources/videos/` were read during the build and validation but were not edited, moved, renamed, converted, or copied into the public artifact.

## Architecture implemented

- Eleventy 3.1.6 generates plain static HTML into `website/_site/`.
- `website/src/_data/courses.js` is the canonical manifest for course order, names, slugs, source filenames, verified official URLs, summaries, adjacent courses, YouTube placeholders, and public study paths.
- A paginated course template generates all ten pages from that manifest.
- Shared Nunjucks layouts and components provide the site shell, course attribution, future-video placeholder, and Previous / All Courses / Next navigation.
- `website/lib/migrate-source.js` reads the immutable source pages at build time, selects the educational body, removes duplicated page chrome and page-specific styling/scripts, and applies safe semantic transformations.
- One mobile-first stylesheet supplies the dark design system, cards, learning components, tables, quizzes, focus states, responsive breakpoints, reduced-motion handling, and print behavior.
- One small progressive-enhancement script supplies reading progress, glossary filtering, keyboard-operable flashcards, prompt copying, and quiz scoring. Lesson content and navigation remain available without JavaScript.
- `SITE_URL` controls the production hostname and defaults to the explicit non-production placeholder `https://example.invalid`.
- `PATH_PREFIX` and Eleventy's URL filter keep repository-subpath hosting compatible with a later GitHub Pages phase.

## Public URL structure

```text
/
/courses/
/courses/just-delegate-it/
/courses/what-ai-actually-is/
/courses/ai-fluency/
/courses/ai-prompting-2026/
/courses/markdown-in-html-out/
/courses/code-you-never-write/
/courses/skills-and-connectors/
/courses/how-to-think-in-the-ai-era/
/courses/workflow-design-and-diagnosis/
/courses/governance-risk-responsible-use/
/sitemap.xml
/robots.txt
```

## Files created

### Build and validation

- `website/package.json`
- `website/package-lock.json`
- `website/.eleventy.js`
- `website/lib/migrate-source.js`
- `website/scripts/validate.js`

### Data, templates, and components

- `website/src/_data/courses.js`
- `website/src/_data/site.js`
- `website/src/_includes/layouts/base.njk`
- `website/src/_includes/layouts/course.njk`
- `website/src/_includes/components/site-header.njk`
- `website/src/_includes/components/site-footer.njk`
- `website/src/_includes/components/course-sequence.njk`
- `website/src/_includes/components/source-attribution.njk`
- `website/src/_includes/components/video-placeholder.njk`
- `website/src/index.njk`
- `website/src/courses/index.njk`
- `website/src/courses/course.njk`
- `website/src/404.njk`
- `website/src/robots.txt.njk`
- `website/src/sitemap.xml.njk`

### Shared assets

- `website/src/assets/css/site.css`
- `website/src/assets/js/enhancements.js`

The generated `website/_site/` directory and dependency directory are ignored by Git. No MP4 file is present in the generated site.

## Official-source verification

All ten manifest entries have a verified `agentfactory.panaversity.org` source URL. The six URLs absent from the supplied HTML were verified against the official Agent Factory / Panaversity course pages and were not inferred silently.

Course 10 is confirmed as **Governance, Risk & Responsible Use**, matching the official page title “Governance, Risk & Responsible Use: A Crash Course.” It does not remain pending human title review.

## Build result

Command:

```bash
cd website
npm run build
```

Result: **passed**.

- Eleventy version: 3.1.6
- Templates written: 15
- Static assets copied: 2
- Generated course pages: 10
- Migrated courses: 10
- Generated artifact size at validation time: approximately 424 KB, excluding temporary visual-review screenshots (which were removed)

## Validation results

Command:

```bash
cd website
npm run validate
```

The automated validator checks:

- exactly ten manifest course directories and pages
- homepage links to every course
- canonical H1/title/description/canonical/Open Graph/Twitter metadata
- source attribution and future-video placeholder on every course
- exact normalized educational-body text after migration
- preservation counts for tables, code/prompt blocks, and native disclosures
- preserved quiz, flashcard, and prompt-copy controls
- Previous / All Courses / Next behavior
- table-of-contents fragment targets
- all generated internal links and assets
- duplicate IDs and remaining source inline handlers
- absence of local video paths and video files
- sitemap, robots file, shared CSS, and shared JavaScript
- mobile-first breakpoints, focus styles, and reduced-motion support
- SHA-256 checksums for all ten HTML and all ten video sources

Final result: **passed**. All 20 source SHA-256 values match the audited baseline.

A local headless-browser review was also completed at desktop and responsive/tablet widths. The shared shell, hero, course catalog, course typography, and responsive grids rendered without an obvious layout failure. Temporary screenshots were removed after inspection.

Production dependency audit result: **0 vulnerabilities** (`npm audit --omit=dev`). The full development-tool audit reports 9 transitive advisories (4 moderate, 5 high) inside Eleventy/Nunjucks/watch/build dependencies. npm currently offers no valid patched upgrade for the affected latest transitive packages and incorrectly proposes an obsolete Eleventy downgrade. These packages do not ship in the generated static site, but the advisories should be rechecked before deployment.

## Accessibility and SEO implemented

- semantic header, navigation, main, article, section, aside, and footer structure
- skip link and visible `:focus-visible` treatment
- one H1 per page and normalized heading skips in migrated content
- labeled glossary search, button semantics for flashcards, fieldset/legend quiz groups, and live result regions
- captions for migrated tables and scrollable table wrappers
- content-first operation without JavaScript
- unique course titles and descriptions
- canonical, Open Graph, and Twitter/X metadata
- sitemap and robots file
- clean directory URLs

No social preview image was invented. It can be added after a real brand asset is approved.

## Unresolved issues and human review

1. **Production hostname:** `SITE_URL` still defaults to `https://example.invalid`. The final GitHub Pages URL or approved custom domain must be supplied during deployment configuration.
2. **GitHub Pages mode:** decide whether this will be a user/organization site or a repository project site; the latter needs the matching `PATH_PREFIX` in the future deployment workflow.
3. **Editorial review:** automated text comparison confirms the selected educational bodies were preserved, but a human should still review each public lesson for tone, rights, attribution wording, and factual currency before publication.
4. **Visual acceptance:** the design has been checked locally, but final browser/device and accessibility testing should occur before public launch.
5. **Development advisories:** re-run the full npm audit when Eleventy or its transitive packages publish fixes. The static output itself has no production dependency advisories.
6. **YouTube embeds:** all ten manifest `youtubeUrl` values intentionally remain `null`; placeholders must not be replaced until approved public videos exist.

There are no unresolved official source URLs and no known course-content omissions. Deployment configuration, remote repository creation, video upload, and publishing remain outside this phase.

## Local preview

```bash
cd /mnt/d/Projects/ai-crash-courses-youtube/website
npm run serve
```

Eleventy will print the local address, normally `http://localhost:8080/`.
