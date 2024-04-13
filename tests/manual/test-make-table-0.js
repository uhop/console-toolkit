import makeTable from '../../src/table/index.js';
import lineTheme from '../../src/themes/lines/unicode-rounded.js';
import {s} from '../../src/style.js';
import {draw} from './utils.js';

const data = [
  ['Color', 'Sample', 'Number'].map(x => s`{{bold}}${x}`),
  ['red', s`{{red}}red`, 1],
  ['blue', s`{{blue}}blue`, 2],
  ['green', s`{{green}}1st line\n2nd\nand 3rd`, 3],
  [s`{{inverse}}bright\nyellow`, s`{{bright.yellow}}bright yellow`, '12,345']
];

const table = makeTable(
  data,
  lineTheme,
  {rowFirst: '2', columnLast: '2'},
  {hAlign: ['l', 'c', 'r'], vAlign: ['t', 'c', 'c', 'c', 'b']}
);

draw(table.draw().toBox());
