import process from 'node:process';

import Writer from 'console-toolkit/output/writer.js';
import Updater from 'console-toolkit/output/updater.js';

import Box from 'console-toolkit/box.js';

import {CLEAR_EOL, CURSOR_INVISIBLE, CURSOR_NORMAL} from 'console-toolkit/ansi/csi.js';
import style, {c} from 'console-toolkit/style.js';

import lineTheme from 'console-toolkit/themes/lines/unicode-bold.js';
import makeTable from 'console-toolkit/table/index.js';
import {formatInteger, abbrNumber} from 'console-toolkit/alphanumeric/number-formatters.js';

import drawChart from 'console-toolkit/charts/bars/plain.js';

const showDiff = (a, b) => {
  const s = formatInteger(a);
  if (typeof b !== 'number' || a === b) return s;
  return style.bright[a < b ? 'green' : 'red'].text(s);
};

const abbrOptions = {decimals: 1, keepFractionAsIs: true},
  numberStyle = style.reset.bold.bright.yellow;

let previousSnapshot = null;

const memorySnapshot = () => {
  const m = process.memoryUsage(),
    abbrHeapTotal = abbrNumber(m.heapTotal, abbrOptions),
    abbrHeapUsed = abbrNumber(m.heapUsed, abbrOptions);

  const tableData = [
    ['Memory usage', 'Bytes', 'Abbr'],
    ['RSS', showDiff(m.rss, previousSnapshot?.rss), abbrNumber(m.rss, abbrOptions)],
    ['Heap total', showDiff(m.heapTotal, previousSnapshot?.heapTotal), abbrHeapTotal],
    ['Heap used', showDiff(m.heapUsed, previousSnapshot?.heapUsed), abbrHeapUsed],
    ['External', showDiff(m.external, previousSnapshot?.external), abbrNumber(m.external, abbrOptions)],
    ['Array buffers', showDiff(m.arrayBuffers, previousSnapshot?.arrayBuffers), abbrNumber(m.arrayBuffers, abbrOptions)]
  ];

  previousSnapshot = {...m};

  const tableBox = makeTable(tableData, lineTheme, {
    rowFirst: 2,
    columnFirst: 2,
    hDataSep: 0,
    hRight: [1, 2, 3],
    states: {rowFirst: style.bold, columnFirst: style.bold}
  }).toBox();

  const chart = drawChart([[m.heapUsed, m.heapTotal - m.heapUsed]], tableBox.width - 2, {maxValue: -1});
  chart.unshift(
    c`{{bold}}Heap - {{save}}${numberStyle}${abbrHeapUsed}{{restore}} of {{save}}${numberStyle}${abbrHeapTotal}{{restore}}:`
  );

  const chartBox = new Box(chart).pad(0, 1);

  return tableBox.addBottom(chartBox);
};

const writer = new Writer(),
  updater = new Updater(
    memorySnapshot,
    {prologue: CURSOR_INVISIBLE, epilogue: CURSOR_NORMAL, afterLine: CLEAR_EOL},
    writer
  );

process.once('SIGINT', () => {
  updater.done();
  process.exit(130);
});

await writer.writeString(c`{{bold}}Memory usage by this process {{reset.bold.dim}}(Press Ctrl+C to exit)\n`);
await writer.writeString(
  c`{{dim}}Legend: RSS - resident set size, {{bright.green}}green{{reset.color}} - goes down, {{bright.red}}red{{reset.color}} - goes up\n`
);

if (writer.isTTY) {
  updater.update();
  updater.startRefreshing(500);
} else {
  updater.final();
}
