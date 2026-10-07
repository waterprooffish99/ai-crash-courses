# GitHub Pages Deployment Report

**Deployment date:** 2026-10-07  
**Status:** Successful and publicly verified

## Repository

| Field | Result |
| --- | --- |
| Recommended/selected name | `ai-crash-courses` |
| Other names considered | `ai-learning-hub`, `ai-concepts-made-simple` |
| Authenticated GitHub user | `waterprooffish99` |
| Repository | `waterprooffish99/ai-crash-courses` |
| Repository URL | <https://github.com/waterprooffish99/ai-crash-courses> |
| Visibility | Public |
| Default branch | `main` |
| Pages build source | GitHub Actions |
| Public site | <https://waterprooffish99.github.io/ai-crash-courses/> |
| HTTPS enforced | Yes |

The name is short, descriptive, and matches the existing project identity. The repository did not exist before creation, so no unrelated remote work was overwritten.

## GitHub Pages Configuration

The Fumadocs application remains in `website-fumadocs/`. The preserved Eleventy implementation remains unchanged in `website/`.

The Next.js export is configured with:

- `output: 'export'`
- `trailingSlash: true`
- unoptimized Next.js images for static-host compatibility
- `NEXT_PUBLIC_BASE_PATH=/ai-crash-courses` in Pages builds
- `NEXT_PUBLIC_SITE_URL=https://waterprooffish99.github.io/ai-crash-courses` in Pages builds
- no `assetPrefix`, because Next.js `basePath` is the supported project-subpath mechanism

Normal `npm run dev` operation does not set these variables and continues to serve from `/`.

Canonical URLs, Open Graph URLs, `robots.txt`, sitemap entries, Next.js links, compiled assets, and the search request all include the project-site path where required.

## Workflow

Workflow: `.github/workflows/deploy-pages.yml`

Triggers:

- pushes to `main`
- manual `workflow_dispatch`

Permissions:

- `contents: read`
- `pages: write`
- `id-token: write`

Official actions used:

- `actions/checkout@v7`
- `actions/setup-node@v7`
- `actions/configure-pages@v5`
- `actions/upload-pages-artifact@v4`
- `actions/deploy-pages@v5`

The workflow installs both locked dependency sets because the Fumadocs validator compares the MDX output with the preserved Eleventy migration layer. It then runs linting, type checking, a repository-path static export, deep static validation, artifact upload, and deployment to the `github-pages` environment.

Final successful run: <https://github.com/waterprooffish99/ai-crash-courses/actions/runs/37646116792>

| Job | Result |
| --- | --- |
| Build | Passed in 38 seconds |
| Deploy | Passed |
| Overall conclusion | Success |

The first run correctly failed at `configure-pages` because Pages had not yet been enabled. Pages was then enabled through the GitHub API with `build_type=workflow`, and the same workflow succeeded. No repository content was overwritten or force-pushed.

## Local Repository-Path Validation

The static export was built with the exact production values:

```text
NEXT_PUBLIC_BASE_PATH=/ai-crash-courses
NEXT_PUBLIC_SITE_URL=https://waterprooffish99.github.io/ai-crash-courses
```

Results:

- production build passed with Next.js 16.4.0
- exactly 10 course pages generated
- all 10 homepage course links resolved
- all compiled CSS and JavaScript URLs used `/ai-crash-courses/`
- all 10 course routes returned HTTP 200 from a local project-path server
- Previous, All Courses, and Next links matched the canonical sequence
- sidebar links covered all 10 courses
- breadcrumbs and table-of-contents anchors were present
- `robots.txt`, `sitemap.xml`, and `icon.svg` were generated
- canonical URLs preserved the repository path
- no local video filename or media file was exposed in the export
- normal root-path development returned HTTP 200 for the homepage and a course page

The deep validator reported semantic token coverage between 99.65% and 100% for every course and verified the expected quizzes, flashcards, glossaries, exercises, tables, and code blocks.

## Search Correction and Validation

The initial deployment exposed a real integration mismatch: the route exported a FlexSearch database while the current Fumadocs UI `type: 'static'` client expected the built-in ZBSearch format. The search request succeeded but displayed no results.

The route now follows the current official Fumadocs static-search architecture using `createFromSource(source)` with `staticGET`. The unused direct FlexSearch dependency was removed. This also reduced the exported index from about 5.22 MiB to 2.50 MiB.

A real headless Chrome test at a 390×844 viewport verified on the live site that:

- the search dialog opens
- the query `delegation` is entered through browser input events
- the request targets `/ai-crash-courses/api/search`
- 36 visible matching result items are returned
- the mobile sidebar opens and exposes the course links
- the page has no horizontal overflow

## Live Public Validation

The deployed site was requested directly after the final successful deployment.

Verified HTTP 200 responses:

- homepage
- all-courses page
- all 10 individual course pages
- static search database
- site icon
- `robots.txt`
- `sitemap.xml`
- every compiled CSS and JavaScript asset referenced by the homepage

Additional checks:

- homepage contains all 10 canonical course links
- live search index is valid `advanced` ZBSearch data and contains all 10 course paths
- course breadcrumb uses the repository base path
- Previous / All Courses / Next navigation uses the repository base path
- table of contents contains working in-page anchors
- official attribution link on the browser-tested course is correct
- all 10 official Agent Factory/Panaversity source URLs returned HTTP 200
- no rendered root-relative site link bypassed `/ai-crash-courses/`

## Git and Security Hygiene

- source MP4 files are ignored and were not committed
- `node_modules/`, `.next/`, `.source/`, `out/`, Eleventy `_site/`, logs, and TypeScript build-info files are ignored
- `.env` and `.env.*` are ignored, with only `.env.example` eligible for tracking
- no environment files were present
- credential-pattern scanning found no tokens, keys, passwords, private keys, or cookies
- no generated Pages artifact is committed; CI produces `out/`
- `npm audit --omit=dev` reported zero production vulnerabilities

The full development audit reports five high-severity findings through the `eslint-config-next` lint-only dependency chain. npm's proposed forced fix would downgrade to Next.js 14 and is not appropriate. This is a development-tooling warning, not a production dependency vulnerability, and should be monitored for compatible upstream releases.

## Source Integrity

Post-deployment SHA-256 validation passed:

- 10 original HTML files matched
- 10 original MP4 files matched
- all 20 immutable source files remain unchanged

The source videos are present only in the local read-only source folder and are absent from the GitHub repository.

## Warnings

GitHub emitted two platform notices:

1. Some current official Pages actions still target the deprecated Node.js 20 action runtime and GitHub forced them to Node.js 24. The workflow itself uses Node.js 24. This should be revisited when newer official action majors are available.
2. GitHub plans to migrate `ubuntu-latest` to Ubuntu 26 beginning 2026-10-19. No project failure resulted, but the workflow should be observed after that runner migration.

## Remaining Human Action

None is required for the GitHub repository or GitHub Pages deployment. A custom domain remains optional and was not purchased or configured.

The Eleventy fallback can now be archived later, but it should not be deleted automatically. The recommended next phase is to prepare the reusable YouTube publishing package without uploading or publishing videos until human approval.

## References

- [GitHub Pages custom workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)
- [Next.js static exports](https://nextjs.org/docs/app/guides/static-exports)
- [Next.js base path](https://nextjs.org/docs/app/api-reference/config/next-config-js/basePath)
- [Fumadocs built-in search](https://www.fumadocs.dev/docs/headless/search/orama)
