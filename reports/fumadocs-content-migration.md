# Fumadocs Content Migration Report

Migration date: 2026-10-07  
Source baseline: validated Eleventy migration plus immutable files in `sources/html/`.

## Migration method

The working Eleventy implementation remains in `website/` and was used as the content-preservation reference. `website-fumadocs/scripts/migrate-content.mjs` reads the Eleventy migration output, converts the selected educational body to maintainable MDX, and replaces page-specific interactions with reusable React/MDX components.

The migration deliberately does not copy the original page shell, inline CSS, inline JavaScript, branding chrome, or source video files. Those are presentation/runtime details, not lesson material. All source attribution, video placeholders, and sequence links are generated from the Fumadocs course manifest.

## Reusable learning components

- `Quiz`: client-enhanced scoring with questions and options rendered in the initial HTML
- `Glossary`: accessible live filtering
- `Flashcard`: keyboard-native `details` disclosures
- `Exercise`: native answer/exercise disclosures
- `LearningCallout`: shared note, warning, exam, and success treatments
- Fumadocs code blocks: preserved prompts/code/diagrams with built-in copy controls
- `SourceLink`: verified official attribution
- `CourseVideo`: structured future-YouTube placeholder with no local media path
- `CourseNavigation`: Previous / All Courses / Next navigation

## Course-by-course record

| # | Source HTML | Previous Eleventy output | New MDX page | Content and components preserved | Deliberate changes / review |
|---:|---|---|---|---|---|
| 1 | `1. just-delegate-it-study-guide.html` | `website/_site/courses/just-delegate-it/index.html` | `content/docs/just-delegate-it.mdx` | Delegation Loop, OCCADV brief, 11 concepts, ITCD→ACIR, five tables, practical work, recap, and all 10 self-test disclosures (`Exercise`) | Styled number spans became ordinary readable heading text; shared shell replaces source hero/nav |
| 2 | `2. what_ai_actually_is_complete_study_guide.html` | `website/_site/courses/what-ai-actually-is/index.html` | `content/docs/what-ai-actually-is.mdx` | Full course map and nine ideas, three tables, 15-question `Quiz`, searchable `Glossary`, six `Flashcard` items, 21 `Exercise` disclosures, prompt/code block, appendix | Source script replaced by accessible components; no educational section removed |
| 3 | `3. ai_fluency_complete_exam_study_guide.html` | `website/_site/courses/ai-fluency/index.html` | `content/docs/ai-fluency.mdx` | Three work modes, four Ds, 4D loop, Agent Factory mapping, nine tables, six prompt/code blocks with copy, 15-question `Quiz`, 10 `Exercise` disclosures | Fixed sidebar/back-to-top behavior replaced by Fumadocs sidebar, TOC, and active heading tracking |
| 4 | `4. ai_prompting_2026_exam_study_guide.html` | `website/_site/courses/ai-prompting-2026/index.html` | `content/docs/ai-prompting-2026.mdx` | Whole-course model, glossary material, all 13 concepts, projects, two tables, 12-question `Quiz`, 12 `Exercise` disclosures | Original study-map aside becomes shared TOC; title-spacing defect normalized |
| 5 | `5. markdown-in-html-out-study-guide.html` | `website/_site/courses/markdown-in-html-out/index.html` | `content/docs/markdown-in-html-out.mdx` | Markdown/HTML mental models, workflow, five tables, all six code examples with copy, native answer `Exercise`, recap and practice | Bare source `<pre>` blocks converted to fenced MDX code blocks; illustrative `example.com` remains an example |
| 6 | `6. code-you-never-write-study-guide.html` | `website/_site/courses/code-you-never-write/index.html` | `content/docs/code-you-never-write.mdx` | Commissioning model, execution surfaces, safety/blast radius, four tables, all five prompts/code blocks with copy, nine `Exercise` disclosures, projects/test | Numbered heading boundaries normalized; source sidebar replaced by Fumadocs navigation |
| 7 | `7. skills-connectors-study-guide.html` | `website/_site/courses/skills-and-connectors/index.html` | `content/docs/skills-and-connectors.mdx` | Skills, connectors, `SKILL.md`, triggers, progressive disclosure, MCP, portability, permissions, two tables, technical block, projects and MCQs | Static MCQs remain static because the source supplied no scored answer behavior |
| 8 | `8. how-to-think-ai-era-study-guide.html` | `website/_site/courses/how-to-think-in-the-ai-era/index.html` | `content/docs/how-to-think-in-the-ai-era.mdx` | Six disciplines, terms, projects, three tables, 8-question `Quiz`, native `Exercise`, recap | Inline scoring replaced by shared progressive enhancement |
| 9 | `9. workflow_design_diagnosis_study_guide.html` | `website/_site/courses/workflow-design-and-diagnosis/index.html` | `content/docs/workflow-design-and-diagnosis.mdx` | Six stages, delegation map, diagnosis sequence, reusable fixes, operations, six tables, native `Exercise`, test and recap | Original light/stage styling standardized into the dark shared system; educational distinctions remain in text/callouts |
| 10 | `10. governance-risk-responsible-use-study.html` | `website/_site/courses/governance-risk-responsible-use/index.html` | `content/docs/governance-risk-responsible-use.mdx` | Case/data/capability/people model, integrated example, Governance Record, incidents, drift, agent builders, four tables, all 12 questions in `Quiz`, checklist and recap | JavaScript-generated questions now exist in initial HTML; official canonical title is verified |

All MDX paths above are relative to `website-fumadocs/`.

## Automated integrity results

The validator compares the semantic text of every Fumadocs lesson with the validated Eleventy educational body after excluding shared presentation controls. It also compares tables, code blocks, disclosures, and interactive counts.

| Course | Semantic token coverage |
|---:|---:|
| 1 | 99.76% |
| 2 | 99.86% |
| 3 | 99.89% |
| 4 | 99.65% |
| 5 | 100.00% |
| 6 | 100.00% |
| 7 | 99.97% |
| 8 | 100.00% |
| 9 | 100.00% |
| 10 | 100.00% |

Sub-100% values are caused by HTML/Markdown presentation normalization (styled inline labels, captions, and spacing), not missing lesson sections. The structural counts match the reference: 62 scored quiz questions, six flashcards, one filterable glossary, 65 exercise/disclosure items, 43 tables, and 19 code/prompt blocks.

## Material changed or not carried forward

No known explanation, heading, table, code/prompt example, exercise, quiz/MCQ, flashcard, practical project, glossary definition, or source attribution was lost.

The following presentation features were intentionally replaced:

- ten independent stylesheets/themes → one customized Fumadocs/Tailwind design system
- source page navigation and fixed sidebars → Fumadocs sidebar, breadcrumbs, mobile navigation, active TOC, and sequence cards
- page-local quiz scripts → shared `Quiz`
- source flashcard click handlers → native keyboard-operable disclosures
- prompt-specific copy scripts → Fumadocs code-block copy controls
- duplicate source footers/cards → shared verified `SourceLink`
- local-video references → manifest-based placeholder only

Human editorial review is still recommended before publication for rights, attribution wording, and time-sensitive product statements. No content issue currently blocks local migration acceptance.

Course 10 is verified against the official page as **Governance, Risk & Responsible Use**. All ten official source URLs are present; none remain unresolved.
