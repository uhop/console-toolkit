import {draw as drawTable} from '../../src/table/index.js';
import {style} from '../../src/table/style-unicode-bold.js';
import {draw} from './utils.js';

const box1 = drawTable(style, [1, 1, 1, 0, 1], [1, 1, 1, 0, 1]);
const box2 = drawTable(style, [2, 1, 1, 0, 2], [2, 1, 1, 0, 2]);
const box3 = drawTable(style, [1, 1, 2, 0, 1], [1, 1, 2, 0, 1]);
const box4 = drawTable(style, [1, 1, 2, 0, 2], [1, 1, 2, 0, 2]);

draw(box1, box2, box3, box4);
