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
  [{value: s`{{bold.bright.cyan}}Total:`, width: 2}, null, s`{{bold.cyan}}157`]
];

const table = makeTable(data, lineStyle, {rowFirst: '2', columnLast: '2', hCenter: [1], hRight: [2]});

draw(table.draw().toBox());
