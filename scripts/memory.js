import process from 'node:process';

import Writer from 'console-painter/output/writer.js';
import Updater from 'console-painter/output/updater.js';

import {CURSOR_INVISIBLE, CURSOR_NORMAL} from 'console-painter/ansi/csi.js';

import style, {c} from 'console-painter/style.js';
import lineTheme from 'console-painter/themes/lines/unicode-bold.js';
import makeTable from 'console-painter/table/index.js';
import {formatInteger, abbrNumber} from 'console-painter/alphanumeric/number-formatters.js';

const showDiff = (a, b) => {
  const s = formatInteger(a);
  if (b === null || a === b) return s;
  return style.bright[a < b ? 'green' : 'red'].text(s);
};

const abbrOptions = {decimals: 1, keepFractionAsIs: true};

let previousSnapshot = null;

const memorySnapshot = () => {
  const m = process.memoryUsage();

  const tableData = [
    ['Memory usage', 'Bytes', 'Abbr'],
    ['RSS', showDiff(m.rss, previousSnapshot?.rss), abbrNumber(m.rss, abbrOptions)],
    ['Heap total', showDiff(m.heapTotal, previousSnapshot?.heapTotal), abbrNumber(m.heapTotal, abbrOptions)],
    ['Heap used', showDiff(m.heapUsed, previousSnapshot?.heapUsed), abbrNumber(m.heapUsed, abbrOptions)],
    ['External', showDiff(m.external, previousSnapshot?.external), abbrNumber(m.external, abbrOptions)],
    ['Array buffers', showDiff(m.arrayBuffers, previousSnapshot?.arrayBuffers), abbrNumber(m.arrayBuffers, abbrOptions)]
  ];

  previousSnapshot = {...m};

  const table = makeTable(tableData, lineTheme, {
    rowFirst: 2,
    columnFirst: 2,
    hDataSep: 0,
    hRight: [1, 2, 3],
    states: {rowFirst: style.bold, columnFirst: style.bold}
  });

  return table;
};

const writer = new Writer(),
  updater = new Updater(memorySnapshot, {prologue: CURSOR_INVISIBLE, epilogue: CURSOR_NORMAL}, writer);

process.once('SIGINT', () => {
  updater.done();
  process.exit(130);
});

await writer.writeString(c`{{bold}}Memory usage by this process {{dim}}(Press Ctrl+C to exit)\n`);
await writer.writeString(c`{{dim}}Legend: RSS - resident set size, {{bright.green}}green{{reset.color}} - goes down, {{bright.red}}red{{reset.color}} - goes up\n`);

if (writer.isTTY) {
  updater.startRefreshing(500);
} else {
  updater.final();
}
