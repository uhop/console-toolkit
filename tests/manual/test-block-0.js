import {draw as drawTable} from '../../src/table/draw-borders.js';
import lineTheme from '../../src/line-themes/unicode-half-block.js';
import drawFrame from '../../src/draw-frame.js';
import {draw} from './utils.js';

const box1 = drawTable(lineTheme, [1, 1, 1, 0, 1], [1, 1, 1, 0, 1]);
const box2 = drawFrame(2, 2, lineTheme);
const box3 = drawFrame(2, 2, lineTheme, {symbol: null});

draw(box1, box2, box3);
