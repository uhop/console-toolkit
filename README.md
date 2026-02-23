# console-toolkit [![NPM version][npm-img]][npm-url]

[npm-img]: https://img.shields.io/npm/v/console-toolkit.svg
[npm-url]: https://npmjs.org/package/console-toolkit

`console-toolkit` is a toolkit for building rich CLI/TUI applications. It provides:

- Styles based on [ANSI escape sequences](https://en.wikipedia.org/wiki/ANSI_escape_code):
  - [SGR](https://en.wikipedia.org/wiki/ANSI_escape_code#SGR): colors and text styles
  - [CSI](https://en.wikipedia.org/wiki/ANSI_escape_code#CSIsection): cursor and screen control
- Bitmap graphics
- Vector graphics based on [Turtle graphics](https://en.wikipedia.org/wiki/Turtle_graphics)
- Curated sets of Unicode symbols
- Tables with themes
- Bar and column charts with themes
- Various helpers and examples

## Visual examples

### Memory watcher

![Memory watcher](https://github.com/uhop/console-toolkit/wiki/images/example-memory.png)

### Waveform

![Waveform](https://github.com/uhop/console-toolkit/wiki/images/example-waveform.png)

### Table + chart

![Table + chart](https://github.com/uhop/console-toolkit/wiki/images/example-table-chart.png)

### Turtle graphics

![Turtle graphics](https://github.com/uhop/console-toolkit/wiki/images/example-turtle.png)

## Code example

```js
import style, {c} from 'console-toolkit/style.js';
import drawChart from 'console-toolkit/charts/bars/plain.js';
import lineTheme from 'console-toolkit/themes/lines/unicode-rounded.js';
import makeTable from 'console-toolkit/table';

// styles

console.log(style.bold + 'Hello, ' + style.bright.cyan + 'world!' + style.reset.all);

console.log(style.bold.text('Hello, ') + style.bright.cyan.bold.text('world!'));

const redBg = style.bg.red;
console.log(redBg.bold.text('Hello, ') + redBg.bright.cyan.bold.text('world!'));

console.log(c`{{bold}}Hello, {{bright.cyan}}world!`);

// chart

const chart = drawChart(
  [
    [2, 1, 2],
    [5, 1, 4],
    [1, 1],
    [3, 1, 3]
  ],
  50
);
for (const line of chart) console.log(line);

// table

const tableData = [
  ['Name', 'Value'],
  ['Bill', 33],
  ['Jill', 42]
];

const table = makeTable(tableData, lineTheme);
for (const line of table.toStrings()) console.log(line);
```

Output:

![Code example](https://github.com/uhop/console-toolkit/wiki/images/example-code.png)

## Installation

```bash
npm install console-toolkit
```

## Modules

### Text containers

| Module      | Import                    | Description                                                    |
| ----------- | ------------------------- | -------------------------------------------------------------- |
| **strings** | `console-toolkit/strings` | String array utilities: `getLength`, `clip`, `toStrings`       |
| **Box**     | `console-toolkit/box`     | Rectangular text container — all lines equal width. Immutable. |
| **Panel**   | `console-toolkit/panel`   | 2D cell grid with per-cell SGR state. Mutable.                 |

### Styling and drawing

| Module              | Import                               | Description                                               |
| ------------------- | ------------------------------------ | --------------------------------------------------------- |
| **Style**           | `console-toolkit/style`              | Fluent SGR styling API + `s`/`c` tagged template literals |
| **draw-block**      | `console-toolkit/draw-block.js`      | Draw filled blocks and frames with block themes           |
| **draw-block-frac** | `console-toolkit/draw-block-frac.js` | Fractional-width/height blocks (1/8th Unicode steps)      |
| **symbols**         | `console-toolkit/symbols.js`         | Curated Unicode constants (blocks, shades, math, marks)   |

### Packages

| Package          | Import                             | Description                                                  |
| ---------------- | ---------------------------------- | ------------------------------------------------------------ |
| **ansi**         | `console-toolkit/ansi`             | Low-level ANSI CSI/SGR escape sequence handling              |
| **table**        | `console-toolkit/table`            | Table renderer with line themes                              |
| **charts**       | `console-toolkit/charts/...`       | Bar and column charts (plain, block, frac, stacked, grouped) |
| **themes**       | `console-toolkit/themes/...`       | Line and block themes (unicode, ascii variants)              |
| **plot**         | `console-toolkit/plot`             | Bitmap plotting (quadrant and braille characters)            |
| **turtle**       | `console-toolkit/turtle`           | Turtle graphics for vector line drawing                      |
| **spinner**      | `console-toolkit/spinner`          | Spinner animations and updatable output                      |
| **output**       | `console-toolkit/output/...`       | Output helpers: Writer (streaming), Updater (in-place)       |
| **alphanumeric** | `console-toolkit/alphanumeric/...` | Decorative Unicode number and letter sets                    |

## Documentation

See [wiki](https://github.com/uhop/console-toolkit/wiki) for detailed usage docs.

For project internals see [ARCHITECTURE.md](./ARCHITECTURE.md). For development setup see [CONTRIBUTING.md](./CONTRIBUTING.md). For AI agent rules see [AGENTS.md](./AGENTS.md).

## License

BSD 3-Clause License

## Release history

- 1.2.10 _Added TypeScript typings, JSDoc, minor bug fixes, updated dev deps._
- 1.2.9 _Updated dev deps._
- 1.2.8 _Updated dev deps._
- 1.2.7 _Updated dev deps._
- 1.2.6 _Updated dev deps._
- 1.2.5 _Updated dev deps._
- 1.2.4 _Updated deps._
- 1.2.3 _Updated deps + more tests._
- 1.2.2 _Updated deps._
- 1.2.1 _Added support for `Bun.stringWidth()`._
- 1.2.0 _Refactored `strings`._
- 1.1.1 _Minor bugfixes in `Table`, some improvements, updated deps._
- 1.1.0 _Minor improvements, enhanced `Writer` and `Updater`._
- 1.0.0 _Initial release._
