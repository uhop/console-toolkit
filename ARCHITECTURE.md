# Architecture

`console-toolkit` is a pure JavaScript (ESM) library for building rich CLI/TUI applications. It has **zero runtime dependencies** — only dev dependencies for testing and type-checking.

## Project layout

```
src/                  # All source code (shipped via npm)
├── box.js / .d.ts          # Box text container
├── panel.js / .d.ts        # Panel text container (2D cell grid)
├── style.js / .d.ts        # SGR styling, tagged template literals s/c
├── strings.js / .d.ts      # String utilities (getLength, clip, toStrings)
├── symbols.js / .d.ts      # Curated Unicode symbol constants
├── draw-block.js / .d.ts   # Block drawing with themes
├── draw-block-frac.js / .d.ts  # Fractional block drawing (1/8th steps)
├── meta.js / .d.ts         # Name-casing helpers, addAlias/addGetter utilities
├── ansi/                    # Low-level ANSI escape sequence handling
│   ├── csi.js               # CSI sequence parsing/generation
│   ├── sgr.js               # SGR command constants
│   └── sgr-state.js         # SGR state machine (combine, transition, optimize)
├── strings/                 # String sub-modules (clip, parse, split)
├── charts/                  # Bar and column chart renderers + themes
│   ├── bars/                # Horizontal bar charts (plain, block, frac, stacked, grouped)
│   └── columns/             # Vertical column charts
├── table/                   # Table renderer with theme support
├── themes/                  # Line and block themes (unicode, ascii variants)
│   ├── lines/               # Line-drawing themes
│   ├── blocks/              # Block-drawing themes
│   └── utils.js             # Theme manipulation utilities
├── plot/                    # Bitmap plotting (quadrant/braille)
├── turtle/                  # Turtle graphics (vector line drawing)
├── spinner/                 # Spinner animations + updatable output
├── output/                  # Output helpers (Writer, Updater)
└── alphanumeric/            # Decorative Unicode number/letter sets
tests/                # Automated tests (tape-six framework)
tests/manual/         # Visual/manual test scripts
scripts/              # Example/demo scripts
wiki/                 # GitHub wiki (git submodule)
```

## Core concepts

### Text containers

The library is built around three text container types that can convert between each other:

| Container | Description                                           | Mutability                         | File         |
| --------- | ----------------------------------------------------- | ---------------------------------- | ------------ |
| `strings` | `string[]` — simplest container                       | Immutable                          | `strings.js` |
| `Box`     | `string[]` where all strings have equal display width | Immutable (methods return new Box) | `box.js`     |
| `Panel`   | 2D array of `{symbol, state}` cells                   | Mutable (methods return `this`)    | `panel.js`   |

Conversion: any object implementing `toStrings()`, `toBox()`, or `toPanel()` integrates with the toolkit.

### SGR state

ANSI styling is modeled as state objects (`SgrState`). The `Style` class provides a fluent API for building states. The tagged template literals `s` and `c` allow inline styling in template strings.

### Themes

Line themes and block themes are plain objects with indexed sub-themes. They are used by `drawBlock()`, `drawFrame()`, tables, and charts.

## Key patterns

- **ESM-only**: All files use `import`/`export`. The package uses `"type": "module"`.
- **No build step**: Source JS is shipped directly. TypeScript `.d.ts` files are hand-written alongside `.js` files.
- **`.d.ts` is the only API contract**: Every public module has a hand-written `.d.ts` sidecar. JSDoc is intentionally not used in `.js` files (drift surface; the `.d.ts` is the source of truth).
- **Immutable Box, mutable Panel**: `Box` methods return new instances. `Panel` methods mutate and return `this` for chaining.
- **`addAlias` / `addAliases`**: Used to create method aliases on class prototypes (e.g., `toBox` → `clone`, `combineState` → `combineStateAfter`).
- **CSS-style shorthand**: `pad(t, r, b, l)` on both Box and Panel follows CSS padding order.
- **Optional peer deps for wide chars**: `emoji-regex` and `get-east-asian-width` are auto-detected at runtime for double-wide character support.

## Module dependency graph (simplified)

```
strings/parse ← strings/split ← strings/clip
       ↓              ↓              ↓
    strings.js ← ── box.js ← ── panel.js
       ↑              ↑              ↑
    ansi/csi    ansi/sgr-state    style.js
                      ↑
                   ansi/sgr
```

Higher-level modules (`table`, `charts`, `plot`, `turtle`, `spinner`) depend on the core modules above.

## Testing

- **Framework**: [tape-six](https://github.com/uhop/tape-six)
- **Run**: `npm test` (also supports Bun and Deno variants)
- **Run single file**: `node tests/test-<name>.js` (no test runner needed)
- **Run selected files**: `npm test -- test-foo.js test-bar.js` (also `test:seq`, `test:proc` variants)
- **Test files**: `tests/test-*.js` — automated unit tests
- **Manual tests**: `tests/manual/` — visual verification scripts (run individually with `node`)
- **Type checking**: `npm run ts-check` (runs `tsc --noEmit`)
- **TS type tests**: `tests/test-types-*.ts` — verify `.d.ts` typings; run with `npm run ts-test`
- **Linting**: `npm run lint` (Prettier check), `npm run lint:fix` (auto-format)

## Import paths

The package uses subpath exports in `package.json`:

```js
import Box from 'console-toolkit/box';
import {c} from 'console-toolkit/style.js';
import makeTable from 'console-toolkit/table';
import lineTheme from 'console-toolkit/themes/lines/unicode-rounded.js';
```

The wildcard export `./*` → `./src/*` allows importing any file under `src/`.
