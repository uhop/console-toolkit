import {Table} from '../../src/table/index.js';
import lineStyle from '../../src/line-styles/unicode-rounded.js';
import style, {s} from '../../src/style.js';
import {draw} from './utils.js';

const data = [
  ['Color', 'Sample', 'Number'].map(x => s`{{bold}}${x}`),
  ['red', s`{{red}}red`, 1],
  ['blue', s`{{blue}}blue`, 2],
  ['green', s`{{green}}1st line\n2nd\nand 3rd`, 3],
  [s`{{inverse}}bright\nyellow`, s`{{bright.yellow}}bright yellow`, '12,345']
];

const table = new Table(data, lineStyle, {hAlign: ['l', 'c', 'r'], vAlign: ['t', 'c', 'c', 'c', 'b']});
table.hAxis[2] = '2';
table.vAxis[1] = '2';

draw(table.draw(style.dim.getState()).toBox());
