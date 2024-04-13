import {draw as drawTable} from '../../src/table/draw-borders.js';
import lineStyle from '../../src/line-themes/unicode-rounded.js';
import {draw} from './utils.js';

const box1 = drawTable(lineStyle, [1, 1, 1, 0, 1], [1, 1, 1, 0, 1]);
const box2 = drawTable(lineStyle, [2, 1, 1, 0, 2], [2, 1, 1, 0, 2]);
const box3 = drawTable(lineStyle, [1, 1, 2, 0, 1], [1, 1, 2, 0, 1]);
const box4 = drawTable(lineStyle, [1, 1, 2, 0, 2], [1, 1, 2, 0, 2]);
const box5 = drawTable(lineStyle, [1, 1, 2, 1, 2], [1, 1, 2, 1, 2]);

draw(box1, box2, box3, box4, box5);
