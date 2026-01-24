# console-toolkit [![NPM version][npm-img]][npm-url]

[npm-img]:      https://img.shields.io/npm/v/console-toolkit.svg
[npm-url]:      https://npmjs.org/package/console-toolkit

`console-toolkit` is a set of tools to create rich CLI-based applications. It provides:

* Styles based on [ANSI escape sequences](https://en.wikipedia.org/wiki/ANSI_escape_code):
  * [SGR](https://en.wikipedia.org/wiki/ANSI_escape_code#SGR): colors and text styles
  * [CSI](https://en.wikipedia.org/wiki/ANSI_escape_code#CSIsection): cursor and screen control
* Bitmap graphics
* Vector graphics based on [Turtle graphics](https://en.wikipedia.org/wiki/Turtle_graphics)
* Curated sets of Unicode symbols
* Tables with themes
* Bar and column charts with themes
* Various helpers and examples

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

const chart = drawChart([[2, 1, 2], [5, 1, 4], [1, 1], [3, 1, 3]], 50);
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

The output of the code is:

![Code example](https://github.com/uhop/console-toolkit/wiki/images/example-code.png)

## Installation

```bash
npm install --save console-toolkit
```

## Documentation

See [wiki](https://github.com/uhop/console-toolkit/wiki) for more details.

## License

BSD 3-Clause License

## Release history

* 1.2.6 *Updated dev deps.*
* 1.2.5 *Updated dev deps.*
* 1.2.4 *Updated deps.*
* 1.2.3 *Updated deps + more tests.*
* 1.2.2 *Updated deps.*
* 1.2.1 *Added support for `Bun.stringWidth()`.*
* 1.2.0 *Refactored `strings`.*
* 1.1.1 *Minor bugfixes in `Table`, some improvements, updated deps.*
* 1.1.0 *Minor improvements, enhanced `Writer` and `Updater`.*
* 1.0.0 *Initial release.*
