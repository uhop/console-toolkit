---
description: Write or update tape-six tests for a module or feature
---

# Write Tests

Write or update tests using the tape-six testing library.

## Notes

- `tape-six` supports ES modules (`.js`, `.mjs`, `.ts`, `.mts`) and CommonJS (`.cjs`, `.cts`).
- TypeScript is supported natively — no transpilation needed (Node 22+, Deno, Bun run `.ts` files directly).
- The default `tape6` runner uses worker threads for parallel execution. `tape6-seq` runs sequentially in-process — useful for debugging or when tests share state.

## Steps

1. Read the testing guide at `node_modules/tape-six/TESTING.md` for API reference and patterns.
2. Identify the module or feature to test. Read its source code to understand the public API.
3. Create or update the test file in `tests/test-<name>.js` (or `.ts` for TypeScript projects):
   - Import `test` from `tape-six` (ESM: `import test from 'tape-six'`; CJS: `const {test} = require('tape-six')`).
   - Import the module under test using the project's package name.
   - Write one top-level `test()` per logical group.
   - Use embedded `await t.test()` for sub-cases.
   - Use `t.beforeEach`/`t.afterEach` for shared setup/teardown.
   - Cover: normal operation, edge cases, error conditions.
   - Use `t.equal` for primitives, `t.deepEqual` for objects/arrays, `t.throws` for errors, `await t.rejects` for async errors.
   - All `msg` arguments are optional but recommended for clarity.
   // turbo
4. Run the new test file directly to verify: `node tests/test-<name>.js`
   // turbo
5. Run the full test suite to check for regressions: `npm test`
   - If debugging, use `npm run test:seq` (runs sequentially, easier to trace issues).
6. Report results and any failures.
