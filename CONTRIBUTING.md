# Contributing to `zodiaclegal-website`

## Branching & Pull Request Workflow

1. **`main`**: Production branch auto-deployed to Render (`zodiaclegal.com`). Direct pushes to `main` should be restricted once branch protection is enabled.
2. **`develop`**: Integration branch for staging content updates and UI refinements.
3. **Feature / Content Branches**: Branch off `develop` using descriptive prefixes:
   - `feat/<short-slug>` for UI or server capabilities
   - `content/<topic-slug>` for new statutory guides or practice area updates
   - `fix/<issue-slug>` for bug fixes

## Conventional Commits

All commits must follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

- `feat(scope): ...`
- `fix(scope): ...`
- `docs(scope): ...`
- `content(insights): ...`
- `test(e2e): ...`

## Mandatory Pre-PR Checks

Before opening a Pull Request against `develop` or `main`, run:

```bash
npm run lint
npm run typecheck
npm run test:unit
npm run build
npm run test:e2e
```

## Bar Council of India (Rule 36) Compliance Checklist for Contributors

Every content addition or code change must comply with **Rule 36, Chapter II, Part VI of the Bar Council of India Rules**:

- Never use superlative or comparative marketing claims ("Best lawyers in Lucknow", "Top law firm", "No. 1", "100% success rate").
- Never promise case outcomes or publish fee-bait banners.
- Always include the `"Last Reviewed"` date, `"Reviewed by"` line, and the statutory footnote: `*Informational only; not legal advice.*`
