# Canonical Course Map

Audit date: 2026-10-07

## Mapping result

All 10 HTML files map confidently to all 10 videos. The numeric prefixes provide a complete one-to-one sequence, and each filename's English or Urdu topic is semantically consistent with the corresponding HTML title.

“Missing” in the source URL column means the supplied HTML does not contain an official URL. No URL was invented or inferred for those rows.

| # | Canonical course title | Source HTML | Source video | Original source URL detectable in supplied HTML | Confidence | Mapping and naming notes |
|---:|---|---|---|---|---|---|
| 1 | Just Delegate It | `sources/html/1. just-delegate-it-study-guide.html` | `sources/videos/1. جسٹ_ڈیلیگیٹ_اٹ__کریش_کورس.mp4` | Missing | High | Video name is Urdu-script transliteration of “Just Delegate It” plus “Crash Course.” It contains a double underscore before the crash-course suffix. |
| 2 | What AI Actually Is | `sources/html/2. what_ai_actually_is_complete_study_guide.html` | `sources/videos/2. AI_انجن_کا_اصل_راز.mp4` | `https://agentfactory.panaversity.org/docs/what-ai-actually-is-crash-course` | High | Video name translates approximately to “the real secret of the AI engine,” not the literal HTML title, but number, subject, and course sequence align. |
| 3 | AI Fluency | `sources/html/3. ai_fluency_complete_exam_study_guide.html` | `sources/videos/3. اے_آئی_فلوئنسی_فریم_ورک.mp4` | `https://agentfactory.panaversity.org/docs/ai-fluency-crash-course` | High | Video name says “AI Fluency Framework”; HTML uses “AI Fluency Crash Course / Complete Exam Study Guide.” |
| 4 | AI Prompting in 2026 | `sources/html/4. ai_prompting_2026_exam_study_guide.html` | `sources/videos/4. AI_پرامپٹنگ__2026.mp4` | `https://agentfactory.panaversity.org/docs/ai-prompting-2026` | High | Same topic/year. Video filename mixes English, Urdu script, and a double underscore. |
| 5 | Markdown In, HTML Out | `sources/html/5. markdown-in-html-out-study-guide.html` | `sources/videos/5. Markdown_In,_HTML_آؤٹ.mp4` | Missing | High | Same bilingual title. HTML uses hyphens; video uses underscores and a comma. |
| 6 | Code You Never Write | `sources/html/6. code-you-never-write-study-guide.html` | `sources/videos/6. کوڈ_جو_آپ_کبھی_نہیں_لکھتے.mp4` | Missing | High | Video filename is the Urdu rendering of the HTML title. |
| 7 | Skills & Connectors | `sources/html/7. skills-connectors-study-guide.html` | `sources/videos/7. skills-and-connectors.mp4` | Missing | High | Both filenames are English; HTML uses an ampersand in the page title while the video filename spells out “and.” |
| 8 | How to Think in the AI Era | `sources/html/8. how-to-think-ai-era-study-guide.html` | `sources/videos/8. AI_کے_دور_میں_سوچنا.mp4` | `https://agentfactory.panaversity.org/docs/how-to-think-ai-era` | High | Video filename translates to “thinking in the age/era of AI.” |
| 9 | Workflow Design & Diagnosis | `sources/html/9. workflow_design_diagnosis_study_guide.html` | `sources/videos/9. ورک_فلو_ڈیزائن_اور_تشخیص.mp4` | Missing | High | Video filename is the Urdu rendering of workflow design and diagnosis. HTML filename uses underscores while its page title uses an ampersand. |
| 10 | Governance, Risk & Responsible Use | `sources/html/10. governance-risk-responsible-use-study.html` | `sources/videos/10. گورننس_اور_رسک_مینجمنٹ.mp4` | Missing | High | Video filename says “Governance and Risk Management” and omits “Responsible Use”; number and core subject align. |

## Intended order

1. Just Delegate It
2. What AI Actually Is
3. AI Fluency
4. AI Prompting in 2026
5. Markdown In, HTML Out
6. Code You Never Write
7. Skills & Connectors
8. How to Think in the AI Era
9. Workflow Design & Diagnosis
10. Governance, Risk & Responsible Use

This order is supported by the numeric prefixes in both source sets and by the progression described inside the study guides.

## Naming observations

- Numeric sorting is required: ordinary lexicographic sorting puts course 10 before course 2.
- HTML filenames use a mixture of spaces, hyphens, and underscores and three different suffix patterns.
- Video filenames mix Urdu and English, spaces and underscores, and inconsistent punctuation.
- These inconsistencies do not create mapping ambiguity because every course number appears exactly once in each source folder.
- Public URLs should use separate stable ASCII slugs. Original filenames must remain unchanged.
- The generated site's canonical title should be independent of the source filename and stored in one course manifest.

## Proposed stable identifiers and URLs

These are architecture recommendations, not files or deployed routes created in this phase.

| # | Stable course ID | Proposed public path |
|---:|---|---|
| 1 | `01-just-delegate-it` | `/courses/just-delegate-it/` |
| 2 | `02-what-ai-actually-is` | `/courses/what-ai-actually-is/` |
| 3 | `03-ai-fluency` | `/courses/ai-fluency/` |
| 4 | `04-ai-prompting-2026` | `/courses/ai-prompting-2026/` |
| 5 | `05-markdown-in-html-out` | `/courses/markdown-in-html-out/` |
| 6 | `06-code-you-never-write` | `/courses/code-you-never-write/` |
| 7 | `07-skills-and-connectors` | `/courses/skills-and-connectors/` |
| 8 | `08-how-to-think-in-the-ai-era` | `/courses/how-to-think-in-the-ai-era/` |
| 9 | `09-workflow-design-and-diagnosis` | `/courses/workflow-design-and-diagnosis/` |
| 10 | `10-governance-risk-responsible-use` | `/courses/governance-risk-responsible-use/` |

## Human confirmation needed

- Confirm the six missing official source URLs rather than deriving them from naming patterns.
- Confirm whether course 10's canonical public title should follow the HTML (`Governance, Risk & Responsible Use`) or the shorter video wording (`Governance and Risk Management`). The recommendation is to use the fuller HTML title and preserve the video filename unchanged.
- Confirm the proposed stable English URL slugs before implementation.
