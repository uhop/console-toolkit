import Bitmap from '../../src/plot/Bitmap.js';
import style from '../../src/style.js';
import {draw} from './utils.js';

const bitmap = new Bitmap(7, 7)
  .setBit(0, 0, 1)
  .setBit(6, 6, 1)
  .setBit(6, 0, 1)
  .setBit(0, 6, 1)
  .setBit(1, 1, 1)
  .setBit(6, 5, 1)
  .setBit(1, 1, 0)
  .setBit(1, 0, 1);
draw(bitmap.toBox(style.bright.yellow.bg.bright.black.text('*'), style.bg.bright.black.text(' ')));
