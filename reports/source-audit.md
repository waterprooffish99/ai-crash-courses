# Source Audit

Audit date: 2026-10-07

## Scope and method

This audit covers all 10 HTML files in `sources/html/` and all 10 MP4 files in `sources/videos/`. The source folders were treated as read-only.

Checks performed:

- SHA-256 checksums before and after inspection
- HTML parsing and direct source inspection
- heading, landmark, form-control, ID, fragment-link, asset, URL, CSS, JavaScript, metadata, and responsive-rule scans
- source-link and risky-URL scans for `blob:`, `data:`, `file:`, ChatGPT sandbox references, local absolute paths, and external resources
- MP4 ISO Base Media File Format inspection for container boxes, tracks, durations, codecs, dimensions, rotation, frame timing, audio presence, and fast-start layout
- comparison against current official YouTube upload guidance

`ffprobe`, MediaInfo, and a media decoding library were not available. Video findings therefore come from read-only MP4 container/sample-table parsing, not a full decode of every frame or a subjective listening/viewing review. A normal test upload and human playback review are still required before publishing.

## Executive findings

- All 10 HTML files were inspected successfully.
- All 10 MP4 files were inspected successfully.
- All numbered HTML/video pairs map confidently by number and topic.
- Every HTML document is self-contained: no external CSS, external JavaScript, remote font, remote image, local image, or local asset dependency was found.
- No `blob:`, base64 image, `file:`, ChatGPT sandbox, `/mnt/...`, Windows absolute path, or reference to a file outside the project was found.
- No duplicate IDs, broken in-page fragment targets, or broken local resource references were detected.
- All pages declare `lang="en"`, contain a viewport meta tag, and include one H1.
- Every page has inline CSS. Five pages also have inline JavaScript: courses 2, 3, 4, 8, and 10.
- Only course 2 has a meta description. None has a canonical URL, Open Graph metadata, or robots metadata.
- No page has the required site-level Previous Course / All Courses / Next Course navigation.
- Four supplied pages contain a clickable Agent Factory/Panaversity source URL: courses 2, 3, 4, and 8. Six do not.
- All videos use a normal upload-friendly combination: MP4, H.264/AVC, AAC/MPEG-4 audio, 1280×720, 16:9, and 24 fps. Each has audio and places the `moov` box before media data.
- No source file changed during the audit.

## HTML dependency and metadata matrix

| # | Inline CSS | External CSS | JavaScript | External JS | Fonts/images/assets | Supplied clickable source URL | SEO/OG |
|---:|---|---|---|---|---|---|---|
| 1 | 1 block, ~3.7 KB | None | None | None | None | None | Title + viewport only; no description/canonical/OG |
| 2 | 1 block, ~10.9 KB | None | Inline: progress, glossary filter, copy, quiz, flashcards | None | None | `https://agentfactory.panaversity.org/docs/what-ai-actually-is-crash-course` | Title, viewport, description; no canonical/OG |
| 3 | 1 block, ~8.6 KB | None | Inline: progress, prompt copy, quiz | None | None | `https://agentfactory.panaversity.org/docs/ai-fluency-crash-course` | Title + viewport only; no description/canonical/OG |
| 4 | 1 block, ~7.5 KB | None | Inline: scored quiz | None | None | `https://agentfactory.panaversity.org/docs/ai-prompting-2026` | Title + viewport only; no description/canonical/OG |
| 5 | 1 block, ~3.5 KB | None | None | None | None | None | Title + viewport only; no description/canonical/OG |
| 6 | 1 block, ~4.0 KB | None | None | None | None | None | Title + viewport only; no description/canonical/OG |
| 7 | 1 block, ~3.6 KB | None | None | None | None | None | Title + viewport only; no description/canonical/OG |
| 8 | 1 block, ~5.4 KB | None | Inline: scored quiz | None | None | `https://agentfactory.panaversity.org/docs/how-to-think-ai-era` | Title + viewport only; no description/canonical/OG |
| 9 | 1 block, ~4.2 KB | None | None | None | None | None | Title + viewport only; no description/canonical/OG |
| 10 | 1 block, ~4.0 KB | None | Inline: quiz generation and scoring | None | None | None | Title + viewport only; no description/canonical/OG |

The pages name `Inter` first in several system font stacks but do not download it. Visitors without a local Inter installation will see a system fallback. This is safe but means typography varies by device.

