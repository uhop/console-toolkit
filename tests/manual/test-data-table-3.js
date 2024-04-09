import Data from '../../src/table/Data.js';
import lineStyle from '../../src/line-styles/unicode-rounded.js';
import style, {s} from '../../src/style.js';
import {draw} from './utils.js';

const table = new Data(
  [
    [null, 'Quarter', 'Number'].map(x => x && s`{{bold}}${x}`),
    [{value: 'Year\n2024', height: 4, align: 'dc'}, 'I', 31],
    [null, 'II', 41],
    [null, 'III', 59],
    [null, 'IV', 26],
    [{value: s`{{bold.bright.cyan}}Total:`, width: 2}, null, s`{{bold.cyan}}157`]
  ],
  {lineStyle, hAlign: ['l', 'c', 'r'], hAxis: [1, 1, 2, 1], vAxis: [1, 2, 0, 0, 0, 2, 1], hMin: [0, 8, 0]}
);

draw(table.draw(style.dim.getState()).toBox());
