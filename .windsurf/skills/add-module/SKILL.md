---
name: add-module
description: Checklist for adding a new public module or sub-package to console-toolkit
---

# Add a New Module

Follow these steps when adding a new public module or sub-package.

## Top-level module (e.g., `src/foo.js`)

1. Create `src/foo.js` with the implementation.
   - ESM only. Use `.js` extensions in all imports.
   - No runtime dependencies.
   - No JSDoc — API contracts live in `src/foo.d.ts`.
2. Create `src/foo.d.ts` with hand-written type declarations and JSDoc.
3. Create `tests/test-foo.js` with automated tests (tape-six).
4. Run the new test: `node tests/test-foo.js`
5. No `exports` entry is needed — the `./*` wildcard already exposes the module as `console-toolkit/foo.js`. Do not add file-shape substitutions like `"./foo": "./src/foo.js"`.
6. Create `wiki/Module:-foo.md` with usage documentation.
7. Add a link to the new wiki page in `wiki/Home.md`.
8. Update `ARCHITECTURE.md` — add the module to the project layout tree and dependency graph if applicable.
9. Update `llms.txt` and `llms-full.txt` with a brief description of the new module.
10. Update `AGENTS.md` if the module changes the architecture quick reference.
11. Verify: `npm test`
12. Verify: `npm run ts-check`
13. Verify: `npm run lint`

## Sub-package (e.g., `src/foo/index.js`)

1. Create `src/foo/index.js` as the main entry point.
   - Re-export sub-modules as needed.
2. Create `src/foo/index.d.ts` with hand-written type declarations.
3. Create individual sub-module files under `src/foo/`.
   - Each sub-module gets its own `.d.ts` file if it has a public API.
4. Create `tests/test-foo.js` with automated tests.
5. Run the new test: `node tests/test-foo.js`
6. Add an `exports` entry in `package.json`: `"./foo": "./src/foo/index.js"`.
7. Create `wiki/Package:-foo.md` with usage documentation.
8. Add a link to the new wiki page in `wiki/Home.md`.
9. Update `ARCHITECTURE.md` — add the package to the project layout tree and dependency graph.
10. Update `llms.txt` and `llms-full.txt`.
11. Update `AGENTS.md` if the package changes the architecture quick reference.
12. Verify: `npm test`
13. Verify: `npm run ts-check`
14. Verify: `npm run lint`
