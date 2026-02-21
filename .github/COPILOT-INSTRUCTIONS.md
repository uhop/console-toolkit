<!-- Canonical source: AGENTS.md — keep this file in sync -->
# console-toolkit — Copilot Instructions

console-toolkit is a zero-dependency ESM JavaScript library for rich CLI/TUI output. Node.js 20+, Bun, Deno.

## Critical rules

- **ESM-only.** All imports must use `.js` extensions: `import Box from './box.js'`.
- **No runtime dependencies.** Never add packages to `dependencies`. Only `devDependencies` are allowed.
- **No build step.** Source JS in `src/` is shipped directly. Do not create build scripts or compiled output.
- **Hand-written `.d.ts` files.** They are NOT generated. When modifying a public API, update both the `.js` and `.d.ts` files. Keep JSDoc in sync between them.
- **Do not modify or delete test expectations** without understanding why they changed.
- **Do not add comments or remove comments** unless explicitly asked.

## Code style

- Prettier: 120 char width, single quotes, no bracket spacing, no trailing commas, arrow parens "avoid".
- 2-space indentation.
- Imports at top of file.

## Architecture quick reference

- `Box` is **immutable** — methods return new `Box` instances.
- `Panel` is **mutable** — methods mutate `this` and return `this` for chaining.
- Method aliases use `addAlias`/`addAliases` from `meta.js`.
- `pad(t, r, b, l)` follows CSS shorthand order.

## Verification commands

- `npm test` — run all automated tests (tape-six)
- `npm run ts-check` — TypeScript type checking (tsc --noEmit)
- `npm run lint` — Prettier format check

## Further reading

- `AGENTS.md` — canonical AI agent rules
- `ARCHITECTURE.md` — module map, dependency graph, key patterns
- `CONTRIBUTING.md` — development setup and workflow
