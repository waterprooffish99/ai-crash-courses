# Content Migration Report

Migration date: 2026-10-07

## Method

Each immutable file in `sources/html/` is parsed during the Eleventy build. The migration keeps the educational body and transforms only presentation and interaction details needed for the shared public site.

The following material was deliberately removed from the generated lesson body:

- source-page CSS and JavaScript
- duplicate document shell, hero H1, branding header/footer, and page-local navigation
- duplicate original-source cards, replaced by the shared verified attribution component
- inline event handlers and inline style attributes

The following was added or standardized without changing the educational meaning:

- canonical title and concise manifest summary
- shared page-local table of contents
- normalized heading jumps and stable section IDs
- table captions and horizontal-scroll wrappers
- accessible quiz fieldsets, legends, labels, result regions, and reusable scoring
- button/keyboard semantics for flashcards
- a visible glossary-search label
- safe new-tab link relationships
- shared Previous / All Courses / Next navigation
- future YouTube embed placeholder

The original source files were not rewritten. The generated page text is automatically compared with the complete selected educational body on every validation run.

## Course-by-course mapping

| # | Original HTML | Generated page | Migrated educational material | Preserved interactions and learning aids | Deliberate changes / exclusions |
|---:|---|---|---|---|---|
| 1 | `1. just-delegate-it-study-guide.html` | `/courses/just-delegate-it/` | Delegation Loop, OCCADV brief, 11 concepts, ITCD→ACIR verification, tool selection, terminology, Delegation Record, practical work, recap | 5 tables and all 10 native self-test disclosures | Source hero, sticky source nav, inline CSS, footer/source note replaced by shared shell and verified attribution |
| 2 | `2. what_ai_actually_is_complete_study_guide.html` | `/courses/what-ai-actually-is/` | Course map, glossary, nine core ideas, advanced-topic boundaries, recap, practical work, review, Claude appendix, next topics | Live glossary filter, 6 prompt-copy controls, 15-question scored quiz, 6 keyboard flashcards, 21 disclosures, 3 tables | Original inline script replaced by shared progressive enhancement; non-keyboard clickable cards converted to buttons; original shell removed |
| 3 | `3. ai_fluency_complete_exam_study_guide.html` | `/courses/ai-fluency/` | Three ways to work with AI, all four Ds, 4D loop, Agent Factory scaling, 10-80-10 connection, mistakes, checklist, exercises, glossary, recap | 6 prompt-copy controls, 15-question scored quiz, 10 disclosures, 9 tables, 6 prompt/code blocks | Fixed sidebar/back-to-top UI and inline script replaced by shared TOC, global navigation, and reusable controls |
| 4 | `4. ai_prompting_2026_exam_study_guide.html` | `/courses/ai-prompting-2026/` | Whole-course model, glossary, 2026 context, all 13 concepts, practical work, four projects, test, recap | 12-question scored quiz, 12 disclosures, 2 tables | Study-map aside rebuilt as the shared TOC; inline scorer replaced; canonical manifest title fixes the source H1 text-spacing defect |
| 5 | `5. markdown-in-html-out-study-guide.html` | `/courses/markdown-in-html-out/` | Markdown and HTML mental models, one-job/three-motions workflow, recap, practical exercises, test | 5 tables, 6 semantic code examples, native answer disclosure | Source sticky nav, hero, inline CSS, and footer removed; illustrative `example.com` text remains an example rather than a live dependency |
| 6 | `6. code-you-never-write-study-guide.html` | `/courses/code-you-never-write/` | Commissioning model, execution surfaces, safety and blast radius, 13-concept recap, practical work, projects, test | 4 tables, 5 prompt/code blocks, 9 native disclosures, safety callouts | Source sidebar and page styling replaced by the shared shell while safety distinctions remain visible |
| 7 | `7. skills-connectors-study-guide.html` | `/courses/skills-and-connectors/` | Skills, Connectors, `SKILL.md`, triggers, progressive disclosure, MCP, portability, permissions, projects, MCQs | Static MCQs, 2 tables, literal technical/code example, process cards | Inline page theme/nav/footer removed; ampersand title safely normalized through the manifest |
| 8 | `8. how-to-think-ai-era-study-guide.html` | `/courses/how-to-think-in-the-ai-era/` | Six thinking disciplines, exam terms, usage guidance, four projects, recap | 8-question scored quiz, 3 tables, native disclosure | Inline quiz handler replaced with reusable accessible scoring; source local nav and styling removed |
| 9 | `9. workflow_design_diagnosis_study_guide.html` | `/courses/workflow-design-and-diagnosis/` | Six workflow stages, delegation map, build/diagnosis, reusable fixes, operations, terms, practical work, test, recap | 6 tables, native disclosure, stage/process cards | Light page shell converted to the shared dark system; colored stage distinctions remain; manifest title fixes source heading spacing |
| 10 | `10. governance-risk-responsible-use-study.html` | `/courses/governance-risk-responsible-use/` | Case, data, capability, people, integrated example, Governance Record, incidents, drift, agent builders, glossary, practical work, recap | All 12 quiz questions/options are rendered statically before JavaScript, scored progressively, plus 4 tables and the status model/checklist | JavaScript-only quiz generation replaced with accessible HTML so questions remain visible without JavaScript; light source shell replaced by shared dark styling |

## Migration totals and integrity checks

| # | Migrated body characters (normalized) | H2 | H3 | Tables | Code/prompt blocks | Native disclosures | Quiz questions |
|---:|---:|---:|---:|---:|---:|---:|---:|
| 1 | 15,544 | 12 | 14 | 5 | 0 | 10 | 0 |
| 2 | 30,435 | 11 | 32 | 3 | 1 | 21 | 15 |
| 3 | 34,600 | 16 | 51 | 9 | 6 | 10 | 15 |
| 4 | 17,916 | 7 | 19 | 2 | 0 | 12 | 12 |
| 5 | 12,282 | 8 | 15 | 5 | 6 | 1 | 0 |
| 6 | 15,259 | 11 | 22 | 4 | 5 | 9 | 0 |
| 7 | 19,295 | 10 | 45 | 2 | 1 | 0 | 0 |
| 8 | 10,536 | 7 | 12 | 3 | 0 | 1 | 8 |
| 9 | 14,676 | 12 | 20 | 6 | 0 | 1 | 0 |
| 10 | 16,717 | 14 | 12 | 4 | 0 | 0 | 12 |

Validation compares the normalized text and table/code/disclosure counts in each generated `.course-content` region against the migration output. It also verifies the expected 62 scored quiz questions, six flashcards, and twelve prompt-copy controls.

## Material not migrated

No known educational section, explanation, example, exercise, quiz question, table, code/prompt block, or native disclosure was omitted from the selected lesson bodies.

Page-level visual implementations were deliberately not migrated wholesale. In particular, ten duplicated inline stylesheets, five inline scripts, source navigation widgets, decorative heroes, and inconsistent footer implementations were replaced by shared equivalents. This is a presentation change, not a content deletion.

Source-video media was not copied or referenced. Each page contains a manifest-driven placeholder for a future approved YouTube embed.

## Human review recommended

- Read every generated lesson before publication to confirm that source rights and attribution language are acceptable.
- Review time-sensitive product statements in the prompting course against the official source before public launch.
- Review the shared visual treatment of courses 9 and 10, whose originals used light themes and strong semantic colors.
- Replace video placeholders only after the matching YouTube URLs have been approved and published.

No source URL remains unresolved. Course 10's canonical title is verified as **Governance, Risk & Responsible Use**.
