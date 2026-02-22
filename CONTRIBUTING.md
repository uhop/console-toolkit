# Contributing to console-toolkit

## Prerequisites

- Node.js 20 or later
- npm

## Setup

```bash
git clone --recursive git@github.com:uhop/console-toolkit
cd console-toolkit
npm install
```

The `--recursive` flag is needed to clone the wiki submodule under `wiki/`.

## Project structure

See [ARCHITECTURE.md](./ARCHITECTURE.md) for a detailed module map and dependency graph.

- `src/` — all source code (shipped to npm)
- `tests/` — automated tests (`test-*.js`) and manual visual tests (`manual/`)
- `scripts/` — example/demo scripts
- `wiki/` — GitHub wiki (git submodule)

## Development workflow

### Running tests

```bash
npm test                                        # Run all automated tests
node tests/test-<name>.js                       # Run a single test file directly
npm test -- test-foo.js test-bar.js             # Run selected files (workers)
npm run test:seq -- test-foo.js test-bar.js     # Run selected files (sequential)
npm run test:proc -- test-foo.js test-bar.js    # Run selected files (subprocesses)
npm run test:bun                                # Run with Bun
npm run test:deno                               # Run with Deno
```

### Type checking

```bash
npm run ts-check        # tsc --noEmit
```

### Linting and formatting

```bash
npm run lint            # Check formatting (Prettier)
npm run lint:fix        # Auto-format
```

### Manual/visual tests

```bash
node tests/manual/test-<name>.js
```

## Coding conventions

### General

- **ESM-only**: use `import`/`export` with `.js` extensions in all import paths.
- **No build step**: source JS is shipped directly.
- **No runtime dependencies**: do not add any.
- **Formatting**: Prettier — 120 char width, single quotes, no bracket spacing, no trailing commas.
- **Indentation**: 2 spaces.

### Documentation

- Every public `.js` module has a hand-written `.d.ts` file alongside it.
- `.d.ts` files are NOT generated — edit them manually.
- JSDoc in `.js` files must stay in sync with the corresponding `.d.ts` JSDoc.
- When changing a public API, always update both files.

### Patterns

- **Box** is immutable — methods return new `Box` instances.
- **Panel** is mutable — methods mutate `this` and return `this` for chaining.
- Method aliases are created via `addAlias`/`addAliases` from `meta.js`.
- `pad(t, r, b, l)` follows CSS shorthand order on both Box and Panel.

## Adding new features

### New public function in an existing module

1. Add implementation to `src/<module>.js` with JSDoc.
2. Add type signature to `src/<module>.d.ts` with matching JSDoc.
3. Add tests to `tests/test-<module>.js`.
4. Run `npm test` and `npm run ts-check`.

### New theme

1. Create `src/themes/<category>/<name>.js` exporting the theme object.
2. Create matching `.d.ts` with JSDoc.
3. Optionally add a visual test in `tests/manual/`.

### New module or sub-package

1. Create `src/<name>.js` and `src/<name>.d.ts`.
2. If it's a sub-package, create `src/<name>/index.js` and `src/<name>/index.d.ts`.
3. Add an export entry in `package.json` `"exports"` if it should be a named entry point.
4. Add tests and update documentation.
