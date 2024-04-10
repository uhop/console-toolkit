import makeTable from '../../src/table/index.js';
import lineStyle from '../../src/line-styles/unicode-rounded.js';
import {transcodeTables} from '../../src/alphanumeric/unicode-numbers.js';
import {s} from '../../src/style.js';
import {draw} from './utils.js';

const data = [
  ['Year', 'Quarter', 'Number'].map(x => x && s`{{bold}}${x}`),
  [{value: '2024', height: 4, align: 'dc'}, transcodeTables.roman[1], 31],
  [null, transcodeTables.roman[2], 41],
  [null, transcodeTables.roman[3], 59],
  [null, transcodeTables.roman[4], 26],
  [{value: s`{{bold.bright.cyan}}Total:`, width: 2, align: 'r'}, null, s`{{bold.cyan}}157`]
];

const table = makeTable(data, lineStyle, {
  hCenter: [1],
  hRight: [2],
  columnLast: '2',
  rowFirst: '2',
  rowLast: '2',
  hDataSep: 0
});

draw(table.draw().toBox());