## Complete HTML audit

### 1. `1. just-delegate-it-study-guide.html`

- **Page title:** `Just Delegate It — Exam Study Guide`
- **Main topic:** Delegating bounded, verifiable work to AI while retaining human supervision and accountability.
- **Major headings:** Big picture; Delegation Loop; Delegation Brief/OCCADV; 11 concepts; verification/ITCD→ACIR; tool selection; technical terms; Delegation Record; practical work; self-test; exam recap; where the course leads.
- **Approximate structure:** Hero, sticky in-page navigation, 12 educational sections, cards/grids/tables, 10 native `details` questions, source note, semantic footer. There is no semantic `main` landmark.
- **Styling/dependencies:** One inline dark-theme CSS block using custom properties, grid/flex layouts, responsive tables, and a `max-width:600px` media query. No external CSS, script, font, image, or local asset.
- **JavaScript:** None. The `details` self-test works without JavaScript.
- **Links/source attribution:** Eight in-page navigation links. No external links. Agent Factory is named in the content and source note, but no original URL is supplied.
- **Navigation:** Useful section navigation only; no homepage or adjacent-course navigation.
- **Responsive indicators:** Viewport meta, flexible grids, wrapping flow elements, overflow-safe tables, and a small-screen padding rule.
- **Accessibility/markup:** One H1, logical heading progression, no images, no duplicate IDs, no broken fragments, and no obvious parse error. Missing skip link and explicit keyboard focus styling. Tables have headers but no captions. Emoji-heavy headings may be verbose in screen readers.
- **SEO/OG:** Descriptive `<title>` only. No meta description, canonical URL, Open Graph, or Twitter card data.
- **Deployment risk:** Low as a standalone document, but it has no site shell, global course links, or clickable official attribution.

### 2. `2. what_ai_actually_is_complete_study_guide.html`

- **Page title:** `What AI Actually Is — Complete Beginner Study Guide`
- **Main topic:** A beginner mental model of language models, tokens, training, context, hallucination, tools, agents, and reasoning.
- **Major headings:** Course map; glossary; nine simplified ideas; omitted advanced topics; recap; practical work; 19 review questions; scored test; flashcards; Claude.ai appendix; next topics; source of truth.
- **Approximate structure:** Header, sticky top navigation, semantic main, 13 sections, nine articles, cards, tables, 21 `details` disclosures, glossary filter, practical prompt copy, a 15-question quiz, flashcards, source section, and footer.
- **Styling/dependencies:** Largest inline CSS block (~10.9 KB), dark theme, multiple grids, horizontal overflow handling, `max-width:900px` and print media rules. No external assets.
- **JavaScript:** Reading-progress indicator, live glossary filtering, Clipboard API prompt copying with a fallback message, quiz scoring/reset, and clickable flashcards. No external libraries or environment-specific API.
- **Links/source attribution:** Six in-page navigation links and one external Agent Factory source link with `target="_blank"` and `rel="noopener"`. The supplied URL was reachable during the audit.
- **Navigation:** Rich local navigation, but no cross-course controls.
- **Responsive indicators:** Viewport, responsive grids, overflow-safe tables, small-screen navigation behavior, and print styling.
- **Accessibility/markup:** One H1; no duplicate IDs or broken fragments. Radio controls are nested in labels. The glossary search relies on placeholder text rather than a visible/ARIA label. Flashcards are clickable `div` elements without button semantics, keyboard operation, or focusability. Dynamic quiz/flashcard updates lack `aria-live`. No skip link; focus treatment is defined only for the search field.
- **SEO/OG:** The only source page with a meta description. No canonical or Open Graph metadata.
- **Deployment risk:** Clipboard writing depends on a secure browser context; HTTPS hosts satisfy that requirement and the code has a fallback. Interactive features require JavaScript, but the core lesson content remains readable without it.

### 3. `3. ai_fluency_complete_exam_study_guide.html`

