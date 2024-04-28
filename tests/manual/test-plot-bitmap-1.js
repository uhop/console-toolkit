import Bitmap from '../../src/plot/bitmap.js';
import toQuads from '../../src/plot/to-quads.js';
import style from '../../src/style.js';
import {draw} from './utils.js';

const bmp = new Bitmap(7, 7)
  .setBit(0, 0)
  .setBit(6, 6)
  .setBit(6, 0)
  .setBit(0, 6)
  .setBit(1, 1)
  .setBit(6, 5)
  .setBit(1, 6)
  .setBit(1, 1, 0)
  .setBit(1, 0)
  .setBit(3, 3)
  .setBit(2, 3)
  .setBit(4, 3)
  .setBit(3, 2)
  .setBit(3, 4);
draw(bmp.toBox(style.bright.yellow.bg.bright.black.text('*'), style.bg.bright.black.text(' ')));
draw(toQuads(bmp));
