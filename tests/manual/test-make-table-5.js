import makeTable from '../../src/table/index.js';
import lineTheme from '../../src/themes/lines/unicode-rounded.js';
import style, {s} from '../../src/style.js';
import {draw} from './utils.js';

const data = [
  [null, 'Quarter', 'Number'],
  [{value: 'Year\n2024', height: 4, align: 'dc'}, 'I', 31],
  [null, 'II', 41],
  [null, 'III', 59],
  [null, 'IV', 26],
  [{value: 'Total:', width: 2, align: 'r'}, null, s`{{bold}}157`]
];

const table = makeTable(data, lineTheme, {
  hCenter: [1],
  hRight: [2],
  columnLast: '2',
  rowFirst: '2',
  rowLast: '2',
  hDataSep: 0,
  states: {
    rowFirst: style.bold.getState(),
    rowLast: style.bright.cyan.getState()
  }
});

draw(table.draw().toBox());
