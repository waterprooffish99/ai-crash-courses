# Project Structure

The project currently has this high-level structure:

```text
.
├── .agents/                 # Existing agent configuration
├── .codex/                  # Existing Codex configuration
├── .git/                    # Local Git repository metadata
├── .gitignore               # Git exclusion rules
├── AGENTS.md                # Project-wide working instructions
├── README.md                # Project overview
├── sources/                 # Current source-material container
│   ├── html/                # Original HTML study guides (read-only)
│   └── videos/              # Original course videos (read-only)
├── website/                 # Future educational website
├── youtube/                 # Future YouTube publishing package
│   ├── metadata/            # Per-video titles, descriptions, and related metadata
│   ├── thumbnails/          # Thumbnail concepts and generated assets
│   ├── shorts/              # YouTube Shorts ideas and production material
│   └── publishing-plan/     # Release order, checklists, and publishing plans
├── docs/                    # Project documentation
│   └── project-structure.md # This directory guide
└── reports/                 # Setup, validation, and final reports
    └── setup-report.md      # Environment setup results
```

The project brief refers to source folders named `html/` and `videos/` at the repository root. They were not present during setup; the supplied files were detected instead in `sources/html/` and `sources/videos/`. Those existing folders remain in place and are governed by the same read-only rule.

Generated work belongs only in `website/`, `youtube/`, `docs/`, and `reports/`.
