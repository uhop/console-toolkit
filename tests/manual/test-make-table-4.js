import makeTable from '../../src/table/index.js';
import lineStyle from '../../src/line-styles/unicode-rounded.js';
import {s} from '../../src/style.js';
import {draw} from './utils.js';

const data = [
  [null, 'Quarter', 'Number'].map(x => x && s`{{bold}}${x}`),
  [{value: 'Year\n2024', height: 4, align: 'dc'}, 'I', 31],
  [null, 'II', 41],
  [null, 'III', 59],
  [null, 'IV', 26],
  [{value: s`{{bold.bright.cyan}}Total:`, width: 2, align: 'c'}, null, s`{{bold.cyan}}157`]
];

const table = makeTable(data, lineStyle, {
  hCenter: [1],
  hRight: [2],
  columnLast: '2',
  rowFirst: '2',
  rowLast: '2',
  hDataSep: 0,
  hMinDefault: 8
});

draw(table.draw().toBox());
