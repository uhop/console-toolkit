import Data from '../../src/table/Data.js';
import lineStyle from '../../src/line-styles/unicode-rounded.js';
import style, {s} from '../../src/style.js';
import {draw} from './utils.js';

const table = new Data([
  [null, 'Quarter', 'Number'].map(x => x && s`{{bold}}${x}`),
  [{value: 'Year\n2024', height: 4, align: 'dc'}, 'I', 31],
  [null, 'II', 41],
  [null, 'III', 59],
  [null, 'IV', 26],
  [{value: s`{{bold.bright.cyan}}Total:`, width: 2}, null, s`{{bold.cyan}}157`],
], {lineStyle, hAlign: ['l', 'c', 'r']});
table.hAxis[2] = '2';
table.vAxis[5] = '2';

draw(table.draw(style.dim.getState()).toBox());
