import Bitmap from '../../src/canvas/Bitmap.js';
import toUnicodeBox from '../../src/canvas/bitmap-to-unicode.js';
import style from '../../src/style.js';
import {draw} from './utils.js';

const bmp = new Bitmap(7, 7)
  .setBit(0, 0, 1)
  .setBit(6, 6, 1)
  .setBit(6, 0, 1)
  .setBit(0, 6, 1)
  .setBit(1, 1, 1)
  .setBit(6, 5, 1)
  .setBit(1, 6, 1)
  .setBit(1, 1)
  .setBit(1, 0, 1)
  .setBit(3, 3, 1)
  .setBit(2, 3, 1)
  .setBit(4, 3, 1)
  .setBit(3, 2, 1)
  .setBit(3, 4, 1);
draw(bmp.toBox(style.bright.yellow.bg.bright.black.text('*'), style.bg.bright.black.text(' ')));
draw(toUnicodeBox(bmp));
