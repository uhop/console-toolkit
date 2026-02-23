---
description: Checklist for adding a new public module or sub-package to console-toolkit
---

# Add a New Module

Follow these steps when adding a new public module or sub-package.

## Top-level module (e.g., `src/foo.js`)

1. Create `src/foo.js` with the implementation.
   - ESM only. Use `.js` extensions in all imports.
   - No runtime dependencies.
2. Create `src/foo.d.ts` with hand-written type declarations and JSDoc.
   - Keep JSDoc in sync between `.js` and `.d.ts`.
3. Create `tests/test-foo.js` with automated tests (tape-six).
// turbo
4. Run the new test: `node tests/test-foo.js`
5. If the module should have a short import path (e.g., `console-toolkit/foo`), add an entry to `exports` in `package.json`.
6. Create `wiki/Module:-foo.md` with usage documentation.
7. Add a link to the new wiki page in `wiki/Home.md`.
8. Update `ARCHITECTURE.md` — add the module to the project layout tree and dependency graph if applicable.
9. Update `llms.txt` and `llms-full.txt` with a brief description of the new module.
// turbo
10. Verify: `npm test`
// turbo
11. Verify: `npm run ts-check`
// turbo
12. Verify: `npm run lint`

## Sub-package (e.g., `src/foo/index.js`)

1. Create `src/foo/index.js` as the main entry point.
   - Re-export sub-modules as needed.
2. Create `src/foo/index.d.ts` with hand-written type declarations.
3. Create individual sub-module files under `src/foo/`.
   - Each sub-module gets its own `.d.ts` file if it has a public API.
4. Create `tests/test-foo.js` with automated tests.
// turbo
5. Run the new test: `node tests/test-foo.js`
6. Add an `exports` entry in `package.json`: `"./foo": "./src/foo/index.js"`.
7. Create `wiki/Package:-foo.md` with usage documentation.
8. Add a link to the new wiki page in `wiki/Home.md`.
9. Update `ARCHITECTURE.md` — add the package to the project layout tree and dependency graph.
10. Update `llms.txt` and `llms-full.txt`.
// turbo
11. Verify: `npm test`
// turbo
12. Verify: `npm run ts-check`
// turbo
13. Verify: `npm run lint`
