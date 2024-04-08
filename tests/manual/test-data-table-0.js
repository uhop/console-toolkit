import Data from '../../src/table/Data.js';
import lineStyle from '../../src/line-styles/unicode-rounded.js';
import style from '../../src/style.js';
import {draw} from './utils.js';

const table = new Data([
  ['Color', 'Sample', 'Number'],
  ['red', style.red.text('red'), 1],
  ['blue', style.blue.text('blue'), 2],
  ['green', style.green.text('1st line\n2nd\nand 3rd'), 3],
  [style.inverse.text('bright\nyellow'), style.bright.yellow.text('bright yellow'), '12,345']
], {hAlign: ['l', 'c', 'r'], vAlign: ['t', 'c', 'c', 'c', 'b']});
table.hAxis[2] = '2';
table.vAxis[1] = '2';

draw(table.draw(lineStyle, style.dim.getState()).toBox());