- **Page title:** `AI Fluency Crash Course — Complete Exam Study Guide`
- **Main topic:** The 4D AI Fluency framework—Delegation, Description, Discernment, and Diligence—plus automation, augmentation, and agency.
- **Major headings:** Big picture; three ways to work with AI; each of the 4Ds; the 4D loop; Agent Factory scaling; 10-80-10 connection; beginner mistakes; checklist; six exercises; self-test; glossary; exam recap; next topics.
- **Approximate structure:** Fixed/progressive reading indicator, sidebar/aside containing branding and semantic nav, semantic main with 17 sections, tables, prompt blocks, 10 `details` exercises, a 15-question quiz, glossary, source note, and fixed back-to-top control. No semantic footer.
- **Styling/dependencies:** Inline dark-theme CSS (~8.6 KB), wide-layout sidebar, responsive breakpoints at 1050px and 680px, and print rules. No external assets.
- **JavaScript:** Reading progress, six Clipboard API copy buttons, quiz scoring/reset, and explanations. No external dependencies.
- **Links/source attribution:** Sixteen internal nav links, one back-to-top link with an ARIA label, and one reachable Agent Factory source URL using safe new-tab attributes.
- **Navigation:** Best local course navigation of the set, but no global course sequence.
- **Responsive indicators:** Sidebar collapses at narrower widths; grids and typography adapt; print rules exist.
- **Accessibility/markup:** One H1, but an H2 in the sidebar appears before the H1 in source order. Radio options are wrapped in labels; quiz results are not announced through `aria-live`. Copy controls work as buttons but their temporary state change is not announced. No skip link or consistent focus-visible styling. No duplicate IDs, broken fragments, or obvious parse failure.
- **SEO/OG:** No description, canonical, or Open Graph metadata.
- **Deployment risk:** Clipboard behavior requires HTTPS. Inline handlers and page-specific selectors should be migrated carefully so the quiz and copy tools are not lost.

### 4. `4. ai_prompting_2026_exam_study_guide.html`

- **Page title:** `AI Prompting in 2026 | Exam Study Guide`
- **Main topic:** Prompting as briefing/context design, retrieval modes, reasoning, sycophancy, multimodality, small apps, data analysis, permissions, model choice, and model cross-checking.
- **Major headings:** Whole-course idea; glossary; what changed by 2026; 13 concepts; practical work; four projects; test; recap; source.
- **Approximate structure:** Header, two-column layout, study-map aside, semantic main, 21 sections/cards, glossary, tables, projects, 12 native disclosures, 12-question form quiz, footer, and source card.
- **Styling/dependencies:** Inline dark-theme CSS (~7.5 KB), sidebar layout, grids/flex, table overflow, media queries at 900px and 620px. No external assets.
- **JavaScript:** Inline quiz scorer invoked by `onclick`; no external library.
- **Links/source attribution:** Twenty in-page study-map links and one reachable Agent Factory source URL. The study map is visually navigation but is an `aside`, not a semantic `nav`.
- **Navigation:** Detailed local table of contents; no global course sequence.
- **Responsive indicators:** Sidebar-to-single-column change, scalable hero type, flexible content cards, and small-screen padding.
- **Accessibility/markup:** Radio options are nested in labels. The extracted H1 text becomes `AI Promptingin 2026` because adjacent elements have no separating whitespace; the visual heading is understandable, but the generated version should expose proper accessible text. The study-map H3 occurs directly after H1 and another H2→H4 skip exists. Quiz result is not `aria-live`; no skip link/focus-visible system. No duplicate IDs or broken fragments.
- **SEO/OG:** No description, canonical, or Open Graph metadata.
- **Deployment risk:** The inline quiz must be preserved or rebuilt as progressive enhancement. The page contains time-sensitive 2026/product claims; later content validation should check them against the linked official source without silently rewriting the source file.

### 5. `5. markdown-in-html-out-study-guide.html`

- **Page title:** `Markdown In, HTML Out — Simple Exam Study Guide`
- **Main topic:** Using Markdown as a structured instruction/writing format and HTML as a generated reading/publishing format.
- **Major headings:** Big picture; two languages; Markdown; HTML; one job/three motions; recap; practical work; test.
- **Approximate structure:** Hero, sticky nav, eight sections, cards, five tables, six code examples, practical exercises, one `details` answer area, and footer. There is no semantic `main` landmark.
- **Styling/dependencies:** Inline dark-theme CSS (~3.5 KB), grid layout, overflow-safe tables/code, and a `max-width:600px` rule. No external assets or scripts.
- **JavaScript:** None.
- **Links/source attribution:** Eight in-page navigation links. `https://example.com` appears only as illustrative Markdown inside a code block; it is not a live dependency or anchor. Agent Factory is named in the footer, but no official URL is supplied.
- **Navigation:** Local sections only; no global course sequence.
- **Responsive indicators:** Viewport, responsive grid, scrollable tables/code, small-screen spacing.
- **Accessibility/markup:** One H1 and logical headings; no duplicate IDs or broken fragments. No skip link or focus-visible system; tables lack captions. Code samples are semantic `pre`/`code` content.
- **SEO/OG:** No description, canonical, or Open Graph metadata.
- **Deployment risk:** Low. The example URL must remain visibly illustrative, not be treated as the course source.

