import Bitmap from '../../src/plot/Bitmap.js';
import drawRect from '../../src/plot/draw-rect.js';
import toQuads from '../../src/plot/to-quads.js';
import style from '../../src/style.js';
import {draw} from './utils.js';

const bmp = new Bitmap(13, 13);
drawRect(bmp, 1, 1, 11, 11);
drawRect(bmp, 2, 2, 10, 10, 0);
drawRect(bmp, 3, 3, 9, 9);
drawRect(bmp, 4, 4, 8, 8, 0);
drawRect(bmp, 5, 5, 7, 7);
drawRect(bmp, 6, 6, 6, 6, 0);
draw(bmp.toBox(style.bright.yellow.bg.bright.black.text('*'), style.bg.bright.black.text(' ')));
draw(toQuads(bmp));
