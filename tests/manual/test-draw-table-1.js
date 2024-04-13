import {draw as drawTable} from '../../src/table/draw-borders.js';
import lineTheme from '../../src/line-themes/unicode.js';
import {draw} from './utils.js';

const box1 = drawTable(lineTheme, [1, 1, 1], [1, 1, 1]);
const box2 = drawTable(lineTheme, [2, 1, 2], [2, 1, 2]);
const box3 = drawTable(lineTheme, [1, 1, 2], [1, 1, 2]);
const box4 = drawTable(lineTheme, [2, 1, 1], [2, 1, 1]);

draw(box1, box2, box3, box4);