### 6. `6. code-you-never-write-study-guide.html`

- **Page title:** `Code You Never Write — Exam Study Guide`
- **Main topic:** Commissioning AI-generated code safely, recognizing code problems, verifying output, choosing execution surfaces, and limiting blast radius.
- **Major headings:** Big idea; terms; the deal; commissioning code; execution surfaces; safety; 13-concept recap; practical work; four projects; test; recap.
- **Approximate structure:** Two-column layout with aside/nav, header and semantic main, 11 sections, tables, five prompt/code blocks, nine `details` questions, and closing source/recap content. No semantic footer.
- **Styling/dependencies:** Inline dark-theme CSS (~4.0 KB), sidebar navigation, grid/flex, responsive tables, and an 850px breakpoint. No external assets or scripts.
- **JavaScript:** None.
- **Links/source attribution:** Ten internal navigation links. Agent Factory is named, but no source URL is supplied.
- **Navigation:** Sidebar course TOC only; no global course sequence.
- **Responsive indicators:** Sidebar collapses for smaller screens; cards/tables are adaptable.
- **Accessibility/markup:** One H1, but the sidebar H2 precedes it in source order. No duplicate IDs or broken fragments. Native disclosures are keyboard accessible. No skip link, consistent focus-visible styles, or table captions.
- **SEO/OG:** No description, canonical, or Open Graph metadata.
- **Deployment risk:** Low; preserve prompt/code formatting and safety callouts during migration.

### 7. `7. skills-connectors-study-guide.html`

- **Page title:** `Skills & Connectors — Exam Study Guide`
- **Main topic:** Reusable Skills, Connectors, `SKILL.md`, triggers, progressive disclosure, MCP, portability, and permission safety.
- **Major headings:** Core idea; technical terms; comparison with projects/custom instructions; how Skills and Connectors work; building a Skill; portability; safety; recap; practical projects; MCQs.
- **Approximate structure:** Semantic main wrapping hero section, sticky nav, 11 sections, cards/flows, two tables, code snippets, safety checklist, practical projects, static MCQ material, and semantic footer. No semantic header.
- **Styling/dependencies:** Compact inline dark-theme CSS (~3.6 KB), grids/flex, sticky horizontal navigation, scrollable tables, and a 650px breakpoint. No external assets or scripts.
- **JavaScript:** None.
- **Links/source attribution:** Nine internal links. Agent Factory is named in the hero/footer context, but no official source URL is supplied.
- **Navigation:** Local sections only; no cross-course links.
- **Responsive indicators:** Auto-fit cards, wrapping process flow, hidden arrows on narrow screens, reduced padding/type, table overflow.
- **Accessibility/markup:** One H1, sensible heading order, no duplicate IDs or broken fragments. Static questions do not depend on JavaScript. No skip link/focus-visible system; tables lack captions.
- **SEO/OG:** No description, canonical, or Open Graph metadata.
- **Deployment risk:** Low. Preserve literal `SKILL.md`/frontmatter/code examples exactly when migrating content.

### 8. `8. how-to-think-ai-era-study-guide.html`

- **Page title:** `How to Think in the AI Era — Exam Study Guide`
- **Main topic:** Protecting human judgment through Prediction Lock, Reasoning Receipts, error taxonomy, systems thinking, first principles, and collaboration with AI.
- **Major headings:** Extend rather than replace thinking; six disciplines; exam terms; when to use the disciplines; four projects; exam MCQs; seven-line recap.
- **Approximate structure:** Header, sticky nav, semantic main, seven sections, cards, tables, projects, one native disclosure, eight-question quiz form, footer, and source link.
- **Styling/dependencies:** Inline dark-theme CSS (~5.4 KB), grid/flex, overflow-safe tables, and a 760px breakpoint. No external assets.
- **JavaScript:** Inline quiz scorer invoked through `onclick`; no external dependency.
- **Links/source attribution:** Seven internal links and one reachable Agent Factory source URL with safe new-tab attributes.
- **Navigation:** Local sections only; no global course sequence.
- **Responsive indicators:** Viewport, adaptable cards/grids, horizontal nav, small-screen rules.
- **Accessibility/markup:** One H1 and logical heading order; nested labels make radio options nameable. The quiz result lacks `aria-live`, and question groups do not use `fieldset`/`legend`. No skip link/focus-visible system. No duplicate IDs or broken fragments.
- **SEO/OG:** No description, canonical, or Open Graph metadata.
- **Deployment risk:** Inline quiz behavior must be carried into a reusable, accessible component.

