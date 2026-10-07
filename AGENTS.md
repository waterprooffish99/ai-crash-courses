# Project Mission

Turn the supplied AI crash-course HTML study guides and corresponding videos into:

1. a polished public educational website
2. a complete YouTube publishing package

The final system should make complicated AI concepts easy for beginners to understand.

# Source of Truth

Original source material lives in:

- `html/`
- `videos/`

Treat these folders as READ-ONLY.

Never overwrite, delete, rename, convert, move, or modify the source material unless the human explicitly approves it.

In the current checkout, the supplied files are located at `sources/html/` and `sources/videos/`. Treat these actual source folders as READ-ONLY under the same rules. Do not relocate them without explicit human approval.

# Generated Work

All generated work must go into:

- `website/`
- `youtube/`
- `docs/`
- `reports/`

# Website Requirements

Eventually build one cohesive website containing all supplied crash courses.

The website should include:

- a homepage listing all courses
- individual course pages
- mobile-first responsive design
- dark modern UI
- bright but professional accent colors
- simple navigation
- Previous Course
- All Courses
- Next Course
- semantic HTML
- accessibility basics
- SEO metadata
- Open Graph metadata
- clean public URLs
- sitemap where appropriate
- no broken internal links or assets
- architecture that makes adding future courses easy

Preserve the educational meaning of the original material.

Do not silently remove important content.

# Teaching Style

The educational content should:

- use very simple English
- retain important technical terminology
- explain technical terms immediately in simple language
- use concept-clearing examples
- prefer practical examples
- avoid unnecessary jargon
- remain professional and suitable for adult learners

# YouTube Package

Eventually prepare, for every course:

- recommended YouTube title
- unique description
- chapters/timestamps when reliably derivable from the video
- thumbnail concept
- short thumbnail text
- playlist position
- relevant topics/keywords
- hashtags
- Shorts ideas
- public study-page URL placeholder
- official-source attribution

Do not invent factual information.

# Human Approval Boundary

Do not perform irreversible, sensitive, account-level, or financial actions without explicit human approval.

Examples include:

- publishing YouTube videos
- changing video visibility
- deleting repositories
- deleting remote files
- force-pushing Git history
- changing important account settings
- purchasing domains
- purchasing services
- spending money
- changing authentication
- rotating credentials
- exposing secrets

Prepare these actions when useful, but leave final approval to the human.

# Credentials

Never place:

- passwords
- tokens
- API keys
- cookies
- OAuth credentials
- private secrets

inside source code, documentation, commits, HTML pages, generated reports, or logs.

Use secure environment variables or approved authentication mechanisms.

# Git

Use Git throughout the project.

Make logical commits during implementation.

Never rewrite remote history or force-push without explicit human approval.

# Validation

Before eventually declaring the full project complete:

- test every course page
- verify internal navigation
- verify assets
- test responsive behavior
- check for broken links
- ensure source files remain unchanged
- ensure a YouTube metadata package exists for every video
- run available automated checks
- document anything still requiring human action

# Completion Rule

Do not declare the project complete simply because files were generated.

Final completion eventually requires:

1. every supplied course represented on the website
2. all pages working locally
3. deployment configuration ready
4. public deployment verified when permissions allow
5. YouTube publishing packages prepared
6. validation completed
7. `reports/final-report.md` clearly separating:
   - completed automatically
   - verified automatically
   - actions requiring the human
