# console-toolkit — AI Agent Rules

## Project identity

console-toolkit is a zero-dependency ESM JavaScript library for rich CLI/TUI output: styled text, boxes, panels, tables, charts, plots, turtle graphics, and spinners. Node.js 20+, Bun, Deno.

## Critical rules

- **ESM-only.** All imports must use `.js` extensions: `import Box from './box.js'`.
- **No runtime dependencies.** Never add packages to `dependencies`. Only `devDependencies` are allowed.
- **No build step.** Source JS in `src/` is shipped directly. Do not create build scripts or compiled output.
- **Hand-written `.d.ts` files.** They are NOT generated. When modifying a public API, update both the `.js` and `.d.ts` files. Keep JSDoc in sync between them.
- **Do not modify or delete test expectations** without understanding why they changed.
- **Do not add comments or remove comments** unless explicitly asked.

## Code style

- Prettier: 120 char width, single quotes, no bracket spacing, no trailing commas, arrow parens "avoid".
- 2-space indentation (`.editorconfig`).
- Imports at top of file. No dynamic imports unless necessary.

## Architecture quick reference

- `Box` is **immutable** — methods return new `Box` instances.
- `Panel` is **mutable** — methods mutate `this` and return `this` for chaining.
- Method aliases use `addAlias`/`addAliases` from `meta.js`.
- `pad(t, r, b, l)` follows CSS shorthand order.
- Three text containers convert between each other: `strings` (string[]), `Box`, `Panel`.
- SGR styling: `Style` class with fluent API; `s`/`c` tagged template literals.

## Verification commands

- `npm test` — run the full test suite (tape-six)
- `node tests/test-<name>.js` — run a single test file directly (no test runner needed)
- Run selected test files by name:
  - `npm test -- test-foo.js test-bar.js` — run using workers
  - `npm run test:seq -- test-foo.js test-bar.js` — run sequentially
  - `npm run test:proc -- test-foo.js test-bar.js` — run using subprocesses
- `npm run ts-check` — TypeScript type checking (tsc --noEmit)
- `npm run lint` — Prettier format check

## File layout

- Source: `src/<name>.js` + `src/<name>.d.ts`
- Sub-packages: `src/<pkg>/index.js` + `src/<pkg>/index.d.ts`
- Tests: `tests/test-<name>.js`
- Manual tests: `tests/manual/test-<name>.js`
- Wiki docs: `wiki/` (git submodule)

## When reading the codebase

- Start with `ARCHITECTURE.md` for the module map and dependency graph.
- `.d.ts` files are the best API reference for each module.
- Wiki markdown files in `wiki/` contain detailed usage docs.