### 9. `9. workflow_design_diagnosis_study_guide.html`

- **Page title:** `Workflow Design & Diagnosis — Exam Study Guide`
- **Main topic:** Designing, mapping, building, diagnosing, improving, operating, and explaining AI-assisted workflows.
- **Major headings:** Big idea; six stages; design; delegation map; build; diagnose; make fixes stick; operate/explain; terms; practical work; test; recap.
- **Approximate structure:** Bright hero, two-column layout with semantic nav and main, 12 card sections, six tables, one native disclosure, practical work, and a visually styled footer implemented as a `div`.
- **Styling/dependencies:** Inline light-theme CSS (~4.2 KB), colorful accent system, sidebar, grids, table overflow, an 820px breakpoint, and print rules. No external assets or scripts.
- **JavaScript:** None.
- **Links/source attribution:** Twelve internal nav links. Agent Factory is named in the hero/footer, but no official URL is supplied.
- **Navigation:** Detailed local TOC; no global course sequence.
- **Responsive indicators:** Sidebar collapses, grids become single-column where needed, tables scroll, print styles exist.
- **Accessibility/markup:** One H1; extracted text becomes `Workflow Design& Diagnosis` because adjacent heading nodes have no separating whitespace. No duplicate IDs or broken fragments. Footer is not a semantic `footer`; no skip link/focus-visible system or table captions.
- **SEO/OG:** No description, canonical, or Open Graph metadata.
- **Deployment risk:** The light visual identity is the strongest outlier from the required dark public UI. Preserve its colorful stage distinctions within the shared dark system instead of flattening them.

### 10. `10. governance-risk-responsible-use-study.html`

- **Page title:** `Governance, Risk & Responsible Use | Exam Study Guide`
- **Main topic:** Case, data, capability, people, governance records, incident response, drift, and responsible AI use.
- **Major headings:** Whole-course picture; case; data; capability; people; integrated example; Governance Record; incidents; drift; agent builders; glossary; practical work; test; recap.
- **Approximate structure:** Bright hero, sticky semantic nav, semantic main with 14 cards, four tables, practical checklist, JavaScript-generated 12-question quiz, and a visually styled non-semantic footer.
- **Styling/dependencies:** Inline light-theme CSS (~4.0 KB), colorful traffic-light/status blocks, horizontal sticky navigation, table overflow, and a 760px breakpoint. No external assets.
- **JavaScript:** Builds all quiz questions/options at runtime and scores them through an inline handler. No external dependency.
- **Links/source attribution:** Ten internal links. Agent Factory is named, but no original source URL is supplied.
- **Navigation:** Local sections only; no global course sequence.
- **Responsive indicators:** Four-column/tier grids collapse to one column, hero/cards resize, tables scroll horizontally.
- **Accessibility/markup:** One H1 and logical static headings. Quiz options become nested labels after JavaScript runs, but the entire quiz is absent when JavaScript is unavailable. Dynamic results lack `aria-live`; question groups lack `fieldset`/`legend`; no skip link/focus-visible system. No duplicate IDs or broken fragments.
- **SEO/OG:** No description, canonical, or Open Graph metadata.
- **Deployment risk:** The quiz needs progressive enhancement so questions remain present without JavaScript. The page title is broader than the video filename, which says governance/risk management but omits responsible use.

## Cross-file comparison

### Shared layout patterns

All pages use a self-contained single-document pattern with:

- CSS custom properties
- a constrained central wrapper
- a hero/intro area
- an in-page navigation bar or sidebar
- section cards, callouts, grids, tables, practical exercises, and review questions
- responsive viewport declarations and at least one media query
- beginner-friendly summaries and exam-focused recaps

