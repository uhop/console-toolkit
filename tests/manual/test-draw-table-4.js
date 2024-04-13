import {draw as drawTable} from '../../src/table/draw-borders.js';
import lineStyle from '../../src/line-themes/ascii.js';
import {draw} from './utils.js';

const box1 = drawTable(lineStyle, [1, 5, 1, 3, 1], [1, 1, 1, 1, 1]);
const box2 = drawTable(lineStyle, [1, 5, 1, 3, 1], [1, 1, 0, 1, 2]);

draw(box1, box2);
