import Bitmap from '../../src/plot/bitmap.js';
import drawLine from '../../src/plot/draw-line.js';
import toQuads from '../../src/plot/to-quads.js';
import style from '../../src/style.js';
import {draw} from './utils.js';

const bmp = new Bitmap(7, 7);
drawLine(bmp, 0, 0, 6, 6);
drawLine(bmp, 0, 6, 6, 0);
drawLine(bmp, 0, 0, 6, 0);
drawLine(bmp, 0, 6, 6, 6);
draw(bmp.toBox(style.bright.yellow.bg.bright.black.text('*'), style.bg.bright.black.text(' ')));
draw(toQuads(bmp));
