---
description: Pre-release verification checklist for console-toolkit
---

# Release Check

Run through this checklist before publishing a new version.

## Steps

1. Check that every public `.js` file in `src/` has a corresponding `.d.ts` file.
2. Check that `ARCHITECTURE.md` reflects any structural changes.
3. Check that `AGENTS.md` is up to date with any rule or workflow changes.
4. Check that `.windsurfrules`, `.clinerules`, `.cursorrules` are in sync with `AGENTS.md`.
5. Check that `wiki/Home.md` links to all module/package wiki pages.
6. Check that `llms.txt` and `llms-full.txt` are up to date with any new or changed modules.
7. Verify `package.json`:
   - `files` array includes all necessary entries (`./src`, `llms.txt`, `llms-full.txt`).
   - `exports` map covers any new modules added since the last release.
8. Bump `version` in `package.json`.
9. Update release history in `README.md`.
10. Run `npm install` to regenerate `package-lock.json`.
    // turbo
11. Run the full test suite: `npm test`
    // turbo
12. Run TypeScript type checking: `npm run ts-check`
    // turbo
13. Run Prettier lint check: `npm run lint`
    // turbo
14. Dry-run publish to verify package contents: `npm pack --dry-run`
