import {draw as drawTable} from '../../src/table/draw-borders.js';
import lineTheme from '../../src/themes/lines/ascii.js';
import {draw} from './utils.js';

const box1 = drawTable(lineTheme, [1, 2, 1, 1, 1], [1, 2, 1, 1, 1]);
const box2 = drawTable(lineTheme, [1, 2, 1, 1, 1], [1, 2, 2, 1, 2]);

draw(box1, box2);
