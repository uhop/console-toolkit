---
description: Pre-release verification checklist for console-toolkit
---

# Release Check

Run through this checklist before publishing a new version.

## Steps

// turbo
1. Run the full test suite: `npm test`
// turbo
2. Run TypeScript type checking: `npm run ts-check`
// turbo
3. Run Prettier lint check: `npm run lint`
4. Verify `package.json`:
   - `version` is bumped appropriately.
   - `files` array includes all necessary entries (`./src`, `llms.txt`, `llms-full.txt`).
   - `exports` map covers any new modules added since the last release.
5. Check that every public `.js` file in `src/` has a corresponding `.d.ts` file.
6. Check that `ARCHITECTURE.md` reflects any structural changes.
7. Check that `wiki/Home.md` links to all module/package wiki pages.
8. Check that `llms.txt` and `llms-full.txt` are up to date with any new or changed modules.
9. Review `README.md` — update release history if needed.
// turbo
10. Dry-run publish to verify package contents: `npm pack --dry-run`
