---
description: Pre-release verification checklist for console-toolkit
---

# Release Check

Run through this checklist before publishing a new version.

## Steps

1. Check that every public `.js` file in `src/` has a corresponding `.d.ts` file.
2. Check that `ARCHITECTURE.md` reflects any structural changes.
3. Check that `AGENTS.md` is up to date with any rule or workflow changes.
4. Check that `.windsurfrules`, `.clinerules`, `.cursorrules` are in sync with `AGENTS.md` (run `/sync-ai-rules` if not).
5. Check that `llms.txt` and `llms-full.txt` are up to date with any new or changed modules (run `/ai-docs-update` if not).
6. Check that `wiki/Home.md` links to all module/package wiki pages.
7. Verify `package.json`:
   - `files` array includes all necessary entries (`./src`, `llms.txt`, `llms-full.txt`).
   - `exports` map covers any new modules added since the last release.
   - `description` and `keywords` are current.
8. Check that the copyright year in `LICENSE` includes the current year (e.g., update `2024` → `2024-2026` or `2005-2024` → `2005-2026`).
9. Bump `version` in `package.json` (semver based on the nature of changes since the last tag — `git log <last-tag>..HEAD`).
10. Update release history. Check **both** locations and update each one — they serve different audiences and carry different densities (see [[topics/two-tier-release-notes]]).
    - `README.md` — **cliff-notes**: 1–2 most memorable items + "minor fixes" catchall, comma-separated. No internal changes, no devDep bumps, no test counts. One footer line at the bottom of the section, after the bullet list (separated by a blank line, once per section, not per release): `The full release notes are in the wiki: [Release notes](https://github.com/uhop/console-toolkit/wiki/Release-notes).`
    - `wiki/Release-notes.md` — canonical longer-form history. A paragraph per substantive release with **bold** feature names; cover internal changes, calibration notes, related wiki / repo updates, and credits. Per-release date in the heading (use `git for-each-ref --sort=-creatordate --format='%(refname:short) %(creatordate:short)' refs/tags`). The wiki is a git submodule — it gets its own commit + parent-pointer bump.
11. **Sweep dependencies for staleness.** Run `npm outdated` and bump anything with a newer major or minor available. For libraries this is non-negotiable — stale ranges generate user complaints when consumers run a different version of the same dep.
12. Run `npm install` to regenerate `package-lock.json` (run unconditionally — the version bump from step 9 changes the project's own lockfile entry too).
    // turbo
13. Run the full test suite: `npm test`
    // turbo
14. Run tests on Bun: `npm run test:bun`
    // turbo
15. Run tests on Deno: `npm run test:deno`
    // turbo
16. Run TypeScript type checking: `npm run ts-check`
    // turbo
17. Run TS type tests: `npm run ts-test`
    // turbo
18. Run Prettier lint check: `npm run lint`
    // turbo
19. Dry-run publish to verify package contents: `npm pack --dry-run`
20. Stop and report — do **not** commit, tag, or publish without explicit confirmation from the user.
