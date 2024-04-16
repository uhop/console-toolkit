import Bitmap from '../../src/plot/Bitmap.js';
import drawRect from '../../src/plot/draw-rect.js';
import toQuads from '../../src/plot/to-quads.js';
import style from '../../src/style.js';
import {draw} from './utils.js';

const bmp = new Bitmap(27, 14);
drawRect(bmp, 2, 1, 24, 12);
drawRect(bmp, 4, 2, 22, 11, 0);
drawRect(bmp, 6, 3, 20, 10);
drawRect(bmp, 8, 4, 18, 9, 0);
drawRect(bmp, 10, 5, 16, 8);
drawRect(bmp, 12, 6, 14, 7, 0);
draw(bmp.toBox(style.bright.yellow.bg.bright.black.text('*'), style.bg.bright.black.text(' ')));
draw(toQuads(bmp));