This gives a strong content foundation, but each page independently reimplements the same shell.

### Inconsistencies and duplication

- **CSS duplication:** Resets, tokens, typography, wrappers, cards, callouts, navigation, grids, tables, and responsive rules are repeated in all 10 files. They are similar but not identical, making global fixes expensive.
- **JavaScript duplication:** Courses 4 and 8 have closely related inline quiz graders; course 10 generates and grades a quiz; courses 2 and 3 contain larger page-specific quiz logic. These should become one accessible quiz component with data-driven questions.
- **Navigation:** All navigation is page-local. Sidebars are used by 3, 4, 6, and 9; horizontal sticky navigation is used elsewhere. Course 4's TOC is not marked as `nav`. None has site-level navigation.
- **Typography:** Most pages request Inter without loading it and then use differing fallback stacks. Code fonts also vary.
- **Color systems:** Courses 1–8 are predominantly dark with cyan/violet/pink/green accents. Courses 9–10 use bright light backgrounds. Accent names and meanings are not consistent.
- **Course naming:** Titles alternate among “Exam Study Guide,” “Complete Exam Study Guide,” “Simple Exam Study Guide,” and “Crash Course.” H1/title phrasing is not fully normalized.
- **Header/footer semantics:** Some pages use `header`/`footer`; others use hero sections, asides, or styled `div` footers. Courses 1 and 5 lack `main`.
- **Mobile behavior:** Every page attempts responsive behavior, but breakpoints vary from 600px to 1050px, sidebar collapse rules differ, and there is no common mobile navigation behavior.
- **SEO:** Title tags exist, but descriptions, canonical URLs, Open Graph, structured data, sitemap participation, and share images are absent or inconsistent.
- **Source attribution:** Only four pages provide a clickable original source URL.

### Features worth preserving

- Native `details` self-tests that work without JavaScript
- Course 2's glossary filtering, reading progress, copy prompts, and flashcards—after keyboard/accessibility fixes
- Course 3's structured 4D exercises and prompt-copy workflow
- Course 4's detailed study map and project grouping
- Course 6's strong safety/blast-radius callouts and code/prompt formatting
- Course 7's concise process diagrams and literal technical examples
- Course 9's six-stage color coding
- Course 10's case/data/capability/people visual model and governance checklist
- Individual course accent identities, while bringing them under one shared dark token system

## Source integrity and public-deployment risks

### Explicit risky-reference checks

| Risk | Result |
|---|---|
| ChatGPT sandbox links | None found |
| `blob:` URLs | None found |
| Local absolute filesystem paths | None found |
| `file:` URLs | None found |
| Base64/data images | None found |
| Remote images | None found |
| Local images/assets | None referenced |
| External CSS/JS/fonts | None found |
| Broken relative asset links | None found |
| Broken in-page fragments | None found |
| References outside project | None found |
| JavaScript requiring ChatGPT-specific behavior | None found |
| Creator-only/authenticated links | None detected among supplied links |

The four supplied Agent Factory links were reachable at audit time. They are attribution/reference links, not runtime dependencies; a later outage would not stop a course page from rendering.

### Important risks and blockers before public launch

1. **No cohesive site exists yet.** The source documents have no homepage, global course sequence, shared URL policy, or site-wide navigation.
2. **Metadata is incomplete.** Nine pages lack descriptions; all lack canonical and Open Graph metadata.
3. **Attribution URLs are incomplete.** Courses 1, 5, 6, 7, 9, and 10 name the source but do not supply an official URL. These must remain marked missing until the human supplies or approves them.
4. **Accessibility needs systematic work.** Add skip links, focus-visible styling, semantic landmarks, accessible quiz groupings/results, keyboard-operable flashcards, table captions where useful, and contrast testing.
5. **Inline code is duplicated.** Editing a source page in place would violate source integrity, while copying it as-is would preserve drift. Generated pages need shared CSS/JS and content-preservation checks.
6. **JavaScript-only quiz content exists in course 10.** Render questions in HTML and use JavaScript only for scoring.
7. **Time-sensitive product material exists.** Product controls and 2026-specific claims should be validated during implementation and visibly attributed; changes must not be silently applied to originals.
8. **The videos were not fully decoded or subjectively reviewed.** Container metadata is healthy, but human playback and a private/unlisted test upload remain necessary.

## Complete video technical audit

All files have:

