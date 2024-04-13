import {draw as drawTable} from '../../src/table/draw-borders.js';
import lineStyle from '../../src/line-themes/ascii.js';
import {draw} from './utils.js';

const box1 = drawTable(lineStyle, [1, 2, 1, 1, 1], [1, 2, 1, 1, 1]);
const box2 = drawTable(lineStyle, [1, 2, 1, 1, 1], [1, 2, 2, 1, 2]);

draw(box1, box2);
