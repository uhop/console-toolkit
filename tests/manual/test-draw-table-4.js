import {draw as drawTable} from '../../src/table/draw-borders.js';
import lineTheme from '../../src/themes/lines/ascii.js';
import {draw} from './utils.js';

const box1 = drawTable(lineTheme, [1, 5, 1, 3, 1], [1, 1, 1, 1, 1]);
const box2 = drawTable(lineTheme, [1, 5, 1, 3, 1], [1, 1, 0, 1, 2]);

draw(box1, box2);