- ISO MP4 v2 (`mp42`, compatible with `isom`/`mp42`)
- one H.264/AVC (`avc1`) video track
- one AAC/MPEG-4 (`mp4a`) mono audio track at 44.1 kHz, 16-bit sample description
- 1280×720 display and coded dimensions
- 16:9 aspect ratio
- 24.000 fps constant frame timing
- no rotation metadata
- `ftyp`, `moov`, and `mdat` boxes in valid order, with `moov` before `mdat` (fast start)

| # | Video filename | Duration | Size | Resolution / AR | FPS | Video | Audio | Audio exists | Obvious container issue | YouTube suitability |
|---:|---|---:|---:|---|---:|---|---|---|---|---|
| 1 | `1. جسٹ_ڈیلیگیٹ_اٹ__کریش_کورس.mp4` | 09:19.926 | 46.24 MiB | 1280×720 / 16:9 | 24 | H.264/AVC | AAC, mono, 44.1 kHz | Yes | None detected | Suitable at container level |
| 2 | `2. AI_انجن_کا_اصل_راز.mp4` | 07:02.232 | 46.63 MiB | 1280×720 / 16:9 | 24 | H.264/AVC | AAC, mono, 44.1 kHz | Yes | None detected | Suitable at container level |
| 3 | `3. اے_آئی_فلوئنسی_فریم_ورک.mp4` | 05:17.068 | 31.60 MiB | 1280×720 / 16:9 | 24 | H.264/AVC | AAC, mono, 44.1 kHz | Yes | None detected | Suitable at container level |
| 4 | `4. AI_پرامپٹنگ__2026.mp4` | 06:06.109 | 36.23 MiB | 1280×720 / 16:9 | 24 | H.264/AVC | AAC, mono, 44.1 kHz | Yes | None detected | Suitable at container level |
| 5 | `5. Markdown_In,_HTML_آؤٹ.mp4` | 07:18.811 | 44.07 MiB | 1280×720 / 16:9 | 24 | H.264/AVC | AAC, mono, 44.1 kHz | Yes | None detected | Suitable at container level |
| 6 | `6. کوڈ_جو_آپ_کبھی_نہیں_لکھتے.mp4` | 08:28.680 | 37.61 MiB | 1280×720 / 16:9 | 24 | H.264/AVC | AAC, mono, 44.1 kHz | Yes | None detected | Suitable at container level |
| 7 | `7. skills-and-connectors.mp4` | 05:44.259 | 35.37 MiB | 1280×720 / 16:9 | 24 | H.264/AVC | AAC, mono, 44.1 kHz | Yes | None detected | Suitable at container level |
| 8 | `8. AI_کے_دور_میں_سوچنا.mp4` | 08:25.522 | 39.57 MiB | 1280×720 / 16:9 | 24 | H.264/AVC | AAC, mono, 44.1 kHz | Yes | None detected | Suitable at container level |
| 9 | `9. ورک_فلو_ڈیزائن_اور_تشخیص.mp4` | 06:29.143 | 35.39 MiB | 1280×720 / 16:9 | 24 | H.264/AVC | AAC, mono, 44.1 kHz | Yes | None detected | Suitable at container level |
| 10 | `10. گورننس_اور_رسک_مینجمنٹ.mp4` | 05:54.104 | 26.15 MiB | 1280×720 / 16:9 | 24 | H.264/AVC | AAC, mono, 44.1 kHz | Yes | None detected | Suitable at container level |

YouTube's current official guidance recommends MP4, H.264, AAC-family audio, native frame rate, fast-start metadata, and recognizes 1280×720 as standard 16:9 720p. The files align with those high-level requirements: [YouTube recommended upload encoding settings](https://support.google.com/youtube/answer/1722171?hl=en) and [video resolution/aspect ratios](https://support.google.com/youtube/answer/6375112?co=GENIE.Platform%3DDesktop&hl=en).

“Suitable” here does not mean “publish-ready.” The following remain unverified without decoding/listening or uploading:

- audible quality, loudness, clipping, silence, synchronization, and language accuracy
- visual artifacts, frozen frames, legibility, color metadata, and progressive/interlaced scan behavior
- exact H.264 profile/level, AAC profile, bitrate, GOP/keyframe pattern, and edit-list behavior
- rights/permissions and content accuracy

## Checksum verification

