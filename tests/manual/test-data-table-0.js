import Data from '../../src/table/Data.js';
import lineStyle from '../../src/line-styles/unicode-rounded.js';
import style, {s} from '../../src/style.js';
import {draw} from './utils.js';

const table = new Data([
  ['Color', 'Sample', 'Number'].map(x => s`{{bold}}${x}`),
  ['red', s`{{red}}red`, 1],
  ['blue', s`{{blue}}blue`, 2],
  ['green', s`{{green}}1st line\n2nd\nand 3rd`, 3],
  [s`{{inverse}}bright\nyellow`, s`{{bright.yellow}}bright yellow`, '12,345']
], {hAlign: ['l', 'c', 'r'], vAlign: ['t', 'c', 'c', 'c', 'b']});
table.hAxis[2] = '2';
table.vAxis[1] = '2';

draw(table.draw(lineStyle, style.dim.getState()).toBox());
