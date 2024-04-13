import {draw as drawTable} from '../../src/table/draw-borders.js';
import lineThemeHalfBlock from '../../src/line-themes/unicode-half-block.js';
import lineThemeThinBlock from '../../src/line-themes/unicode-thin-block.js';
import drawFrame from '../../src/draw-frame.js';
import {draw} from './utils.js';

const box1 = drawTable(lineThemeHalfBlock, [1, 1, 1, 0, 1], [1, 1, 1, 0, 1]);
const box2 = drawFrame(2, 2, lineThemeHalfBlock);
const box3 = drawFrame(2, 2, lineThemeHalfBlock, {symbol: null});

const box4 = drawTable(lineThemeThinBlock, [1, 1, 1, 0, 1], [1, 1, 1, 0, 1]);
const box5 = drawFrame(2, 2, lineThemeThinBlock);
const box6 = drawFrame(2, 2, lineThemeThinBlock, {symbol: null});

draw(box1, box2, box3, box4, box5, box6);
