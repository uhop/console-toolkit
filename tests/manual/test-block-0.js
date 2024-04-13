import {draw as drawTable} from '../../src/table/draw-borders.js';
import halfBlock from '../../src/themes/blocks/unicode-half.js';
import thinBlock from '../../src/themes/blocks/unicode-thin.js';
import drawFrame from '../../src/draw-frame.js';
import {draw} from './utils.js';

const box1 = drawTable(halfBlock, [1, 1, 1, 0, 1], [1, 1, 1, 0, 1]);
const box2 = drawFrame(2, 2, halfBlock);
const box3 = drawFrame(2, 2, halfBlock, {symbol: null});

const box4 = drawTable(thinBlock, [1, 1, 1, 0, 1], [1, 1, 1, 0, 1]);
const box5 = drawFrame(2, 2, thinBlock);
const box6 = drawFrame(2, 2, thinBlock, {symbol: null});

draw(box1, box2, box3, box4, box5, box6);
