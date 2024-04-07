import {draw as drawTable} from '../../src/table/draw-borders.js';
import {style} from '../../src/line-styles/unicode.js';
import {draw} from './utils.js';

const box1 = drawTable(style, [1, 0, 1], [1, 0, 1]);
const box2 = drawTable(style, [2, 0, 2], [2, 0, 2]);
const box3 = drawTable(style, [1, 0, 2], [1, 0, 2]);
const box4 = drawTable(style,[2, 0, 1], [2, 0, 1]);

draw(box1, box2, box3, box4);
