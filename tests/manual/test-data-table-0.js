import Data from '../../src/table/Data.js';
import lineStyle from '../../src/line-styles/unicode-rounded.js';
import style from '../../src/style.js';
import {draw} from './utils.js';

const table = new Data([
  ['red', style.red.text('red')],
  ['blue', style.blue.text('blue')],
  ['bright\nyellow', style.bright.yellow.text('bright yellow')]
]);
table.hAxis[1] = '2';
table.vAxis[1] = '2';

draw(table.draw(lineStyle, style.dim.getState()).toBox());
