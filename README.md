# AI Crash Courses

Complicated AI concepts explained simply. This project turns ten supplied AI crash-course study guides into a coherent, beginner-friendly learning hub and prepares the foundation for a future YouTube course series.

The primary website is the Fumadocs application in `website-fumadocs/`. The validated Eleventy implementation in `website/` remains an untouched fallback.

## Local development

The project requires Node.js 22 or newer; Node.js 24 is used in deployment.

```bash
cd website-fumadocs
npm ci
npm run dev
```

Open `http://localhost:3000`. Local development uses the root path and does not require a GitHub repository prefix.

To run a production build and its full local validation:

```bash
cd website-fumadocs
npm run build
npm run validate
```

The static export is written to `website-fumadocs/out/` and is intentionally not committed.

## Project structure

- `sources/html/` contains the ten original study guides.
- `sources/videos/` contains the ten original course videos; video files are ignored by Git and are not stored on GitHub.
- `website-fumadocs/` is the primary Next.js, Fumadocs, MDX, and Tailwind website.
- `website/` is the preserved Eleventy fallback implementation.
- `youtube/` is reserved for future publishing metadata, thumbnails, Shorts planning, and publishing plans.
- `docs/` contains project documentation.
- `reports/` contains audits, migration records, validation results, and deployment reports.

The original files under `sources/html/` and `sources/videos/` are immutable source material. Do not edit, rename, move, convert, overwrite, or delete them without explicit human approval.

## GitHub Pages deployment

Pushes to `main` run `.github/workflows/deploy-pages.yml`. The workflow installs locked dependencies, lints and type-checks the site, creates a static export with the repository base path, validates the output, uploads it as a GitHub Pages artifact, and deploys it with GitHub's official Pages actions.

Deployment configuration is environment-driven:

- `NEXT_PUBLIC_BASE_PATH` is set to `/<repository-name>` for project-site routing.
- `NEXT_PUBLIC_SITE_URL` is set to the matching `https://<owner>.github.io/<repository-name>` URL for canonical metadata, the sitemap, and robots directives.
- Neither variable is required for normal local development at `/`.

## Adding a future course

1. Add the approved course metadata to the canonical manifest in `website/src/_data/courses.js`.
2. Add the course MDX file under `website-fumadocs/content/docs/` and list it in `meta.json`.
3. Use the existing reusable learning components for quizzes, definitions, exercises, video placeholders, navigation, and source attribution.
4. Run `npm run test` from `website-fumadocs/` and update the relevant migration report.
5. Keep all new generated work outside the immutable source folders.

YouTube videos have not been uploaded or published as part of the website deployment workflow.