Baseline SHA-256 values were recorded before inspection and recomputed after the audit. The final comparison passed for all 20 source files: no file was added, removed, or changed.

| Source file | SHA-256 |
|---|---|
| `sources/html/1. just-delegate-it-study-guide.html` | `3ca987db1e8ce4aa92f1cfe953c67b1caef391e958962c5c4a86dd35d964f478` |
| `sources/html/2. what_ai_actually_is_complete_study_guide.html` | `7d84662c5c82a3f70f234d62d21f50e07021528a57f00694eb470f4ad178eb6d` |
| `sources/html/3. ai_fluency_complete_exam_study_guide.html` | `d8e71a7afc249a6b4e36ebf16d8d6ae427495dea18466b52bd28b64b16beb888` |
| `sources/html/4. ai_prompting_2026_exam_study_guide.html` | `6aebd84174c5af2ea4135a73cb4f5e849f6612f63cbddfb97d868c29849808da` |
| `sources/html/5. markdown-in-html-out-study-guide.html` | `8352378e37e2de90dee2b5a6c7ce0ea236775261e27f4c9d0cb8779d4b007d94` |
| `sources/html/6. code-you-never-write-study-guide.html` | `dddcae1beb0c1bcedd5abc016234802d882f4f427ecb3c6fa1da27fd0a040b14` |
| `sources/html/7. skills-connectors-study-guide.html` | `f6977843041bc1f924b474c415bb9ada942349248f5aab5675942ff1ff9ead8e` |
| `sources/html/8. how-to-think-ai-era-study-guide.html` | `7beb4e7d379527e0ac6fcb896318407769b30db21aeeb965c35d4a72b4cd9662` |
| `sources/html/9. workflow_design_diagnosis_study_guide.html` | `15cf15b2f488decf4755d712a9acd4d8e9fba052522b9b48a19569a0ed431129` |
| `sources/html/10. governance-risk-responsible-use-study.html` | `cdf1f6d0f7d6f6df3ab19f06bc7d2c046ca0ab4a312c745fd980ff0a8b16fc90` |
| `sources/videos/1. جسٹ_ڈیلیگیٹ_اٹ__کریش_کورس.mp4` | `06484e6fc5f6214979b32a30bdae25e8ff2260233c22219a6b868766e74aba8f` |
| `sources/videos/2. AI_انجن_کا_اصل_راز.mp4` | `a23c8b7ebb0f5168456d659f4108c515f3777f9485ceb33fd0d6e737da8edd4b` |
| `sources/videos/3. اے_آئی_فلوئنسی_فریم_ورک.mp4` | `968d76327b68a1af86ca057c1cc0e93b454ebaaf426ff38fbc93e17c2467fc89` |
| `sources/videos/4. AI_پرامپٹنگ__2026.mp4` | `7b77b50a341fe17a0cadfc3efb2b1923ba9d130c038c20aa048e9bfe650a6449` |
| `sources/videos/5. Markdown_In,_HTML_آؤٹ.mp4` | `ad630f3482a2ee254b278dc6faf70ad90cb399212174cac111fa34675c1ebb19` |
| `sources/videos/6. کوڈ_جو_آپ_کبھی_نہیں_لکھتے.mp4` | `1bca6c872792a2a6f11b457c9f0f902a8069288bd8a8a8501291b1b4540ed2c1` |
| `sources/videos/7. skills-and-connectors.mp4` | `1c6a8b16c3f144d16e155d6d44bb31eed6f89e2d84cc2e77a2a89151354b8446` |
| `sources/videos/8. AI_کے_دور_میں_سوچنا.mp4` | `156f179d458775eabe706911aad52e908d923f518ce21197f4b37b9c895089f8` |
| `sources/videos/9. ورک_فلو_ڈیزائن_اور_تشخیص.mp4` | `f01722d10f35a865323142255777e2337e3a81c74eacdc402e2e963b86327b2c` |
| `sources/videos/10. گورننس_اور_رسک_مینجمنٹ.mp4` | `35399deb014e2128b32896d4fc44fab8cf735b1565804adc75098bfa8298a302` |

## Bottom line

The source set is unusually deployment-safe at the asset level because every study page is self-contained. The main work is controlled migration: preserve all educational content and useful interactions while replacing ten separate shells with shared navigation, metadata, accessibility, and reusable CSS/JavaScript. No original source should be edited to achieve that.
